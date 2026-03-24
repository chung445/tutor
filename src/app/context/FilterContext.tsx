/**
 * Filter Context
 * Manages global filter state for tutors
 * Filters persist across page navigation
 */

import React, { createContext, useContext, useState } from "react";

export interface TutorFilters {
  searchTerm: string;
  selectedSubjects: string[];
  selectedAreas: string[];
  minRating: number;
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: "rating" | "price" | "experience" | "name";
  sortOrder: "asc" | "desc";
}

export interface FilterContextType {
  filters: TutorFilters;
  updateSearchTerm: (term: string) => void;
  updateSubjects: (subjects: string[]) => void;
  updateAreas: (areas: string[]) => void;
  updateMinRating: (rating: number) => void;
  updatePriceRange: (min: number, max: number) => void;
  updateSort: (sortBy: "rating" | "price" | "experience" | "name", order?: "asc" | "desc") => void;
  clearFilters: () => void;
  isFiltered: boolean;
}

const INITIAL_FILTERS: TutorFilters = {
  searchTerm: "",
  selectedSubjects: [],
  selectedAreas: [],
  minRating: 0,
  priceRange: {
    min: 0,
    max: 1000000, // 1 million
  },
  sortBy: "rating",
  sortOrder: "desc",
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<TutorFilters>(INITIAL_FILTERS);

  const updateSearchTerm = (term: string) => {
    setFilters(prev => ({ ...prev, searchTerm: term }));
  };

  const updateSubjects = (subjects: string[]) => {
    setFilters(prev => ({ ...prev, selectedSubjects: subjects }));
  };

  const updateAreas = (areas: string[]) => {
    setFilters(prev => ({ ...prev, selectedAreas: areas }));
  };

  const updateMinRating = (rating: number) => {
    setFilters(prev => ({ ...prev, minRating: rating }));
  };

  const updatePriceRange = (min: number, max: number) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min, max },
    }));
  };

  const updateSort = (
    sortBy: "rating" | "price" | "experience" | "name",
    order: "asc" | "desc" = "desc"
  ) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
      sortOrder: order,
    }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const isFiltered =
    filters.searchTerm !== "" ||
    filters.selectedSubjects.length > 0 ||
    filters.selectedAreas.length > 0 ||
    filters.minRating > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 1000000;

  const value: FilterContextType = {
    filters,
    updateSearchTerm,
    updateSubjects,
    updateAreas,
    updateMinRating,
    updatePriceRange,
    updateSort,
    clearFilters,
    isFiltered,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
}
