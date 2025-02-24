import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import type { APIError } from '../api/errors'

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  notFound?: ReactNode;
}

interface State {
  error: Error | APIError | null;
  hasError: boolean;
  isOpen: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
    isOpen: false,
  };

  componentDidCatch(error: Error | Error & { response: { url: string, headers: { 'X-Request-Id': string } } }, errorInfo: ErrorInfo) {
    this.setState({ error, hasError: true });
  }

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onRefresh =() => {
    location.reload();
  }

  render() {
    if (this.state.hasError && this.state.error !== null) {
      if ('response' in this.state.error && this.state.error.response.status === 404 && this.props.notFound) {
        return this.props.notFound;
      }

      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Alert variant="danger">
          <Alert.Heading>{(this.state.error as any).message}</Alert.Heading>
          <hr />
          <div className="clearfix">
            <Button variant="outline-danger" className="float-end" onClick={this.onRefresh}>Refresh</Button>
            <Button variant="outline-secondary" className="me-2 float-end" onClick={this.onClick}>More info</Button>
          </div>
          <Collapse in={this.state.isOpen}>
            <div>
              {
                'response' in this.state.error && 'url' in this.state.error.response ? (
                  <>
                    <p className="mb-0"><b>URL:</b></p>
                    <pre>
                      {(this.state.error as APIError).response.url}
                    </pre>
                  </>
                ) : null
              }
              {
                'response' in this.state.error && 'headers' in this.state.error.response ? (
                  <>
                    <p className="mb-0"><b>X-Request-Id:</b></p>
                    <pre>
                      {(this.state.error as APIError).response.headers['X-Request-Id']}
                    </pre>
                  </>
                ) : null
              }
              <p className="mb-0"><b>Stack:</b></p>
              <pre>
                {this.state.error.stack}
              </pre>
            </div>
          </Collapse>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
