import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';
import { Alert, Button } from '@heroui/react';
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
        <Alert color="warning">
          <h1>Error not found</h1>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
