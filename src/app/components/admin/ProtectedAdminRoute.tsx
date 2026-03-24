import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
            <div className="w-8 h-8 border-4 border-blue-200 dark:border-blue-700 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}