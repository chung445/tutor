import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Unhandled error in component tree:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-red-50 text-red-700">
          <div className="max-w-lg text-center">
            <h1 className="text-2xl font-bold mb-2">Đã có lỗi xảy ra</h1>
            <p className="mb-2">Xin lỗi, trang này hiện không thể hiển thị do lỗi nội bộ.</p>
            <pre className="text-xs whitespace-pre-wrap bg-white p-3 rounded border border-red-200">{this.state.error?.message}</pre>
            <p className="mt-3 text-sm text-gray-600">Vui lòng thử refresh hoặc liên hệ hỗ trợ.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
