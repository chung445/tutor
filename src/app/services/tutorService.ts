import { Tutor } from "../types/index";
import { apiFetch } from "./apiClient";
import { DataService } from "./dataService";

export class TutorService {
  static async getTutors(): Promise<Tutor[]> {
    try {
      return await apiFetch<Tutor[]>("/tutors", { method: "GET" });
    } catch (error) {
      console.warn("TutorService.getTutors fallback to mock data", error);
      return DataService.getTutors();
    }
  }

  static async getTutorById(id: string): Promise<Tutor | undefined> {
    try {
      return await apiFetch<Tutor>(`/tutors/${id}`, { method: "GET" });
    } catch (error) {
      console.warn("TutorService.getTutorById fallback to mock data", error);
      return DataService.getTutorById(id);
    }
  }

  static async searchTutors(filters: {
    subject?: string;
    area?: string;
    minRating?: number;
  } = {}): Promise<Tutor[]> {
    try {
      const query = new URLSearchParams();
      if (filters.subject) query.set("subject", filters.subject);
      if (filters.area) query.set("area", filters.area);
      if (filters.minRating !== undefined) query.set("minRating", `${filters.minRating}`);

      return await apiFetch<Tutor[]>(`/tutors?${query.toString()}`, { method: "GET" });
    } catch (error) {
      console.warn("TutorService.searchTutors fallback to mock data", error);
      return DataService.searchTutors(filters);
    }
  }
}
