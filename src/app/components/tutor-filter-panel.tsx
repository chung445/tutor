/**
 * Tutor Filter Panel Component
 * Advanced filtering UI for tutors with:
 * - Search with debounce
 * - Subject filter (multi-select)
 * - Area filter (multi-select)
 * - Rating filter (min rating)
 * - Price range filter
 * - Sort options
 * - Clear filters button
 */

import { useState } from "react";
import { useFilter } from "../context/FilterContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Search, X, RotateCcw } from "lucide-react";

interface TutorFilterPanelProps {
  uniqueSubjects: string[];
  uniqueAreas: string[];
  minPrice?: number;
  maxPrice?: number;
}

export function TutorFilterPanel({
  uniqueSubjects,
  uniqueAreas,
  minPrice = 0,
  maxPrice = 1000000,
}: TutorFilterPanelProps) {
  const {
    filters,
    updateSearchTerm,
    updateSubjects,
    updateAreas,
    updateMinRating,
    updatePriceRange,
    updateSort,
    clearFilters,
    isFiltered,
  } = useFilter();

  const [expandedSections, setExpandedSections] = useState({
    search: true,
    subjects: true,
    areas: true,
    rating: true,
    price: true,
    sort: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = filters.selectedSubjects.includes(subject)
      ? filters.selectedSubjects.filter(s => s !== subject)
      : [...filters.selectedSubjects, subject];
    updateSubjects(newSubjects);
  };

  const handleAreaToggle = (area: string) => {
    const newAreas = filters.selectedAreas.includes(area)
      ? filters.selectedAreas.filter(a => a !== area)
      : [...filters.selectedAreas, area];
    updateAreas(newAreas);
  };

  const handlePriceChange = (values: number[]) => {
    if (values.length === 2) {
      updatePriceRange(values[0], values[1]);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Bộ Lọc Gia Sư</CardTitle>
            <CardDescription>
              {isFiltered ? "Đã áp dụng" : "Chưa áp dụng"} bộ lọc
            </CardDescription>
          </div>
          {isFiltered && (
            <Button
              onClick={clearFilters}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <RotateCcw className="w-4 h-4" />
              Xóa Lọc
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <button
            onClick={() => toggleSection("search")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">Tìm Kiếm</h3>
            <span className="text-sm text-gray-500">
              {expandedSections.search ? "−" : "+"}
            </span>
          </button>
          {expandedSections.search && (
            <div className="mt-3 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm theo tên, môn học..."
                value={filters.searchTerm}
                onChange={(e) => updateSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
        </div>

        {/* Subjects */}
        <div>
          <button
            onClick={() => toggleSection("subjects")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">
              Môn Học {filters.selectedSubjects.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.selectedSubjects.length}
                </Badge>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedSections.subjects ? "−" : "+"}
            </span>
          </button>
          {expandedSections.subjects && (
            <div className="mt-3 space-y-2 flex flex-wrap gap-2">
              {uniqueSubjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.selectedSubjects.includes(subject)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Areas */}
        <div>
          <button
            onClick={() => toggleSection("areas")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">
              Khu Vực {filters.selectedAreas.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.selectedAreas.length}
                </Badge>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedSections.areas ? "−" : "+"}
            </span>
          </button>
          {expandedSections.areas && (
            <div className="mt-3 space-y-2 flex flex-wrap gap-2">
              {uniqueAreas.map(area => (
                <button
                  key={area}
                  onClick={() => handleAreaToggle(area)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filters.selectedAreas.includes(area)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rating Filter */}
        <div>
          <button
            onClick={() => toggleSection("rating")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">
              Xếp Hạng Tối Thiểu {filters.minRating > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.minRating.toFixed(1)}⭐
                </Badge>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedSections.rating ? "−" : "+"}
            </span>
          </button>
          {expandedSections.rating && (
            <div className="mt-3 space-y-3">
              {[0, 3, 3.5, 4, 4.5, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => updateMinRating(rating)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    filters.minRating === rating
                      ? "bg-blue-100 text-blue-900"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {rating === 0 ? "Tất cả" : `${rating}⭐ trở lên`}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">
              Khoảng Giá {(filters.priceRange.min > 0 || filters.priceRange.max < maxPrice) && (
                <Badge variant="secondary" className="ml-2">
                  {filters.priceRange.min.toLocaleString()}₫ - {filters.priceRange.max.toLocaleString()}₫
                </Badge>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedSections.price ? "−" : "+"}
            </span>
          </button>
          {expandedSections.price && (
            <div className="mt-3 space-y-4">
              <Slider
                min={minPrice}
                max={maxPrice}
                step={10000}
                value={[filters.priceRange.min, filters.priceRange.max]}
                onValueChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  {filters.priceRange.min.toLocaleString()}₫
                </span>
                <span className="text-gray-600">
                  {filters.priceRange.max.toLocaleString()}₫
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div>
          <button
            onClick={() => toggleSection("sort")}
            className="w-full flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded"
          >
            <h3 className="font-semibold text-gray-900">
              Sắp Xếp {filters.sortBy !== "rating" && (
                <Badge variant="secondary" className="ml-2">
                  {filters.sortBy}
                </Badge>
              )}
            </h3>
            <span className="text-sm text-gray-500">
              {expandedSections.sort ? "−" : "+"}
            </span>
          </button>
          {expandedSections.sort && (
            <div className="mt-3 space-y-2">
              {(["rating", "price", "experience", "name"] as const).map(sortOption => (
                <button
                  key={sortOption}
                  onClick={() => {
                    updateSort(
                      sortOption,
                      filters.sortBy === sortOption && filters.sortOrder === "desc"
                        ? "asc"
                        : "desc"
                    );
                  }}
                  className={`w-full text-left px-3 py-2 rounded transition-colors text-sm ${
                    filters.sortBy === sortOption
                      ? "bg-blue-100 text-blue-900 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="capitalize">
                      {sortOption === "rating"
                        ? "Xếp Hạng"
                        : sortOption === "price"
                        ? "Giá"
                        : sortOption === "experience"
                        ? "Kinh Nghiệm"
                        : "Tên"}
                    </span>
                    {filters.sortBy === sortOption && (
                      <span>
                        {filters.sortOrder === "desc" ? "↓" : "↑"}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
