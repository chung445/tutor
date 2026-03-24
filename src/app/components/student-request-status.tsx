import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface RequestStatus {
  id: string;
  subject: string;
  level: string;
  budget: number;
  frequency: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  updatedAt: string;
}

const MOCK_REQUESTS: RequestStatus[] = [
  {
    id: "1",
    subject: "Toán",
    level: "THPT 10",
    budget: 150000,
    frequency: "2 buổi/tuần",
    status: "pending",
    createdAt: "2025-01-20",
    updatedAt: "2025-01-20"
  },
  {
    id: "2",
    subject: "Tiếng Anh",
    level: "THPT 11",
    budget: 200000,
    frequency: "2 buổi/tuần",
    status: "approved",
    createdAt: "2025-01-18",
    updatedAt: "2025-01-20"
  },
  {
    id: "3",
    subject: "Lý",
    level: "THPT 12",
    budget: 180000,
    frequency: "3 buổi/tuần",
    status: "rejected",
    createdAt: "2025-01-15",
    updatedAt: "2025-01-17"
  }
];

export default function StudentRequestStatus() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Chờ duyệt
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Đã duyệt
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Bị từ chối
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Chờ duyệt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {MOCK_REQUESTS.filter(r => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đã duyệt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {MOCK_REQUESTS.filter(r => r.status === "approved").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Bị từ chối
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {MOCK_REQUESTS.filter(r => r.status === "rejected").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách yêu cầu</CardTitle>
          <CardDescription>Xem trạng thái tất cả yêu cầu đăng ký của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {MOCK_REQUESTS.map(request => (
              <div
                key={request.id}
                className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-gray-900">
                        {request.subject} - {request.level}
                      </h4>
                      {getStatusBadge(request.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-500">Ngân sách</p>
                        <p className="font-medium text-gray-900">
                          {request.budget.toLocaleString()}₫/buổi
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tần suất</p>
                        <p className="font-medium text-gray-900">{request.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Ngày gửi</p>
                        <p className="font-medium text-gray-900">{request.createdAt}</p>
                      </div>
                    </div>
                  </div>

                  {request.status === "pending" && (
                    <div className="ml-4 text-right">
                      <p className="text-xs text-gray-500">Đang xử lý</p>
                      <p className="text-sm font-medium text-yellow-600">Chờ gia sư phản hồi</p>
                    </div>
                  )}

                  {request.status === "approved" && (
                    <div className="ml-4 text-right">
                      <p className="text-xs text-gray-500">Được chấp thuận</p>
                      <p className="text-sm font-medium text-green-600">Ngày {request.updatedAt}</p>
                    </div>
                  )}

                  {request.status === "rejected" && (
                    <div className="ml-4 text-right">
                      <p className="text-xs text-gray-500">Bị từ chối</p>
                      <p className="text-sm font-medium text-red-600">Ngày {request.updatedAt}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
