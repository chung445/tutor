import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { Plus, Send } from "lucide-react";
import { toast } from "sonner";

export default function StudentRequestClass() {
  const [formData, setFormData] = useState({
    subject: "",
    level: "",
    budget: "",
    frequency: "",
    schedule: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.level || !formData.budget) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    toast.success("Yêu cầu đăng ký lớp của bạn đã được gửi!");
    setFormData({
      subject: "",
      level: "",
      budget: "",
      frequency: "",
      schedule: "",
      description: ""
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Gửi yêu cầu đăng ký lớp
          </CardTitle>
          <CardDescription>
            Điền thông tin chi tiết về lớp học bạn muốn tìm
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Môn học *</Label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn môn học</option>
                  <option value="Toán">Toán</option>
                  <option value="Tiếng Anh">Tiếng Anh</option>
                  <option value="Văn">Văn</option>
                  <option value="Lý">Lý</option>
                  <option value="Hóa">Hóa</option>
                  <option value="Sinh">Sinh</option>
                  <option value="Sử">Sử</option>
                </select>
              </div>

              {/* Grade Level */}
              <div className="space-y-2">
                <Label htmlFor="level">Cấp độ *</Label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn cấp độ</option>
                  <option value="Tiểu học">Tiểu học</option>
                  <option value="THCS">THCS</option>
                  <option value="THPT">THPT</option>
                  <option value="Đại học">Đại học</option>
                </select>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label htmlFor="budget">Ngân sách (₫/buổi) *</Label>
                <Input
                  id="budget"
                  name="budget"
                  type="number"
                  placeholder="Ví dụ: 150000"
                  value={formData.budget}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              {/* Frequency */}
              <div className="space-y-2">
                <Label htmlFor="frequency">Tần suất học</Label>
                <select
                  id="frequency"
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Chọn tần suất</option>
                  <option value="1">1 buổi/tuần</option>
                  <option value="2">2 buổi/tuần</option>
                  <option value="3">3 buổi/tuần</option>
                  <option value="4">4 buổi/tuần</option>
                  <option value="5+">5+ buổi/tuần</option>
                </select>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-2">
              <Label htmlFor="schedule">Lịch học ưa thích</Label>
              <Input
                id="schedule"
                name="schedule"
                placeholder="Ví dụ: Thứ 2, 3, 5 từ 17h-18h30"
                value={formData.schedule}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Mô tả chi tiết</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Mô tả về nhu cầu học tập của bạn, mục tiêu, trình độ hiện tại..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full gap-2">
              <Send className="w-4 h-4" />
              Gửi yêu cầu
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Requests */}
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Yêu cầu gần đây của bạn</h3>
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Toán - THPT</p>
                  <p className="text-sm text-gray-600">150,000₫/buổi • 2 buổi/tuần</p>
                  <p className="text-xs text-gray-500 mt-2">Gửi 2 ngày trước</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Đã duyệt
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
