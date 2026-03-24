/**
 * Date and Time Selector Component
 * Allows user to select a date and time slot for booking
 */

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { TimeSlot, Tutor } from "../types/index";
import { BookingService } from "../services/bookingService";

interface DateTimeSelectorProps {
  tutor: Tutor;
  onSelect: (date: string, timeSlot: TimeSlot) => void;
  onBack: () => void;
}

/**
 * Date selector component
 */
function DateSelector({
  selectedDate,
  onDateChange,
}: {
  selectedDate: string | null;
  onDateChange: (date: string) => void;
}) {
  const availableDates = BookingService.getNextAvailableDates(30);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Chọn ngày học</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
        {availableDates.map(({ dateString, displayDate, day }) => (
          <button
            key={dateString}
            onClick={() => onDateChange(dateString)}
            className={`p-3 text-left border rounded-lg transition-all ${
              selectedDate === dateString
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <div>
                <div className="text-sm font-medium text-gray-900">{day}</div>
                <div className="text-xs text-gray-600">{displayDate}</div>
              </div>
              {selectedDate === dateString && (
                <Badge variant="default" className="ml-auto">
                  ✓
                </Badge>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Time slot selector component
 */
function TimeSlotSelector({
  day,
  tutorId,
  selectedSlot,
  onSlotSelect,
}: {
  day: string;
  tutorId: string;
  selectedSlot: TimeSlot | null;
  onSlotSelect: (slot: TimeSlot) => void;
}) {
  const slots = BookingService.getTimeSlotsByDay(day, tutorId);

  if (slots.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Hiện chưa có thời gian rảnh vào {day}. Vui lòng chọn ngày khác.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900">Chọn thời gian</h4>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {slots.map(slot => (
          <button
            key={slot.id}
            onClick={() => onSlotSelect(slot)}
            disabled={!slot.available}
            className={`p-3 border rounded-lg transition-all ${
              selectedSlot?.id === slot.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            } ${!slot.available ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <div className="text-sm font-medium">
                {slot.startTime} - {slot.endTime}
              </div>
            </div>
            {selectedSlot?.id === slot.id && (
              <Badge variant="default" className="mt-1">
                ✓
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Main date/time selector component
 */
export function DateTimeSelector({
  tutor,
  onSelect,
  onBack,
}: DateTimeSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const getDayName = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleConfirm = () => {
    if (selectedDate && selectedSlot) {
      onSelect(selectedDate, selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Bước 2: Chọn ngày và giờ
        </h3>
        <p className="text-gray-600">
          Gia sư: <strong>{tutor.name}</strong>
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-8">
          {/* Date Selection */}
          <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />

          {/* Time Slot Selection */}
          {selectedDate ? (
            <TimeSlotSelector
              day={getDayName(selectedDate)}
              tutorId={tutor.id}
              selectedSlot={selectedSlot}
              onSlotSelect={setSelectedSlot}
            />
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Vui lòng chọn ngày trước để xem các thời gian rảnh.
              </p>
            </div>
          )}

          {/* Summary */}
          {selectedDate && selectedSlot && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h5 className="font-semibold text-blue-900 mb-2">Thông tin đặt lịch:</h5>
              <div className="space-y-1 text-sm text-blue-800">
                <p>
                  <strong>Gia sư:</strong> {tutor.name}
                </p>
                <p>
                  <strong>Ngày:</strong> {getDayName(selectedDate)}, {new Date(selectedDate).toLocaleDateString("vi-VN")}
                </p>
                <p>
                  <strong>Giờ:</strong> {selectedSlot.startTime} - {selectedSlot.endTime}
                </p>
                <p>
                  <strong>Giá:</strong> {tutor.hourlyRate.toLocaleString()}đ
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              ← Quay lại
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedDate || !selectedSlot}
              className="flex-1"
            >
              Tiếp theo <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DateTimeSelector;
