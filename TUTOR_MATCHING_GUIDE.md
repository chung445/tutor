## Tutor Matching Algorithm Guide

### Overview

The tutor matching algorithm provides intelligent tutor matching based on multiple criteria. It calculates a **matching score (0-100)** for each tutor based on:

- **Subject Match (40%)** - How many required subjects the tutor teaches
- **Rating (30%)** - Tutor's overall rating (normalized to 0-100 scale)
- **Price Match (20%)** - How close tutor's rate is to your budget
- **Availability (10%)** - Percentage of time tutor is available

The algorithm uses **weighted scoring** to balance all factors and return tutors sorted by match score (highest first).

---

### Quick Start: 30 Seconds

```tsx
import { useTutorMatching } from "@/app/hooks/useTutorMatching";
import { TutorMatchingPanel } from "@/app/components/tutor-matching-panel";

export function TutorMatchPage() {
  const tutors = [
    { id: "t1", name: "Nguyễn Văn A", subjects: ["Toán"], rating: 4.8, hourlyRate: 150000, availability: 85, ... }
  ];

  const { matchedTutors } = useTutorMatching(tutors, {
    requiredSubjects: ["Toán"],
    maxPrice: 200000,
    minRating: 4.0
  });

  return <TutorMatchingPanel matchedTutors={matchedTutors} />;
}
```

---

### Detailed Usage

#### 1. Hook: `useTutorMatching()`

```tsx
import { useTutorMatching } from "@/app/hooks/useTutorMatching";

const { matchedTutors, matchCount, averageScore, maxScore } = useTutorMatching(
  tutors,
  {
    requiredSubjects: ["Toán", "Lý"],
    maxPrice: 200000,
    minRating: 4.0  // Optional
  }
);

// matchedTutors: Sorted array of tutors with match scores
// matchCount: Number of tutors with score > 0
// averageScore: Average score across all tutors
// maxScore: Highest match score
```

#### 2. Component: `TutorMatchingPanel`

```tsx
import { TutorMatchingPanel } from "@/app/components/tutor-matching-panel";

<TutorMatchingPanel
  matchedTutors={matchedTutors}
  showScoreBreakdown={true}           // Show score details
  emptyMessage="Không tìm thấy gia sư" // Custom empty message
/>
```

---

### Understanding Match Scores

#### Score Calculation

```
Total Score = (Subject × 0.40) + (Rating × 0.30) + (Price × 0.20) + (Availability × 0.10)
```

**Example:**
- Subject Match: 100 (teaches all required subjects)
- Rating Score: 96 (4.8 rating → 96%)
- Price Match: 80 (within budget, not the cheapest)
- Availability: 85 (85% available)

```
Score = (100 × 0.40) + (96 × 0.30) + (80 × 0.20) + (85 × 0.10)
      = 40 + 28.8 + 16 + 8.5
      = 93.3
```

#### Score Interpretation

| Score | Color | Label | Meaning |
|-------|-------|-------|---------|
| 80-100 | 🟢 Green | Rất phù hợp | Excellent match |
| 70-79 | 🟢 Light Green | Phù hợp | Good match |
| 60-69 | 🟡 Yellow | Khá | Decent match |
| 50-59 | 🟠 Orange | Tạm được | Acceptable |
| < 50 | 🔴 Red | Không phù hợp | Poor match |

---

### Scoring Details

#### Subject Match (40%)

Calculates what percentage of required subjects the tutor teaches.

```tsx
requiredSubjects: ["Toán", "Lý"]

Tutor A teaches: ["Toán", "Lý", "Hóa"]    → 100% (2/2 subjects)
Tutor B teaches: ["Toán"]                 → 50%  (1/2 subjects)
Tutor C teaches: ["Văn"]                  → 0%   (0/2 subjects)
```

**Edge Case:** If no subjects specified, score = 100 (perfect match)

---

#### Rating Score (30%)

Normalizes tutor's rating (0-5 scale) to 0-100 percentage scale.

```tsx
Formula: (rating / 5) * 100

5.0 stars → 100%
4.8 stars → 96%
4.5 stars → 90%
3.0 stars → 60%
```

---

#### Price Match (20%)

Compares tutor's hourly rate against your budget.

```tsx
Budget: 200,000 VND

Tutor charges 150,000 → 100% (good deal, 25% cheaper)
Tutor charges 160,000 → 100% (within 80% threshold)
Tutor charges 180,000 → 90%  (within budget)
Tutor charges 200,000 → 45%  (at exact budget limit)
Tutor charges 220,000 → 0%   (exceeds budget)

Formula:
- If rate > budget: score = 0
- If rate ≤ budget × 0.8: score = 100
- Otherwise: score = (1 - rate/budget) × 100
```

---

#### Availability Score (10%)

Uses the tutor's availability percentage directly.

```tsx
Tutor A: 95% available → 95%
Tutor B: 50% available → 50%
Tutor C: unspecified    → 90% (default fallback)
```

---

### Utility Functions

Use these directly if you need fine-grained control:

```tsx
import {
  calculateSubjectMatch,
  calculateRatingScore,
  calculatePriceMatch,
  calculateAvailabilityScore,
  calculateTutorScore,
  scoreTutors,
  formatScoreDisplay
} from "@/app/utils/tutorMatching";

// Calculate individual scores
const subjectScore = calculateSubjectMatch(["Toán"], tutor);  // 0-100
const ratingScore = calculateRatingScore(tutor.rating);       // 0-100
const priceScore = calculatePriceMatch(tutor.hourlyRate, 200000); // 0-100
const availScore = calculateAvailabilityScore(tutor);         // 0-100

// Calculate full score for a tutor
const fullScore = calculateTutorScore(tutor, {
  requiredSubjects: ["Toán"],
  maxPrice: 200000,
  minRating: 4.0
});
// Returns: { tutorId, score, scoreBreakdown: { subjectMatch, ratingScore, priceMatch, availabilityScore } }

// Score multiple tutors at once
const ranked = scoreTutors(tutors, {
  requiredSubjects: ["Toán"],
  maxPrice: 200000
});
// Returns: [{ tutor, matchScore }, ...] sorted by score DESC

// Format score for UI display
const display = formatScoreDisplay(93.3);
// Returns: { percentage: "93.3%", color: "text-green-600", label: "Rất phù hợp" }
```

---

### Integration Examples

#### Example 1: Student Requesting a Tutor

```tsx
import { useTutorMatching } from "@/app/hooks/useTutorMatching";
import { DataService } from "@/app/services/dataService";
import { TutorMatchingPanel } from "@/app/components/tutor-matching-panel";

export function StudentRequestPage() {
  const [subject, setSubject] = React.useState("Toán");
  const [budget, setBudget] = React.useState(200000);

  const tutors = DataService.getTutors();
  const { matchedTutors } = useTutorMatching(tutors, {
    requiredSubjects: [subject],
    maxPrice: budget
  });

  return (
    <div className="space-y-6">
      <div>
        <label>Chọn môn học</label>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>
          {["Toán", "Lý", "Hóa", "Văn", "Tiếng Anh"].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Ngân sách tối đa</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
        />
      </div>

      <TutorMatchingPanel matchedTutors={matchedTutors} />
    </div>
  );
}
```

#### Example 2: Admin Dashboard with Multiple Filters

```tsx
import { useTutorMatching } from "@/app/hooks/useTutorMatching";
import { useFilter } from "@/app/context/FilterContext";
import { DataService } from "@/app/services/dataService";

export function AdminTutorDashboard() {
  const { filters } = useFilter();
  const tutors = DataService.getTutors();

  const { matchedTutors, matchCount, averageScore } = useTutorMatching(tutors, {
    requiredSubjects: filters.selectedSubjects.length > 0 
      ? filters.selectedSubjects 
      : undefined, // Optional
    maxPrice: filters.priceRange.max,
    minRating: filters.minRating
  });

  return (
    <div>
      <div className="mb-4 p-4 bg-blue-100 rounded">
        <p>Kết quả: {matchCount} gia sư | Điểm trung bình: {averageScore.toFixed(1)}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedTutors.map(({ tutor, matchScore }) => (
          <div key={tutor.id} className="p-4 border rounded">
            <h3>{tutor.name}</h3>
            <p>Điểm phù hợp: {matchScore.score.toFixed(1)}%</p>
            <p>Đánh giá: {tutor.rating} ⭐</p>
            <p>Giá: {tutor.hourlyRate.toLocaleString()}đ/h</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

#### Example 3: Auto-Matching Class to Tutors

```tsx
import { calculateTutorScore } from "@/app/utils/tutorMatching";
import { DataService } from "@/app/services/dataService";

export function autoMatchClassToTutor(class_: Class) {
  const tutors = DataService.getTutors();
  
  // Score each tutor for this class
  const scores = tutors.map(tutor => ({
    tutor,
    score: calculateTutorScore(tutor, {
      requiredSubjects: [class_.subject],
      maxPrice: class_.maxFee,
      minRating: 4.0 // Prefer highly-rated tutors
    })
  }));

  // Find best match
  const best = scores.sort((a, b) => b.score.score - a.score.score)[0];
  
  if (best && best.score.score >= 70) {
    // Auto-assign if quality match found
    return best.tutor;
  }
  
  return null; // Manual assignment needed
}
```

---

### Customization

#### Adjusting Weights

To change the weight percentages, modify `calculateTutorScore()` in `tutorMatching.ts`:

```tsx
// Current: Subject 40%, Rating 30%, Price 20%, Availability 10%
const finalScore =
  subjectMatch * 0.40 +      // ← Change to 0.50 for 50% weight
  ratingScore * 0.30 +
  priceMatch * 0.20 +
  availabilityScore * 0.10;

// Example: Prioritize subject match and rating
const finalScore =
  subjectMatch * 0.50 +      // 50% - More important
  ratingScore * 0.35 +       // 35% - More important
  priceMatch * 0.10 +        // 10% - Less important
  availabilityScore * 0.05;  // 5% - Less important
```

#### Customizing Price Match Logic

```tsx
// Current: Perfect match if ≤80% of budget
if (tutorHourlyRate <= maxBudget * 0.8) return 100;

// Alternative: Allow up to 100% of budget for perfect match
if (tutorHourlyRate <= maxBudget) return 100;

// Alternative: Strict - only 50% of budget for perfect match
if (tutorHourlyRate <= maxBudget * 0.5) return 100;
```

#### Customizing Minimum Rating Requirement

```tsx
// Fail if rating requirement not met
if (criteria.minRating && tutor.rating < criteria.minRating) {
  return { score: 0, ... }; // Current behavior
}

// Alternative: Penalize instead of fail
if (criteria.minRating && tutor.rating < criteria.minRating) {
  const penaltyScore = (tutor.rating / criteria.minRating) * 50; // Max 50%
  // Continue with calculation but apply penalty
}
```

---

### Performance Notes

- **Memoization:** `useTutorMatching()` uses `useMemo` to prevent recalculations
- **Sorting:** O(n log n) complexity for sorting tutors
- **Typical Performance:** Scoring 50-100 tutors takes < 1ms

---

### Testing Examples

```tsx
// Unit test for subject matching
import { calculateSubjectMatch } from "@/app/utils/tutorMatching";

const tutor = {
  subjects: ["Toán", "Lý"],
  // ...
};

expect(calculateSubjectMatch(["Toán"], tutor)).toBe(100);      // Teaches Toán
expect(calculateSubjectMatch(["Toán", "Hóa"], tutor)).toBe(50); // Only Toán, not Hóa
expect(calculateSubjectMatch(["Văn"], tutor)).toBe(0);         // Doesn't teach Văn

// Integration test
import { scoreTutors } from "@/app/utils/tutorMatching";

const ranked = scoreTutors([tutor1, tutor2, tutor3], {
  requiredSubjects: ["Toán"],
  maxPrice: 200000
});

expect(ranked[0].matchScore.score).toBeGreaterThan(ranked[1].matchScore.score);
expect(ranked.every(m => m.matchScore.score >= 0 && m.matchScore.score <= 100)).toBe(true);
```

---

### Files Structure

```
src/app/
├── utils/
│   ├── tutorMatching.ts       ← Core algorithm
│   └── index.ts               ← Exports
├── hooks/
│   ├── useTutorMatching.ts    ← React hook
│   └── index.ts               ← Exports
├── components/
│   ├── tutor-matching-panel.tsx ← UI component
│   └── ...
└── types/
    └── index.ts              ← TutorMatchScore type
```

---

### Troubleshooting

**Problem:** All tutors getting 0% score
- **Solution:** Check `minRating` requirement isn't too high, or remove `minRating` filter

**Problem:** Scores all exactly the same
- **Solution:** Likely no score breakdown diversity - check if tutors have different ratings/prices

**Problem:** Performance degradation with many tutors
- **Solution:** Use `minRating` filter to pre-filter tutors before matching

---

### API Reference

| Function | Purpose | Parameters | Returns |
|----------|---------|-----------|---------|
| `calculateSubjectMatch()` | Score subject expertise | requiredSubjects[], tutor | number (0-100) |
| `calculateRatingScore()` | Normalize rating | rating | number (0-100) |
| `calculatePriceMatch()` | Score price fit | tutorRate, maxBudget | number (0-100) |
| `calculateAvailabilityScore()` | Score availability | tutor | number (0-100) |
| `calculateTutorScore()` | Full score calculation | tutor, criteria | TutorMatchScore |
| `scoreTutors()` | Score & sort all | tutors[], criteria | [{ tutor, matchScore }] |
| `formatScoreDisplay()` | UI formatting | score | { percentage, color, label } |
| `useTutorMatching()` | React hook | tutors[], criteria | { matchedTutors, matchCount, stats } |
| `useFilteredTutorMatching()` | Hook with params | tutors, subjects, price, rating | UseTutorMatchingResult |

---

### Next Steps

1. **Display in existing components:** Integrate `TutorMatchingPanel` into your tutor search pages
2. **Collect user feedback:** Adjust weights based on what users prefer
3. **Add to database:** Store tutor availability as a field
4. **Real-time updates:** Match scores update as user adjusts filters
5. **Advanced features:** Add geographic distance, schedule compatibility, etc.
