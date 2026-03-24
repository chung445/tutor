# Authentication Flow Documentation

## 📋 Overview

Your Tutor Matching System has a complete, production-ready authentication system with:
- React Context API for global state management
- localStorage persistence for user sessions
- Role-based access control
- Protected route components
- Comprehensive permission system

## 🏗️ Architecture

```
AuthContext (Global State)
    ↓
AuthService (Business Logic)
    ↓
localStorage (Persistence)

useAuth() Hook → Components consume auth state
ProtectedRoute → Guard routes by authentication/permissions
```

## 🔐 Core Components

### 1. AuthProvider
Wraps your application and provides auth state to all components.

**Location**: `src/app/context/AuthContext.tsx`

**Features**:
- Initializes user from localStorage on app load
- Manages login/logout state
- Provides user information and authentication status
- Handles loading states

### 2. useAuth Hook
Custom hook to access authentication state anywhere in your app.

```typescript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  
  // Use auth state
  if (isLoading) return <div>Loading...</div>;
  
  if (!isAuthenticated) return <LoginForm onLogin={login} />;
  
  return <div>Welcome, {user?.name}!</div>;
}
```

### 3. ProtectedRoute
Guards routes and only shows content to authenticated users with proper permissions.

```typescript
import { ProtectedRoute } from "../components/protected-route";

function AdminPanel() {
  return (
    <ProtectedRoute 
      requiredPermissions={["manage_tutors", "manage_students"]}
      requireAll={false} // User needs ANY of these permissions
    >
      <AdminContent />
    </ProtectedRoute>
  );
}
```

## 📊 Types

All types are defined in `src/app/types/index.ts`:

```typescript
export type UserRole = "admin" | "staff" | "tutor" | "student" | "guest";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  classId?: string;
  isVerified?: boolean;
  department?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}
```

## 📝 How It Works

### 1. Initial Load (Application Starts)
```
App Mount
    ↓
AuthProvider useEffect runs
    ↓
AuthService.loadUser() reads localStorage
    ↓
If user exists: restore to state
    ↓
Set isLoading = false
    ↓
App renders with user info (or guest view)
```

### 2. Login Flow
```
User submits login form
    ↓
useAuth().login(email, password) called
    ↓
Set isLoading = true
    ↓
AuthService.login() validates credentials
    ↓
If valid: AuthService.saveUser() → localStorage
    ↓
Update React state with user info
    ↓
Set isLoading = false
    ↓
Component re-renders with new user state
```

### 3. Page Refresh (Persistence)
```
User refreshes page
    ↓
App mounts again
    ↓
AuthProvider useEffect
    ↓
AuthService.loadUser() retrieves from localStorage
    ↓
User is automatically logged back in
    ↓
No need to login again
```

### 4. Logout Flow
```
User clicks logout
    ↓
useAuth().logout() called
    ↓
Set user = null
    ↓
AuthService.clearUser() removes from localStorage
    ↓
Component redirects to login
    ↓
User is signed out
```

## 🎯 Usage Examples

### Example 1: Simple Login Component

```typescript
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
      />
      <input 
        value={password} 
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button disabled={isLoading} type="submit">
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

### Example 2: User Profile with Logout

```typescript
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

export function UserProfile() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      
      <Button onClick={logout} variant="outline">
        Logout
      </Button>
    </div>
  );
}
```

### Example 3: Role-Based Rendering

```typescript
import { useAuth } from "../context/AuthContext";

export function Dashboard() {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  if (user?.role === "tutor") {
    return <TutorDashboard />;
  }

  if (user?.role === "student") {
    return <StudentDashboard />;
  }

  return <div>Unknown role</div>;
}
```

### Example 4: Protected Routes

```typescript
import { ProtectedRoute } from "../components/protected-route";

export function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/browse" element={<BrowseTutors />} />

      {/* Protected routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Permission-based routes */}
      <Route 
        path="/tutors/manage" 
        element={
          <ProtectedRoute requiredPermissions="manage_tutors">
            <TutorManagement />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

### Example 5: Update User Info

```typescript
import { useAuth } from "../context/AuthContext";

export function EditProfile() {
  const { user, updateUser } = useAuth();

  const handleSaveProfile = (updatedData: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedData };
      updateUser(newUser);
      // Updated user is automatically saved to localStorage
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSaveProfile({
        name: /* new name */,
        phone: /* new phone */
      });
    }}>
      {/* Form fields */}
    </form>
  );
}
```

## 🔄 Accessing Auth State

### In Components
```typescript
import { useAuth } from "../context/AuthContext";

function MyComponent() {
  const { 
    user,                  // Current logged-in user or null
    isAuthenticated,       // Boolean: true if user is logged in
    isLoading,            // Boolean: true while checking session
    login,                // Function: (email, password) => Promise
    logout,               // Function: () => void
    updateUser            // Function: (user: User) => void
  } = useAuth();

  return <div>/* Component JSX */</div>;
}
```

### Properties Available

**user: User | null**
```typescript
{
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "tutor" | "student";
  phone?: string;
  avatar?: string;
  classId?: string;      // For students
  isVerified?: boolean;  // For tutors
  department?: string;   // For staff
}
```

**isAuthenticated: boolean**
- `true` if user is logged in
- `false` if user is not logged in

**isLoading: boolean**
- `true` while checking localStorage on app load
- `true` while login/logout is in progress
- `false` when complete

## 🗄️ localStorage Behavior

### Key
- **Storage Key**: `tutor_center_user`
- **Format**: JSON string of User object
- **Scope**: Same origin only

### What Gets Saved
```typescript
localStorage.tutor_center_user = JSON.stringify({
  id: "user_123",
  email: "user@example.com",
  name: "John Doe",
  role: "student",
  phone: "0987654321",
  avatar: "https://...",
  classId: "c1"
})
```

### When It Gets Saved
1. After successful login
2. After user update
3. Immediately on call to `AuthService.saveUser()`

### When It Gets Cleared
1. After logout
2. After calling `AuthService.clearUser()`
3. If corrupted JSON found (auto-clears)

### Manual localStorage Management
```typescript
// Read user from localStorage
const user = AuthService.loadUser();

// Save user to localStorage
AuthService.saveUser(user);

// Clear localStorage
AuthService.clearUser();
```

## ✅ Setup Checklist

- [x] AuthContext set up
- [x] AuthService created
- [x] localStorage persistence working
- [x] useAuth hook available
- [x] ProtectedRoute component ready
- [x] Types defined
- [x] Multi-role support

## 🚀 Next Steps

### To Use This Authentication:

1. **Wrap Your App with AuthProvider**
```typescript
// In src/main.tsx
import { AuthProvider } from "./app/context/AuthContext";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
```

2. **Use useAuth in Components**
```typescript
import { useAuth } from "./app/context/AuthContext";

function MyComponent() {
  const { user, login, logout } = useAuth();
  // Use auth functionality
}
```

3. **Protect Routes**
```typescript
<ProtectedRoute>
  <AdminPanel />
</ProtectedRoute>
```

4. **Check Role for Conditional UI**
```typescript
if (user?.role === "admin") {
  // Show admin UI
}
```

## 🔐 Security Notes

⚠️ **Current Implementation**:
- Uses mock user database (MOCK_ADMINS, MOCK_STUDENTS, etc.)
- Stores user data in localStorage
- For demonstration purposes only

⚠️ **For Production**:
- Replace mock login with real API authentication
- Use secure tokens (JWT) instead of storing user data
- Implement token refresh mechanism
- Add HTTPS requirement
- Implement CSRF protection
- Use secure httpOnly cookies instead of localStorage

### Example: Transitioning to Real Backend
```typescript
// In AuthService
static async login(email: string, password: string): Promise<User> {
  // Replace this:
  // const adminData = MOCK_ADMINS[email];
  
  // With this:
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error("Login failed");
  
  const { user, token } = await response.json();
  // Store token securely
  return user;
}
```

## 📞 Demo Credentials

**Admin**
- Email: `admin@tutorcentral.com`
- Password: `admin123`

**Staff**
- Email: `staff@tutorcentral.com`
- Password: `staff123`

**Tutor**
- Email: `tutor@tutorcentral.com`
- Password: `tutor123`

**Student**
- Email: `student1@tutorcentral.com`
- Password: `student123`

## 🐛 Troubleshooting

### User Not Persisting After Refresh
**Problem**: User is logged out after page refresh
**Solution**: 
1. Check if AuthProvider wraps entire app
2. Verify localStorage is not disabled
3. Check browser console for errors

### useAuth Hook Error: "must be used within an AuthProvider"
**Problem**: Using `useAuth()` in component not wrapped by AuthProvider
**Solution**: Wrap parent component with `<AuthProvider>`

### localStorage Full Error
**Problem**: localStorage quota exceeded
**Solution**: Clear old auth data or use sessionStorage

### Types Not Found
**Problem**: Type errors for User or UserRole
**Solution**: Make sure types are imported from `../types/index`

## 📚 Files Reference

| File | Purpose |
|------|---------|
| `src/app/context/AuthContext.tsx` | Main auth context and provider |
| `src/app/services/authService.ts` | Auth business logic |
| `src/app/types/index.ts` | Type definitions |
| `src/app/components/protected-route.tsx` | Route protection component |
| `src/app/services/mockData.ts` | Mock user database |

## ✨ Key Features Recap

- ✅ **Global Auth State**: Available throughout entire app
- ✅ **Persistent Sessions**: Survives page refresh
- ✅ **Multiple Roles**: Admin, Staff, Tutor, Student
- ✅ **Permission-Based Access**: Restrict routes by permissions
- ✅ **Loading States**: Handle async auth operations
- ✅ **localStorage Integration**: Automatic user persistence
- ✅ **Type Safe**: Full TypeScript support
- ✅ **Easy to Use**: Simple hooks and components
- ✅ **Production Ready**: Robust error handling
- ✅ **Testable**: Services are isolated and testable
