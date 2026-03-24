import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  Phone,
  Mail,
  ArrowLeft,
  Calendar,
  MessageSquare
} from "lucide-react";
import { TutorService } from "../services/tutorService";
import { ReviewService } from "../services/reviewService";
import ReviewsDisplay from "./reviews-display";
import ReviewForm from "./review-form";
import { Tutor, TutorWithReviews } from "../types/index";

interface TutorDetailProps {
  tutorId: string;
  onBack?: () => void;
}

export default function TutorDetail({ tutorId, onBack }: TutorDetailProps) {
  const [tutor, setTutor] = useState<TutorWithReviews | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (tutorId) {
      loadTutorData();
    }
  }, [tutorId]);

  const loadTutorData = async () => {
    try {
      setLoading(true);

      // Get tutor basic info
      const tutorData = await TutorService.getTutorById(tutorId!);

      if (!tutorData) {
        setTutor(null);
        return;
      }

      // Get reviews and stats
      const reviews = ReviewService.getReviewsByTutor(tutorId!);
      const stats = ReviewService.getTutorReviewStats(tutorId!);

      // Combine tutor data with reviews
      const tutorWithReviews: TutorWithReviews = {
        ...tutorData,
        reviews,
        reviewCount: stats.totalReviews,
        averageRating: stats.averageRating,
      };

      setTutor(tutorWithReviews);
    } catch (error) {
      console.error("Error loading tutor details:", error);
      setTutor(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    setShowReviewForm(false);
    loadTutorData(); // Reload to get updated ratings
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Không tìm thấy gia sư
            </h1>
            <Button onClick={() => navigate("/tutors")}>
              Quay lại danh sách gia sư
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại danh sách gia sư
        </Button>

        {/* Tutor Header Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                  <AvatarFallback className="text-2xl">
                    {tutor.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center md:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {tutor.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">
                        {tutor.averageRating || tutor.rating}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      ({tutor.reviewCount} đánh giá)
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Subjects */}
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">MÔN HỌC</p>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">KHU VỰC</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{tutor.area}</span>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">KINH NGHIỆM</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{tutor.experience} năm</span>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">GIÁ THỜI GIAN</p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-semibold">
                      {tutor.hourlyRate.toLocaleString()}₫/giờ
                    </span>
                  </div>
                </div>

                {/* Availability */}
                {tutor.availability && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-2">TÍNH SẴN SÀNG</p>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${tutor.availability}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-700">{tutor.availability}%</span>
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">THÔNG TIN LIÊN HỆ</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-sm">{tutor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 text-sm">{tutor.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Reviews and Booking */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Đánh giá ({tutor.reviewCount})
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Đặt lịch học
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            {showReviewForm ? (
              <ReviewForm
                tutorId={tutor.id}
                tutorName={tutor.name}
                onReviewSubmitted={handleReviewSubmitted}
                onCancel={() => setShowReviewForm(false)}
              />
            ) : (
              <ReviewsDisplay
                tutorId={tutor.id}
                tutorName={tutor.name}
                onWriteReview={() => setShowReviewForm(true)}
              />
            )}
          </TabsContent>

          <TabsContent value="booking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Đặt lịch học với {tutor.name}</CardTitle>
                <CardDescription>
                  Chọn thời gian và ngày học phù hợp với bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tính năng đặt lịch đang được phát triển
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Bạn có thể liên hệ trực tiếp với gia sư để sắp xếp lịch học.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => window.location.href = `tel:${tutor.phone}`}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi {tutor.phone}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.location.href = `mailto:${tutor.email}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email {tutor.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}