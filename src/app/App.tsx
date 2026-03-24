import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { TutorMatching } from "./components/tutor-matching";
import { TutorManagement } from "./components/tutor-management";
import { ClassManagement } from "./components/class-management";
import { ContractManagement } from "./components/contract-management";
import { StudentManagement } from "./components/student-management";
import PublicTutors from "./components/public-tutors";
import LoginRegister from "./components/login-register";
import AdminDashboard from "./components/admin-dashboard";
import StaffDashboard from "./components/staff-dashboard";
import TutorDashboard from "./components/tutor-dashboard";
import StudentDashboardNew from "./components/student-dashboard-new";
import BookingFlow from "./components/booking-flow";
import BookedSessions from "./components/booked-sessions";
import { ProtectedRoute } from "./components/protected-route";
import { ProtectedAdminRoute } from "./components/admin/ProtectedAdminRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import TutorManagementPage from "./pages/admin/TutorManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import ReviewManagement from "./pages/admin/ReviewManagement";
import MyBookings from "./pages/shared/MyBookings";
import MyReviews from "./pages/shared/MyReviews";
import { useAuth } from "./context/AuthContext";
import { GraduationCap, LogOut } from "lucide-react";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import {
  Tutor,
  Class,
  Contract,
  Session
} from "./types/index";
import {
  MOCK_TUTORS_DATA,
  MOCK_CLASSES_DATA,
  MOCK_CONTRACTS_DATA,
  MOCK_SESSIONS_DATA
} from "./services/mockData";

function App() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [tutors, setTutors] = useState<Tutor[]>(MOCK_TUTORS_DATA);
  const [classes, setClasses] = useState<Class[]>(MOCK_CLASSES_DATA);
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS_DATA);
  const [sessions, setSessions] = useState<Session[]>(MOCK_SESSIONS_DATA);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <Toaster />
          <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicTutors tutors={tutors} />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginRegister />
            }
          />

          {/* Protected routes for students */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <ErrorBoundary>
                  {user?.role === "student" ? (
                    <StudentDashboardNew />
                  ) : user?.role === "tutor" ? (
                    <TutorDashboard />
                  ) : user?.role === "staff" ? (
                    <StaffDashboard
                      tutors={tutors}
                      setTutors={setTutors}
                      classes={classes}
                    setClasses={setClasses}
                    contracts={contracts}
                    setContracts={setContracts}
                    sessions={sessions}
                  />
                ) : user?.role === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <AdminDashboard
                    tutors={tutors}
                    students={classes.map(c => ({ name: c.studentName, grade: c.grade }))}
                    classes={classes}
                    contracts={contracts}
                    sessions={sessions}
                  />
                )}
                {!user?.role && (
                  <div className="p-8 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Không xác định vai trò người dùng</h2>
                    <p className="text-gray-600">Vui lòng đăng nhập lại hoặc liên hệ quản trị viên.</p>
                  </div>
                )}
              </ErrorBoundary>
            </ProtectedRoute>
            }
          />

          {/* Student specific routes */}
          <Route
            path="/booking"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <BookingFlow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-classes"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <BookedSessions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute allowedRoles={["student", "tutor", "staff", "admin"]}>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reviews"
            element={
              <ProtectedRoute allowedRoles={["student", "tutor", "staff", "admin"]}>
                <MyReviews />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="tutors" element={<TutorManagementPage />} />
            <Route path="bookings" element={<BookingManagement />} />
            <Route path="reviews" element={<ReviewManagement />} />
            <Route path="analytics" element={<div className="p-6">Thống kê - Đang phát triển</div>} />
          </Route>

          {/* Legacy admin routes */}
          <Route
            path="/admin/matching"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <TutorMatching
                  tutors={tutors}
                  classes={classes}
                  setClasses={setClasses}
                  contracts={contracts}
                  setContracts={setContracts}
                  setSessions={setSessions}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <StudentManagement
                  classes={classes}
                  contracts={contracts}
                  sessions={sessions}
                  tutors={tutors}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/classes"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ClassManagement
                  classes={classes}
                  tutors={tutors}
                  contracts={contracts}
                  setClasses={setClasses}
                  setContracts={setContracts}
                  sessions={sessions}
                  setSessions={setSessions}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contracts"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ContractManagement
                  contracts={contracts}
                  setContracts={setContracts}
                  sessions={sessions}
                  setSessions={setSessions}
                  classes={classes}
                  tutors={tutors}
                />
              </ProtectedRoute>
            }
          />

          {/* Catch all route - redirect to dashboard if authenticated, otherwise to home */}
          <Route
            path="*"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
            }
          />
        </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
