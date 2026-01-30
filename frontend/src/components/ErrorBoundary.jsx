<<<<<<< HEAD
// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  }

  handleGoHome = () => {
    window.location.href = '/';
  }

  handleGoBack = () => {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <AlertTriangle size={64} color="#ff6b6b" />
            </div>
            
            <h1 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. This might be a temporary issue.
            </p>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                textAlign: 'left', 
                marginBottom: '2rem',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Error Details (Development)
                </summary>
                <div style={{ fontFamily: 'monospace' }}>
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br /><br />
                  <strong>Component Stack:</strong>
                  <pre style={{ 
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#4ecdc4',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#45b7af'}
                onMouseOut={(e) => e.target.style.background = '#4ecdc4'}
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoBack}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
              
              <button
                onClick={this.handleGoHome}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <Home size={18} />
                Home
              </button>
            </div>

            <p style={{ 
              marginTop: '2rem',
              fontSize: '0.9rem',
              opacity: 0.7
            }}>
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

=======
// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
  }

  handleGoHome = () => {
    window.location.href = '/';
  }

  handleGoBack = () => {
    window.history.back();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary" style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '3rem',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ marginBottom: '2rem' }}>
              <AlertTriangle size={64} color="#ff6b6b" />
            </div>
            
            <h1 style={{ 
              fontSize: '2rem', 
              marginBottom: '1rem',
              fontWeight: 'bold'
            }}>
              Oops! Something went wrong
            </h1>
            
            <p style={{ 
              fontSize: '1.1rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: 1.6
            }}>
              We encountered an unexpected error. This might be a temporary issue.
            </p>

            {/* Error details for development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                textAlign: 'left', 
                marginBottom: '2rem',
                background: 'rgba(0, 0, 0, 0.2)',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem' }}>
                  Error Details (Development)
                </summary>
                <div style={{ fontFamily: 'monospace' }}>
                  <strong>Error:</strong> {this.state.error.toString()}
                  <br /><br />
                  <strong>Component Stack:</strong>
                  <pre style={{ 
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.8rem',
                    marginTop: '0.5rem'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#4ecdc4',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = '#45b7af'}
                onMouseOut={(e) => e.target.style.background = '#4ecdc4'}
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoBack}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
              
              <button
                onClick={this.handleGoHome}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
              >
                <Home size={18} />
                Home
              </button>
            </div>

            <p style={{ 
              marginTop: '2rem',
              fontSize: '0.9rem',
              opacity: 0.7
            }}>
              If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

>>>>>>> f82bba6af5ffd5ca62025f21297dee1ee034a82d
export default ErrorBoundary;