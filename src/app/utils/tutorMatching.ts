/**
 * Tutor Matching Algorithm
 * 
 * Matching Score Calculation:
 * - Subject Match: 40% (how many required subjects the tutor teaches)
 * - Rating: 30% (tutor's overall rating, normalized to 0-100)
 * - Price Match: 20% (how close the hourly rate is to max budget)
 * - Availability: 10% (percentage of time tutor is available)
 * 
 * Total: 100%
 */

import { Tutor, TutorMatchScore } from "../types/index";

export interface MatchingCriteria {
  requiredSubjects: string[];
  maxPrice: number;
  minRating?: number;
}

/**
 * Calculate subject match score (0-100)
 * Calculates what percentage of required subjects the tutor teaches
 * 
 * @example
 * calculateSubjectMatch(['Toán', 'Lý'], tutor)
 * If tutor teaches both: 100
 * If tutor teaches one: 50
 * If tutor teaches none: 0
 */
export function calculateSubjectMatch(
  requiredSubjects: string[],
  tutor: Tutor
): number {
  if (requiredSubjects.length === 0) return 100; // No requirement = perfect match
  
  const matchCount = requiredSubjects.filter(subject =>
    tutor.subjects.some(tutorSubject =>
      tutorSubject.toLowerCase() === subject.toLowerCase()
    )
  ).length;
  
  return (matchCount / requiredSubjects.length) * 100;
}

/**
 * Calculate rating score (0-100)
 * Normalizes tutor rating (typically 0-5) to 0-100 scale
 * 
 * @example
 * Rating 5.0 = 100
 * Rating 4.0 = 80
 * Rating 3.5 = 70
 */
export function calculateRatingScore(rating: number): number {
  // Normalize 0-5 rating to 0-100
  return (rating / 5) * 100;
}

/**
 * Calculate price match score (0-100)
 * How close the tutor's rate is to the max budget
 * 
 * Score = 100 if tutor rate <= budget * 0.8 (well within budget)
 * Score decreases as rate approaches budget
 * Score = 0 if tutor rate > budget (exceeds budget)
 * 
 * @example
 * Budget: 200k, Tutor: 150k → Match: 100 (good deal)
 * Budget: 200k, Tutor: 180k → Match: 90 (within budget)
 * Budget: 200k, Tutor: 220k → Match: 0 (exceeds budget)
 */
export function calculatePriceMatch(
  tutorHourlyRate: number,
  maxBudget: number
): number {
  // If tutor is more expensive than max budget, no match
  if (tutorHourlyRate > maxBudget) return 0;
  
  // If tutor is well within budget (at least 20% cheaper), perfect match
  if (tutorHourlyRate <= maxBudget * 0.8) return 100;
  
  // Otherwise, score based on how close to budget
  const ratio = tutorHourlyRate / maxBudget;
  return (1 - ratio) * 100;
}

/**
 * Calculate availability score (0-100)
 * Uses the tutor's availability percentage directly
 * Falls back to 90 if availability is not specified
 * 
 * @example
 * availability: 95 → Score: 95
 * availability: 50 → Score: 50
 * availability: undefined → Score: 90 (default)
 */
export function calculateAvailabilityScore(tutor: Tutor): number {
  return tutor.availability ?? 90;
}

/**
 * Calculate overall tutor matching score
 * 
 * Weighted calculation:
 * Score = (Subject × 0.40) + (Rating × 0.30) + (Price × 0.20) + (Availability × 0.10)
 * 
 * Result is a value from 0-100
 * 
 * @example
 * const score = calculateTutorScore(tutor, {
 *   requiredSubjects: ['Toán'],
 *   maxPrice: 200000,
 *   minRating: 4.0
 * })
 */
export function calculateTutorScore(
  tutor: Tutor,
  criteria: MatchingCriteria
): TutorMatchScore {
  // Check minimum rating requirement
  if (criteria.minRating && tutor.rating < criteria.minRating) {
    return {
      tutorId: tutor.id,
      score: 0, // Fail fast if rating requirement not met
      scoreBreakdown: {
        subjectMatch: calculateSubjectMatch(criteria.requiredSubjects, tutor),
        ratingScore: calculateRatingScore(tutor.rating),
        priceMatch: calculatePriceMatch(tutor.hourlyRate, criteria.maxPrice),
        availabilityScore: calculateAvailabilityScore(tutor),
      },
    };
  }

  const subjectMatch = calculateSubjectMatch(criteria.requiredSubjects, tutor);
  const ratingScore = calculateRatingScore(tutor.rating);
  const priceMatch = calculatePriceMatch(tutor.hourlyRate, criteria.maxPrice);
  const availabilityScore = calculateAvailabilityScore(tutor);

  // Weighted scoring: 40% + 30% + 20% + 10% = 100%
  const finalScore =
    subjectMatch * 0.4 +
    ratingScore * 0.3 +
    priceMatch * 0.2 +
    availabilityScore * 0.1;

  return {
    tutorId: tutor.id,
    score: Math.round(finalScore * 100) / 100, // Round to 2 decimals
    scoreBreakdown: {
      subjectMatch: Math.round(subjectMatch * 100) / 100,
      ratingScore: Math.round(ratingScore * 100) / 100,
      priceMatch: Math.round(priceMatch * 100) / 100,
      availabilityScore: Math.round(availabilityScore * 100) / 100,
    },
  };
}

/**
 * Score multiple tutors and return sorted by score descending
 * 
 * @example
 * const sorted = scoreTutors(tutorList, {
 *   requiredSubjects: ['Toán'],
 *   maxPrice: 200000
 * })
 */
export function scoreTutors(
  tutors: Tutor[],
  criteria: MatchingCriteria
): Array<{ tutor: Tutor; matchScore: TutorMatchScore }> {
  return tutors
    .map(tutor => ({
      tutor,
      matchScore: calculateTutorScore(tutor, criteria),
    }))
    .sort((a, b) => b.matchScore.score - a.matchScore.score);
}

/**
 * Format score as percentage string with color indicator
 * Useful for UI display
 */
export function formatScoreDisplay(score: number): {
  percentage: string;
  color: string;
  label: string;
} {
  const percentage = `${score.toFixed(1)}%`;
  
  let color = "text-red-600"; // Poor match
  let label = "Không phù hợp";
  
  if (score >= 80) {
    color = "text-green-600";
    label = "Rất phù hợp";
  } else if (score >= 70) {
    color = "text-green-500";
    label = "Phù hợp";
  } else if (score >= 60) {
    color = "text-yellow-600";
    label = "Khá";
  } else if (score >= 50) {
    color = "text-yellow-500";
    label = "Tạm được";
  }
  
  return { percentage, color, label };
}
