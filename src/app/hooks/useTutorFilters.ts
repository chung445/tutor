/**
 * Custom Hook for Tutor Filtering
 * Handles complex filtering with AND logic
 * Combines: search, subjects, areas, rating, price
 * Applies sorting
 */

import { useMemo } from "react";
import { Tutor } from "../types/index";
import { useFilter } from "../context/FilterContext";
import { useDebounce } from "./useDebounce";

export function useTutorFilters(tutors: Tutor[]) {
  const { filters } = useFilter();
  
  // Debounce search term for performance
  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  // Filtered and sorted tutors
  const filteredTutors = useMemo(() => {
    let result = [...tutors];

    // Apply search filter (OR logic - name OR subject)
    if (debouncedSearchTerm.trim()) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      result = result.filter(tutor => {
        const nameMatch = tutor.name.toLowerCase().includes(searchLower);
        const subjectMatch = tutor.subjects.some(s =>
          s.toLowerCase().includes(searchLower)
        );
        const emailMatch = tutor.email.toLowerCase().includes(searchLower);
        
        return nameMatch || subjectMatch || emailMatch;
      });
    }

    // Apply subjects filter (AND logic - must have all selected subjects)
    if (filters.selectedSubjects.length > 0) {
      result = result.filter(tutor => {
        // Check if tutor teaches at least one of the selected subjects
        // Change to: tutor teaches ALL selected subjects (stricter filtering)
        return filters.selectedSubjects.some(subject =>
          tutor.subjects.includes(subject)
        );
      });
    }

    // Apply areas filter (AND logic - must be in one of selected areas)
    if (filters.selectedAreas.length > 0) {
      result = result.filter(tutor =>
        filters.selectedAreas.includes(tutor.area)
      );
    }

    // Apply rating filter (AND logic - rating >= minRating)
    if (filters.minRating > 0) {
      result = result.filter(tutor => tutor.rating >= filters.minRating);
    }

    // Apply price range filter (AND logic - price between min and max)
    result = result.filter(
      tutor =>
        tutor.hourlyRate >= filters.priceRange.min &&
        tutor.hourlyRate <= filters.priceRange.max
    );

    // Apply sorting
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

      return filters.sortOrder === "desc" ? compareValue : -compareValue;
    });

    return result;
  }, [tutors, debouncedSearchTerm, filters]);

  return {
    filteredTutors,
    count: filteredTutors.length,
    totalCount: tutors.length,
  };
}
