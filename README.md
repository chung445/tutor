
  # 🎓 Tutor Matching System

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> A comprehensive web platform connecting qualified tutors with students seeking personalized education. Built with modern React technologies for seamless user experience across all devices.

## 🌟 Overview

The Tutor Matching System is a full-featured educational platform that bridges the gap between expert tutors and eager learners. Our platform provides:

- **Smart Matching**: AI-powered tutor-student pairing based on subjects, location, and learning goals
- **Multi-Role Management**: Separate dashboards for administrators, staff, tutors, and students
- **Real-time Communication**: Integrated messaging system for seamless coordination
- **Progress Tracking**: Comprehensive session management and performance analytics
- **Flexible Scheduling**: Intelligent calendar system for optimal time management

## ✨ Key Features

### 👨‍🎓 For Students
- **Tutor Discovery**: Advanced search and filtering by subject, location, rating, and price
- **Class Management**: Book, reschedule, and track learning sessions
- **Progress Monitoring**: View detailed session history and learning progress
- **Review System**: Rate and review tutors to help others make informed decisions
- **Payment Integration**: Secure payment processing for classes

### 👨‍🏫 For Tutors
- **Profile Management**: Showcase expertise, experience, and teaching style
- **Class Scheduling**: Flexible calendar management with automated conflict resolution
- **Income Tracking**: Real-time earnings dashboard with detailed breakdowns
- **Student Communication**: Direct messaging with enrolled students
- **Performance Analytics**: Insights into teaching effectiveness and student satisfaction

### 👨‍💼 For Staff
- **Student Management**: Oversee student accounts and learning progress
- **Tutor Verification**: Review and approve tutor applications
- **Class Coordination**: Manage class assignments and resolve scheduling conflicts
- **Quality Assurance**: Monitor teaching quality and handle feedback
- **Reporting**: Generate comprehensive reports on platform performance

### 👑 For Administrators
- **System Oversight**: Complete platform management and configuration
- **User Management**: Administer all user accounts and permissions
- **Analytics Dashboard**: Comprehensive metrics and business intelligence
- **Content Management**: Control platform content and educational resources
- **Financial Oversight**: Monitor revenue, payments, and financial health

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chung445/tutor.git
   cd tutor-matching-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5184
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📋 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@tutorcentral.com | admin123 |
| **Staff** | manager@tutorcentral.com | password123 |
| **Tutor** | tutor@tutorcentral.com | password123 |
| **Student** | student1@tutorcentral.com | student123 |

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions

### State Management
- **React Context** - Built-in state management
- **Custom Hooks** - Reusable stateful logic

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```
tutor-matching-system/
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── staff-dashboard.tsx
│   │   │   ├── tutor-dashboard.tsx
│   │   │   ├── student-dashboard-new.tsx
│   │   │   ├── login-register.tsx
│   │   │   └── ui/            # UI component library
│   │   ├── context/           # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   └── AdminContext.tsx
│   │   ├── hooks/             # Custom React hooks
│   │   └── utils/             # Utility functions
│   ├── styles/                # Global styles and themes
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   └── main.tsx               # Application entry point
├── package.json               # Dependencies and scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Project documentation
```

## 🎯 Core Architecture

### Component Architecture
- **Separation of Concerns**: UI components focus purely on presentation
- **Composition over Inheritance**: Flexible, reusable component design
- **Type Safety**: Full TypeScript coverage for reliability

### State Management
- **Context API**: Centralized state management for user authentication
- **Local State**: Component-level state for UI interactions
- **Optimistic Updates**: Immediate UI feedback with error handling

### Design System
- **Consistent Styling**: Unified design language across all components
- **Responsive Design**: Mobile-first approach with breakpoint management
- **Accessibility**: WCAG compliant components and interactions

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Development
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=Tutor Matching System

# Production
VITE_API_BASE_URL=https://api.tutormatch.com/api
```

### Tailwind Configuration

The project uses a custom Tailwind configuration for consistent theming:

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

## 📊 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style and architecture patterns
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Figma Design**: Original design created in Figma
- **Open Source Community**: Thanks to all contributors and maintainers
- **Educational Partners**: Gratitude to tutors and students who provided valuable feedback

## 📞 Support

For support, email support@tutormatch.com or join our Discord community.

---

**Made with ❤️ for better education**
  