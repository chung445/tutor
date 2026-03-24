# Biểu Đồ Kiến Trúc Hệ Thống Quản lý Nhân viên

## 📊 Sơ Đồ Tổng Quan

```
┌─────────────────────────────────────────────────────────────┐
│           TUTOR MATCHING SYSTEM - STAFF DASHBOARD            │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ AUTHENTICATION LAYER (AuthContext)                           │
├──────────────────────────────────────────────────────────────┤
│  • User Types: admin, staff, tutor, student, guest          │
│  • Mock Accounts: MOCK_ADMINS, MOCK_STAFF, MOCK_TUTORS      │
│  • Login/Logout Management                                   │
│  • localStorage Persistence                                  │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│ PERMISSION LAYER (permissions.ts)                            │
├──────────────────────────────────────────────────────────────┤
│  • Permission Matrix for all roles                           │
│  • hasPermission(), hasAllPermissions() functions            │
│  • Role-based access control                                 │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│ APP ROUTING (App.tsx)                                        │
├──────────────────────────────────────────────────────────────┤
│  • Guest View → PublicTutors / LoginRegister                 │
│  • Student View → StudentDashboardNew                        │
│  • Staff View → StaffDashboard (NEW)                         │
│  • Admin View → AdminDashboard (multiple tabs)               │
└──────────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────────┐
│ STAFF DASHBOARD COMPONENT (staff-dashboard.tsx)              │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────────────────────────────────┐             │
│  │ HEADER & USER INFO                         │             │
│  │ • User Name & Department                   │             │
│  │ • Update Profile Button                    │             │
│  │ • Logout Button                            │             │
│  └────────────────────────────────────────────┘             │
│                           ↓                                  │
│  ┌────────────────────────────────────────────┐             │
│  │ STATISTICS CARDS (4)                       │             │
│  │ • Tutors Count                             │             │
│  │ • Active Students Count                    │             │
│  │ • Active Classes Count                     │             │
│  │ • Pending Requests Count                   │             │
│  └────────────────────────────────────────────┘             │
│                           ↓                                  │
│  ┌────────────────────────────────────────────┐             │
│  │ TABS NAVIGATION                            │             │
│  ├────────────────────────────────────────────┤             │
│  │ TAB 1: OVERVIEW (Tổng quan)                │             │
│  │ ├─ Tutor Statistics                        │             │
│  │ │  • Total tutors                          │             │
│  │ │  • Currently teaching                    │             │
│  │ │  • Completed contracts                   │             │
│  │ │                                          │             │
│  │ └─ Class Statistics                        │             │
│  │    • Total classes                         │             │
│  │    • Assigned classes                      │             │
│  │    • Unassigned classes                    │             │
│  │                                            │             │
│  │ TAB 2: STUDENTS (Học viên)                │             │
│  │ ├─ Search Bar (by name/email)              │             │
│  │ ├─ Student Table                           │             │
│  │ │  • Name, Email, Phone                    │             │
│  │ │  • Classes Count, Status                 │             │
│  │ │  • Lock/Unlock Button                    │             │
│  │ │  • Delete Button                         │             │
│  │ │                                          │             │
│  │ └─ Bulk Actions (Future)                   │             │
│  │                                            │             │
│  │ TAB 3: CLASSES (Lớp học)                  │             │
│  │ ├─ Class Table                             │             │
│  │ │  • Subject, Student Name, Area           │             │
│  │ │  • Max Fee, Status                       │             │
│  │ │  • Edit Button                           │             │
│  │ │                                          │             │
│  │ └─ Filter & Sort Options                   │             │
│  │                                            │             │
│  │ TAB 4: REQUESTS (Yêu cầu)                 │             │
│  │ ├─ Pending Requests Table                  │             │
│  │ │  • Student Name, Subject, Area           │             │
│  │ │  • Grade, Max Fee, Request Date          │             │
│  │ │  • Status Badge                          │             │
│  │ │  • Approve/Reject Buttons                │             │
│  │ │                                          │             │
│  │ └─ Request Status Tracking                 │             │
│  │                                            │             │
│  └────────────────────────────────────────────┘             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Diagram

```
┌─────────────┐
│   User      │
│  (Browser)  │
└──────┬──────┘
       │ (1) Login
       ↓
┌──────────────────┐
│  Login Page      │
│  (email/passwd)  │
└──────┬───────────┘
       │ (2) Authenticate
       ↓
┌──────────────────────────┐
│  AuthContext.login()     │
│  • Check MOCK_STAFF      │
│  • Store in localStorage │
│  • Update User State     │
└──────┬───────────────────┘
       │ (3) Verified
       ↓
┌──────────────────────────┐
│  App.tsx Routes          │
│  • Check user?.role      │
│  • role === "staff"      │
└──────┬───────────────────┘
       │ (4) Render Staff View
       ↓
┌──────────────────────────┐
│  StaffDashboard          │
│  • Load Mock Data        │
│  • Initialize State      │
└──────┬───────────────────┘
       │ (5) Display UI
       ↓
┌──────────────────────────┐
│  User Interactions       │
│  • Search Students       │
│  • Lock/Unlock Account   │
│  • Approve Requests      │
│  • Manage Classes        │
└──────┬───────────────────┘
       │ (6) Update State
       ↓
┌──────────────────────────┐
│  Re-render Components    │
│  • Update Tables         │
│  • Update Cards          │
│  • Toast Notifications   │
└──────────────────────────┘
```

---

## 🎯 Feature Module Breakdown

```
STAFF DASHBOARD
│
├─ 1. PROFILE MANAGEMENT
│  ├─ View Profile
│  ├─ Edit Profile Dialog
│  │  ├─ Name Field
│  │  ├─ Email Field
│  │  ├─ Phone Field
│  │  └─ Department Field
│  └─ Save & Validation
│
├─ 2. TUTOR MANAGEMENT (External)
│  ├─ View Tutors List
│  ├─ Add New Tutor
│  ├─ Edit Tutor
│  └─ Delete Tutor
│
├─ 3. STUDENT MANAGEMENT
│  ├─ View Students Table
│  ├─ Search Functionality
│  │  ├─ By Name
│  │  ├─ By Email
│  │  └─ By Phone
│  ├─ Lock/Unlock Account
│  └─ Delete Student
│
├─ 4. CLASS MANAGEMENT
│  ├─ View Classes Table
│  ├─ Subject, Area Filtering
│  ├─ Status Tracking
│  │  ├─ Assigned (green)
│  │  └─ Unassigned (yellow)
│  └─ Edit Class
│
├─ 5. REQUEST APPROVAL SYSTEM
│  ├─ View Pending Requests
│  ├─ Request Details
│  │  ├─ Student Name
│  │  ├─ Subject
│  │  ├─ Area
│  │  ├─ Grade
│  │  └─ Max Fee
│  ├─ Approve Request
│  └─ Reject Request
│
├─ 6. STATISTICS DASHBOARD
│  ├─ Overview Tab
│  │  ├─ Tutor Statistics
│  │  │  ├─ Total
│  │  │  ├─ Currently Teaching
│  │  │  └─ Completed
│  │  └─ Class Statistics
│  │     ├─ Total
│  │     ├─ Assigned
│  │     └─ Unassigned
│  └─ Quick Stats Cards
│     ├─ Total Tutors
│     ├─ Active Students
│     ├─ Active Classes
│     └─ Pending Requests
│
└─ 7. SEARCH & FILTER
   ├─ Student Search
   ├─ Tutor Filters
   ├─ Class Filters
   └─ Request Filters
```

---

## 📱 UI Component Structure

```
StaffDashboard (Main Container)
│
├─ Header Section
│  ├─ Title & Description
│  └─ Update Profile Button
│      └─ ProfileDialog (Modal)
│         ├─ Input Fields
│         └─ Save Button
│
├─ Stats Cards (Grid: 4 columns)
│  ├─ TutorsCard
│  ├─ StudentsCard
│  ├─ ClassesCard
│  └─ RequestsCard
│
└─ Tabs Container
   │
   ├─ Tab List (4 items)
   │  ├─ Overview
   │  ├─ Students
   │  ├─ Classes
   │  └─ Requests
   │
   ├─ Tab Content: Overview
   │  ├─ TutorStatistics Card
   │  └─ ClassStatistics Card
   │
   ├─ Tab Content: Students
   │  ├─ SearchInput
   │  └─ StudentTable
   │     ├─ Columns: Name, Email, Phone, Classes, Status
   │     ├─ Rows: Student Items
   │     └─ Actions: Lock, Delete
   │
   ├─ Tab Content: Classes
   │  └─ ClassTable
   │     ├─ Columns: Subject, Student, Area, Fee, Status
   │     ├─ Rows: Class Items
   │     └─ Actions: Edit
   │
   └─ Tab Content: Requests
      └─ RequestTable
         ├─ Columns: Student, Subject, Area, Grade, Fee, Date, Status
         ├─ Rows: Request Items
         └─ Actions: Approve, Reject
```

---

## 🔐 Permission Matrix Visualization

```
                   Admin   Staff   Tutor   Student   Guest
                   ─────   ─────   ─────   ───────   ─────
View Tutors          ✅      ✅      ✅       ✅       ✅
Create Tutor         ✅      ✅      ❌       ❌       ❌
Edit Tutor           ✅      ✅      ✅*      ❌       ❌
Delete Tutor         ✅      ✅      ❌       ❌       ❌

View Students        ✅      ✅      ❌       ❌       ❌
Create Student       ✅      ❌      ❌       ❌       ❌
Edit Student         ✅      ✅      ❌       ❌       ❌
Delete Student       ✅      ✅      ❌       ❌       ❌

View Classes         ✅      ✅      ✅       ✅       ✅
Create Class         ✅      ✅      ✅*      ❌       ❌
Edit Class           ✅      ✅      ✅*      ❌       ❌
Delete Class         ✅      ❌      ❌       ❌       ❌

View Schedule        ✅      ✅      ✅       ✅       ❌
Create Booking       ✅      ✅      ❌       ✅       ❌
Approve Request      ✅      ✅      ❌       ❌       ❌
Leave Review         ✅      ✅      ✅       ✅       ❌

* = Only own resources
```

---

## 📁 File Structure

```
src/app/
├─ App.tsx (MODIFIED)
│  └─ Added Staff Route & Import
│
├─ context/
│  └─ AuthContext.tsx (MODIFIED)
│     ├─ Added "staff" role
│     ├─ Added MOCK_STAFF data
│     └─ Updated login function
│
├─ components/
│  ├─ staff-dashboard.tsx (NEW)
│  │  └─ Main Staff Dashboard Component
│  │
│  └─ ui/ (existing components used)
│     ├─ tabs.tsx
│     ├─ card.tsx
│     ├─ table.tsx
│     ├─ button.tsx
│     ├─ input.tsx
│     ├─ dialog.tsx
│     └─ ... (other UI components)
│
└─ utils/
   └─ permissions.ts (MODIFIED)
      ├─ Added "staff" permissions
      └─ Updated PERMISSION_MATRIX
```

---

## 🚀 State Management

```
StaffDashboard Component State:

├─ activeTab (string)
│  └─ Tracks current tab: "overview", "students", "classes", "requests"
│
├─ profileEditOpen (boolean)
│  └─ Controls Profile Edit Dialog visibility
│
├─ profileData (object)
│  ├─ name
│  ├─ email
│  ├─ phone
│  └─ department
│
├─ studentList (StudentAccount[])
│  ├─ id, name, email, phone
│  ├─ status, classesCount, joinDate
│  └─ Updated on: lock, unlock, delete
│
├─ classRequests (ClassRequest[])
│  ├─ id, studentName, subject, area
│  ├─ grade, maxFee, requestDate, status, description
│  └─ Updated on: approve, reject
│
└─ searchTerm (string)
   └─ Filters student list in real-time
```

---

## 🎨 Color Coding

```
Badges & Status Colors:

Active/Success         → Green (#22c55e)   🟢
Pending/Warning        → Yellow (#eab308)  🟡
Locked/Error           → Gray (#6b7280)    🔴
Completed/Approved     → Blue (#3b82f6)    🔵
Rejected/Danger        → Red (#ef4444)     ❌

Card Colors:
├─ Users (Tutors)       → Blue (#3b82f6)
├─ Students             → Green (#22c55e)
├─ Classes              → Purple (#a855f7)
└─ Requests             → Orange (#f97316)
```

---

**Version:** 1.0.0
**Last Updated:** 23 January 2026
