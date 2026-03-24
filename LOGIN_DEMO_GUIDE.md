# Login Page Demo Accounts Guide

## 🎯 Overview
The login page now features quick-access demo buttons for all 4 user roles, eliminating the need to manually type in credentials.

## 📋 Demo Accounts Available

### 1. **Admin (Quản Trị Viên)**
- **Admin Chính**: `admin@tutorcentral.com` / `admin123`
- **Manager**: `manager@tutorcentral.com` / `manager123`
- Role: System administrator with full access
- Button color: Blue

### 2. **Staff (Nhân Viên)** ✨ NEW
- **Nhân Viên 1**: `staff@tutorcentral.com` / `staff123`
- **Nhân Viên 2**: `staff2@tutorcentral.com` / `staff123`
- Role: Manages students, classes, and class requests
- Access Dashboard: Staff Dashboard with 4 tabs
- Button color: Purple

### 3. **Tutor (Gia Sư)** ✨ NEW
- **Lý Thị Hương**: `tutor@tutorcentral.com` / `tutor123`
- Role: Manages classes, schedules, contracts, and income
- Access Dashboard: Tutor Dashboard with 5 tabs
- Button color: Green

### 4. **Student (Học Viên)**
- **Học Viên 1**: `student1@tutorcentral.com` / `student123`
- **Học Viên 2**: `student2@tutorcentral.com` / `student123`
- **Học Viên 3**: `student3@tutorcentral.com` / `student123`
- Role: Searches for tutors and manages their own classes
- Button color: Blue

## 🚀 How to Use

1. **Select a Role**: Click one of the 4 role buttons at the top of the login page
   - Admin (Blue)
   - Nhân viên (Purple)
   - Gia sư (Green)
   - Học Viên (Blue)

2. **Choose Demo Account**: The demo buttons below will change based on selected role

3. **Click Demo Button**: Instantly logs in with that account (no typing required)

4. **Or Manual Login**: Type your own email/password if preferred

## 🎨 UI Changes

### Role Selector
- Expanded from 2 buttons (Admin/Student) to **4 buttons** (Admin/Staff/Tutor/Student)
- Each role has distinct color: Blue, Purple, Green, Blue
- Visual feedback shows which role is selected

### Demo Buttons Section
- Dynamic heading changes based on selected role
- Shows only relevant demo accounts for current role
- Clear button labels with names/descriptions

### Info Box
- Updated to explain all 4 roles and their purposes
- Shows number of demo accounts available per role
- Explains auto-save login session feature

## 💡 Key Features

✅ **One-Click Login** - No typing required for demo accounts
✅ **Role-Based UI** - Shows only relevant demos for selected role
✅ **Visual Differentiation** - Each role has its own color
✅ **Clear Labels** - Shows staff/tutor names for quick identification
✅ **Session Persistence** - Login state is saved automatically
✅ **Full Functionality** - All role dashboards work perfectly

## 🔧 Technical Details

### Updated File
- `src/app/components/login-register.tsx`

### Changes Made
1. Updated state type: `"admin" | "staff" | "tutor" | "student"`
2. Added password entries for staff and tutor accounts
3. Added Staff and Tutor role buttons to selector
4. Updated demo buttons section with conditional rendering
5. Updated CardTitle and CardDescription for all 4 roles
6. Updated info box explaining all roles

### Build Status
✅ **Build Passed** - 2.48s compilation time

## 📱 Testing Checklist

- [ ] Click each role button - UI updates correctly
- [ ] Click each demo button - Logs in with correct account
- [ ] Staff buttons lead to Staff Dashboard
- [ ] Tutor button leads to Tutor Dashboard
- [ ] Student buttons lead to Student Dashboard
- [ ] Admin buttons lead to Admin Dashboard
- [ ] Manual login still works
- [ ] Demo account info displays correctly in info box

## 🎯 Next Steps

Users can now:
1. **Try Staff Features**: Click Nhân viên → Demo Nhân Viên 1
2. **Try Tutor Features**: Click Gia sư → Demo Gia Sư (Lý Thị Hương)
3. **Try Admin Features**: Click Admin → Demo Admin Chính
4. **Try Student Features**: Click Học Viên → Demo Học Viên 1

Each role shows a fully functional dashboard with mock data!
