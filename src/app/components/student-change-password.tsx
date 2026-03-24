import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function StudentChangePassword() {
  const { user } = useAuth();
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "newPassword") {
      calculatePasswordStrength(value);
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu phải chứa ít nhất 8 ký tự";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu";
    }

    if (formData.newPassword && formData.confirmPassword && 
        formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được giống mật khẩu hiện tại";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Here you would typically make an API call to change the password
    toast.success("Mật khẩu đã được thay đổi thành công!");
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setPasswordStrength(0);
  };

  const getPasswordStrengthLabel = () => {
    switch (passwordStrength) {
      case 0:
        return "Nhập mật khẩu";
      case 1:
        return "Yếu";
      case 2:
        return "Trung bình";
      case 3:
        return "Tốt";
      case 4:
        return "Rất tốt";
      default:
        return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Security Alert */}
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Hãy sử dụng mật khẩu mạnh để bảo vệ tài khoản của bạn. Mật khẩu của bạn được mã hóa và không lưu trữ dưới dạng văn bản thường.
        </AlertDescription>
      </Alert>

      {/* Change Password Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Thay đổi mật khẩu
          </CardTitle>
          <CardDescription>Cập nhật mật khẩu của tài khoản {user?.email}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại *</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu hiện tại"
                  className={errors.currentPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords(prev => ({ ...prev, current: !prev.current }))
                  }
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  name="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu mới"
                  className={errors.newPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords(prev => ({ ...prev, new: !prev.new }))
                  }
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getPasswordStrengthColor()} transition-all`}
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 min-w-24">
                      {getPasswordStrengthLabel()}
                    </span>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className={formData.newPassword.length >= 8 ? "text-green-600" : ""}>
                        ✓
                      </span>
                      Tối thiểu 8 ký tự
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={/[a-z]/.test(formData.newPassword) && /[A-Z]/.test(formData.newPassword) ? "text-green-600" : ""}>
                        ✓
                      </span>
                      Chữ hoa và chữ thường
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={/[0-9]/.test(formData.newPassword) ? "text-green-600" : ""}>
                        ✓
                      </span>
                      Ít nhất một số
                    </li>
                    <li className="flex items-center gap-2">
                      <span className={/[^a-zA-Z0-9]/.test(formData.newPassword) ? "text-green-600" : ""}>
                        ✓
                      </span>
                      Ký tự đặc biệt (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}

              {errors.newPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Xác nhận mật khẩu mới"
                  className={errors.confirmPassword ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))
                  }
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                <p className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Mật khẩu khớp
                </p>
              )}

              {errors.confirmPassword && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full">
              <Lock className="w-4 h-4 mr-2" />
              Cập nhật mật khẩu
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Recovery */}
      <Card>
        <CardHeader>
          <CardTitle>Quên mật khẩu?</CardTitle>
          <CardDescription>
            Nếu bạn quên mật khẩu, hãy đặt lại mật khẩu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Chúng tôi sẽ gửi một liên kết xác nhận đến email {user?.email} của bạn.
          </p>
          <Button variant="outline" className="w-full">
            Gửi liên kết đặt lại mật khẩu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
