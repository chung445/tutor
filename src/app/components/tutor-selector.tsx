/**
 * Tutor Selector Component
 * Displays tutors for selection in booking flow
 */

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Star, DollarSign, CheckCircle2 } from "lucide-react";
import { Tutor } from "../types/index";

interface TutorSelectorProps {
  tutors: Tutor[];
  selectedTutorId?: string;
  onSelect: (tutor: Tutor) => void;
  loading?: boolean;
}

/**
 * Individual tutor card
 */
function TutorCard({
  tutor,
  isSelected,
  onSelect,
}: {
  tutor: Tutor;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? "ring-2 ring-blue-500 bg-blue-50" : ""
      }`}
      onClick={onSelect}
    >
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {tutor.name}
              </h3>
              {isSelected && (
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
              )}
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tutor.subjects.map(subject => (
                <Badge key={subject} variant="secondary" className="text-xs">
                  {subject}
                </Badge>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 text-sm mb-3">
              <div>
                <div className="text-gray-600 text-xs">Đánh giá</div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tutor.rating.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-xs">Kinh nghiệm</div>
                <div className="font-semibold">{tutor.experience} năm</div>
              </div>
              <div>
                <div className="text-gray-600 text-xs">Giá</div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold">
                    {(tutor.hourlyRate / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            </div>

            {/* Area and Contact */}
            <div className="text-xs text-gray-600">
              <p>
                <strong>Khu vực:</strong> {tutor.area}
              </p>
              <p>
                <strong>Email:</strong> {tutor.email}
              </p>
            </div>
          </div>
        </div>

        {/* Select Button */}
        <Button
          onClick={onSelect}
          variant={isSelected ? "default" : "outline"}
          className="w-full mt-4"
        >
          {isSelected ? "✓ Đã chọn" : "Chọn gia sư này"}
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * Main tutor selector component
 */
export function TutorSelector({
  tutors,
  selectedTutorId,
  onSelect,
  loading = false,
}: TutorSelectorProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mb-2"></div>
          <p className="text-gray-500">Đang tải danh sách gia sư...</p>
        </div>
      </div>
    );
  }

  if (tutors.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500">Không tìm thấy gia sư nào.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">
        Bước 1: Chọn gia sư
      </h3>
      <p className="text-gray-600 mb-6">
        Chọn một gia sư từ danh sách dưới đây để bắt đầu đặt lịch học.
      </p>

      <div className="grid gap-4">
        {tutors.map(tutor => (
          <TutorCard
            key={tutor.id}
            tutor={tutor}
            isSelected={selectedTutorId === tutor.id}
            onSelect={() => onSelect(tutor)}
          />
        ))}
      </div>
    </div>
  );
}

export default TutorSelector;
