import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ReviewManagement from "../admin/ReviewManagement";
import { ReviewService } from "../../services/reviewService";
import { Review } from "../../types/index";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function MyReviews() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") return;

    if (user.role === "tutor") {
      setReviews(ReviewService.getReviewsByTutor(user.id));
      return;
    }

    if (user.role === "student") {
      setReviews(ReviewService.getReviewsByStudent(user.id));
      return;
    }
  }, [user]);

  if (!user) {
    return <div>Vui lòng đăng nhập để xem đánh giá.</div>;
  }

  if (user.role === "admin") {
    return <ReviewManagement />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Đánh giá của bạn</h1>
      {reviews.length === 0 ? (
        <Card>
          <CardContent>
            <p className="text-gray-500">Chưa có đánh giá nào.</p>
          </CardContent>
        </Card>
      ) : (
        reviews.map(review => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle>
                {user.role === "tutor" ? "Học sinh" : "Gia sư"}: {review.studentName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Đánh giá:</span>
                <Badge>{review.rating}/5</Badge>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-xs text-gray-500">Ngày: {new Date(review.createdAt).toLocaleString("vi-VN")}</p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
