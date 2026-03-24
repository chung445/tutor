/**
 * useTutorMatching Hook
 * 
 * Custom hook that combines filtering with tutor matching algorithm
 * Automatically scores and sorts tutors based on matching criteria
 * 
 * Features:
 * - Smart matching based on subject, rating, price, availability
 * - Integrates with global FilterContext for user preferences
 * - Returns sorted tutors by match score
 * - Includes match score details for UI display
 * 
 * @example
 * const { matchedTutors, criteria } = useTutorMatching(allTutors, {
 *   requiredSubjects: ['Toán'],
 *   maxPrice: 200000
 * })
 * 
 * matchedTutors.forEach(({ tutor, matchScore }) => {
 *   console.log(`${tutor.name}: ${matchScore.score}%`)
 * })
 */

import { useMemo } from "react";
import { Tutor } from "../types/index";
import { scoreTutors, MatchingCriteria } from "../utils/tutorMatching";

export interface MatchedTutor {
  tutor: Tutor;
  matchScore: {
    tutorId: string;
    score: number;
    scoreBreakdown: {
      subjectMatch: number;
      ratingScore: number;
      priceMatch: number;
      availabilityScore: number;
    };
  };
}

export interface UseTutorMatchingResult {
  /** Tutors sorted by match score (highest first) */
  matchedTutors: MatchedTutor[];
  /** Number of results with score > 0 */
  matchCount: number;
  /** Total tutors evaluated */
  totalCount: number;
  /** Average match score across all tutors */
  averageScore: number;
  /** Highest match score */
  maxScore: number;
}

/**
 * Hook to match tutors based on criteria
 * Automatically sorts by match score descending
 * 
 * @param tutors - Array of tutors to match
 * @param criteria - Matching criteria (required subjects, max price, min rating)
 * @returns Matched tutors with scores and statistics
 * 
 * @example
 * const { matchedTutors } = useTutorMatching(tutors, {
 *   requiredSubjects: ['Toán'],
 *   maxPrice: 200000,
 *   minRating: 4.0
 * })
 */
export function useTutorMatching(
  tutors: Tutor[],
  criteria: MatchingCriteria
): UseTutorMatchingResult {
  const results = useMemo(() => {
    if (tutors.length === 0) {
      return {
        matchedTutors: [],
        matchCount: 0,
        totalCount: 0,
        averageScore: 0,
        maxScore: 0,
      };
    }

    // Score all tutors and get sorted results
    const matchedTutors = scoreTutors(tutors, criteria);

    // Calculate statistics
    const validMatches = matchedTutors.filter(m => m.matchScore.score > 0);
    const matchCount = validMatches.length;
    const scores = matchedTutors.map(m => m.matchScore.score);
    const averageScore =
      scores.length > 0
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100) /
          100
        : 0;
    const maxScore = scores.length > 0 ? Math.max(...scores) : 0;

    return {
      matchedTutors,
      matchCount,
      totalCount: tutors.length,
      averageScore,
      maxScore,
    };
  }, [tutors, criteria]);

  return results;
}

/**
 * Hook to match tutors with filter-aware criteria
 * Combines global filter settings with matching algorithm
 * 
 * @param tutors - Array of tutors to match
 * @param requiredSubjects - Subjects needed
 * @param maxPrice - Maximum budget
 * @returns Matched tutors sorted by score
 * 
 * @example
 * // In a component with global filters
 * const { matchedTutors } = useFilteredTutorMatching(
 *   tutors,
 *   ['Toán', 'Lý'],
 *   200000
 * )
 */
export function useFilteredTutorMatching(
  tutors: Tutor[],
  requiredSubjects: string[],
  maxPrice: number,
  minRating?: number
): UseTutorMatchingResult {
  return useTutorMatching(tutors, {
    requiredSubjects,
    maxPrice,
    minRating,
  });
}
