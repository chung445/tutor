import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BookOpen, Clock, CheckCircle } from "lucide-react";

interface Class {
  id: string;
  name: string;
  subject: string;
  tutor: { name: string; avatar: string };
  schedule: string;
  status: string;
  startDate: string;
  studentCount: number;
  sessionsCompleted: number;
  totalSessions: number;
}

const MOCK_CLASSES: Class[] = [
  {
    id: "c1",
    name: "Toán 10 - Cơ bản",
    subject: "Toán",
    tutor: {
      name: "Phạm Thị Hương",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    schedule: "Thứ 2, 4, 6 - 17:00-18:30",
    status: "Đang học",
    startDate: "2025-01-01",
    studentCount: 5,
    sessionsCompleted: 8,
    totalSessions: 20
  },
  {
    id: "c2",
    name: "Tiếng Anh 11 - Nâng cao",
    subject: "Tiếng Anh",
    tutor: {
      name: "Đỗ Minh Nhật",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    schedule: "Thứ 3, 5 - 18:00-19:30",
    status: "Đang học",
    startDate: "2025-01-05",
    studentCount: 4,
    sessionsCompleted: 5,
    totalSessions: 16
  }
];

export default function StudentMyClasses() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Lớp đang học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{MOCK_CLASSES.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Buổi hoàn thành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_CLASSES.reduce((sum, c) => sum + c.sessionsCompleted, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Buổi học sắp tới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {MOCK_CLASSES.map(classItem => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{classItem.name}</h3>
                  <Badge className="mt-2" variant="outline">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {classItem.subject}
                  </Badge>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {classItem.status}
                </Badge>
              </div>

              {/* Tutor Info */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={classItem.tutor.avatar} />
                  <AvatarFallback>{classItem.tutor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-gray-900">{classItem.tutor.name}</p>
                  <p className="text-xs text-gray-600">Gia sư</p>
                </div>
              </div>

              {/* Class Info Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 text-xs">Lịch học</p>
                  <p className="font-medium text-gray-900">{classItem.schedule}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Bắt đầu</p>
                  <p className="font-medium text-gray-900">{classItem.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Số học viên</p>
                  <p className="font-medium text-gray-900">{classItem.studentCount} học viên</p>
                </div>
                <div>
                  <p className="text-gray-600 text-xs">Tiến độ</p>
                  <p className="font-medium text-gray-900">
                    {classItem.sessionsCompleted}/{classItem.totalSessions}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium">Tiến độ học tập</p>
                  <p className="text-gray-600">
                    {Math.round((classItem.sessionsCompleted / classItem.totalSessions) * 100)}%
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(classItem.sessionsCompleted / classItem.totalSessions) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Sessions */}
              <div>
                <p className="font-medium text-sm mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Buổi học gần đây
                </p>
                <div className="space-y-2">
                  {[
                    { session: 8, date: "2025-01-23", status: "Hoàn thành" },
                    { session: 7, date: "2025-01-21", status: "Hoàn thành" },
                    { session: 6, date: "2025-01-19", status: "Hoàn thành" }
                  ].map(s => (
                    <div key={s.session} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Buổi {s.session}</span>
                      <span className="text-gray-500">{s.date}</span>
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {s.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
