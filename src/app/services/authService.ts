import { User } from "../types/index";
import { MOCK_ADMINS, MOCK_STAFF, MOCK_TUTORS, MOCK_STUDENTS } from "./mockData";
import { apiFetch } from "./apiClient";

/**
 * Authentication Service
 * Handles all authentication-related operations
 */
export class AuthService {
  private static readonly STORAGE_KEY = "tutor_center_user";
  private static readonly API_DELAY = 500; // Simulate API delay

  /**
   * Authenticate user with email and password
   * @throws Error if credentials are invalid or network error occurs
   */
  static async login(email: string, password: string): Promise<User> {
    // Validate input
    if (!email || !password) {
      throw new Error("Vui lòng nhập email và mật khẩu");
    }

    if (!email.includes("@")) {
      throw new Error("Email không hợp lệ");
    }

    if (password.length < 3) {
      throw new Error("Mật khẩu phải có ít nhất 3 ký tự");
    }

    // Simulate API delay
    await this.simulateDelay();

    try {
      // Primary API call
      const user = await apiFetch<User>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      return user;
    } catch (error) {
      // Fallback to mock auth if API not available
      console.warn("AuthService.login fallback to mock auth", error);

      // Check admin accounts
      const adminData = MOCK_ADMINS[email];
      if (adminData && adminData.password === password) {
        return adminData.user;
      }

      // Check staff accounts
      const staffData = MOCK_STAFF[email];
      if (staffData && staffData.password === password) {
        return staffData.user;
      }

      // Check tutor accounts
      const tutorData = MOCK_TUTORS[email];
      if (tutorData && tutorData.password === password) {
        return tutorData.user;
      }

      // Check student accounts
      const studentData = MOCK_STUDENTS[email];
      if (studentData && studentData.password === password) {
        return studentData.user;
      }

      if (error instanceof Error && error.name === "NetworkError") {
        throw error;
      }

      throw new Error("Email hoặc mật khẩu không đúng");
    }
  }

  /**
   * Save user to localStorage
   */
  static saveUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  /**
   * Load user from localStorage
   */
  static loadUser(): User | null {
    const storedUser = localStorage.getItem(this.STORAGE_KEY);
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error("Failed to parse stored user:", error);
      this.clearUser();
      return null;
    }
  }

  /**
   * Clear user from localStorage
   */
  static clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Simulate API delay for better UX
   */
  private static simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, this.API_DELAY));
  }
}
