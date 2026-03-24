/**
 * Booking Service
 * Handles booking operations and availability
 */

import { TimeSlot, Tutor, Booking } from "../types/index";
import { apiFetch } from "./apiClient";

/**
 * Generate available time slots for a tutor
 * Returns predefined time slots throughout the week
 */
export function getAvailableTimeSlots(
  tutorId?: string,
  _dayFilter?: string
): TimeSlot[] {
  // Standard tutor availability throughout the week
  const baseSlots: TimeSlot[] = [
    {
      id: "slot_1",
      day: "Monday",
      startTime: "16:00",
      endTime: "17:00",
      available: true,
    },
    {
      id: "slot_2",
      day: "Monday",
      startTime: "17:00",
      endTime: "18:00",
      available: true,
    },
    {
      id: "slot_3",
      day: "Monday",
      startTime: "18:00",
      endTime: "19:00",
      available: true,
    },
    {
      id: "slot_4",
      day: "Tuesday",
      startTime: "16:00",
      endTime: "17:00",
      available: true,
    },
    {
      id: "slot_5",
      day: "Tuesday",
      startTime: "17:00",
      endTime: "18:00",
      available: true,
    },
    {
      id: "slot_6",
      day: "Tuesday",
      startTime: "18:00",
      endTime: "19:00",
      available: true,
    },
    {
      id: "slot_7",
      day: "Wednesday",
      startTime: "16:00",
      endTime: "17:00",
      available: true,
    },
    {
      id: "slot_8",
      day: "Wednesday",
      startTime: "17:00",
      endTime: "18:00",
      available: true,
    },
    {
      id: "slot_9",
      day: "Thursday",
      startTime: "16:00",
      endTime: "17:00",
      available: true,
    },
    {
      id: "slot_10",
      day: "Thursday",
      startTime: "17:00",
      endTime: "18:00",
      available: true,
    },
    {
      id: "slot_11",
      day: "Friday",
      startTime: "16:00",
      endTime: "17:00",
      available: true,
    },
    {
      id: "slot_12",
      day: "Saturday",
      startTime: "09:00",
      endTime: "10:00",
      available: true,
    },
    {
      id: "slot_13",
      day: "Saturday",
      startTime: "10:00",
      endTime: "11:00",
      available: true,
    },
    {
      id: "slot_14",
      day: "Saturday",
      startTime: "14:00",
      endTime: "15:00",
      available: true,
    },
    {
      id: "slot_15",
      day: "Saturday",
      startTime: "15:00",
      endTime: "16:00",
      available: true,
    },
    {
      id: "slot_16",
      day: "Sunday",
      startTime: "09:00",
      endTime: "10:00",
      available: true,
    },
    {
      id: "slot_17",
      day: "Sunday",
      startTime: "10:00",
      endTime: "11:00",
      available: true,
    },
  ];

  return baseSlots;
}

/**
 * Get time slots for a specific day
 */
export function getTimeSlotsByDay(day: string, tutorId?: string): TimeSlot[] {
  const slots = getAvailableTimeSlots(tutorId);
  return slots.filter(slot => slot.day === day);
}

/**
 * Format time slot for display (e.g., "16:00 - 17:00")
 */
export function formatTimeSlot(slot: TimeSlot): string {
  return `${slot.startTime} - ${slot.endTime}`;
}

/**
 * Format date for display (e.g., "Monday, March 24, 2026")
 */
export function formatDate(dateString: string, day: string): string {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("vi-VN", options);
  } catch {
    return `${day}, ${dateString}`;
  }
}

/**
 * Get next available dates for booking (next 30 days)
 */
export function getNextAvailableDates(days: number = 30): Array<{
  dateString: string;
  displayDate: string;
  day: string;
}> {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= days; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);

    const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const displayDate = date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    dates.push({
      dateString,
      displayDate: `${dayName}, ${displayDate}`,
      day: dayName,
    });
  }

  return dates;
}

/**
 * Validate booking data
 */
export function validateBooking(data: {
  tutorId?: string;
  userId?: string;
  timeSlot?: unknown;
  date?: string;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.tutorId) {
    errors.push("Vui lòng chọn gia sư");
  }

  if (!data.userId) {
    errors.push("Vui lòng đăng nhập với tài khoản sinh viên");
  }

  if (!data.timeSlot) {
    errors.push("Vui lòng chọn thời gian học");
  }

  if (!data.date) {
    errors.push("Vui lòng chọn ngày học");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate booking price (tutor hourly rate)
 */
export function calculateBookingPrice(tutor: Tutor, hours: number = 1): number {
  return tutor.hourlyRate * hours;
}

export const BookingService = {
  getAvailableTimeSlots,
  getTimeSlotsByDay,
  formatTimeSlot,
  formatDate,
  getNextAvailableDates,
  validateBooking,
  calculateBookingPrice,
};

export class BookingApiService {
  static async createBooking(data: {
    tutorId: string;
    userId: string;
    date: string;
    timeSlot: any;
    rate: number;
    subject?: string;

  }): Promise<Booking> {
    return apiFetch<Booking>("/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  static async getBookingsByUser(userId: string): Promise<Booking[]> {
    return apiFetch<Booking[]>(`/bookings?userId=${encodeURIComponent(userId)}`);
  }

  static async cancelBooking(bookingId: string): Promise<void> {
    return apiFetch<void>(`/bookings/${encodeURIComponent(bookingId)}/cancel`, {
      method: "POST",
    });
  }

  static async updateBookingStatus(bookingId: string, status: string): Promise<Booking> {
    return apiFetch<Booking>(`/bookings/${encodeURIComponent(bookingId)}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  }
}

