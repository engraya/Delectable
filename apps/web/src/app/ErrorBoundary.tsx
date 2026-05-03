import { Component, type ErrorInfo, type ReactNode } from "react";
import { QueryError } from "@/shared/ui/QueryError";

type Props = { children: ReactNode };
type State = { hasError: boolean; message?: string };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI error boundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8">
          <QueryError
            message={this.state.message ?? "Something went wrong."}
            onRetry={() => this.setState({ hasError: false, message: undefined })}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
