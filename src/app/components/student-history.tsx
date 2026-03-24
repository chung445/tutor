import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, CheckCircle, TrendingUp } from "lucide-react";

interface HistoryItem {
  id: string;
  subject: string;
  tutor: string;
  completedSessions: number;
  totalSessions: number;
  startDate: string;
  endDate: string;
  status: "completed" | "ongoing";
  topics: string[];
  score?: number;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: "1",
    subject: "Toán 10",
    tutor: "Phạm Thị Hương",
    completedSessions: 12,
    totalSessions: 12,
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    status: "completed",
    topics: ["Hàm số bậc 1", "Hàm số bậc 2", "Phương trình", "Bất phương trình"],
    score: 8.5
  },
  {
    id: "2",
    subject: "Tiếng Anh 10",
    tutor: "Đỗ Minh Nhật",
    completedSessions: 10,
    totalSessions: 12,
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    status: "ongoing",
    topics: ["Vocabulary", "Grammar", "Speaking", "Listening", "Writing"]
  },
  {
    id: "3",
    subject: "Lý 9",
    tutor: "Trần Văn Minh",
    completedSessions: 8,
    totalSessions: 8,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "completed",
    topics: ["Cơ học", "Điện học", "Quang học"],
    score: 7.8
  }
];

export default function StudentHistory() {
  const completedCourses = MOCK_HISTORY.filter(h => h.status === "completed");
  const ongoingCourses = MOCK_HISTORY.filter(h => h.status === "ongoing");

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Khóa học hoàn thành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedCourses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Khóa học đang học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{ongoingCourses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng buổi học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {MOCK_HISTORY.reduce((sum, h) => sum + h.completedSessions, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Điểm trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">8.2</div>
            <p className="text-xs text-gray-500 mt-1">Trên 10</p>
          </CardContent>
        </Card>
      </div>

      {/* Ongoing Courses */}
      {ongoingCourses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Khóa học đang học
          </h3>
          <div className="space-y-3">
            {ongoingCourses.map(course => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {course.subject}
                      </h4>
                      <p className="text-sm text-gray-600">Gia sư: {course.tutor}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Đang học
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Khoá thời gian</p>
                      <p className="font-medium">{course.startDate} → {course.endDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Tiến độ</p>
                      <p className="font-medium">
                        {course.completedSessions}/{course.totalSessions} buổi
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Hoàn thành</p>
                      <p className="font-medium">
                        {Math.round((course.completedSessions / course.totalSessions) * 100)}%
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(course.completedSessions / course.totalSessions) * 100}%`
                        }}
                      />
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Các chủ đề
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Completed Courses */}
      {completedCourses.length > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Khóa học hoàn thành
          </h3>
          <div className="space-y-3">
            {completedCourses.map(course => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">
                        {course.subject}
                      </h4>
                      <p className="text-sm text-gray-600">Gia sư: {course.tutor}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Hoàn thành
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Khoá thời gian</p>
                      <p className="font-medium text-xs">{course.startDate}</p>
                      <p className="font-medium text-xs">→ {course.endDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Buổi học</p>
                      <p className="font-medium">
                        {course.completedSessions}/{course.totalSessions}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Điểm</p>
                      <p className="font-medium text-lg text-yellow-600">
                        {course.score}/10
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Xếp hạng</p>
                      <p className="font-medium">
                        {course.score! >= 9 && "Xuất sắc"}
                        {course.score! >= 8 && course.score! < 9 && "Tốt"}
                        {course.score! >= 7 && course.score! < 8 && "Khá"}
                        {course.score! < 7 && "Trung bình"}
                      </p>
                    </div>
                  </div>

                  {/* Topics */}
                  <div>
                    <p className="text-sm font-medium mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Các chủ đề đã học
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map(topic => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
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
