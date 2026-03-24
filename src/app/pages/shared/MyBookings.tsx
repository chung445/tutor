import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { BookedSessions } from "../../components/booked-sessions";
import BookingManagement from "../admin/BookingManagement";

type Props = {};

export default function MyBookings(_: Props) {
  const { user } = useAuth();

  if (!user) {
    return <div>Vui lòng đăng nhập để xem lịch của bạn.</div>;
  }

  if (user.role === "admin") {
    return <BookingManagement />;
  }

  // With current implementation BookedSessions shows user-specific bookings
  return <BookedSessions />;
}
