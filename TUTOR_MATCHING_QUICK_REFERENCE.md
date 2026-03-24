## Tutor Matching Algorithm - Quick Reference

### 5-Minute Integration

#### Step 1: Import the hook

```tsx
import { useTutorMatching } from "@/app/hooks/useTutorMatching";
import { TutorMatchingPanel } from "@/app/components/tutor-matching-panel";
```

#### Step 2: Calculate matches

```tsx
const { matchedTutors } = useTutorMatching(tutors, {
  requiredSubjects: ["Toán"],
  maxPrice: 200000,
  minRating: 4.0
});
```

#### Step 3: Display results

```tsx
<TutorMatchingPanel matchedTutors={matchedTutors} />
```

---

### Score Breakdown Reference

**Total Score Formula:**
```
Score = (Subject × 0.40) + (Rating × 0.30) + (Price × 0.20) + (Availability × 0.10)
```

| Component | Weight | Meaning | Example |
|-----------|--------|---------|---------|
| Subject Match | 40% | % of required subjects tutor teaches | 2/2 subjects = 100% |
| Rating | 30% | Normalized to 0-100 scale | 4.8★ = 96% |
| Price Match | 20% | How good tutor's rate vs budget | 150k (budget 200k) = 100% |
| Availability | 10% | % time tutor is available | 85% available = 85% |

---

### Score Examples

#### Example 1: Excellent Match (95%)
```
Tutor: Nguyễn Văn A
- Subject: Toán (required) → 100%
- Rating: 4.8★ → 96%
- Price: 150k (budget 200k) → 100%
- Availability: 90% → 90%

Score = (100 × 0.4) + (96 × 0.3) + (100 × 0.2) + (90 × 0.1) = 95.8%
Label: 🟢 Rất phù hợp (Excellent)
```

#### Example 2: Good Match (78%)
```
Tutor: Trần Thị B
- Subject: Toán + Hóa (need Toán only) → 100%
- Rating: 4.5★ → 90%
- Price: 180k (budget 200k) → 90%
- Availability: 50% → 50%

Score = (100 × 0.4) + (90 × 0.3) + (90 × 0.2) + (50 × 0.1) = 81.0%
Label: 🟢 Phù hợp (Good)
```

#### Example 3: Acceptable Match (62%)
```
Tutor: Lê Minh C
- Subject: Toán only (need Toán) → 100%
- Rating: 4.0★ → 80%
- Price: 220k (budget 200k) → 0% (exceeds budget!)
- Availability: 95% → 95%

Score = (100 × 0.4) + (80 × 0.3) + (0 × 0.2) + (95 × 0.1) = 57.5%
Label: 🟡 Khá (Acceptable)
```

---

### Hooks Reference

#### `useTutorMatching(tutors, criteria)`

**Parameters:**
```tsx
tutors: Tutor[]
criteria: {
  requiredSubjects: string[]        // Required
  maxPrice: number                  // Required
  minRating?: number                // Optional (e.g., 4.0)
}
```

**Returns:**
```tsx
{
  matchedTutors: MatchedTutor[]     // Sorted by score DESC
  matchCount: number                // Count of tutors with score > 0
  totalCount: number                // Total tutors evaluated
  averageScore: number              // Average score
  maxScore: number                  // Highest score
}
```

---

### Components Reference

#### `TutorMatchingPanel`

**Props:**
```tsx
<TutorMatchingPanel
  matchedTutors={matchedTutors}
  showScoreBreakdown={true}
  emptyMessage="Không tìm thấy gia sư phù hợp"
/>
```

**Display Features:**
- ✅ Match score with color coding (🔴🟡🟢)
- ✅ Score breakdown by category
- ✅ Tutor stats (rating, experience, price)
- ✅ Subjects and availability bar
- ✅ Contact information

---

### Utility Functions Reference

```tsx
import {
  calculateSubjectMatch,       // Individual component scores
  calculateRatingScore,
  calculatePriceMatch,
  calculateAvailabilityScore,
  
  calculateTutorScore,         // Complete scoring
  scoreTutors,                // Batch scoring & sorting
  
  formatScoreDisplay           // UI formatting
} from "@/app/utils/tutorMatching";
```

**Quick Examples:**
```tsx
// Get individual scores
calculateSubjectMatch(["Toán"], tutor)           // → 0-100
calculateRatingScore(4.8)                        // → 96
calculatePriceMatch(150000, 200000)              // → 100
calculateAvailabilityScore(tutor)                // → 0-100

// Get complete score for one tutor
const score = calculateTutorScore(tutor, {
  requiredSubjects: ["Toán"],
  maxPrice: 200000,
  minRating: 4.0
});
// Returns: { tutorId, score: 85.3, scoreBreakdown: {...} }

// Score and sort multiple tutors
const ranked = scoreTutors(tutors, criteria);
// Returns: [{ tutor, matchScore }, ...] sorted by score DESC

// Format for UI display
const { percentage, color, label } = formatScoreDisplay(85.3);
// Returns: { percentage: "85.3%", color: "text-green-600", label: "Phù hợp" }
```

---

### Common Patterns

#### Pattern 1: Dynamic Form with Real-time Matching

```tsx
export function QuickMatchForm() {
  const [subject, setSubject] = React.useState("Toán");
  const [budget, setBudget] = React.useState(200000);
  
  const tutors = DataService.getTutors();
  const { matchedTutors } = useTutorMatching(tutors, {
    requiredSubjects: [subject],
    maxPrice: budget
  });

  return (
    <div>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option>Toán</option>
        <option>Lý</option>
        {/* ... */}
      </select>
      
      <input
        type="range"
        min="100000"
        max="500000"
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      
      <TutorMatchingPanel matchedTutors={matchedTutors} />
    </div>
  );
}
```

#### Pattern 2: Class Auto-Assignment

```tsx
export function autoAssignBestTutor(class_: Class) {
  const tutors = DataService.getTutors();
  
  const { matchedTutors } = useTutorMatching(tutors, {
    requiredSubjects: [class_.subject],
    maxPrice: class_.maxFee,
    minRating: 4.5  // High quality threshold
  });

  // Auto-assign if good match available
  if (matchedTutors.length > 0 && matchedTutors[0].matchScore.score >= 80) {
    const bestTutor = matchedTutors[0].tutor;
    return createContract(class_.id, bestTutor.id);
  }

  return null; // Manual assignment needed
}
```

#### Pattern 3: Comparison View

```tsx
export function TutorComparison({ tutors: selectedTutors }) {
  const { matchedTutors } = useTutorMatching(selectedTutors, {
    requiredSubjects: ["Toán"],
    maxPrice: 200000
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Gia sư</th>
          <th>Điểm</th>
          <th>Đánh giá</th>
          <th>Giá</th>
          <th>Sự có mặt</th>
        </tr>
      </thead>
      <tbody>
        {matchedTutors.map(({ tutor, matchScore }) => (
          <tr key={tutor.id}>
            <td>{tutor.name}</td>
            <td>{matchScore.score.toFixed(1)}%</td>
            <td>{tutor.rating}★</td>
            <td>{tutor.hourlyRate}đ</td>
            <td>{tutor.availability}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

---

### Score Interpretation Guide

| Score | Color | Recommendation | Next Action |
|-------|-------|-----------------|------------|
| **90-100** | 🟢 Green | ⭐⭐⭐⭐⭐ Excellent | Hire immediately |
| **80-89** | 🟢 Green | ⭐⭐⭐⭐ Very Good | Strongly recommended |
| **70-79** | 🟢 Green | ⭐⭐⭐ Good | Good option |
| **60-69** | 🟡 Yellow | ⭐⭐ Acceptable | Consider other options |
| **50-59** | 🟠 Orange | ⭐ Possible | Keep as backup |
| **< 50** | 🔴 Red | ❌ Poor | Not recommended |

---

### Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| All scores 0% | `minRating` too high | Lower `minRating` or remove it |
| All scores identical | No variation in data | Check if tutors have different ratings/prices |
| Performance slow | Too many tutors | Pre-filter with `minRating` |
| Scores too high | Weights wrong | Review `calculateTutorScore()` weights |
| Unexpected rankings | Price is negative factor | Ensure `maxPrice >= tutor.hourlyRate` |

---

### File Locations

```
src/app/
├── utils/tutorMatching.ts              ← Core algorithm
├── hooks/useTutorMatching.ts           ← React hook
├── components/tutor-matching-panel.tsx ← UI component
└── types/index.ts                      ← TutorMatchScore type
```

---

### Next: Integration Checklist

- [ ] Import hook in your component
- [ ] Pass tutors and criteria to `useTutorMatching()`
- [ ] Display with `TutorMatchingPanel` OR build custom UI
- [ ] Test with different criteria values
- [ ] Adjust weights if needed
- [ ] Add to your student request flow
- [ ] Consider auto-matching for admin dashboard

---

### Resources

- **Full Guide:** [TUTOR_MATCHING_GUIDE.md](TUTOR_MATCHING_GUIDE.md)
- **Types:** `src/app/types/index.ts` - `TutorMatchScore` interface
- **Example:** See source component files for implementation details
