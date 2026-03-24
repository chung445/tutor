/**
 * Tutor Matching Panel Component
 * 
 * Displays tutors with their matching scores
 * Shows score breakdown for transparency
 * Integrates with the matching algorithm
 * 
 * Features:
 * - Shows overall match score with color coding
 * - Displays score breakdown (subject, rating, price, availability)
 * - Responsive card layout
 * - Match quality indicators (badges)
 */

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, DollarSign, BookOpen, Clock } from "lucide-react";
import { formatScoreDisplay } from "../utils/tutorMatching";
import type { MatchedTutor } from "../hooks/useTutorMatching";

interface TutorMatchingPanelProps {
  matchedTutors: MatchedTutor[];
  showScoreBreakdown?: boolean;
  emptyMessage?: string;
}

/**
 * Score indicator badge with color coding
 */
function ScoreIndicator({ score }: { score: number }) {
  const { percentage, color, label } = formatScoreDisplay(score);
  
  return (
    <div className="flex items-center gap-2">
      <div className={`text-lg font-bold ${color}`}>{percentage}</div>
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  );
}

/**
 * Score breakdown mini visualization
 */
function ScoreBreakdown({ 
  breakdown 
}: { 
  breakdown: {
    subjectMatch: number;
    ratingScore: number;
    priceMatch: number;
    availabilityScore: number;
  }
}) {
  const items = [
    { label: "Môn học", value: breakdown.subjectMatch, weight: "40%", icon: BookOpen },
    { label: "Đánh giá", value: breakdown.ratingScore, weight: "30%", icon: Star },
    { label: "Giá", value: breakdown.priceMatch, weight: "20%", icon: DollarSign },
    { label: "Sự có mặt", value: breakdown.availabilityScore, weight: "10%", icon: Clock },
  ];

  return (
    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs">
      {items.map(({ label, value, weight, icon: Icon }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon className="w-3.5 h-3.5 text-gray-400" />
          <div className="flex-1">
            <div className="font-medium text-gray-700">{label}</div>
            <div className="flex justify-between">
              <span className="text-gray-600">{value.toFixed(0)}%</span>
              <span className="text-gray-400">({weight})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Individual tutor card with match score
 */
function TutorMatchCard({ matched, showBreakdown }: { 
  matched: MatchedTutor;
  showBreakdown: boolean;
}) {
  const { tutor, matchScore } = matched;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base">{tutor.name}</CardTitle>
              <p className="text-xs text-gray-500 mt-1">{tutor.email}</p>
            </div>
          </div>
          <ScoreIndicator score={matchScore.score} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Tutor Stats */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <div className="text-gray-600">Đánh giá</div>
            <div className="font-semibold flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              {tutor.rating.toFixed(1)}
            </div>
          </div>
          <div>
            <div className="text-gray-600">Kinh nghiệm</div>
            <div className="font-semibold">{tutor.experience} năm</div>
          </div>
          <div>
            <div className="text-gray-600">Giá</div>
            <div className="font-semibold">{(tutor.hourlyRate / 1000).toFixed(0)}k/h</div>
          </div>
        </div>

        {/* Subjects Tags */}
        <div className="pt-2">
          <div className="text-xs text-gray-600 mb-2">Môn học</div>
          <div className="flex flex-wrap gap-1">
            {tutor.subjects.map(subject => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="pt-2 text-xs">
          <div className="text-gray-600 mb-1">Sự có mặt: {tutor.availability ?? 90}%</div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-500 h-1.5 rounded-full"
              style={{ width: `${tutor.availability ?? 90}%` }}
            />
          </div>
        </div>

        {/* Score Breakdown */}
        {showBreakdown && (
          <ScoreBreakdown breakdown={matchScore.scoreBreakdown} />
        )}

        {/* Contact */}
        <div className="pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            <strong>Điện thoại:</strong> {tutor.phone}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Main panel component
 */
export function TutorMatchingPanel({
  matchedTutors,
  showScoreBreakdown = true,
  emptyMessage = "Không tìm thấy gia sư phù hợp.",
}: TutorMatchingPanelProps) {
  if (matchedTutors.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-500 text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-600 text-xs uppercase tracking-wide">
              Kết quả
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {matchedTutors.length}
            </div>
          </div>
          <div>
            <div className="text-gray-600 text-xs uppercase tracking-wide">
              Điểm tối đa
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {matchedTutors[0]?.matchScore.score.toFixed(1)}
            </div>
          </div>
          <div>
            <div className="text-gray-600 text-xs uppercase tracking-wide">
              Điểm trung bình
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {(
                matchedTutors.reduce((sum, m) => sum + m.matchScore.score, 0) /
                matchedTutors.length
              ).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Tutor Cards Grid */}
      <div className="grid gap-4">
        {matchedTutors.map(matched => (
          <TutorMatchCard
            key={matched.tutor.id}
            matched={matched}
            showBreakdown={showScoreBreakdown}
          />
        ))}
      </div>
    </div>
  );
}

export default TutorMatchingPanel;
