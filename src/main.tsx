
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import { AuthProvider } from "./app/context/AuthContext.tsx";
  import { AdminProvider } from "./app/context/admin/AdminContext.tsx";
  import { BookingProvider } from "./app/context/BookingContext.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <BookingProvider>
        <AdminProvider>
          <App />
        </AdminProvider>
      </BookingProvider>
    </AuthProvider>
  );
  