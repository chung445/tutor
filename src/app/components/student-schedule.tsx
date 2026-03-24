import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";

interface Session {
  id: string;
  subject: string;
  tutor: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: "upcoming" | "completed" | "cancelled";
}

const MOCK_SCHEDULE: Session[] = [
  {
    id: "1",
    subject: "Toán 10",
    tutor: "Phạm Thị Hương",
    date: "2025-01-23",
    time: "17:00",
    duration: "90 phút",
    location: "Tầng 3, 123 Đường Nguyễn Hữu Cảnh",
    status: "upcoming"
  },
  {
    id: "2",
    subject: "Tiếng Anh 11",
    tutor: "Đỗ Minh Nhật",
    date: "2025-01-24",
    time: "18:00",
    duration: "90 phút",
    location: "Online - Zoom",
    status: "upcoming"
  },
  {
    id: "3",
    subject: "Toán 10",
    tutor: "Phạm Thị Hương",
    date: "2025-01-25",
    time: "17:00",
    duration: "90 phút",
    location: "Tầng 3, 123 Đường Nguyễn Hữu Cảnh",
    status: "upcoming"
  },
  {
    id: "4",
    subject: "Toán 10",
    tutor: "Phạm Thị Hương",
    date: "2025-01-21",
    time: "17:00",
    duration: "90 phút",
    location: "Tầng 3, 123 Đường Nguyễn Hữu Cảnh",
    status: "completed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "upcoming":
      return "Sắp tới";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Hủy";
    default:
      return status;
  }
};

export default function StudentSchedule() {
  const upcomingSessions = MOCK_SCHEDULE.filter(s => s.status === "upcoming");
  const completedSessions = MOCK_SCHEDULE.filter(s => s.status === "completed");

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Buổi sắp tới
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{upcomingSessions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Buổi đã học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedSessions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Giờ học tổng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">18 giờ</div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Lịch học cá nhân
          </CardTitle>
          <CardDescription>Xem các buổi học của bạn theo lịch</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Month Calendar */}
          <div className="mb-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-bold">Tháng 1 / 2025</h3>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center mb-4">
              {["Cn", "T2", "T3", "T4", "T5", "T6", "T7"].map(day => (
                <div key={day} className="font-bold text-gray-600">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 31 }).map((_, i) => {
                const date = i + 1;
                const hasSession = MOCK_SCHEDULE.some(s => 
                  new Date(s.date).getDate() === date
                );
                return (
                  <div
                    key={i}
                    className={`p-2 text-center rounded-lg ${
                      hasSession
                        ? "bg-blue-100 text-blue-800 font-bold cursor-pointer hover:bg-blue-200"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    {date}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <div>
        <h3 className="text-lg font-bold mb-4">Buổi học sắp tới</h3>
        <div className="space-y-3">
          {upcomingSessions.map(session => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-gray-900">{session.subject}</h4>
                      <Badge className={getStatusColor(session.status)}>
                        {getStatusLabel(session.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Gia sư: {session.tutor}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{session.time} - {session.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">Buổi học đã hoàn thành</h3>
          <div className="space-y-3">
            {completedSessions.map(session => (
              <Card key={session.id} className="opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-bold text-gray-900">{session.subject}</h4>
                        <Badge className={getStatusColor(session.status)}>
                          {getStatusLabel(session.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Gia sư: {session.tutor}</p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
