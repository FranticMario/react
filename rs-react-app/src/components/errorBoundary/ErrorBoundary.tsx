import { Component, type PropsWithChildren, type ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<
  PropsWithChildren<ReactNode>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<ReactNode>) {
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
          <h1>Что-то пошло не так.</h1>
          <button onClick={this.resetError}>Попробовать снова</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
