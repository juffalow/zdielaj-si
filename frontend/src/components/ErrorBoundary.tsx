import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  error: Error | null;
  hasError: boolean;
  isOpen: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    error: null,
    isOpen: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, hasError: true });
  }

  onClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onRefresh =() => {
    location.reload();
  }

  render() {
    if (this.state.hasError) {
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
              <p className="mb-0"><b>URL:</b></p>
              <pre>
                {(this.state.error as any).response.url}
              </pre>
              <p className="mb-0"><b>X-Request-Id:</b></p>
              <pre>
                {(this.state.error as any).response.headers['X-Request-Id']}
              </pre>
              <p className="mb-0"><b>Stack:</b></p>
              <pre>
                {(this.state.error as any).stack}
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
