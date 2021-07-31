import * as React from 'react';

export interface ErrorBoundaryProps {
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: undefined };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {    
    this.setState({ error });
  }

  public render() {
    if (this.state.error) {
        return <div className='errorMessage'>{'Cannot load component'}</div>;
    }
    else {
      return (<>{this.props.children}</>);
    }
  }
}
