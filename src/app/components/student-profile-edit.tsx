import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { Camera, Mail, Phone, MapPin, Save } from "lucide-react";
import { toast } from "sonner";

export default function StudentProfileEdit() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "Quận 1, TPHCM",
    bio: "Sinh viên yêu thích toán học",
    avatar: user?.avatar || ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    toast.success("Cập nhật hồ sơ thành công!");
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
        toast.success("Ảnh đã được cập nhật");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Avatar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Ảnh đại diện</CardTitle>
          <CardDescription>Cập nhật ảnh đại diện của bạn</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              <Button className="gap-2" asChild>
                <span>
                  <Camera className="w-4 h-4" />
                  Thay đổi ảnh
                </span>
              </Button>
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500">JPG, PNG hoặc GIF (max 5MB)</p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Quản lý thông tin hồ sơ của bạn</CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Số điện thoại
              </Label>
              <Input
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Địa chỉ
              </Label>
              <Input
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Giới thiệu ngắn</Label>
            <Textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              disabled={!isEditing}
              rows={4}
            />
          </div>

          {isEditing && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Lưu thay đổi
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin tài khoản</CardTitle>
          <CardDescription>Chi tiết về tài khoản của bạn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">ID học viên</p>
              <p className="font-medium">{user?.id}</p>
            </div>
            <div>
              <p className="text-gray-600">Loại tài khoản</p>
              <p className="font-medium">Học viên</p>
            </div>
            <div>
              <p className="text-gray-600">Ngày tham gia</p>
              <p className="font-medium">20/01/2025</p>
            </div>
            <div>
              <p className="text-gray-600">Trạng thái</p>
              <p className="font-medium text-green-600">Hoạt động</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
