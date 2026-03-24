# Quick Integration Guide - Tutor Filtering

## 🚀 5-Minute Setup

### Step 1: Wrap App with FilterProvider
✅ **Already done** in `src/main.tsx`

```typescript
<AuthProvider>
  <FilterProvider>
    <App />
  </FilterProvider>
</AuthProvider>
```

### Step 2: Use in Your Component

**Option A: Use Pre-built Filter Panel** (Easiest)

```typescript
import { TutorFilterPanel } from "../components/tutor-filter-panel";
import { useTutorFilters } from "../hooks/useTutorFilters";
import { DataService } from "../services/dataService";

export function MyPage() {
  const tutors = DataService.getTutors();
  const filterOptions = DataService.getFilterOptions();
  const { filteredTutors, count } = useTutorFilters(tutors);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Panel */}
      <aside className="lg:col-span-1">
        <TutorFilterPanel
          uniqueSubjects={filterOptions.subjects}
          uniqueAreas={filterOptions.areas}
          maxPrice={filterOptions.priceRange.max}
        />
      </aside>

      {/* Results */}
      <main className="lg:col-span-3">
        <h2>Found {count} tutors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTutors.map(tutor => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </main>
    </div>
  );
}
```

**Option B: Custom Filter UI**

```typescript
import { useFilter } from "../context/FilterContext";
import { useTutorFilters } from "../hooks/useTutorFilters";

export function MyPage() {
  const tutors = DataService.getTutors();
  const { filters, updateSearchTerm, updateSubjects } = useFilter();
  const { filteredTutors } = useTutorFilters(tutors);

  return (
    <div>
      {/* Custom Filter UI */}
      <input
        onChange={(e) => updateSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      {/* Display Results */}
      {filteredTutors.map(tutor => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
```

## 📋 Common Tasks

### Display Filter Count
```typescript
const { isFiltered } = useFilter();

{isFiltered && <span className="badge">Filters active</span>}
```

### Clear Filters
```typescript
const { clearFilters } = useFilter();

<button onClick={clearFilters}>Reset All Filters</button>
```

### Get Current Filters
```typescript
const { filters } = useFilter();

console.log(filters.searchTerm);
console.log(filters.selectedSubjects);
console.log(filters.priceRange);
```

### Update Multiple Filters
```typescript
const {
  updateSearchTerm,
  updateSubjects,
  updatePriceRange,
} = useFilter();

// User clicks "Budget Tutors" button
const handleBudgetFilter = () => {
  updateSubjects(["Toán"]);
  updatePriceRange(0, 200000);
};
```

## 🎯 Example: Update public-tutors.tsx

Replace the current filtering with the new system:

```typescript
import { TutorFilterPanel } from "./tutor-filter-panel";
import { useTutorFilters } from "../hooks/useTutorFilters";
import { DataService } from "../services/dataService";

export default function PublicTutors({ tutors }: { tutors: Tutor[] }) {
  const options = DataService.getFilterOptions();
  const { filteredTutors, count } = useTutorFilters(tutors);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tìm Gia Sư</h1>
        <p className="text-gray-600 mt-2">
          Khám phá danh sách gia sư có kinh nghiệm trong hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filter Panel */}
        <aside className="lg:col-span-1">
          <TutorFilterPanel
            uniqueSubjects={options.subjects}
            uniqueAreas={options.areas}
            maxPrice={options.priceRange.max}
          />
        </aside>

        {/* Results */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Kết Quả ({count}/{tutors.length})
            </h2>
          </div>

          {filteredTutors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Không tìm thấy gia sư phù hợp</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTutors.map(tutor => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
```

## 🎨 Example: Update tutor-matching.tsx

```typescript
import { TutorFilterPanel } from "./tutor-filter-panel";
import { useTutorFilters } from "../hooks/useTutorFilters";
import { DataService } from "../services/dataService";

export function TutorMatching({
  tutors,
  classes,
  setClasses,
  // ... other props
}: TutorMatchingProps) {
  const options = DataService.getFilterOptions();
  const { filteredTutors } = useTutorFilters(tutors);
  const unassignedClasses = classes.filter(c => c.status === "unassigned");

  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [selectedClass, setSelectedClass] = useState<string>("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Filter Panel */}
      <aside className="lg:col-span-1">
        <TutorFilterPanel
          uniqueSubjects={options.subjects}
          uniqueAreas={options.areas}
          maxPrice={options.priceRange.max}
        />
      </aside>

      {/* Matching Form */}
      <main className="lg:col-span-3">
        <Card>
          <CardHeader>
            <CardTitle>Ghép Cặp Gia Sư</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Tutor selection */}
            <div>
              <label>Chọn Gia Sư</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {filteredTutors.map(tutor => (
                  <button
                    key={tutor.id}
                    onClick={() => setSelectedTutor(tutor)}
                    className={`p-4 border rounded ${
                      selectedTutor?.id === tutor.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="font-semibold">{tutor.name}</p>
                    <p className="text-sm text-gray-600">
                      {tutor.hourlyRate.toLocaleString()}₫/giờ
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Class selection and assignment */}
            {/* ... rest of form */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
```

## 🔧 Without Pre-built Panel

If you want to build custom filter UI:

```typescript
import { useFilter } from "../context/FilterContext";

function CustomFilterUI() {
  const {
    filters,
    updateSearchTerm,
    updateSubjects,
    updateAreas,
    updateMinRating,
    updatePriceRange,
    clearFilters,
  } = useFilter();

  return (
    <div>
      {/* Search */}
      <input
        value={filters.searchTerm}
        onChange={(e) => updateSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      {/* Subject checkboxes */}
      {["Toán", "Lý", "Hóa"].map(subject => (
        <label key={subject}>
          <input
            type="checkbox"
            checked={filters.selectedSubjects.includes(subject)}
            onChange={(e) => {
              if (e.target.checked) {
                updateSubjects([...filters.selectedSubjects, subject]);
              } else {
                updateSubjects(
                  filters.selectedSubjects.filter(s => s !== subject)
                );
              }
            }}
          />
          {subject}
        </label>
      ))}

      {/* Price range input */}
      <input
        min="0"
        max="1000000"
        step="10000"
        type="range"
        onChange={(e) =>
          updatePriceRange(0, parseInt(e.target.value))
        }
      />

      {/* Clear button */}
      <button onClick={clearFilters}>Clear Filters</button>
    </div>
  );
}
```

## 🚦 Testing the System

### Test in Browser DevTools

```javascript
// Get current filters
localStorage.getItem("tutorFilters") // if persistence added

// Check if filtering is working
// 1. Open browser DevTools
// 2. Go to the page with filters
// 3. Change filters
// 4. Verify results update instantly
// 5. Navigate to another page
// 6. Filters should persist!
```

### Test Cases to Try

1. ✅ Search for "Toán" - results update with debounce
2. ✅ Select subject - only that subject shows
3. ✅ Select area - only that area shows
4. ✅ Combine subject + area - both filters apply (AND)
5. ✅ Set rating - only high-rated tutors show
6. ✅ Set price range - only tutors in range show
7. ✅ Clear filters - all tutors return
8. ✅ Navigate away and back - filters still there!

## 🐛 Troubleshooting

### Filters not working?
- Check that `FilterProvider` wraps your app in `src/main.tsx`
- Verify `useTutorFilters` hook is being used
- Check browser console for errors

### Search not responsive?
- Normal! It's debounced (300ms delay)
- Type something and wait 300ms
- The filter should update then

### Filters reset on page refresh?
- This is expected (state not persisted to localStorage)
- To fix: Add localStorage persistence code to FilterContext

### Performance issues?
- Check if using `useMemo` in custom components
- Ensure debounce is set appropriately
- Profile with React DevTools

## 📞 Next Steps

1. ✅ Import `TutorFilterPanel` in your components
2. ✅ Use `useTutorFilters` hook to get filtered results
3. ✅ Test filters work correctly
4. ✅ Optionally customize filter UI
5. ✅ When connecting to real API, use `DataService.advancedFilterTutors()`

---

**You're all set!** The filtering system is ready to use. Start with TutorFilterPanel and useTutorFilters in your components.
