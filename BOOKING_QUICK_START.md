## Booking Flow - Quick Start (5 Minutes)

### Installation

Already integrated! Just add to your page:

```tsx
import { BookingFlow } from "@/app/components/booking-flow";

export function BookingPage() {
  return <BookingFlow />;
}
```

---

### What Happens

**Step 1: Tutor Selection**
- User sees list of tutors
- Selects one
- Proceeds to Step 2

**Step 2: Date & Time**
- Calendar shows next 30 days
- User picks date
- Selects time slot
- Proceeds to Step 3

**Step 3: Confirmation**
- Reviews booking details
- Price shown
- Important notes displayed
- Confirms and proceeds

**Step 4: Success**
- Success message
- Booking ID shown
- Next steps explained
- Can view bookings or continue

---

### View Booked Sessions

```tsx
import { BookedSessions } from "@/app/components/booked-sessions";

<BookedSessions />
```

Shows:
- ✅ Upcoming bookings
- ✅ Past bookings
- ✅ Cancel option for upcoming
- ✅ Tutor contact info

---

### Booking Data

Data stored in `localStorage` as:
```json
{
  "id": "booking_1234567890_abc123",
  "tutorId": "t1",
  "userId": "student@email.com",
  "tutorName": "Nguyễn Văn An",
  "studentName": "Trần Văn B",
  "date": "2026-03-24",
  "timeSlot": {
    "id": "slot_1",
    "day": "Monday",
    "startTime": "16:00",
    "endTime": "17:00"
  },
  "status": "confirmed",
  "rate": 150000,
  "createdAt": "2026-03-23T12:34:56.789Z"
}
```

Persists across page refreshes automatically.

---

### Hook Usage

```tsx
import { useBooking } from "@/app/context/BookingContext";
import { useAuth } from "@/app/context/AuthContext";

function MyComponent() {
  const { user } = useAuth();
  const { getBookingsByUser, cancelBooking } = useBooking();

  const bookings = getBookingsByUser(user?.id || "");

  return (
    <div>
      {bookings.map(booking => (
        <div key={booking.id}>
          {booking.tutorName} - {booking.date}
          <button onClick={() => cancelBooking(booking.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
```

---

### Booking Lifecycle

| Status | Meaning |
|--------|---------|
| `confirmed` | Active booking |
| `completed` | Session finished |
| `cancelled` | User cancelled |
| `pending` | Awaiting approval (if needed) |

---

### Available Actions

#### Create Booking
```tsx
const { createBooking } = useBooking();
await createBooking({
  tutorId: "t1",
  userId: "student1",
  timeSlot: slot,
  date: "2026-03-24"
});
```

#### Cancel Booking
```tsx
const { cancelBooking } = useBooking();
await cancelBooking(bookingId);
```

#### Confirm Pending Booking
```tsx
const { confirmBooking } = useBooking();
await confirmBooking(bookingId);
```

#### Get User's Bookings
```tsx
const { getBookingsByUser } = useBooking();
const bookings = getBookingsByUser(userId);
```

#### Get Tutor's Bookings
```tsx
const { getBookingsByTutor } = useBooking();
const bookings = getBookingsByTutor(tutorId);
```

---

### Available Time Slots

Each tutor has slots available:
- **Weekdays**: 3-4 slots (16:00-19:00 typically)
- **Saturday**: 4 slots (mornings & afternoon)
- **Sunday**: 2 slots (morning)

Total: 17 slots/week

---

### Common Use Cases

#### Display Booking Button
```tsx
<button onClick={() => navigate("/booking")}>
  Book Now
</button>
```

#### Show User's Bookings in Dashboard
```tsx
import { BookedSessions } from "@/app/components/booked-sessions";

export function Dashboard() {
  return (
    <div>
      <h1>Your Dashboard</h1>
      <BookedSessions />
    </div>
  );
}
```

#### Auto-Book (Admin/Staff)
```tsx
const { createBooking } = useBooking();
const booking = await createBooking({
  tutorId: selectedTutor.id,
  userId: studentId,
  date: "2026-03-24",
  timeSlot: slot,
  status: "confirmed"
});
```

---

### Validation

Booking fails if:
- ❌ No tutor selected
- ❌ User not logged in
- ❌ No date selected
- ❌ No time slot selected

All validated before sending to backend.

---

### Success Message Example

After booking confirmed:
```
✓ Booking Confirmed!
━━━━━━━━━━━━━━━━━
Booking ID: booking_1234567890_abc123

📅 Monday, March 24, 2026
⏰ 16:00 - 17:00 (60 min)
👨‍🏫 Nguyễn Văn An (4.8⭐, 150,000đ)
📍 Cầu Giấy

Next Steps:
1. Gia sư will contact you
2. Confirm timing details
3. Prepare for class

Contact: nguyenvanan@email.com
Phone: 0912-345-678
```

---

### Error Handling

All errors show:
```
❌ Error Message Here

[Start Over] [Go Home]
```

Common errors:
- "Please log in as a student"
- "Please select a tutor"
- "Please select a date and time"
- "Booking failed, please try again"

---

### Integration Points

✅ Works with **Authentication** (useAuth)
✅ Works with **Filtering** (useFilter)
✅ Works with **Matching** (useTutorMatching)
✅ Works with **Permissions** (usePermissions)

---

### Customization Checklist

- [ ] Change colors in components
- [ ] Update Vietnamese text to English (or other language)
- [ ] Add custom time slots per tutor
- [ ] Connect to backend API
- [ ] Add email notifications
- [ ] Add SMS notifications
- [ ] Add reminder notifications
- [ ] Extend booking form with notes/preferences

---

### Performance

- ⚡ Bookings load instantly from localStorage
- ⚡ No API delays (until backend integration)
- ⚡ Scales to 1000+ bookings easily
- ⚡ Memory efficient

---

### Browser Support

✅ All modern browsers (Chrome, Firefox, Safari, Edge)
✅ localStorage support required
✅ Mobile responsive

---

### Next Integration

When ready for production:

1. Add Stripe/payment integration
2. Connect to real database (PostgreSQL/MongoDB)
3. Add email confirmation
4. Add SMS reminders
5. Add video conferencing link
6. Add document sharing
7. Add rating/review after session

---

For detailed guide see: [BOOKING_FLOW_GUIDE.md](./BOOKING_FLOW_GUIDE.md)
