import { Review, TutorWithReviews } from "../types/index";

/**
 * Review Service
 * Handles all review and rating operations
 */
export class ReviewService {
  private static readonly REVIEWS_STORAGE_KEY = "tutor_reviews";

  /**
   * Get all reviews from localStorage
   */
  static getReviews(): Review[] {
    try {
      const stored = localStorage.getItem(this.REVIEWS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading reviews:", error);
      return [];
    }
  }

  /**
   * Save reviews to localStorage
   */
  private static saveReviews(reviews: Review[]): void {
    try {
      localStorage.setItem(this.REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    } catch (error) {
      console.error("Error saving reviews:", error);
    }
  }

  /**
   * Add a new review
   */
  static addReview(review: Omit<Review, "id" | "createdAt">): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    this.saveReviews(reviews);

    // Update tutor's average rating
    this.updateTutorAverageRating(review.tutorId);

    return newReview;
  }

  /**
   * Get reviews for a specific tutor
   */
  static getReviewsByTutor(tutorId: string): Review[] {
    const reviews = this.getReviews();
    return reviews
      .filter(review => review.tutorId === tutorId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Get reviews by a specific student
   */
  static getReviewsByStudent(studentId: string): Review[] {
    const reviews = this.getReviews();
    return reviews
      .filter(review => review.studentId === studentId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Update a review
   */
  static updateReview(reviewId: string, updates: Partial<Pick<Review, "rating" | "comment">>): Review | null {
    const reviews = this.getReviews();
    const reviewIndex = reviews.findIndex(review => review.id === reviewId);

    if (reviewIndex === -1) return null;

    reviews[reviewIndex] = {
      ...reviews[reviewIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.saveReviews(reviews);

    // Update tutor's average rating
    this.updateTutorAverageRating(reviews[reviewIndex].tutorId);

    return reviews[reviewIndex];
  }

  /**
   * Delete a review
   */
  static deleteReview(reviewId: string): boolean {
    const reviews = this.getReviews();
    const reviewIndex = reviews.findIndex(review => review.id === reviewId);

    if (reviewIndex === -1) return false;

    const tutorId = reviews[reviewIndex].tutorId;
    reviews.splice(reviewIndex, 1);

    this.saveReviews(reviews);

    // Update tutor's average rating
    this.updateTutorAverageRating(tutorId);

    return true;
  }

  /**
   * Check if a student has already reviewed a tutor
   */
  static hasStudentReviewedTutor(studentId: string, tutorId: string): boolean {
    const reviews = this.getReviews();
    return reviews.some(review =>
      review.studentId === studentId && review.tutorId === tutorId
    );
  }

  /**
   * Get review statistics for a tutor
   */
  static getTutorReviewStats(tutorId: string): {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: { [key: number]: number };
  } {
    const reviews = this.getReviewsByTutor(tutorId);

    if (reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round((totalRating / reviews.length) * 10) / 10;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++;
    });

    return {
      totalReviews: reviews.length,
      averageRating,
      ratingDistribution
    };
  }

  /**
   * Update tutor's average rating (this would normally be done in a backend)
   * For now, we'll update the mock data - in a real app this would be an API call
   */
  private static updateTutorAverageRating(tutorId: string): void {
    const stats = this.getTutorReviewStats(tutorId);

    // In a real app, this would be an API call to update the tutor's rating
    // For demo purposes, we'll update the mock data
    const { MOCK_TUTORS_DATA } = require("./mockData");
    const tutorIndex = MOCK_TUTORS_DATA.findIndex((t: any) => t.id === tutorId);

    if (tutorIndex !== -1) {
      MOCK_TUTORS_DATA[tutorIndex].rating = stats.averageRating;
    }
  }

  /**
   * Validate review data
   */
  static validateReview(review: Partial<Review>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!review.tutorId) {
      errors.push("Tutor ID is required");
    }

    if (!review.studentId) {
      errors.push("Student ID is required");
    }

    if (!review.studentName) {
      errors.push("Student name is required");
    }

    if (!review.rating || review.rating < 1 || review.rating > 5) {
      errors.push("Rating must be between 1 and 5 stars");
    }

    if (!review.comment || review.comment.trim().length < 10) {
      errors.push("Comment must be at least 10 characters long");
    }

    if (review.comment && review.comment.length > 500) {
      errors.push("Comment cannot exceed 500 characters");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}