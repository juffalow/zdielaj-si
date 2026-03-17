import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Alert, Button, Divider } from '@heroui/react';
import * as Sentry from '@sentry/react';
import type { APIError } from '../api/errors';
import logger from '../logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  notFound?: ReactNode;
}

interface State {
  error: Error | APIError | null;
  errorInfo: ErrorInfo | null;
  hasError: boolean;
  isOpen: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    isOpen: false,
  };

  componentDidCatch(
    error:
      | Error
      | (Error & { response: { url: string; headers: { 'x-amzn-requestid': string; 'x-amzn-trace-id': string } } }),
    errorInfo: ErrorInfo
  ) {
    logger.error('ErrorBoundary catched error!', { error, errorInfo });

    this.setState({ error, errorInfo, hasError: true });

    Sentry.captureException(error, {
      extra: {
        requestId:
          'response' in error && 'headers' in error.response ? error.response.headers['x-amzn-requestid'] : null,
        traceId: 'response' in error && 'headers' in error.response ? error.response.headers['x-amzn-trace-id'] : null,
      },
    });
  }

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  onRefresh = () => {
    location.reload();
  };

  render() {
    if (this.state.hasError && this.state.error !== null) {
      if ('response' in this.state.error && this.state.error.response.status === 404 && this.props.notFound) {
        return this.props.notFound;
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Alert color="danger">
          <h2 className="mb-2 text-2xl font-bold">
            {'message' in this.state.error &&
            typeof this.state.error.message === 'string' &&
            this.state.error.message !== null
              ? this.state.error.message
              : 'Unknown error'}
          </h2>

          <p>
            Error was reported to the support team. If the problem persists, please contact us at{' '}
            <a href="mailto:info@zdielaj.si">info@zdielaj.si</a>.
          </p>

          <Divider className="my-4" />

          <div className="w-full clearfix">
            <Button color="danger" size="sm" className="float-end" onPress={this.onRefresh}>
              Refresh
            </Button>
            <Button color="danger" size="sm" className="me-2 float-end" onPress={this.onClick}>
              More info
            </Button>
          </div>

          {this.state.isOpen ? (
            <div className="pt-2 pb-2">
              {'response' in this.state.error && 'url' in this.state.error.response ? (
                <>
                  <p className="mb-0 font-bold">URL:</p>
                  <pre className="text-sm mb-2 mt-2">{(this.state.error as APIError).response.url}</pre>
                </>
              ) : null}
              {'response' in this.state.error && 'headers' in this.state.error.response ? (
                <>
                  <p className="mb-0 font-bold">X-Amzn-RequestId:</p>
                  <pre className="text-sm mb-2 mt-2">
                    {(this.state.error as APIError).response.headers['x-amzn-requestid']}
                  </pre>
                </>
              ) : null}
              {'response' in this.state.error && 'headers' in this.state.error.response ? (
                <>
                  <p className="mb-0 font-bold">X-Amzn-Trace-Id:</p>
                  <pre className="text-sm mb-2 mt-2">
                    {(this.state.error as APIError).response.headers['x-amzn-trace-id']}
                  </pre>
                </>
              ) : null}
              <p className="mb-0 font-bold">Stack:</p>
              <pre className="text-sm mb-2 mt-2">{this.state.error.stack}</pre>
              <pre className="text-sm mb-2 mt-2">{this.state.errorInfo?.componentStack}</pre>
            </div>
          ) : null}
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
