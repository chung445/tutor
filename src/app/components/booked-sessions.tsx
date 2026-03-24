/**
 * Booked Sessions Page
 * Displays user's booked sessions and allows management
 */

import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useBooking } from "../context/BookingContext";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar, Clock, User, MapPin, Trash2, List } from "lucide-react";
import { TutorService } from "../services/tutorService";
import { BookingService } from "../services/bookingService";

/**
 * Status badge component
 */
function StatusBadge({ status }: { status: string }) {
  const statusMap: Record<string, { color: string; label: string }> = {
    confirmed: { color: "bg-green-100 text-green-800", label: "Xác nhận" },
    pending: { color: "bg-yellow-100 text-yellow-800", label: "Đang chờ" },
    completed: { color: "bg-blue-100 text-blue-800", label: "Hoàn thành" },
    cancelled: { color: "bg-gray-100 text-gray-800", label: "Hủy bỏ" },
  };

  const config = statusMap[status] || { color: "bg-gray-100 text-gray-800", label: status };

  return <Badge className={config.color}>{config.label}</Badge>;
}

/**
 * Individual booking card
 */
function BookingCard({
  booking,
  tutor,
  onCancel,
}: {
  booking: any;
  tutor: any;
  onCancel: (bookingId: string) => void;
}) {
  if (!tutor) return null;

  const isUpcoming = new Date(booking.date) > new Date();
  const canCancel = booking.status === "confirmed" && isUpcoming;

  const getFormattedDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className={isUpcoming ? "" : "opacity-75"}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          {/* Tutor Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{tutor.name}</h4>
                <p className="text-sm text-gray-600">{booking.subject || "Chưa có môn học"}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
              {/* Date */}
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Ngày</p>
                  <p className="font-medium text-gray-900">
                    {getFormattedDate(booking.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Thời gian</p>
                  <p className="font-medium text-gray-900">
                    {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-600">Khu vực</p>
                  <p className="font-medium text-gray-900">{tutor.area}</p>
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-gray-600 text-sm">Giá</p>
                <p className="font-medium text-gray-900">
                  {booking.rate?.toLocaleString() || tutor.hourlyRate.toLocaleString()}đ
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-3 border-t border-gray-200 space-y-1 text-xs text-gray-600">
              <p>
                <strong>Email:</strong> {tutor.email}
              </p>
              <p>
                <strong>SĐT:</strong> {tutor.phone}
              </p>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex flex-col items-end gap-3">
            <StatusBadge status={booking.status} />

            {canCancel && (
              <Button
                onClick={() => onCancel(booking.id)}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Hủy bỏ
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Empty state component
 */
function EmptyState() {
  return (
    <div className="py-12 text-center">
      <List className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Chưa có buổi học nào
      </h3>
      <p className="text-gray-600 mb-6">
        Bạn chưa đặt lịch học nào. Hãy đặt lịch với gia sư ngay!
      </p>
    </div>
  );
}

/**
 * Main booked sessions page
 */
export function BookedSessions() {
  const { user } = useAuth();
  const { getBookingsByUser, cancelBooking } = useBooking();
  const [isCanceling, setIsCanceling] = useState<string | null>(null);
  const [tutorList, setTutorList] = useState<any[]>([]);
  const [loadingTutors, setLoadingTutors] = useState(true);
  const [tutorError, setTutorError] = useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const loadTutors = async () => {
      setLoadingTutors(true);
      setTutorError(null);

      try {
        const tutors = await TutorService.getTutors();
        if (mounted) setTutorList(tutors);
      } catch (err) {
        console.error("Error loading tutors:", err);
        if (mounted) setTutorError("Không thể tải dữ liệu gia sư.");
      } finally {
        if (mounted) setLoadingTutors(false);
      }
    };

    loadTutors();
    return () => {
      mounted = false;
    };
  }, []);

  if (loadingTutors) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <p>Đang tải danh sách gia sư...</p>
      </div>
    );
  }

  if (tutorError) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-8 text-red-600">
        {tutorError}
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-600">Vui lòng đăng nhập để xem lịch học của bạn.</p>
      </div>
    );
  }

  const userBookings = getBookingsByUser(user.id);

  // Separate upcoming and past bookings
  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const upcomingList = userBookings.filter(b => new Date(b.date) > now);
    const pastList = userBookings.filter(b => new Date(b.date) <= now);

    // Sort by date
    upcomingList.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    pastList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcoming: upcomingList, past: pastList };
  }, [userBookings]);

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Bạn có chắc muốn hủy buổi học này?")) return;

    setIsCanceling(bookingId);
    try {
      await cancelBooking(bookingId);
      setIsCanceling(null);
    } catch (error) {
      console.error("Error canceling booking:", error);
      setIsCanceling(null);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch học của tôi</h1>
      <p className="text-gray-600 mb-8">
        Quản lý và xem chi tiết các buổi học của bạn
      </p>

      {userBookings.length === 0 ? (
        <Card>
          <CardContent className="pt-8">
            <EmptyState />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {/* Upcoming Bookings */}
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Buổi học sắp tới ({upcoming.length})
              </h2>
              <div className="space-y-4">
                {upcoming.map(booking => {
                  const tutor = tutorList.find(t => t.id === booking.tutorId);
                  return (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      tutor={tutor}
                      onCancel={handleCancel}
                    />
                  );
                })}
              </div>
            </section>
          )}

          {/* Past Bookings */}
          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Buổi học đã qua ({past.length})
              </h2>
              <div className="space-y-4">
                {past.map(booking => {
                  const tutor = tutorList.find(t => t.id === booking.tutorId);
                  return (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      tutor={tutor}
                      onCancel={() => {}} // Can't cancel past bookings
                    />
                  );
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export default BookedSessions;
