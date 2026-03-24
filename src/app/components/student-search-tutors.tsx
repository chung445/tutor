import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Select } from "./ui/select";
import { Search, Star, MapPin, DollarSign, BookOpen, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Tutor {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  subjects: string[];
  location: string;
  price: number;
  bio: string;
}

const MOCK_TUTORS: Tutor[] = [
  {
    id: "t1",
    name: "Phạm Thị Hương",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 4.8,
    reviews: 45,
    subjects: ["Toán", "Lý", "Hóa"],
    location: "Quận 1, TPHCM",
    price: 150000,
    bio: "Thạc sĩ Toán, kinh nghiệm 8 năm dạy học"
  },
  {
    id: "t2",
    name: "Đỗ Minh Nhật",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 4.9,
    reviews: 62,
    subjects: ["Tiếng Anh", "IELTS", "TOEFL"],
    location: "Quận 3, TPHCM",
    price: 200000,
    bio: "Chứng chỉ IELTS 8.5, từng du học Anh"
  },
  {
    id: "t3",
    name: "Trần Văn Minh",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 4.7,
    reviews: 38,
    subjects: ["Văn", "Sử", "Địa"],
    location: "Quận 5, TPHCM",
    price: 120000,
    bio: "Giáo viên Trường THPT chuyên, dạy thêm 6 năm"
  }
];

export default function StudentSearchTutors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredTutors, setFilteredTutors] = useState(MOCK_TUTORS);

  const handleSearch = () => {
    const filtered = MOCK_TUTORS.filter(tutor => {
      const matchName = tutor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchSubject = !selectedSubject || tutor.subjects.includes(selectedSubject);
      return matchName && matchSubject;
    });
    setFilteredTutors(filtered);
  };

  const handleContact = (tutorName: string) => {
    toast.success(`Yêu cầu liên hệ ${tutorName} đã được gửi!`);
  };

  return (
    <div className="space-y-6">
      {/* Search Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Tìm kiếm gia sư</CardTitle>
          <CardDescription>Lọc gia sư theo công cụ dưới đây</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Tên gia sư</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Nhập tên gia sư..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleSearch} className="gap-2">
                  <Search className="w-4 h-4" />
                  Tìm
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Môn học</Label>
              <select
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả môn học</option>
                <option value="Toán">Toán</option>
                <option value="Tiếng Anh">Tiếng Anh</option>
                <option value="Văn">Văn</option>
                <option value="Lý">Lý</option>
                <option value="Hóa">Hóa</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Xếp hạng tối thiểu</Label>
              <select
                id="rating"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Tất cả</option>
                <option value="4">4+ sao</option>
                <option value="4.5">4.5+ sao</option>
                <option value="4.8">4.8+ sao</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tutors List */}
      <div className="space-y-4">
        {filteredTutors.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-gray-500">Không tìm thấy gia sư phù hợp</p>
            </CardContent>
          </Card>
        ) : (
          filteredTutors.map(tutor => (
            <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Avatar */}
                  <Avatar className="w-24 h-24 flex-shrink-0">
                    <AvatarImage src={tutor.avatar} />
                    <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{tutor.name}</h3>
                      <p className="text-sm text-gray-600">{tutor.bio}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map(subject => (
                        <Badge key={subject} variant="secondary">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {subject}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium">{tutor.rating}</span>
                        <span className="text-gray-600">({tutor.reviews} đánh giá)</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {tutor.location}
                      </div>
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <DollarSign className="w-4 h-4" />
                        {tutor.price.toLocaleString()}₫/buổi
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleContact(tutor.name)}
                    >
                      <MessageSquare className="w-4 h-4" />
                      Liên hệ
                    </Button>
                    <Button className="gap-2">
                      Xem chi tiết
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
