import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Star, AlertCircle, CheckCircle } from "lucide-react";
import { ReviewService } from "../services/reviewService";
import { useAuth } from "../context/AuthContext";

interface ReviewFormProps {
  tutorId: string;
  tutorName: string;
  onReviewSubmitted?: () => void;
  onCancel?: () => void;
}

export default function ReviewForm({ tutorId, tutorName, onReviewSubmitted, onCancel }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  // Check if user has already reviewed this tutor
  const hasReviewed = user ? ReviewService.hasStudentReviewedTutor(user.id, tutorId) : false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setErrors(["Bạn cần đăng nhập để đánh giá gia sư"]);
      return;
    }

    if (hasReviewed) {
      setErrors(["Bạn đã đánh giá gia sư này rồi"]);
      return;
    }

    const reviewData = {
      tutorId,
      studentId: user.id,
      studentName: user.name,
      rating,
      comment: comment.trim(),
    };

    const validation = ReviewService.validateReview(reviewData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      await ReviewService.addReview(reviewData);
      setSuccess(true);
      setRating(0);
      setComment("");

      // Call callback after a short delay to show success message
      setTimeout(() => {
        onReviewSubmitted?.();
      }, 1500);
    } catch (error) {
      setErrors(["Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại."]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Bạn cần đăng nhập để đánh giá gia sư.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (hasReviewed) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Bạn đã đánh giá gia sư {tutorName} rồi.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Cảm ơn bạn đã đánh giá! Đánh giá của bạn đã được gửi thành công.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Đánh giá gia sư {tutorName}</CardTitle>
        <CardDescription>
          Chia sẻ trải nghiệm của bạn để giúp các học sinh khác
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Stars */}
          <div>
            <Label className="text-base font-medium">Đánh giá sao</Label>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 hover:scale-110 transition-transform"
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleRatingHover(star)}
                  onMouseLeave={handleRatingLeave}
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                {rating > 0 && `${rating} sao`}
              </span>
            </div>
            {rating === 0 && (
              <p className="text-sm text-gray-500 mt-1">Chọn số sao để đánh giá</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="text-base font-medium">
              Nhận xét của bạn
            </Label>
            <Textarea
              id="comment"
              placeholder="Hãy chia sẻ trải nghiệm học tập với gia sư này..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-2 min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Tối thiểu 10 ký tự, tối đa 500 ký tự
              </p>
              <span className="text-xs text-gray-500">
                {comment.length}/500
              </span>
            </div>
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
              className="flex-1"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}