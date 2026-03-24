import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";
import { Star, MessageSquare, ThumbsUp, Calendar } from "lucide-react";
import { ReviewService } from "../services/reviewService";
import { Review } from "../types/index";

interface ReviewsDisplayProps {
  tutorId: string;
  tutorName: string;
  showReviewForm?: boolean;
  onWriteReview?: () => void;
}

export default function ReviewsDisplay({
  tutorId,
  tutorName,
  showReviewForm = true,
  onWriteReview
}: ReviewsDisplayProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [tutorId]);

  const loadReviews = () => {
    setLoading(true);
    const tutorReviews = ReviewService.getReviewsByTutor(tutorId);
    const reviewStats = ReviewService.getTutorReviewStats(tutorId);

    setReviews(tutorReviews);
    setStats(reviewStats);
    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-16 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Đánh giá từ học sinh
              </CardTitle>
              <CardDescription>
                {stats.totalReviews} đánh giá • Trung bình {stats.averageRating} sao
              </CardDescription>
            </div>
            {showReviewForm && (
              <Button onClick={onWriteReview} className="bg-blue-600 hover:bg-blue-700">
                Viết đánh giá
              </Button>
            )}
          </div>
        </CardHeader>

        {stats.totalReviews > 0 && (
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Average Rating */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stats.averageRating}
                </div>
                {renderStars(Math.round(stats.averageRating), "md")}
                <p className="text-sm text-gray-600 mt-2">
                  Dựa trên {stats.totalReviews} đánh giá
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = stats.ratingDistribution[rating];
                  const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="text-sm w-8">{rating} sao</span>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar>
                    <AvatarImage src="" alt={review.studentName} />
                    <AvatarFallback>
                      {review.studentName.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-gray-900">
                          {review.studentName}
                        </h4>
                        {renderStars(review.rating)}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>

                    {review.updatedAt && review.updatedAt !== review.createdAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Đã chỉnh sửa vào {formatDate(review.updatedAt)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có đánh giá nào
            </h3>
            <p className="text-gray-600 mb-4">
              Hãy là người đầu tiên đánh giá gia sư {tutorName}!
            </p>
            {showReviewForm && (
              <Button onClick={onWriteReview} className="bg-blue-600 hover:bg-blue-700">
                Viết đánh giá đầu tiên
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}