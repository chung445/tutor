/**
 * Booking Success Component
 * Displays success message after booking is confirmed
 */

import React, { useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CheckCircle2, Calendar, Clock, MapPin, Mail, Phone } from "lucide-react";
import { Booking, Tutor } from "../types/index";
import { BookingService } from "../services/bookingService";

interface BookingSuccessProps {
  booking: Booking;
  tutor: Tutor;
  onClose: () => void;
  onViewBookings?: () => void;
}

/**
 * Main success component
 */
export function BookingSuccess({
  booking,
  tutor,
  onClose,
  onViewBookings,
}: BookingSuccessProps) {
  // Auto-scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

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
    <div className="space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Đặt lịch thành công!
        </h3>
        <p className="text-gray-600">
          Buổi học của bạn đã được xác nhận. Mã đặt lịch của bạn là:{" "}
          <strong>{booking.id}</strong>
        </p>
      </div>

      {/* Booking Details */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6 space-y-6">
          {/* Session Summary */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Chi tiết buổi học</h4>

            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Ngày học</p>
                  <p className="font-semibold text-gray-900">
                    {getFormattedDate(booking.date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Thời gian</p>
                  <p className="font-semibold text-gray-900">
                    {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Khu vực</p>
                  <p className="font-semibold text-gray-900">{tutor.area}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tutor Contact */}
          <div className="pt-4 border-t border-green-200 space-y-4">
            <h4 className="font-semibold text-gray-900">Thông tin liên hệ gia sư</h4>

            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{tutor.email}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Điện thoại</p>
                  <p className="font-medium text-gray-900">{tutor.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="pt-4 border-t border-green-200 space-y-3">
            <h4 className="font-semibold text-gray-900">Bước tiếp theo</h4>

            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="font-semibold text-green-600">1.</span>
                <span>Gia sư sẽ liên hệ bạn qua điện thoại hoặc email</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-green-600">2.</span>
                <span>Điều chỉnh lịch học (nếu cần thiết)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-green-600">3.</span>
                <span>Chuẩn bị cho buổi học đầu tiên</span>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Pre-booking Notes */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6 space-y-3">
          <h4 className="font-semibold text-blue-900">Lưu ý trước buổi học</h4>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Chuẩn bị tài liệu học tập của bạn</li>
            <li>• Đảm bảo môi trường học tập yên tĩnh</li>
            <li>• Có kết nối internet ổn định (nếu học trực tuyến)</li>
            <li>• Liên hệ gia sư nếu có bất kỳ thay đổi nào</li>
          </ul>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1"
        >
          Tiếp tục mua khóa học
        </Button>
        {onViewBookings && (
          <Button
            onClick={onViewBookings}
            className="flex-1"
          >
            Xem lịch học của tôi
          </Button>
        )}
      </div>

      {/* Download/Save Confirmation */}
      <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
        <p>
          Email xác nhận đã được gửi tới {booking.studentName || "email của bạn"}. Vui lòng kiểm tra
          hộp thư của bạn.
        </p>
      </div>
    </div>
  );
}

export default BookingSuccess;
