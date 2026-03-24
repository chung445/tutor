import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { GraduationCap, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function LoginRegister() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "staff" | "tutor" | "student">("admin");

  const roleDefaults: Record<string, { email: string; password: string }> = {
    admin: { email: "admin@tutorcentral.com", password: "admin123" },
    staff: { email: "staff@tutorcentral.com", password: "staff123" },
    tutor: { email: "tutor@tutorcentral.com", password: "tutor123" },
    student: { email: "student1@tutorcentral.com", password: "student123" },
  };

  const [loginData, setLoginData] = useState({
    email: roleDefaults[selectedRole].email,
    password: roleDefaults[selectedRole].password
  });

  useEffect(() => {
    const selected = roleDefaults[selectedRole];
    setLoginData({ email: selected.email, password: selected.password });
  }, [selectedRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(loginData.email, loginData.password);
      toast.success("Đăng nhập thành công!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (email: string) => {
    setError("");
    setIsLoading(true);

    try {
      const passwords: Record<string, string> = {
        "admin@tutorcentral.com": "admin123",
        "manager@tutorcentral.com": "manager123",
        "staff@tutorcentral.com": "staff123",
        "tutor@tutorcentral.com": "tutor123",
        "student1@tutorcentral.com": "student123",
        "student2@tutorcentral.com": "student123",
        "student3@tutorcentral.com": "student123"
      };
      await login(email, passwords[email]);
      toast.success("Đăng nhập demo thành công!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng nhập thất bại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <GraduationCap className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Hệ Thống Gia Sư
          </h1>
          <p className="text-gray-600">
            Kết nối gia sư và phụ huynh hiệu quả
          </p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setSelectedRole("admin")}
            className={`flex-1 py-2 px-3 rounded font-medium text-sm transition-colors ${
              selectedRole === "admin"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("staff")}
            className={`flex-1 py-2 px-3 rounded font-medium text-sm transition-colors ${
              selectedRole === "staff"
                ? "bg-purple-600 text-white"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            Nhân viên
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("tutor")}
            className={`flex-1 py-2 px-3 rounded font-medium text-sm transition-colors ${
              selectedRole === "tutor"
                ? "bg-green-600 text-white"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            Gia sư
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole("student")}
            className={`flex-1 py-2 px-3 rounded font-medium text-sm transition-colors ${
              selectedRole === "student"
                ? "bg-blue-600 text-white"
                : "bg-transparent text-gray-600 hover:bg-white/50"
            }`}
          >
            Học Viên
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedRole === "admin"
                ? "Đăng Nhập Quản Trị Viên"
                : selectedRole === "staff"
                ? "Đăng Nhập Nhân Viên"
                : selectedRole === "tutor"
                ? "Đăng Nhập Gia Sư"
                : "Đăng Nhập Học Viên"}
            </CardTitle>
            <CardDescription>
              {selectedRole === "admin"
                ? "Chỉ Admin có thể đăng nhập"
                : selectedRole === "staff"
                ? "Quản lý sinh viên, lớp học, và yêu cầu"
                : selectedRole === "tutor"
                ? "Quản lý lớp học, lịch học, và hóa đơn"
                : "Đăng nhập để xem thông tin lớp học và tiến độ"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder={selectedRole === "admin" ? "admin@tutorcentral.com" : "student1@tutorcentral.com"}
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Mật Khẩu</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Đăng Nhập"
                )}
              </Button>

              {/* Demo Accounts */}
              <div className="pt-4 border-t space-y-2">
                <p className="text-sm text-gray-600 font-medium">
                  {selectedRole === "admin"
                    ? "Demo Tài Khoản Admin:"
                    : selectedRole === "staff"
                    ? "Demo Tài Khoản Nhân Viên:"
                    : selectedRole === "tutor"
                    ? "Demo Tài Khoản Gia Sư:"
                    : "Demo Tài Khoản Học Viên:"}
                </p>
                {selectedRole === "admin" ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("admin@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Admin Chính
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("manager@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Nhân Viên Quản Lý
                    </Button>
                  </>
                ) : selectedRole === "staff" ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("staff@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Nhân Viên 1
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("staff2@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Nhân Viên 2
                    </Button>
                  </>
                ) : selectedRole === "tutor" ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => handleDemoLogin("tutor@tutorcentral.com")}
                    disabled={isLoading}
                  >
                    Demo Gia Sư (Lý Thị Hương)
                  </Button>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("student1@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Học Viên 1 (Nguyễn Minh Anh)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("student2@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Học Viên 2 (Trần Phương Chi)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full text-xs"
                      onClick={() => handleDemoLogin("student3@tutorcentral.com")}
                      disabled={isLoading}
                    >
                      Demo Học Viên 3 (Lê Quốc Huy)
                    </Button>
                  </>
                )}
              </div>

              <div className="pt-4 border-t space-y-3 text-sm text-gray-600">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-medium text-blue-900 mb-1">ℹ️ Thông Tin Hệ Thống:</p>
                  <ul className="space-y-1 text-xs text-blue-800">
                    <li>✓ Admin: Quản lý toàn bộ hệ thống (có 2 tài khoản demo)</li>
                    <li>✓ Nhân viên: Quản lý sinh viên, lớp học, yêu cầu (có 2 tài khoản demo)</li>
                    <li>✓ Gia sư: Quản lý lớp học, lịch học, hóa đơn (có 1 tài khoản demo)</li>
                    <li>✓ Học viên: Tìm kiếm và đăng ký học (có 3 tài khoản demo)</li>
                    <li>✓ Phiên đăng nhập được lưu tự động</li>
                  </ul>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-gray-500">
          © 2026 Hệ Thống Quản Lý Gia Sư. Bảo mật được đảm bảo.
        </p>
      </div>
    </div>
  );
}
