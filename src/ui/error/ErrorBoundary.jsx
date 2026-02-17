import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);

    // Later: send to logging service (Sentry, LogRocket, etc.)
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 text-center">
          <h1 className="text-3xl font-bold text-red-600">
            Something went wrong
          </h1>
          <p className="mt-4 text-gray-600">An unexpected error occurred.</p>
          <button
            onClick={this.handleReload}
            className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
