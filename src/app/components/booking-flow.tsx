/**
 * Complete Booking Flow Component
 * Orchestrates the entire booking workflow
 */

import React from "react";
import { Card, CardContent } from "./ui/card";
import { TutorSelector } from "./tutor-selector";
import { DateTimeSelector } from "./datetime-selector";
import { BookingConfirmation } from "./booking-confirmation";
import { BookingSuccess } from "./booking-success";
import { useBookingFlow } from "../hooks/useBookingFlow";
import { TutorService } from "../services/tutorService";
import { Tutor } from "../types/index";

interface BookingFlowProps {
  onComplete?: () => void;
  onViewBookings?: () => void;
}

/**
 * Progress indicator showing booking steps
 */
function ProgressIndicator({
  currentStep,
}: {
  currentStep: "tutor" | "dateTime" | "confirm" | "success" | "error";
}) {
  const steps = [
    { key: "tutor", label: "Chọn gia sư", number: 1 },
    { key: "dateTime", label: "Ngày & Giờ", number: 2 },
    { key: "confirm", label: "Xác nhận", number: 3 },
    { key: "success", label: "Thành công", number: 4 },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = ["tutor", "dateTime", "confirm"].includes(currentStep);
          const isCompleted =
            (step.key === "tutor" && ["dateTime", "confirm", "success"].includes(currentStep)) ||
            (step.key === "dateTime" && ["confirm", "success"].includes(currentStep)) ||
            (step.key === "confirm" && currentStep === "success");
          const isCurrent = step.key === currentStep;

          return (
            <React.Fragment key={step.key}>
              {/* Step Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm ${
                  isCurrent || isCompleted
                    ? "bg-blue-600 text-white"
                    : isActive
                    ? "bg-blue-50 text-blue-600 border-2 border-blue-200"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? "✓" : step.number}
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full ${
                    isCompleted ? "bg-blue-600" : "bg-gray-200"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Labels */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
        {steps.map(step => (
          <div key={step.key} className="text-center flex-1">
            {step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Error display component
 */
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <h4 className="font-semibold text-red-900 mb-1">Lỗi</h4>
      <p className="text-sm text-red-800">{message}</p>
    </div>
  );
}

/**
 * Main booking flow component
 */
export function BookingFlow({
  onComplete,
  onViewBookings,
}: BookingFlowProps) {
  const { state, selectTutor, selectDateTime, confirmBooking, retryBooking, resetFlow, goToStep } = useBookingFlow();
  const [tutors, setTutors] = React.useState<Tutor[]>([]);
  const [isLoadingTutors, setIsLoadingTutors] = React.useState(true);
  const [tutorError, setTutorError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;

    const loadTutors = async () => {
      setIsLoadingTutors(true);
      setTutorError(null);

      try {
        const data = await TutorService.getTutors();
        if (mounted) setTutors(data);
      } catch (err) {
        console.error("Error loading tutors:", err);
        if (mounted) setTutorError("Không thể tải danh sách gia sư.");
      } finally {
        if (mounted) setIsLoadingTutors(false);
      }
    };

    loadTutors();
    return () => { mounted = false; };
  }, []);

  const renderContent = () => {
    switch (state.step) {
      case "tutor":
        return (
          <TutorSelector
            tutors={tutors}
            selectedTutorId={state.tutor?.id}
            onSelect={selectTutor}
          />
        );

      case "dateTime":
        if (!state.tutor) return null;
        return (
          <DateTimeSelector
            tutor={state.tutor}
            onSelect={selectDateTime}
            onBack={() => goToStep("tutor")}
          />
        );

      case "confirm":
        if (!state.tutor || !state.date || !state.timeSlot) return null;
        return (
          <BookingConfirmation
            tutor={state.tutor}
            date={state.date}
            timeSlot={state.timeSlot}
            onConfirm={confirmBooking}
            onBack={() => goToStep("dateTime")}
            loading={state.loading}
          />
        );

      case "success":
        if (!state.booking || !state.tutor)
          return <p className="text-gray-500">Lỗi: Không tìm thấy thông tin đặt lịch</p>;
        return (
          <BookingSuccess
            booking={state.booking}
            tutor={state.tutor}
            onClose={() => {
              resetFlow();
              onComplete?.();
            }}
            onViewBookings={() => {
              onViewBookings?.();
              resetFlow();
            }}
          />
        );

      case "error":
        return (
          <div className="space-y-4">
            <ErrorMessage message={state.error || "Có lỗi xảy ra. Vui lòng thử lại."} />
            <div className="flex gap-3">
              {state.retryCount < 3 && (
                <button
                  onClick={retryBooking}
                  disabled={state.loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.loading ? "Đang thử lại..." : "Thử lại"}
                </button>
              )}
              <button
                onClick={() => goToStep("tutor")}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Bắt đầu lại
              </button>
              <button
                onClick={resetFlow}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoadingTutors) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <div className="text-center text-gray-500">Đang tải danh sách gia sư...</div>
      </div>
    );
  }

  if (tutorError) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8">
        <div className="text-center text-red-600">{tutorError}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Progress Indicator */}
      {state.step !== "success" && (
        <ProgressIndicator currentStep={state.step} />
      )}

      {/* Main Content Card */}
      {state.step !== "success" ? (
        <Card>
          <CardContent className="pt-8 pb-8">
            {renderContent()}
          </CardContent>
        </Card>
      ) : (
        renderContent()
      )}
    </div>
  );
}

export default BookingFlow;
