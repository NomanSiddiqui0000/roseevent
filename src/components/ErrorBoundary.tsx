import { Component, ErrorInfo, ReactNode } from 'react';

interface Props { children: ReactNode; name?: string; }
interface State { hasError: boolean; error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[ErrorBoundary ${this.props.name || ''}]`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace', background: '#fff', color: '#c00' }}>
          <h2 style={{ margin: '0 0 1rem' }}>Error in {this.props.name || 'component'}</h2>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
            {this.state.error?.message}
          </pre>
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
