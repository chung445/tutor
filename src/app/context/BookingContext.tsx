/**
 * Booking Context
 * Manages global booking state and operations
 * Stores bookings in localStorage for persistence
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Booking, TimeSlot, Tutor, BookingContextType } from "../types/index";

const BOOKINGS_STORAGE_KEY = "tutor_bookings";

const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * Generate unique booking ID
 */
function generateBookingId(): string {
  return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Load bookings from localStorage
 */
function loadBookingsFromStorage(): Booking[] {
  try {
    const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading bookings from storage:", error);
    return [];
  }
}

/**
 * Save bookings to localStorage
 */
function saveBookingsToStorage(bookings: Booking[]): void {
  try {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  } catch (error) {
    console.error("Error saving bookings to storage:", error);
  }
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const stored = loadBookingsFromStorage();
    setBookings(stored);
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    saveBookingsToStorage(bookings);
  }, [bookings]);

  const createBooking = async (
    booking: Omit<Booking, "id" | "createdAt">
  ): Promise<Booking> => {
    try {
      // Validate input
      if (!booking.tutorId || !booking.userId || !booking.date || !booking.timeSlot) {
        throw new Error("Thông tin đặt lịch không đầy đủ");
      }

      // Check for duplicate bookings (same tutor, user, date, time)
      const existingBookings = bookings.filter(b =>
        b.tutorId === booking.tutorId &&
        b.userId === booking.userId &&
        b.date === booking.date &&
        b.timeSlot.id === booking.timeSlot.id &&
        b.status !== "cancelled"
      );

      if (existingBookings.length > 0) {
        throw new Error("Bạn đã đặt lịch với gia sư này vào thời gian này rồi");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const newBooking: Booking = {
        ...booking,
        id: generateBookingId(),
        createdAt: new Date().toISOString(),
        status: "confirmed", // Default to confirmed
      };

      setBookings(prev => [...prev, newBooking]);
      return newBooking;
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.");
      }

      // Re-throw validation errors
      if (error instanceof Error) {
        throw error;
      }

      // Handle unexpected errors
      throw new Error("Không thể tạo đặt lịch. Vui lòng thử lại sau.");
    }
  };

  const cancelBooking = async (bookingId: string): Promise<void> => {
    try {
      if (!bookingId) {
        throw new Error("ID đặt lịch không hợp lệ");
      }

      // Check if booking exists
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error("Không tìm thấy đặt lịch này");
      }

      // Check if booking can be cancelled (not already completed/cancelled)
      if (booking.status === "completed") {
        throw new Error("Không thể hủy đặt lịch đã hoàn thành");
      }

      if (booking.status === "cancelled") {
        throw new Error("Đặt lịch này đã được hủy rồi");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: "cancelled" as const } : b
        )
      );
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.");
      }

      // Re-throw validation errors
      if (error instanceof Error) {
        throw error;
      }

      // Handle unexpected errors
      throw new Error("Không thể hủy đặt lịch. Vui lòng thử lại sau.");
    }
  };

  const confirmBooking = async (bookingId: string): Promise<void> => {
    try {
      if (!bookingId) {
        throw new Error("ID đặt lịch không hợp lệ");
      }

      // Check if booking exists
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) {
        throw new Error("Không tìm thấy đặt lịch này");
      }

      // Check if booking can be confirmed
      if (booking.status === "completed") {
        throw new Error("Đặt lịch này đã hoàn thành rồi");
      }

      if (booking.status === "cancelled") {
        throw new Error("Không thể xác nhận đặt lịch đã hủy");
      }

      if (booking.status === "confirmed") {
        throw new Error("Đặt lịch này đã được xác nhận rồi");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      setBookings(prev =>
        prev.map(b =>
          b.id === bookingId ? { ...b, status: "confirmed" as const } : b
        )
      );
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.");
      }

      // Re-throw validation errors
      if (error instanceof Error) {
        throw error;
      }

      // Handle unexpected errors
      throw new Error("Không thể xác nhận đặt lịch. Vui lòng thử lại sau.");
    }
  };

  const getBookingsByUser = (userId: string): Booking[] => {
    return bookings.filter(b => b.userId === userId && b.status !== "cancelled");
  };

  const getBookingsByTutor = (tutorId: string): Booking[] => {
    return bookings.filter(b => b.tutorId === tutorId && b.status !== "cancelled");
  };

  const clearSelection = () => {
    setSelectedTutor(null);
    setSelectedTimeSlot(null);
  };

  const value: BookingContextType = {
    bookings,
    selectedTutor,
    selectedTimeSlot,
    createBooking,
    cancelBooking,
    confirmBooking,
    getBookingsByUser,
    getBookingsByTutor,
    setSelectedTutor,
    setSelectedTimeSlot,
    clearSelection,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking(): BookingContextType {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
