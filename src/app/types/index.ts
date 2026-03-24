/**
 * User and Authentication Types
 */
export type UserRole = "admin" | "staff" | "tutor" | "student" | "guest";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  classId?: string; // For students, which class they are assigned to
  isVerified?: boolean; // For tutors, whether they are verified
  department?: string; // For staff, their department
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

/**
 * Tutor Types
 */
export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  area: string;
  hourlyRate: number;
  avatar: string;
  rating: number;
  experience: number;
  phone: string;
  email: string;
  availability?: number; // 0-100: percentage of time available
}

/**
 * Tutor Matching Score
 */
export interface TutorMatchScore {
  tutorId: string;
  score: number; // 0-100
  scoreBreakdown: {
    subjectMatch: number; // 0-100 (40% weight)
    ratingScore: number; // 0-100 (30% weight)
    priceMatch: number; // 0-100 (20% weight)
    availabilityScore: number; // 0-100 (10% weight)
  };
}

/**
 * Class Types
 */
export interface Class {
  id: string;
  subject: string;
  area: string;
  maxFee: number;
  studentName: string;
  parentName: string;
  parentPhone: string;
  status: "unassigned" | "assigned";
  description: string;
  grade: string;
  sessionsPerWeek: number;
}

/**
 * Contract Types
 */
export interface Contract {
  id: string;
  tutorId: string;
  classId: string;
  startDate: string;
  sessionsCompleted: number;
  status: "active" | "failed" | "completed";
  brokerageFee: number;
  refundAmount: number;
  notes: string;
}

/**
 * Session Types
 */
export interface Session {
  id: string;
  contractId: string;
  sessionNumber: number;
  date: string;
  status: "completed" | "failed" | "scheduled";
  notes: string;
}

/**
 * Review and Rating Types
 */
export interface Review {
  id: string;
  tutorId: string;
  studentId: string;
  studentName: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
  updatedAt?: string;
}

export interface TutorWithReviews extends Tutor {
  reviews: Review[];
  reviewCount: number;
  averageRating: number;
}

/**
 * Time Slot Types
 */
export interface TimeSlot {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  available: boolean;
}

/**
 * Booking Types
 */
export interface Booking {
  id: string;
  tutorId: string;
  userId: string;
  tutorName?: string;
  studentName?: string;
  subject?: string;
  timeSlot: TimeSlot;
  date: string; // Selected date (YYYY-MM-DD format)
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  notes?: string;
  rate?: number; // Tutor's hourly rate at time of booking
}

export interface BookingContextType {
  bookings: Booking[];
  selectedTutor: Tutor | null;
  selectedTimeSlot: TimeSlot | null;
  createBooking: (booking: Omit<Booking, "id" | "createdAt">) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  confirmBooking: (bookingId: string) => Promise<void>;
  getBookingsByUser: (userId: string) => Booking[];
  getBookingsByTutor: (tutorId: string) => Booking[];
  setSelectedTutor: (tutor: Tutor | null) => void;
  setSelectedTimeSlot: (slot: TimeSlot | null) => void;
  clearSelection: () => void;
}
