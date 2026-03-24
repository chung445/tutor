# Tutor Matching System

A modern React + Vite frontend application for connecting tutors with students. This system provides features for tutors, students, staff, and administrators to manage classes, contracts, and tutoring sessions.

## 🏗️ Project Architecture

The project follows a clean, scalable architecture with well-organized layers:

### Folder Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base UI components (buttons, cards, dialogs, etc.)
│   │   └── [feature components]
│   ├── pages/               # Page-level components (for future routing)
│   ├── context/             # React Context for state management
│   │   └── AuthContext.tsx  # Authentication context
│   ├── services/            # Business logic and API calls
│   │   ├── authService.ts   # Authentication logic
│   │   ├── dataService.ts   # Data management (tutors, classes, contracts)
│   │   ├── mockData.ts      # Mock data for development
│   │   └── index.ts         # Service exports
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Centralized types
│   └── App.tsx              # Main application component
├── styles/                  # Global styles
└── main.tsx                 # Application entry point
```

### Architecture Principles

- **Separation of Concerns**: UI components are separate from business logic
- **Reusability**: Components are designed to be reused across the application
- **Maintainability**: Code is organized by feature and layer
- **Type Safety**: Full TypeScript support with centralized type definitions
- **Clean Code**: Functional components and React hooks throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd Tutor\ Matching\ System
```

2. Install dependencies:
```bash
npm install
```

### Running the Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will open at `http://localhost:5173/`

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The output will be in the `dist/` folder.

## 📋 Demo Credentials

### Admin Accounts
- **Email**: `admin@tutorcentral.com` | **Password**: `admin123`
- **Email**: `manager@tutorcentral.com` | **Password**: `manager123`

### Staff Accounts
- **Email**: `staff@tutorcentral.com` | **Password**: `staff123`
- **Email**: `staff2@tutorcentral.com` | **Password**: `staff123`

### Tutor Accounts
- **Email**: `tutor@tutorcentral.com` | **Password**: `tutor123`
- **Email**: `tutor1@tutorcentral.com` | **Password**: `tutor123`
- **Email**: `tutor2@tutorcentral.com` | **Password**: `tutor123`

### Student Accounts
- **Email**: `student1@tutorcentral.com` | **Password**: `student123`
- **Email**: `student2@tutorcentral.com` | **Password**: `student123`
- **Email**: `student3@tutorcentral.com` | **Password**: `student123`

## 📦 Services Documentation

### AuthService
Handles authentication logic, user persistence, and credential validation.

**Key Methods:**
- `login(email, password)` - Authenticate user
- `saveUser(user)` - Save user to localStorage
- `loadUser()` - Load user from localStorage
- `clearUser()` - Clear user session

### DataService
Manages all business data operations for tutors, classes, contracts, and sessions.

**Tutors Operations:**
- `getTutors()` - Get all tutors
- `getTutorById(id)` - Get specific tutor
- `searchTutors(query)` - Search tutors by subject, area, rating

**Classes Operations:**
- `getClasses()` - Get all classes
- `getClassById(id)` - Get specific class
- `getClassesByArea(area)` - Filter classes by area
- `getUnassignedClasses()` - Get unassigned classes

**Contracts Operations:**
- `getContracts()` - Get all contracts
- `getContractsByTutor(tutorId)` - Get contracts for a tutor
- `getContractsByClass(classId)` - Get contracts for a class
- `getActiveContracts()` - Get active contracts

**Sessions Operations:**
- `getSessions()` - Get all sessions
- `getSessionsByContract(contractId)` - Get sessions for a contract
- `getCompletedSessions(contractId)` - Get completed sessions

## 🎯 Key Features

### For Administrators
- Manage tutors and tutoring classes
- View tutor matching and assignments
- Manage contracts between tutors and students
- Track session progress

### For Staff
- Support administrative tasks
- Manage tutor and student records
- Process class registrations

### For Tutors
- View assigned classes and contracts
- Track session history
- Manage availability and rates

### For Students
- Browse available tutors
- Request tutoring classes
- Track learning progress
- View session history

## 🛠️ Technology Stack

- **React**: UI library with Hooks for state management
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component library
- **Lucide Icons**: Icon library
- **Sonner**: Toast notifications

## 📝 Best Practices

1. **Component Design**: Keep components pure and focused on presentation
2. **Business Logic**: Place all business logic in services
3. **Type Safety**: Use TypeScript interfaces for all data structures
4. **Reusability**: Create utility functions for common operations
5. **State Management**: Use React Context for global state, local state for components
6. **Code Organization**: Follow the established folder structure
7. **Naming Conventions**: Use descriptive names for files and functions

## 🔄 Adding New Features

### Adding a New Service

1. Create a new file in `src/app/services/`
2. Define service methods that handle business logic
3. Export from `src/app/services/index.ts`
4. Use the service in components or other services

Example:
```typescript
// src/app/services/notificationService.ts
export class NotificationService {
  static async sendNotification(userId: string, message: string) {
    // Implementation here
  }
}
```

### Adding a New Component

1. Create a new file in `src/app/components/`
2. Keep components focused on presentation
3. Extract logic to services
4. Use hooks for local state management

Example:
```typescript
// src/app/components/TutorCard.tsx
import { Tutor } from "../types/index";

interface TutorCardProps {
  tutor: Tutor;
  onSelect: (tutor: Tutor) => void;
}

export function TutorCard({ tutor, onSelect }: TutorCardProps) {
  return (
    <div onClick={() => onSelect(tutor)}>
      {/* Component JSX */}
    </div>
  );
}
```

### Adding a New Type

1. Add to `src/app/types/index.ts`
2. Export alongside other types
3. Use in components and services

## 🧪 Testing & Debugging

- Browser DevTools: Use React DevTools extension for state inspection
- Console Logs: Leverage TypeScript for type checking in logs
- Mock Data: All demo data is in `src/app/services/mockData.ts`

## 📄 License

This project is part of the Tutor Matching System educational platform.

## 🤝 Contributing

When contributing to this project:

1. Follow the established architecture and folder structure
2. Keep components focused and reusable
3. Place business logic in services
4. Use TypeScript for type safety
5. Write clear, descriptive commit messages

## 📞 Support

For issues or questions, please refer to the project documentation or contact the development team.
