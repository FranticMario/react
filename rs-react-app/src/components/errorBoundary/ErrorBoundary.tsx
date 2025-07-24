import { Component, type PropsWithChildren, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ErrorBoundaryProps>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 data-testid="errorboundary">Что-то пошло не так.</h1>
          <button onClick={this.resetError}>Попробовать снова</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
