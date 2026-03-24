import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Tutor, Booking, Review } from "../../types/index";
import { AdminService } from "../../services/admin/adminService";

interface AdminContextType {
  // Data
  users: User[];
  tutors: Tutor[];
  bookings: Booking[];
  reviews: Review[];

  // Loading states
  loading: {
    users: boolean;
    tutors: boolean;
    bookings: boolean;
    reviews: boolean;
  };

  // Error states
  errors: {
    users: string | null;
    tutors: string | null;
    bookings: string | null;
    reviews: string | null;
  };

  // Actions
  refreshUsers: () => Promise<void>;
  refreshTutors: () => Promise<void>;
  refreshBookings: () => Promise<void>;
  refreshReviews: () => Promise<void>;

  // User management
  updateUser: (userId: string, updates: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  banUser: (userId: string) => Promise<void>;
  unbanUser: (userId: string) => Promise<void>;

  // Tutor management
  approveTutor: (tutorId: string) => Promise<void>;
  rejectTutor: (tutorId: string) => Promise<void>;
  updateTutor: (tutorId: string, updates: Partial<Tutor>) => Promise<void>;

  // Booking management
  approveBooking: (bookingId: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;

  // Review management
  deleteReview: (reviewId: string) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState({
    users: false,
    tutors: false,
    bookings: false,
    reviews: false,
  });

  const [errors, setErrors] = useState({
    users: null as string | null,
    tutors: null as string | null,
    bookings: null as string | null,
    reviews: null as string | null,
  });

  // Load initial data
  useEffect(() => {
    refreshUsers();
    refreshTutors();
    refreshBookings();
    refreshReviews();
  }, []);

  const refreshUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    setErrors(prev => ({ ...prev, users: null }));
    try {
      const data = await AdminService.getUsers();
      setUsers(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, users: error instanceof Error ? error.message : "Failed to load users" }));
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const refreshTutors = async () => {
    setLoading(prev => ({ ...prev, tutors: true }));
    setErrors(prev => ({ ...prev, tutors: null }));
    try {
      const data = await AdminService.getTutors();
      setTutors(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, tutors: error instanceof Error ? error.message : "Failed to load tutors" }));
    } finally {
      setLoading(prev => ({ ...prev, tutors: false }));
    }
  };

  const refreshBookings = async () => {
    setLoading(prev => ({ ...prev, bookings: true }));
    setErrors(prev => ({ ...prev, bookings: null }));
    try {
      const data = await AdminService.getBookings();
      setBookings(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, bookings: error instanceof Error ? error.message : "Failed to load bookings" }));
    } finally {
      setLoading(prev => ({ ...prev, bookings: false }));
    }
  };

  const refreshReviews = async () => {
    setLoading(prev => ({ ...prev, reviews: true }));
    setErrors(prev => ({ ...prev, reviews: null }));
    try {
      const data = await AdminService.getReviews();
      setReviews(data);
    } catch (error) {
      setErrors(prev => ({ ...prev, reviews: error instanceof Error ? error.message : "Failed to load reviews" }));
    } finally {
      setLoading(prev => ({ ...prev, reviews: false }));
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      await AdminService.updateUser(userId, updates);
      await refreshUsers(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await AdminService.deleteUser(userId);
      await refreshUsers(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const banUser = async (userId: string) => {
    try {
      await AdminService.banUser(userId);
      await refreshUsers(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const unbanUser = async (userId: string) => {
    try {
      await AdminService.unbanUser(userId);
      await refreshUsers(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const approveTutor = async (tutorId: string) => {
    try {
      await AdminService.approveTutor(tutorId);
      await refreshTutors(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const rejectTutor = async (tutorId: string) => {
    try {
      await AdminService.rejectTutor(tutorId);
      await refreshTutors(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const updateTutor = async (tutorId: string, updates: Partial<Tutor>) => {
    try {
      await AdminService.updateTutor(tutorId, updates);
      await refreshTutors(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const approveBooking = async (bookingId: string) => {
    try {
      await AdminService.approveBooking(bookingId);
      await refreshBookings(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      await AdminService.cancelBooking(bookingId);
      await refreshBookings(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await AdminService.deleteReview(reviewId);
      await refreshReviews(); // Refresh the list
    } catch (error) {
      throw error;
    }
  };

  const value: AdminContextType = {
    users,
    tutors,
    bookings,
    reviews,
    loading,
    errors,
    refreshUsers,
    refreshTutors,
    refreshBookings,
    refreshReviews,
    updateUser,
    deleteUser,
    banUser,
    unbanUser,
    approveTutor,
    rejectTutor,
    updateTutor,
    approveBooking,
    cancelBooking,
    deleteReview,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}