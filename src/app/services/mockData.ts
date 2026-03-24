import { User, Tutor, Class, Contract, Session } from "../types/index";

/**
 * Mock admin accounts database
 */
export const MOCK_ADMINS: Record<string, { password: string; user: User }> = {
  "admin@tutorcentral.com": {
    password: "admin123",
    user: {
      id: "u1",
      email: "admin@tutorcentral.com",
      name: "Quản trị viên",
      role: "admin",
      phone: "0900000001",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  },
  "manager@tutorcentral.com": {
    password: "manager123",
    user: {
      id: "u2",
      email: "manager@tutorcentral.com",
      name: "Nhân viên Quản lý",
      role: "admin",
      phone: "0900000002",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
  }
};

/**
 * Mock staff accounts database
 */
export const MOCK_STAFF: Record<string, { password: string; user: User }> = {
  "staff@tutorcentral.com": {
    password: "staff123",
    user: {
      id: "st1",
      email: "staff@tutorcentral.com",
      name: "Nhân viên Quản lý",
      role: "staff",
      phone: "0900000003",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      department: "Quản lý"
    }
  },
  "staff2@tutorcentral.com": {
    password: "staff123",
    user: {
      id: "st2",
      email: "staff2@tutorcentral.com",
      name: "Nhân viên Hỗ trợ",
      role: "staff",
      phone: "0900000004",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      department: "Hỗ trợ"
    }
  }
};

/**
 * Mock tutor accounts database
 */
export const MOCK_TUTORS: Record<string, { password: string; user: User }> = {
  "tutor@tutorcentral.com": {
    password: "tutor123",
    user: {
      id: "tutor_demo",
      email: "tutor@tutorcentral.com",
      name: "Nguyễn Văn An",
      role: "tutor",
      phone: "0913555555",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  },
  "tutor1@tutorcentral.com": {
    password: "tutor123",
    user: {
      id: "t1",
      email: "tutor1@tutorcentral.com",
      name: "Phạm Thị Hương",
      role: "tutor",
      phone: "0913111111",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    }
  },
  "tutor2@tutorcentral.com": {
    password: "tutor123",
    user: {
      id: "t2",
      email: "tutor2@tutorcentral.com",
      name: "Đỗ Minh Nhật",
      role: "tutor",
      phone: "0913222222",
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  }
};

/**
 * Mock student accounts database
 */
export const MOCK_STUDENTS: Record<string, { password: string; user: User }> = {
  "student1@tutorcentral.com": {
    password: "student123",
    user: {
      id: "st1",
      email: "student1@tutorcentral.com",
      name: "Nguyễn Minh Anh",
      role: "student",
      phone: "0912111111",
      classId: "c1",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  },
  "student2@tutorcentral.com": {
    password: "student123",
    user: {
      id: "st2",
      email: "student2@tutorcentral.com",
      name: "Trần Phương Chi",
      role: "student",
      phone: "0912222222",
      classId: "c2",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
  },
  "student3@tutorcentral.com": {
    password: "student123",
    user: {
      id: "st3",
      email: "student3@tutorcentral.com",
      name: "Lê Quốc Huy",
      role: "student",
      phone: "0912333333",
      classId: "c3",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    }
  }
};

/**
 * Mock tutors data
 */
export const MOCK_TUTORS_DATA: Tutor[] = [
  {
    id: "t1",
    name: "Nguyễn Văn An",
    subjects: ["Toán", "Lý"],
    area: "Cầu Giấy",
    hourlyRate: 150000,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 4.8,
    experience: 3,
    phone: "0912345678",
    email: "nguyenvanan@email.com",
    availability: 85
  },
  {
    id: "t2",
    name: "Trần Thị Bình",
    subjects: ["Toán", "Hóa"],
    area: "Đống Đa",
    hourlyRate: 180000,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4.9,
    experience: 5,
    phone: "0923456789",
    email: "tranthibinh@email.com",
    availability: 70
  },
  {
    id: "t3",
    name: "Lê Minh Cường",
    subjects: ["Toán", "Tiếng Anh"],
    area: "Cầu Giấy",
    hourlyRate: 200000,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 4.7,
    experience: 4,
    phone: "0934567890",
    email: "leminhcuong@email.com",
    availability: 90
  },
  {
    id: "t4",
    name: "Phạm Thu Hà",
    subjects: ["Văn", "Tiếng Anh"],
    area: "Hai Bà Trưng",
    hourlyRate: 170000,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 4.9,
    experience: 6,
    phone: "0945678901",
    email: "phamthuha@email.com",
    availability: 75
  },
  {
    id: "t5",
    name: "Hoàng Văn Đức",
    subjects: ["Toán", "Lý", "Hóa"],
    area: "Cầu Giấy",
    hourlyRate: 190000,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    rating: 4.8,
    experience: 4,
    phone: "0956789012",
    email: "hoangvanduc@email.com",
    availability: 95
  }
];

/**
 * Mock classes data
 */
export const MOCK_CLASSES_DATA: Class[] = [
  {
    id: "c1",
    subject: "Toán",
    area: "Cầu Giấy",
    maxFee: 200000,
    studentName: "Nguyễn Minh Anh",
    parentName: "Nguyễn Văn Bình",
    parentPhone: "0987654321",
    status: "unassigned",
    description: "Học sinh lớp 10, cần ôn thi học kỳ",
    grade: "Lớp 10",
    sessionsPerWeek: 2
  },
  {
    id: "c2",
    subject: "Tiếng Anh",
    area: "Đống Đa",
    maxFee: 250000,
    studentName: "Trần Phương Chi",
    parentName: "Trần Văn Dũng",
    parentPhone: "0976543210",
    status: "unassigned",
    description: "Học sinh lớp 9, cần nâng cao giao tiếp",
    grade: "Lớp 9",
    sessionsPerWeek: 3
  },
  {
    id: "c3",
    subject: "Toán",
    area: "Cầu Giấy",
    maxFee: 180000,
    studentName: "Lê Thanh Hà",
    parentName: "Lê Văn Hưng",
    parentPhone: "0965432109",
    status: "assigned",
    description: "Học sinh lớp 11, ôn thi THPT",
    grade: "Lớp 11",
    sessionsPerWeek: 2
  },
  {
    id: "c4",
    subject: "Lý",
    area: "Hai Bà Trưng",
    maxFee: 220000,
    studentName: "Phạm Quốc Khánh",
    parentName: "Phạm Văn Long",
    parentPhone: "0954321098",
    status: "assigned",
    description: "Học sinh lớp 12, ôn thi Đại học",
    grade: "Lớp 12",
    sessionsPerWeek: 3
  }
];

/**
 * Mock contracts data
 */
export const MOCK_CONTRACTS_DATA: Contract[] = [
  {
    id: "ct1",
    tutorId: "t1",
    classId: "c3",
    startDate: "2026-01-05",
    sessionsCompleted: 5,
    status: "active",
    brokerageFee: 180000,
    refundAmount: 0,
    notes: "Đang học tốt, học sinh tiến bộ rõ rệt"
  },
  {
    id: "ct2",
    tutorId: "t3",
    classId: "c4",
    startDate: "2026-01-02",
    sessionsCompleted: 1,
    status: "active",
    brokerageFee: 220000,
    refundAmount: 0,
    notes: "Mới bắt đầu"
  }
];

/**
 * Mock sessions data
 */
export const MOCK_SESSIONS_DATA: Session[] = [
  {
    id: "s1",
    contractId: "ct1",
    sessionNumber: 1,
    date: "2026-01-05",
    status: "completed",
    notes: "Buổi đầu tiên, làm quen"
  },
  {
    id: "s2",
    contractId: "ct1",
    sessionNumber: 2,
    date: "2026-01-06",
    status: "completed",
    notes: "Ôn chương phương trình"
  },
  {
    id: "s3",
    contractId: "ct1",
    sessionNumber: 3,
    date: "2026-01-07",
    status: "completed",
    notes: "Luyện tập bài tập"
  },
  {
    id: "s4",
    contractId: "ct1",
    sessionNumber: 4,
    date: "2026-01-08",
    status: "completed",
    notes: "Kiểm tra kiến thức"
  },
  {
    id: "s5",
    contractId: "ct1",
    sessionNumber: 5,
    date: "2026-01-09",
    status: "completed",
    notes: "Học chương mới"
  },
  {
    id: "s6",
    contractId: "ct2",
    sessionNumber: 1,
    date: "2026-01-02",
    status: "completed",
    notes: "Buổi đầu tiên"
  }
];
