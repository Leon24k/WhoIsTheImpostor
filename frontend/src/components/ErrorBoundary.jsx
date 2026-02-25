import { Component } from 'react';

/**
 * ErrorBoundary — catches render-time errors in the component tree and
 * shows a recovery screen instead of a blank page.
 *
 * Industry practice: always wrap the root of a React app with an error
 * boundary so unhandled render errors never show a white screen.
 *
 * Security note: `error.message` is only displayed in development.
 * In production, only a generic message is shown to avoid leaking
 * internal stack traces to end users.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
    this.handleRestart = this.handleRestart.bind(this);
  }

  static getDerivedStateFromError(error) {
    const isDev = process.env.NODE_ENV === 'development';
    return {
      hasError: true,
      // Only expose error message in development (security best practice)
      errorMessage: isDev ? error?.message : null,
    };
  }

  componentDidCatch(error, info) {
    // Log to console in dev; swap for a real error reporting service (e.g. Sentry) in prod
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary] Uncaught render error:', error, info);
    }
  }

  handleRestart() {
    // Clear any persisted game state so the app can boot cleanly
    try {
      sessionStorage.clear();
    } catch {
      // sessionStorage may be unavailable in some privacy modes — ignore
    }
    this.setState({ hasError: false, errorMessage: null });
    // Hard reload ensures a clean JS runtime too
    window.location.reload();
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div
        role="alert"
        className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background"
      >
        <p className="text-5xl mb-4" aria-hidden="true">🎭</p>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-1 text-sm max-w-xs">
          An unexpected error occurred. Your game session will be reset.
        </p>

        {/* Only visible in development — never leaks in production */}
        {this.state.errorMessage && (
          <pre className="mt-2 mb-4 px-4 py-2 rounded bg-destructive/10 border border-destructive/30 text-destructive text-xs max-w-lg overflow-auto text-left">
            {this.state.errorMessage}
          </pre>
        )}

        <button
          onClick={this.handleRestart}
          className="mt-6 px-6 py-3 rounded-lg gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Restart Game
        </button>
      </div>
    );
  }
}
