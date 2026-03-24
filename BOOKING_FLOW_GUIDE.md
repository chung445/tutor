## Complete Booking Flow Guide

### Overview

A complete, production-ready booking system that allows students to book tutors, select time slots, confirm bookings, and view their scheduled sessions.

**Features:**
- ✅ Multi-step booking flow (4 steps)
- ✅ Tutor selection with filtering
- ✅ Date and time slot selection
- ✅ Booking confirmation with summary
- ✅ Success message with next steps
- ✅ Persistent storage (localStorage)
- ✅ View booked sessions page
- ✅ Cancel upcoming bookings
- ✅ Separate upcoming and past bookings

---

### Architecture

#### 1. Types & Context

**Types** (`src/app/types/index.ts`):
```tsx
interface TimeSlot {
  id: string;
  day: "Monday" | "Tuesday" | ... | "Sunday";
  startTime: string;  // "16:00"
  endTime: string;    // "17:00"
  available: boolean;
}

interface Booking {
  id: string;
  tutorId: string;
  userId: string;
  tutorName?: string;
  studentName?: string;
  subject?: string;
  timeSlot: TimeSlot;
  date: string;  // "2026-03-24"
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
  rate?: number;
}
```

**BookingContext** (`src/app/context/BookingContext.tsx`):
- Global state management for bookings
- Persists to localStorage automatically
- Methods: createBooking, cancelBooking, confirmBooking, getBookingsByUser, getBookingsByTutor

#### 2. Services

**BookingService** (`src/app/services/bookingService.ts`):
- `getAvailableTimeSlots(tutorId)` - Returns all available time slots
- `getTimeSlotsByDay(day, tutorId)` - Get slots for specific day
- `formatTimeSlot(slot)` - Format as "16:00 - 17:00"
- `formatDate(date, day)` - Format as "Monday, March 24, 2026"
- `getNextAvailableDates(days)` - Get next 30 days
- `validateBooking(data)` - Validate booking data
- `calculateBookingPrice(tutor, hours)` - Calculate cost

#### 3. Hooks

**useBookingFlow** (`src/app/hooks/useBookingFlow.ts`):
```tsx
const {
  state,           // { step, tutor, date, timeSlot, booking, error, loading }
  selectTutor,     // Select tutor function
  selectDateTime,  // Select date/time function
  confirmBooking,  // Confirm booking function
  resetFlow,       // Reset to start
  goToStep         // Go to specific step
} = useBookingFlow();
```

#### 4. UI Components

**TutorSelector** (`tutor-selector.tsx`)
- Displays list of tutors with cards
- Shows rating, experience, price, subjects
- User can select one tutor

**DateTimeSelector** (`datetime-selector.tsx`)
- Date picker showing next 30 days
- Time slots for selected day
- Shows booking summary

**BookingConfirmation** (`booking-confirmation.tsx`)
- Review all booking details
- Shows tutor info, date, time, price
- Confirm or go back

**BookingSuccess** (`booking-success.tsx`)
- Success message with confirmation
- Booking ID and contact info
- Next steps and pre-booking notes

**BookingFlow** (`booking-flow.tsx`)
- Main container orchestrating all steps
- Progress indicator (1/2/3/4)
- Error handling and display

**BookedSessions** (`booked-sessions.tsx`)
- View all user's bookings
- Separate upcoming and past bookings
- Cancel upcoming bookings
- Empty state handling

---

### Usage Examples

#### Basic Integration

```tsx
import { BookingFlow } from "@/app/components/booking-flow";

export function BookingPage() {
  return (
    <BookingFlow
      onComplete={() => console.log("Booking completed")}
      onViewBookings={() => navigate("/bookings")}
    />
  );
}
```

#### View Booked Sessions

```tsx
import { BookedSessions } from "@/app/components/booked-sessions";

export function MyBookingsPage() {
  return <BookedSessions />;
}
```

#### Direct Hook Usage

```tsx
import { useBookingFlow } from "@/app/hooks/useBookingFlow";

export function CustomBookingFlow() {
  const { state, selectTutor, selectDateTime, confirmBooking } = useBookingFlow();

  // Use state and functions directly
  return (
    <div>
      {state.step === "tutor" && (
        <button onClick={() => selectTutor(tutor)}>Select Tutor</button>
      )}
    </div>
  );
}
```

#### Access Bookings

```tsx
import { useBooking } from "@/app/context/BookingContext";
import { useAuth } from "@/app/context/AuthContext";

export function MyBookings() {
  const { user } = useAuth();
  const { getBookingsByUser } = useBooking();

  const bookings = getBookingsByUser(user?.id || "");

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>
          {booking.tutorName} - {booking.date}
        </div>
      ))}
    </div>
  );
}
```

---

### Booking Flow Steps

#### Step 1: Tutor Selection
- User views list of tutors
- Each tutor shows: avatar, name, rating, experience, price, subjects
- User selects one tutor
- Proceeds to Step 2

#### Step 2: Date & Time Selection
- Calendar shows next 30 days
- User selects a date
- Time slots appear for that day (typically 3-4 slots per weekday)
- User selects a time slot
- Shows booking summary
- Proceeds to Step 3

#### Step 3: Confirmation
- Shows comprehensive booking summary
- Tutor details, date, time, price
- Important notes (cancellation policy, contact info)
- User confirms or goes back
- If confirmed, creates booking and proceeds to Step 4

#### Step 4: Success
- Displays success message with booking ID
- Shows summary and next steps
- Provides tutor contact information
- Buttons to: continue shopping or view bookings

---

### Data Flow

```
User Selection
    ↓
useBookingFlow Hook (manages state)
    ↓
UI Components (TutorSelector → DateTimeSelector → Confirmation → Success)
    ↓
BookingContext.createBooking()
    ↓
localStorage persistence
```

---

### State Management

**BookingFlow State:**
```tsx
{
  step: "tutor" | "dateTime" | "confirm" | "success" | "error";
  tutor: Tutor | null;
  date: string | null;
  timeSlot: TimeSlot | null;
  booking: Booking | null;
  error: string | null;
  loading: boolean;
}
```

**BookingContext Storage:**
```tsx
// Stored in localStorage under key: "tutor_bookings"
[
  {
    id: "booking_1234567890_abc123def45",
    tutorId: "t1",
    userId: "student1@email.com",
    tutorName: "Nguyễn Văn An",
    studentName: "Trần Văn B",
    timeSlot: { id: "slot_1", day: "Monday", startTime: "16:00", ... },
    date: "2026-03-24",
    status: "confirmed",
    createdAt: "2026-03-23T12:34:56.789Z",
    rate: 150000
  },
  // ... more bookings
]
```

---

### Available Time Slots

Predefined slots for each day:
- **Monday-Friday**: 16:00-17:00, 17:00-18:00, 18:00-19:00 (3 slots each day)
- **Saturday**: 09:00-10:00, 10:00-11:00, 14:00-15:00, 15:00-16:00 (4 slots)
- **Sunday**: 09:00-10:00, 10:00-11:00 (2 slots)

**Total**: 17 time slots across the week

To customize, edit `BookingService.getAvailableTimeSlots()`:

```tsx
export function getAvailableTimeSlots(tutorId?: string): TimeSlot[] {
  return [
    {
      id: "slot_custom_1",
      day: "Monday",
      startTime: "08:00",
      endTime: "09:00",
      available: true
    },
    // ... add more slots
  ];
}
```

---

### Booking Lifecycle

1. **Created**: User confirms booking → status = "confirmed"
2. **Active**: Date/time arrives → status remains "confirmed"
3. **Completed**: After session ends → can be marked "completed"
4. **Cancelled**: User cancels before session → status = "cancelled"

---

### Key Features

#### localStorage Persistence
```tsx
// Automatic: bookings saved and loaded on app reload
// Storage key: "tutor_bookings"
// Survives page refresh and browser close
```

#### Booking Validation
```tsx
validateBooking({
  tutorId: "t1",
  userId: "student1",
  timeSlot: { ... },
  date: "2026-03-24"
})
// Returns: { valid: true, errors: [] }
```

#### User Filtering
```tsx
const bookings = getBookingsByUser(userId);
// Returns only bookings for that user
// Excludes cancelled bookings
```

#### Tutor Filtering
```tsx
const bookings = getBookingsByTutor(tutorId);
// Returns bookings assigned to tutor
// Useful for tutor dashboard
```

---

### UI/UX Features

✅ **Progress Indicator**
- Visual 4-step progress bar
- Shows current step
- Completed steps marked with checkmark

✅ **Responsive Design**
- Mobile-friendly layout
- Optimized for all screen sizes
- Touch-friendly buttons

✅ **Accessible**
- Semantic HTML
- Keyboard navigation
- Clear error messages
- Status badges for accessibility

✅ **Error Handling**
- Validation errors
- Required field checks
- User-friendly error messages

✅ **Loading States**
- Loading spinner during confirmation
- Disabled buttons while processing
- Loading message on bookings page

---

### Customization Examples

#### Change Booking Price Calculation

```tsx
// In BookingService
export function calculateBookingPrice(tutor: Tutor, hours: number = 1): number {
  // Current: Simple hourly rate
  return tutor.hourlyRate * hours;

  // Custom: Add surcharge for premium tutors
  const premiumSurcharge = tutor.rating >= 4.8 ? 1.2 : 1.0;
  return tutor.hourlyRate * hours * premiumSurcharge;
}
```

#### Add Booking Notes

```tsx
// Create booking with notes
const booking = await createBooking({
  // ... other fields
  notes: "Student has math difficulty, needs patience"
});
```

#### Custom Time Slots per Tutor

```tsx
// Modify BookingService to check tutor-specific slots
export function getAvailableTimeSlots(tutorId?: string): TimeSlot[] {
  const tutorSlotPreferences = {
    "t1": [/* specific slots */],
    "t2": [/* different slots */]
  };

  if (tutorId && tutorSlotPreferences[tutorId]) {
    return tutorSlotPreferences[tutorId];
  }
  
  return baseSlots;
}
```

---

### Integration with Other Features

#### With Tutor Matching
```tsx
// Use matched tutors in booking
const { matchedTutors } = useTutorMatching(tutors, criteria);
<BookingFlow tutors={matchedTutors} />
```

#### With Filters
```tsx
// Filter tutors before booking
const { filteredTutors } = useTutorFilters(tutors); // Uses FilterContext
// Show filtered tutors in TutorSelector
```

#### With Authentication
```tsx
// Only logged-in students can book
const { user } = useAuth();
if (user?.role !== "student") {
  return <p>Please log in as a student to book</p>;
}
```

---

### Troubleshooting

| Problem | Solution |
|---------|----------|
| Bookings not persisting | Check browser localStorage not disabled |
| Can't select time slot | Verify date is selected first |
| Error on confirmation | Ensure user is logged in |
| Bookings not visible | Check if viewing correct user's bookings |
| Time slots not showing | Check BookingService date logic |

---

### Files Structure

```
src/app/
├── types/index.ts                      ← Booking types
├── context/
│   └── BookingContext.tsx              ← Global state
├── services/
│   └── bookingService.ts               ← Business logic
├── hooks/
│   └── useBookingFlow.ts               ← Booking workflow
└── components/
    ├── tutor-selector.tsx              ← Step 1
    ├── datetime-selector.tsx           ← Step 2
    ├── booking-confirmation.tsx        ← Step 3
    ├── booking-success.tsx             ← Step 4
    ├── booking-flow.tsx                ← Main container
    └── booked-sessions.tsx             ← View bookings
```

---

### Database Schema (Future)

When integrating with a backend:

```sql
CREATE TABLE bookings (
  id VARCHAR(255) PRIMARY KEY,
  tutor_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status VARCHAR(50),
  rate DECIMAL(10, 2),
  created_at TIMESTAMP,
  notes TEXT,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

### Next Steps

1. **Test the flow**: Go through entire booking process
2. **Collect feedback**: Ask users what works/doesn't
3. **Backend integration**: Connect to real database
4. **Notifications**: Add email/SMS confirmations
5. **Advanced features**: Calendar integration, reminders, etc.

---

### Resources

- **Implementation**: [BOOKING_IMPLEMENTATION.md](./BOOKING_IMPLEMENTATION.md)
- **API Reference**: See component props in source files
- **Types**: `src/app/types/index.ts` - `Booking`, `TimeSlot`, `BookingContextType`
