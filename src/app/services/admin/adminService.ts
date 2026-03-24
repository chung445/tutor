import { User, Tutor, Booking, Review } from "../../types/index";
import { apiFetch } from "../../services/apiClient";

/**
 * Admin Service
 * Handles all admin-related API operations
 */
export class AdminService {
  /**
   * Get all users
   */
  static async getUsers(): Promise<User[]> {
    try {
      return await apiFetch<User[]>("/admin/users");
    } catch (error) {
      console.warn("AdminService.getUsers fallback to mock data", error);
      // Return mock data for development
      return [
        {
          id: "u1",
          email: "admin@tutorcentral.com",
          name: "Quản trị viên",
          role: "admin",
          phone: "0900000001",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        },
        {
          id: "u2",
          email: "student1@example.com",
          name: "Nguyễn Văn A",
          role: "student",
          phone: "0900000002",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
        },
        {
          id: "u3",
          email: "tutor1@example.com",
          name: "Trần Thị B",
          role: "tutor",
          phone: "0900000003",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          isVerified: true
        }
      ];
    }
  }

  /**
   * Update user
   */
  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    try {
      await apiFetch(`/admin/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.warn("AdminService.updateUser fallback", error);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Delete user
   */
  static async deleteUser(userId: string): Promise<void> {
    try {
      await apiFetch(`/admin/users/${userId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.warn("AdminService.deleteUser fallback", error);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Ban user
   */
  static async banUser(userId: string): Promise<void> {
    try {
      await apiFetch(`/admin/users/${userId}/ban`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.banUser fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Unban user
   */
  static async unbanUser(userId: string): Promise<void> {
    try {
      await apiFetch(`/admin/users/${userId}/unban`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.unbanUser fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Get all tutors
   */
  static async getTutors(): Promise<Tutor[]> {
    try {
      return await apiFetch<Tutor[]>("/admin/tutors");
    } catch (error) {
      console.warn("AdminService.getTutors fallback to mock data", error);
      return [
        {
          id: "t1",
          name: "Trần Thị B",
          subjects: ["Toán", "Lý"],
          area: "Quận 1, TP.HCM",
          hourlyRate: 50000,
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
          rating: 4.8,
          experience: 5,
          phone: "0900000003",
          email: "tutor1@example.com"
        },
        {
          id: "t2",
          name: "Lê Văn C",
          subjects: ["Tiếng Anh", "Ngữ văn"],
          area: "Quận 3, TP.HCM",
          hourlyRate: 45000,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          rating: 4.6,
          experience: 3,
          phone: "0900000004",
          email: "tutor2@example.com"
        }
      ];
    }
  }

  /**
   * Approve tutor
   */
  static async approveTutor(tutorId: string): Promise<void> {
    try {
      await apiFetch(`/admin/tutors/${tutorId}/approve`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.approveTutor fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Reject tutor
   */
  static async rejectTutor(tutorId: string): Promise<void> {
    try {
      await apiFetch(`/admin/tutors/${tutorId}/reject`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.rejectTutor fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Update tutor
   */
  static async updateTutor(tutorId: string, updates: Partial<Tutor>): Promise<void> {
    try {
      await apiFetch(`/admin/tutors/${tutorId}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.warn("AdminService.updateTutor fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Get all bookings
   */
  static async getBookings(): Promise<Booking[]> {
    try {
      return await apiFetch<Booking[]>("/admin/bookings");
    } catch (error) {
      console.warn("AdminService.getBookings fallback to mock data", error);
      return [
        {
          id: "b1",
          studentId: "u2",
          tutorId: "t1",
          subject: "Toán 10",
          date: "2024-03-25",
          time: "18:00",
          duration: 90,
          status: "pending",
          notes: "Cần ôn tập đại số và hình học",
          createdAt: "2024-03-20T10:00:00Z"
        },
        {
          id: "b2",
          studentId: "u2",
          tutorId: "t2",
          subject: "Tiếng Anh",
          date: "2024-03-26",
          time: "19:00",
          duration: 60,
          status: "confirmed",
          notes: "Luyện ngữ pháp và từ vựng",
          createdAt: "2024-03-19T14:30:00Z"
        }
      ];
    }
  }

  /**
   * Approve booking
   */
  static async approveBooking(bookingId: string): Promise<void> {
    try {
      await apiFetch(`/admin/bookings/${bookingId}/approve`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.approveBooking fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Cancel booking
   */
  static async cancelBooking(bookingId: string): Promise<void> {
    try {
      await apiFetch(`/admin/bookings/${bookingId}/cancel`, {
        method: "POST",
      });
    } catch (error) {
      console.warn("AdminService.cancelBooking fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  /**
   * Get all reviews
   */
  static async getReviews(): Promise<Review[]> {
    try {
      return await apiFetch<Review[]>("/admin/reviews");
    } catch (error) {
      console.warn("AdminService.getReviews fallback to mock data", error);
      return [
        {
          id: "r1",
          bookingId: "b2",
          studentId: "u2",
          tutorId: "t2",
          rating: 5,
          comment: "Gia sư rất nhiệt tình và giảng dạy dễ hiểu. Rất hài lòng!",
          createdAt: "2024-03-20T20:00:00Z"
        },
        {
          id: "r2",
          bookingId: "b1",
          studentId: "u2",
          tutorId: "t1",
          rating: 4,
          comment: "Bài giảng tốt, nhưng cần thêm bài tập thực hành.",
          createdAt: "2024-03-21T19:30:00Z"
        }
      ];
    }
  }

  /**
   * Delete review
   */
  static async deleteReview(reviewId: string): Promise<void> {
    try {
      await apiFetch(`/admin/reviews/${reviewId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.warn("AdminService.deleteReview fallback", error);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}