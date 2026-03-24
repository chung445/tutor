import { useState } from "react";
import { Tutor } from "../App";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { UserPlus, Star, MapPin, DollarSign, Mail, Phone, BookOpen, Search } from "lucide-react";
import { toast } from "sonner";

interface TutorManagementProps {
  tutors: Tutor[];
  setTutors: React.Dispatch<React.SetStateAction<Tutor[]>>;
}

const SUBJECTS = [
  "Toán",
  "Lý",
  "Hóa",
  "Sinh",
  "Tiếng Anh",
  "Tiếng Việt",
  "Văn",
  "Sử",
  "Địa",
  "Thể dục",
];

const AREAS = [
  "Cầu Giấy",
  "Đống Đa",
  "Hai Bà Trưng",
  "Ba Đình",
  "Hoàn Kiếm",
  "Long Biên",
  "Thanh Xuân",
  "Hoàng Mai",
  "Tây Hồ",
  "Bắc Từ Liêm",
];

export function TutorManagement({ tutors, setTutors }: TutorManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    subjects: [] as string[],
    area: "",
    hourlyRate: "",
    phone: "",
    email: "",
    experience: "",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: "4.5",
  });

  const filteredTutors = tutors.filter(tutor => {
    const matchSearch =
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchArea = areaFilter === "all" || tutor.area === areaFilter;
    return matchSearch && matchArea;
  });

  const handleOpenDialog = (tutor: Tutor | null = null) => {
    if (tutor) {
      setEditingTutor(tutor);
      setFormData({
        name: tutor.name,
        subjects: tutor.subjects,
        area: tutor.area,
        hourlyRate: tutor.hourlyRate.toString(),
        phone: tutor.phone,
        email: tutor.email,
        experience: tutor.experience.toString(),
        avatar: tutor.avatar,
        rating: tutor.rating.toString(),
      });
    } else {
      setEditingTutor(null);
      setFormData({
        name: "",
        subjects: [],
        area: "",
        hourlyRate: "",
        phone: "",
        email: "",
        experience: "",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: "4.5",
      });
    }
    setDialogOpen(true);
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleSubmit = () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Vui lòng nhập tên gia sư");
      return;
    }
    if (formData.subjects.length === 0) {
      toast.error("Vui lòng chọn ít nhất một môn học");
      return;
    }
    if (!formData.area) {
      toast.error("Vui lòng chọn khu vực");
      return;
    }
    if (!formData.hourlyRate || isNaN(parseInt(formData.hourlyRate))) {
      toast.error("Vui lòng nhập học phí hợp lệ");
      return;
    }
    if (!formData.phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }
    if (!formData.experience || isNaN(parseInt(formData.experience))) {
      toast.error("Vui lòng nhập kinh nghiệm hợp lệ");
      return;
    }

    if (editingTutor) {
      // Update existing tutor
      setTutors(prev =>
        prev.map(t =>
          t.id === editingTutor.id
            ? {
                ...t,
                name: formData.name,
                subjects: formData.subjects,
                area: formData.area,
                hourlyRate: parseInt(formData.hourlyRate),
                phone: formData.phone,
                email: formData.email,
                experience: parseInt(formData.experience),
                avatar: formData.avatar,
                rating: parseFloat(formData.rating),
              }
            : t
        )
      );
      toast.success("Cập nhật gia sư thành công");
    } else {
      // Add new tutor
      const newTutor: Tutor = {
        id: `t${tutors.length + 1}`,
        name: formData.name,
        subjects: formData.subjects,
        area: formData.area,
        hourlyRate: parseInt(formData.hourlyRate),
        phone: formData.phone,
        email: formData.email,
        experience: parseInt(formData.experience),
        avatar: formData.avatar,
        rating: parseFloat(formData.rating),
      };
      setTutors(prev => [...prev, newTutor]);
      toast.success("Thêm gia sư mới thành công");
    }

    setDialogOpen(false);
    setFormData({
      name: "",
      subjects: [],
      area: "",
      hourlyRate: "",
      phone: "",
      email: "",
      experience: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      rating: "4.5",
    });
  };

  const handleDelete = (tutorId: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa gia sư này?")) {
      setTutors(prev => prev.filter(t => t.id !== tutorId));
      toast.success("Xóa gia sư thành công");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Quản Lý Gia Sư</h2>
        <p className="text-muted-foreground">
          Quản lý danh sách gia sư, thêm mới, chỉnh sửa thông tin
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm theo tên hoặc môn học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
        <Select value={areaFilter} onValueChange={setAreaFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Chọn khu vực" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả khu vực</SelectItem>
            {AREAS.map(area => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <UserPlus className="w-4 h-4 mr-2" />
              Thêm Gia Sư
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTutor ? "Chỉnh Sửa Thông Tin Gia Sư" : "Thêm Gia Sư Mới"}
              </DialogTitle>
              <DialogDescription>
                {editingTutor
                  ? "Cập nhật thông tin chi tiết của gia sư"
                  : "Điền thông tin để thêm gia sư mới vào hệ thống"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên Gia Sư *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Nguyễn Văn An"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Số Điện Thoại *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, phone: e.target.value }))
                    }
                    placeholder="0912345678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="area">Khu Vực *</Label>
                  <Select
                    value={formData.area}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, area: value }))
                    }
                  >
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Chọn khu vực" />
                    </SelectTrigger>
                    <SelectContent>
                      {AREAS.map(area => (
                        <SelectItem key={area} value={area}>
                          {area}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hourlyRate">Học Phí/Giờ (VND) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        hourlyRate: e.target.value
                      }))
                    }
                    placeholder="150000"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Kinh Nghiệm (Năm) *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        experience: e.target.value
                      }))
                    }
                    placeholder="3"
                  />
                </div>
              </div>

              {/* Subjects */}
              <div>
                <Label>Môn Học *</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {SUBJECTS.map(subject => (
                    <Button
                      key={subject}
                      variant={
                        formData.subjects.includes(subject) ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleSubjectToggle(subject)}
                      className="justify-start"
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <Label htmlFor="rating">Đánh Giá (0-5) *</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, rating: e.target.value }))
                  }
                  placeholder="4.5"
                />
              </div>

              {/* Avatar URL */}
              <div>
                <Label htmlFor="avatar">Đường dẫn Ảnh đại diện</Label>
                <Input
                  id="avatar"
                  value={formData.avatar}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, avatar: e.target.value }))
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>
                {editingTutor ? "Cập Nhật" : "Thêm Gia Sư"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tutor List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh Sách Gia Sư</CardTitle>
          <CardDescription>
            Tổng cộng: {filteredTutors.length} gia sư
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gia Sư</TableHead>
                <TableHead>Môn Học</TableHead>
                <TableHead>Khu Vực</TableHead>
                <TableHead>Học Phí</TableHead>
                <TableHead>Kinh Nghiệm</TableHead>
                <TableHead>Đánh Giá</TableHead>
                <TableHead className="text-right">Chức Năng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTutors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Không tìm thấy gia sư nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredTutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={tutor.avatar} />
                          <AvatarFallback>
                            {tutor.name.split(" ").pop()?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{tutor.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {tutor.phone}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {tutor.subjects.map(subject => (
                          <Badge key={subject} variant="secondary">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {tutor.area}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        {tutor.hourlyRate.toLocaleString("vi-VN")} đ
                      </div>
                    </TableCell>
                    <TableCell>{tutor.experience} năm</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {tutor.rating.toFixed(1)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleOpenDialog(tutor)}
                        >
                          Sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(tutor.id)}
                        >
                          Xóa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
