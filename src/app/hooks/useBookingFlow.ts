/**
 * useBookingFlow Hook
 * Manages the complete booking workflow
 */

import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { Tutor, TimeSlot, Booking } from "../types/index";
import { BookingService } from "../services/bookingService";

export interface BookingFlowState {
  step: "tutor" | "dateTime" | "confirm" | "success" | "error";
  tutor: Tutor | null;
  date: string | null;
  timeSlot: TimeSlot | null;
  booking: Booking | null;
  error: string | null;
  loading: boolean;
  retryCount: number;
}

export interface UseBookingFlowResult {
  state: BookingFlowState;
  selectTutor: (tutor: Tutor) => void;
  selectDateTime: (date: string, timeSlot: TimeSlot) => void;
  confirmBooking: () => Promise<void>;
  retryBooking: () => Promise<void>;
  resetFlow: () => void;
  goToStep: (step: BookingFlowState["step"]) => void;
}

/**
 * Hook to manage complete booking workflow
 *
 * @example
 * const { state, selectTutor, selectDateTime, confirmBooking } = useBookingFlow();
 *
 * // Step 1: Select tutor
 * selectTutor(tutor);
 *
 * // Step 2: Select date and time
 * selectDateTime("2026-03-24", timeSlot);
 *
 * // Step 3: Confirm
 * confirmBooking();
 *
 * // Shows success message
 */
export function useBookingFlow(): UseBookingFlowResult {
  const { user } = useAuth();
  const { createBooking } = useBooking();

  const [state, setState] = useState<BookingFlowState>({
    step: "tutor",
    tutor: null,
    date: null,
    timeSlot: null,
    booking: null,
    error: null,
    loading: false,
    retryCount: 0,
  });

  const selectTutor = (tutor: Tutor) => {
    setState(prev => ({
      ...prev,
      tutor,
      step: "dateTime",
      error: null,
    }));
  };

  const selectDateTime = (date: string, timeSlot: TimeSlot) => {
    setState(prev => ({
      ...prev,
      date,
      timeSlot,
      step: "confirm",
      error: null,
    }));
  };

  const confirmBooking = async () => {
    if (!user?.id) {
      setState(prev => ({
        ...prev,
        error: "Vui lòng đăng nhập trước khi đặt lịch",
        step: "error",
      }));
      return;
    }

    if (!state.tutor || !state.date || !state.timeSlot) {
      setState(prev => ({
        ...prev,
        error: "Thông tin đặt lịch không đầy đủ",
        step: "error",
      }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Validate booking data
      const validation = BookingService.validateBooking({
        tutorId: state.tutor.id,
        userId: user.id,
        timeSlot: state.timeSlot,
        date: state.date,
      });

      if (!validation.valid) {
        throw new Error(validation.errors.join("; "));
      }

      // Create booking
      const booking = await createBooking({
        tutorId: state.tutor.id,
        userId: user.id,
        tutorName: state.tutor.name,
        studentName: user.name,
        subject: "", // Optional
        timeSlot: state.timeSlot,
        date: state.date,
        status: "confirmed",
        rate: state.tutor.hourlyRate,
      });

      setState(prev => ({
        ...prev,
        booking,
        step: "success",
        loading: false,
        error: null,
        retryCount: 0, // Reset retry count on success
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi khi đặt lịch. Vui lòng thử lại.";
      setState(prev => ({
        ...prev,
        error: errorMessage,
        step: "error",
        loading: false,
        retryCount: prev.retryCount + 1,
      }));
    }
  };

  const retryBooking = async () => {
    if (state.retryCount >= 3) {
      setState(prev => ({
        ...prev,
        error: "Đã thử lại quá nhiều lần. Vui lòng kiểm tra kết nối mạng và thử lại sau.",
      }));
      return;
    }

    await confirmBooking();
  };

  const resetFlow = () => {
    setState({
      step: "tutor",
      tutor: null,
      date: null,
      timeSlot: null,
      booking: null,
      error: null,
      loading: false,
      retryCount: 0,
    });
  };

  const goToStep = (step: BookingFlowState["step"]) => {
    setState(prev => ({
      ...prev,
      step,
      error: null,
    }));
  };

  return {
    state,
    selectTutor,
    selectDateTime,
    confirmBooking,
    retryBooking,
    resetFlow,
    goToStep,
  };
}
