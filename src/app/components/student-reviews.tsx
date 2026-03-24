import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: string;
  tutor: { name: string; avatar: string };
  subject: string;
  rating: number;
  comment: string;
  date: string;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: "1",
    tutor: {
      name: "Phạm Thị Hương",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    subject: "Toán 10",
    rating: 5,
    comment: "Cô rất tận tâm, dạy kỹ lưỡng và dễ hiểu. Tôi đã cải thiện rất nhiều qua 2 tháng học với cô.",
    date: "2025-01-10"
  }
];

const TUTORS_TO_REVIEW = [
  {
    id: "t1",
    name: "Phạm Thị Hương",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    subject: "Tiếng Anh 11"
  },
  {
    id: "t2",
    name: "Đỗ Minh Nhật",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    subject: "Lý 12"
  }
];

export default function StudentReviews() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = () => {
    if (!selectedTutor || !comment.trim()) {
      toast.error("Vui lòng chọn gia sư và nhập nhận xét");
      return;
    }
    toast.success("Cảm ơn bạn đã đánh giá gia sư!");
    setShowReviewForm(false);
    setSelectedTutor(null);
    setComment("");
    setRating(5);
  };

  const renderStars = (value: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            onClick={() => interactive && setRating(star)}
            className="transition-colors"
            disabled={!interactive}
          >
            <Star
              className={`w-5 h-5 ${
                star <= (hoverRating || (interactive ? rating : value))
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đã đánh giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{MOCK_REVIEWS.length}</div>
            <p className="text-xs text-gray-500 mt-1">Gia sư</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Còn chưa đánh giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{TUTORS_TO_REVIEW.length}</div>
            <p className="text-xs text-gray-500 mt-1">Gia sư</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Đánh giá trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">5.0</div>
            <p className="text-xs text-gray-500 mt-1">Trên 5 sao</p>
          </CardContent>
        </Card>
      </div>

      {/* Write Review Form */}
      {!showReviewForm ? (
        <Button
          onClick={() => setShowReviewForm(true)}
          className="w-full gap-2"
          size="lg"
        >
          <Send className="w-4 h-4" />
          Viết đánh giá mới
        </Button>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Viết đánh giá</CardTitle>
            <CardDescription>Chia sẻ trải nghiệm học tập của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tutor Selection */}
            <div className="space-y-3">
              <label className="font-medium text-sm">Chọn gia sư *</label>
              <div className="space-y-2">
                {TUTORS_TO_REVIEW.map(tutor => (
                  <button
                    key={tutor.id}
                    onClick={() => setSelectedTutor(tutor.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors text-left flex items-center gap-3 ${
                      selectedTutor === tutor.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{tutor.name}</p>
                      <p className="text-sm text-gray-600">{tutor.subject}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <label className="font-medium text-sm">Xếp hạng *</label>
              {renderStars(rating, true)}
            </div>

            {/* Comment */}
            <div className="space-y-3">
              <label htmlFor="comment" className="font-medium text-sm">Nhận xét *</label>
              <Textarea
                id="comment"
                placeholder="Chia sẻ trải nghiệm của bạn..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitReview}
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Gửi đánh giá
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  setSelectedTutor(null);
                  setComment("");
                  setRating(5);
                }}
              >
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Previous Reviews */}
      <div>
        <h3 className="text-lg font-bold mb-4">Đánh giá của bạn</h3>
        <div className="space-y-4">
          {MOCK_REVIEWS.map(review => (
            <Card key={review.id}>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={review.tutor.avatar} />
                      <AvatarFallback>{review.tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{review.tutor.name}</p>
                      <p className="text-sm text-gray-600">{review.subject}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{review.date}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="font-bold">{review.rating}.0</span>
                </div>

                <p className="text-gray-700">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
