/**
 * Booking Confirmation Component
 * Shows summary and allows user to confirm the booking
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { AlertCircle, User, Calendar, Clock, DollarSign } from "lucide-react";
import { Tutor, TimeSlot } from "../types/index";
import { BookingService } from "../services/bookingService";

interface BookingConfirmationProps {
  tutor: Tutor;
  date: string;
  timeSlot: TimeSlot;
  onConfirm: () => void;
  onBack: () => void;
  loading?: boolean;
}

/**
 * Main confirmation component
 */
export function BookingConfirmation({
  tutor,
  date,
  timeSlot,
  onConfirm,
  onBack,
  loading = false,
}: BookingConfirmationProps) {
  const getDayName = (dateString: string): string => {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getFormattedDate = (dateString: string): string => {
    const d = new Date(dateString);
    return d.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalPrice = BookingService.calculateBookingPrice(tutor, 1);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Bước 3: Xác nhận đặt lịch
        </h3>
        <p className="text-gray-600">
          Vui lòng kiểm tra thông tin trước khi xác nhận.
        </p>
      </div>

      {/* Booking Summary */}
      <Card>
        <CardHeader className="bg-blue-50 border-b">
          <CardTitle className="text-base">Tóm tắt đặt lịch</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Tutor Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Thông tin gia sư</h4>

            <div className="flex items-start gap-4">
              <img
                src={tutor.avatar}
                alt={tutor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900">{tutor.name}</h5>

                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span>
                      Đánh giá: <strong>{tutor.rating.toFixed(1)} ⭐</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>
                      Kinh nghiệm: <strong>{tutor.experience} năm</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {tutor.subjects.map(subject => (
                    <Badge key={subject} variant="secondary" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Session Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Chi tiết buổi học</h4>

            <div className="space-y-3">
              {/* Date */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Ngày học</p>
                  <p className="font-semibold text-gray-900">
                    {getDayName(date)}, {getFormattedDate(date)}
                  </p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-600">Thời gian</p>
                  <p className="font-semibold text-gray-900">
                    {timeSlot.startTime} - {timeSlot.endTime}
                    <span className="text-sm text-gray-600 ml-2">(60 phút)</span>
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-600">Giá học</p>
                  <p className="font-semibold text-blue-900">
                    {totalPrice.toLocaleString()}đ
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">Khu vực</p>
            <p className="text-sm text-gray-600">{tutor.area}</p>
          </div>

          {/* Terms */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
              <ul className="space-y-1 text-xs">
                <li>• Vui lòng đến đúng giờ</li>
                <li>• Nếu cần hủy, vui lòng thông báo trước 24 giờ</li>
                <li>• Liên hệ gia sư qua {tutor.phone} nếu có thay đổi</li>
              </ul>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={onBack}
              variant="outline"
              disabled={loading}
              className="flex-1"
            >
              ← Quay lại
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Đang xử lý..." : "✓ Xác nhận đặt lịch"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BookingConfirmation;
