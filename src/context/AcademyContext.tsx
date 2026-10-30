import React, { createContext, useContext, useState, useEffect } from 'react';
import { ACADEMY_CONFIG } from '../data/academyConfig';
import { COURSES } from '../data/courses';
import { Course, AdmissionApplication } from '../types';

export interface AdminAccount {
  id: string;
  fullName: string;
  username: string; // email or username
  email?: string;
  phone?: string;
  role: string;
  password: string;
  createdAt: string;
}

export type AcademyConfigType = typeof ACADEMY_CONFIG;

interface AcademyContextType {
  config: AcademyConfigType;
  updateConfig: (updated: Partial<AcademyConfigType>) => void;
  courses: Course[];
  updateCourse: (id: string, updated: Partial<Course>) => void;
  addCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
  applications: AdmissionApplication[];
  addApplication: (application: AdmissionApplication) => string;
  updateApplicationStatus: (
    id: string,
    status: NonNullable<AdmissionApplication['status']>,
    adminNotes?: string
  ) => void;
  deleteApplication: (id: string) => void;
  isAdmin: boolean;
  adminUser: AdminAccount | null;
  adminAccounts: AdminAccount[];
  signUpAdmin: (accountData: Omit<AdminAccount, 'id' | 'createdAt'>) => { success: boolean; message: string };
  loginAdmin: (identifier: string, password: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  resetAllToDefaults: () => void;
}

const DEFAULT_APPLICATIONS: AdmissionApplication[] = [
  {
    id: 'APP-1001',
    studentName: 'Zubair Ahmed Soomro',
    fatherName: 'Muhammad Ismail Soomro',
    dob: '2005-04-12',
    gender: 'Male',
    mobileNumber: '03272960762',
    whatsappNumber: '03272960762',
    email: 'zubair.ahmed@example.com',
    address: 'Near Shahi Bazaar, Naudero',
    city: 'Naudero',
    selectedCourseId: 'cit',
    highestQualification: 'Matriculation',
    educationalInstitution: 'Govt. High School Naudero',
    obtainedMarks: '745',
    totalMarks: '1100',
    cgpaPercentage: '67.7%',
    group: 'Science',
    preferredShift: 'Morning',
    documentChecklist: ['Matric Certificate / Marksheet', 'CNIC or B-Form Copy', '2 Passport-size Photographs'],
    additionalMessage: 'Want morning 10:00 AM batch if available.',
    agreedToPolicy: true,
    status: 'Pending',
    submittedAt: '2026-10-28 11:30 AM',
    adminNotes: 'Document verification scheduled.'
  },
  {
    id: 'APP-1002',
    studentName: 'Dua Fatima Bhutto',
    fatherName: 'Nisar Ahmed Bhutto',
    dob: '2006-08-19',
    gender: 'Female',
    mobileNumber: '03001234567',
    whatsappNumber: '03001234567',
    email: 'dua.fatima@example.com',
    address: 'Station Road, Naudero',
    city: 'Naudero',
    selectedCourseId: 'web-development',
    highestQualification: 'Intermediate',
    educationalInstitution: 'Govt Girls Degree College Naudero',
    obtainedMarks: '860',
    totalMarks: '1100',
    cgpaPercentage: '78.1%',
    group: 'Pre-Engineering',
    preferredShift: 'Evening',
    documentChecklist: ['Matric Certificate / Marksheet', 'CNIC or B-Form Copy'],
    additionalMessage: 'Interested in frontend web development and freelancing.',
    agreedToPolicy: true,
    status: 'Approved',
    submittedAt: '2026-10-27 04:15 PM',
    adminNotes: 'Candidate interview cleared. Allocated slot: 04:00 PM.'
  },
  {
    id: 'APP-1003',
    studentName: 'Bilal Hussain Channa',
    fatherName: 'Ghulam Hussain Channa',
    dob: '2004-11-05',
    gender: 'Male',
    mobileNumber: '03129876543',
    whatsappNumber: '03129876543',
    email: '',
    address: 'Muhalla Bukhari, Naudero',
    city: 'Naudero',
    selectedCourseId: 'graphic-designing',
    highestQualification: 'Matriculation',
    educationalInstitution: 'Pilot School Larkana',
    obtainedMarks: '690',
    totalMarks: '1100',
    cgpaPercentage: '62.7%',
    group: 'General',
    preferredShift: 'Morning',
    documentChecklist: ['5th / 8th Class Certificate', 'CNIC or B-Form Copy'],
    additionalMessage: 'I want to learn Photoshop and social media poster designing.',
    agreedToPolicy: true,
    status: 'Enrolled',
    submittedAt: '2026-10-25 02:00 PM',
    adminNotes: 'Admission fee deposited.'
  }
];

const AcademyContext = createContext<AcademyContextType | null>(null);

const STORAGE_KEYS = {
  CONFIG: 'gics_naudero_config_v1',
  COURSES: 'gics_naudero_courses_v1',
  APPLICATIONS: 'gics_naudero_applications_v1',
  ADMIN_AUTH: 'gics_naudero_admin_logged_v1',
  ADMIN_ACCOUNTS: 'gics_naudero_admin_accounts_v1',
  ADMIN_USER: 'gics_naudero_admin_current_user_v1'
};

const DEFAULT_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'ADM-001',
    fullName: 'Sir Farooque Ali Soomro',
    username: 'admin',
    email: 'admin@gics-naudero.edu.pk',
    phone: '03272960762',
    role: 'Institute Director & Lead Faculty',
    password: 'password123',
    createdAt: '2026-10-25'
  }
];

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Config State
  const [config, setConfigState] = useState<AcademyConfigType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        return { ...ACADEMY_CONFIG, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load saved config:', e);
    }
    return ACADEMY_CONFIG;
  });

  // 2. Courses State
  const [courses, setCoursesState] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved courses:', e);
    }
    return COURSES;
  });

  // 3. Applications State
  const [applications, setApplicationsState] = useState<AdmissionApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load saved applications:', e);
    }
    return DEFAULT_APPLICATIONS;
  });

  // 4. Admin Accounts State
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_ACCOUNTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load admin accounts:', e);
    }
    return DEFAULT_ADMIN_ACCOUNTS;
  });

  // 5. Admin Current User State
  const [adminUser, setAdminUser] = useState<AdminAccount | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load admin user:', e);
    }
    return null;
  });

  // 6. Admin Auth State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.error(e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch (e) {
      console.error(e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_ACCOUNTS, JSON.stringify(adminAccounts));
    } catch (e) {
      console.error(e);
    }
  }, [adminAccounts]);

  useEffect(() => {
    try {
      if (adminUser) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(adminUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [adminUser]);

  // Actions
  const updateConfig = (updated: Partial<AcademyConfigType>) => {
    setConfigState((prev) => ({
      ...prev,
      ...updated,
      location: { ...prev.location, ...(updated.location || {}) },
      contact: { ...prev.contact, ...(updated.contact || {}) },
      hours: { ...prev.hours, ...(updated.hours || {}) },
      facilities: { ...prev.facilities, ...(updated.facilities || {}) }
    }));
  };

  const updateCourse = (id: string, updated: Partial<Course>) => {
    setCoursesState((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
  };

  const addCourse = (newCourse: Course) => {
    setCoursesState((prev) => [newCourse, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCoursesState((prev) => prev.filter((c) => c.id !== id));
  };

  const addApplication = (app: AdmissionApplication): string => {
    const id = `APP-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    })}`;

    const newApp: AdmissionApplication = {
      ...app,
      id,
      status: 'Pending',
      submittedAt: formattedDate
    };

    setApplicationsState((prev) => [newApp, ...prev]);
    return id;
  };

  const updateApplicationStatus = (
    id: string,
    status: NonNullable<AdmissionApplication['status']>,
    adminNotes?: string
  ) => {
    setApplicationsState((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              ...(adminNotes !== undefined ? { adminNotes } : {})
            }
          : app
      )
    );
  };

  const deleteApplication = (id: string) => {
    setApplicationsState((prev) => prev.filter((app) => app.id !== id));
  };

  // Sign up a new Admin Account
  const signUpAdmin = (accountData: Omit<AdminAccount, 'id' | 'createdAt'>): { success: boolean; message: string } => {
    const cleanUsername = accountData.username.trim().toLowerCase();
    const cleanEmail = (accountData.email || '').trim().toLowerCase();

    // Check if username exists
    const exists = adminAccounts.some(
      (acc) =>
        acc.username.toLowerCase() === cleanUsername ||
        (cleanEmail && acc.email && acc.email.toLowerCase() === cleanEmail)
    );

    if (exists) {
      return { success: false, message: 'An admin account with this username or email already exists.' };
    }

    const newAccount: AdminAccount = {
      ...accountData,
      id: `ADM-${Math.floor(100 + Math.random() * 900)}`,
      username: cleanUsername,
      email: cleanEmail || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAdminAccounts((prev) => [...prev, newAccount]);
    return { success: true, message: 'Admin account created successfully! You can now log in.' };
  };

  // Login Admin
  const loginAdmin = (identifier: string, password: string): { success: boolean; message: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    // Allow master PIN/fallback "1234" for instant verification
    if (cleanId === 'admin' && (cleanPass === '1234' || cleanPass === 'password123' || cleanPass === 'admin')) {
      const rootAcc = adminAccounts[0] || {
        id: 'ADM-001',
        fullName: 'Sir Farooque Ali Soomro',
        username: 'admin',
        email: 'admin@gics-naudero.edu.pk',
        role: 'Institute Director & Lead Faculty',
        password: 'password123',
        createdAt: '2026-10-25'
      };
      setAdminUser(rootAcc);
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true, message: 'Logged in successfully.' };
    }

    // Match against registered admin accounts
    const account = adminAccounts.find(
      (acc) =>
        (acc.username.toLowerCase() === cleanId || (acc.email && acc.email.toLowerCase() === cleanId)) &&
        acc.password === cleanPass
    );

    if (account) {
      setAdminUser(account);
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true, message: 'Logged in successfully.' };
    }

    return { success: false, message: 'Invalid username/email or password.' };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
  };

  const resetAllToDefaults = () => {
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
    localStorage.removeItem(STORAGE_KEYS.COURSES);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_ACCOUNTS);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    setConfigState(ACADEMY_CONFIG);
    setCoursesState(COURSES);
    setApplicationsState(DEFAULT_APPLICATIONS);
    setAdminAccounts(DEFAULT_ADMIN_ACCOUNTS);
    setAdminUser(null);
    setIsAdmin(false);
  };

  return (
    <AcademyContext.Provider
      value={{
        config,
        updateConfig,
        courses,
        updateCourse,
        addCourse,
        deleteCourse,
        applications,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
        isAdmin,
        adminUser,
        adminAccounts,
        signUpAdmin,
        loginAdmin,
        logoutAdmin,
        resetAllToDefaults
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
};
