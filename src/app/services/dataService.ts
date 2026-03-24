import {
  Tutor,
  Class,
  Contract,
  Session
} from "../types/index";
import {
  MOCK_TUTORS_DATA,
  MOCK_CLASSES_DATA,
  MOCK_CONTRACTS_DATA,
  MOCK_SESSIONS_DATA
} from "./mockData";

/**
 * Data Service
 * Handles all CRUD operations for tutors, classes, contracts, and sessions
 */
export class DataService {
  /**
   * TUTORS OPERATIONS
   */

  static getTutors(): Tutor[] {
    return [...MOCK_TUTORS_DATA];
  }

  static getTutorById(id: string): Tutor | undefined {
    return MOCK_TUTORS_DATA.find((tutor) => tutor.id === id);
  }

  static searchTutors(query: {
    subject?: string;
    area?: string;
    minRating?: number;
  }): Tutor[] {
    return MOCK_TUTORS_DATA.filter((tutor) => {
      if (query.subject && !tutor.subjects.includes(query.subject)) {
        return false;
      }
      if (query.area && tutor.area !== query.area) {
        return false;
      }
      if (query.minRating && tutor.rating < query.minRating) {
        return false;
      }
      return true;
    });
  }

  /**
   * CLASSES OPERATIONS
   */

  static getClasses(): Class[] {
    return [...MOCK_CLASSES_DATA];
  }

  static getClassById(id: string): Class | undefined {
    return MOCK_CLASSES_DATA.find((classItem) => classItem.id === id);
  }

  static getClassesByArea(area: string): Class[] {
    return MOCK_CLASSES_DATA.filter((classItem) => classItem.area === area);
  }

  static getUnassignedClasses(): Class[] {
    return MOCK_CLASSES_DATA.filter((classItem) => classItem.status === "unassigned");
  }

  /**
   * CONTRACTS OPERATIONS
   */

  static getContracts(): Contract[] {
    return [...MOCK_CONTRACTS_DATA];
  }

  static getContractById(id: string): Contract | undefined {
    return MOCK_CONTRACTS_DATA.find((contract) => contract.id === id);
  }

  static getContractsByTutor(tutorId: string): Contract[] {
    return MOCK_CONTRACTS_DATA.filter((contract) => contract.tutorId === tutorId);
  }

  static getContractsByClass(classId: string): Contract[] {
    return MOCK_CONTRACTS_DATA.filter((contract) => contract.classId === classId);
  }

  static getActiveContracts(): Contract[] {
    return MOCK_CONTRACTS_DATA.filter((contract) => contract.status === "active");
  }

  /**
   * SESSIONS OPERATIONS
   */

  static getSessions(): Session[] {
    return [...MOCK_SESSIONS_DATA];
  }

  static getSessionById(id: string): Session | undefined {
    return MOCK_SESSIONS_DATA.find((session) => session.id === id);
  }

  static getSessionsByContract(contractId: string): Session[] {
    return MOCK_SESSIONS_DATA.filter((session) => session.contractId === contractId);
  }

  static getCompletedSessions(contractId: string): Session[] {
    return MOCK_SESSIONS_DATA.filter(
      (session) => session.contractId === contractId && session.status === "completed"
    );
  }

  /**
   * HELPER OPERATIONS
   */

  static getTutorName(tutorId: string): string {
    const tutor = this.getTutorById(tutorId);
    return tutor?.name || "N/A";
  }

  static getClassName(classId: string): string {
    const classItem = this.getClassById(classId);
    return classItem?.subject || "N/A";
  }

  /**
   * STATISTICS OPERATIONS
   */

  static getStudentStats(classId: string) {
    const contracts = this.getContractsByClass(classId);
    const totalSessions = contracts.reduce((sum, contract) => {
      return sum + this.getSessionsByContract(contract.id).length;
    }, 0);
    const completedSessions = contracts.reduce((sum, contract) => {
      return sum + this.getCompletedSessions(contract.id).length;
    }, 0);

    return {
      totalSessions,
      completedSessions,
      progressPercent: totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0
    };
  }

  /**
   * ADVANCED FILTERING OPERATIONS
   */

  static advancedFilterTutors(filters: {
    searchTerm?: string;
    subjects?: string[];
    areas?: string[];
    minRating?: number;
    priceRange?: { min: number; max: number };
    sortBy?: "rating" | "price" | "experience" | "name";
    sortOrder?: "asc" | "desc";
  }): Tutor[] {
    let result = [...MOCK_TUTORS_DATA];

    // Search filter (name, subject, email)
    if (filters.searchTerm?.trim()) {
      const search = filters.searchTerm.toLowerCase();
      result = result.filter(tutor => {
        const nameMatch = tutor.name.toLowerCase().includes(search);
        const subjectMatch = tutor.subjects.some(s =>
          s.toLowerCase().includes(search)
        );
        const emailMatch = tutor.email.toLowerCase().includes(search);
        return nameMatch || subjectMatch || emailMatch;
      });
    }

    // Subjects filter (OR logic - at least one subject matches)
    if (filters.subjects && filters.subjects.length > 0) {
      result = result.filter(tutor =>
        filters.subjects!.some(subject => tutor.subjects.includes(subject))
      );
    }

    // Areas filter (must be in one of the areas)
    if (filters.areas && filters.areas.length > 0) {
      result = result.filter(tutor => filters.areas!.includes(tutor.area));
    }

    // Min rating filter
    if (filters.minRating && filters.minRating > 0) {
      result = result.filter(tutor => tutor.rating >= filters.minRating!);
    }

    // Price range filter
    if (filters.priceRange) {
      result = result.filter(
        tutor =>
          tutor.hourlyRate >= filters.priceRange!.min &&
          tutor.hourlyRate <= filters.priceRange!.max
      );
    }

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        let compareValue = 0;

        switch (filters.sortBy) {
          case "rating":
            compareValue = b.rating - a.rating;
            break;
          case "price":
            compareValue = a.hourlyRate - b.hourlyRate;
            break;
          case "experience":
            compareValue = b.experience - a.experience;
            break;
          case "name":
            compareValue = a.name.localeCompare(b.name);
            break;
        }

        return (filters.sortOrder === "asc" ? -1 : 1) * compareValue;
      });
    }

    return result;
  }

  /**
   * Get unique subjects and areas for filter dropdowns
   */
  static getFilterOptions() {
    const subjects = Array.from(
      new Set(MOCK_TUTORS_DATA.flatMap(t => t.subjects))
    ).sort();

    const areas = Array.from(
      new Set(MOCK_TUTORS_DATA.map(t => t.area))
    ).sort();

    const priceRange = {
      min: Math.min(...MOCK_TUTORS_DATA.map(t => t.hourlyRate)),
      max: Math.max(...MOCK_TUTORS_DATA.map(t => t.hourlyRate)),
    };

    return { subjects, areas, priceRange };
  }
}
