import React, { useState, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Course, AdmissionApplication } from '../types';
import { SEOHead } from '../components/SEOHead';
import {
  Users,
  BookOpen,
  Settings,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  LogOut,
  Sparkles,
  Save,
  RotateCcw,
  GraduationCap,
  Download,
  KeyRound,
  ExternalLink,
  X
} from 'lucide-react';

interface DashboardPageProps {
  navigate: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
  const {
    config,
    updateConfig,
    courses,
    updateCourse,
    addCourse,
    deleteCourse,
    applications,
    updateApplicationStatus,
    deleteApplication,
    isAdmin,
    adminUser,
    adminAccounts,
    signUpAdmin,
    loginAdmin,
    logoutAdmin,
    resetAllToDefaults
  } = useAcademy();

  // Auth View State: 'signup' vs 'login' (defaults to 'signup' if user needs to create an account first!)
  const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

  // Sign up form state
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '03272960762',
    role: 'Institute Director & Administrator',
    password: '',
    confirmPassword: '',
    accessKey: 'GICS2026'
  });
  const [signupMsg, setSignupMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<'applications' | 'courses' | 'settings' | 'branding'>('applications');

  // Applications filters & state
  const [appSearch, setAppSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);

  // Course creation & editing modal state
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isNewCourse, setIsNewCourse] = useState<boolean>(false);

  // System settings form state
  const [settingsForm, setSettingsForm] = useState({
    name: config.name,
    slogan: config.slogan,
    primaryPhone: config.contact.primaryPhone,
    whatsappNumber: config.contact.whatsappNumber,
    whatsappIntl: config.contact.whatsappIntl,
    email: config.contact.email,
    fullAddress: config.location.fullAddress,
    announcementActive: config.announcementActive ?? true,
    announcementText: config.announcementText ?? '',
    morningSession: config.hours.morningSession,
    eveningSession: config.hours.eveningSession,
    airConditionedClassrooms: config.facilities.airConditionedClassrooms,
    backupPowerSupport: config.facilities.backupPowerSupport,
    dedicatedComputerLab: config.facilities.dedicatedComputerLab,
    leadership: config.leadership.map((l) => ({ ...l }))
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Keep settings form synchronized if config updates
  useEffect(() => {
    setSettingsForm({
      name: config.name,
      slogan: config.slogan,
      primaryPhone: config.contact.primaryPhone,
      whatsappNumber: config.contact.whatsappNumber,
      whatsappIntl: config.contact.whatsappIntl,
      email: config.contact.email,
      fullAddress: config.location.fullAddress,
      announcementActive: config.announcementActive ?? true,
      announcementText: config.announcementText ?? '',
      morningSession: config.hours.morningSession,
      eveningSession: config.hours.eveningSession,
      airConditionedClassrooms: config.facilities.airConditionedClassrooms,
      backupPowerSupport: config.facilities.backupPowerSupport,
      dedicatedComputerLab: config.facilities.dedicatedComputerLab,
      leadership: config.leadership.map((l) => ({ ...l }))
    });
  }, [config]);

  // Handle Sign Up
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupMsg(null);

    if (!signupForm.fullName.trim()) {
      setSignupMsg({ type: 'error', text: 'Please enter your full name.' });
      return;
    }
    if (!signupForm.username.trim()) {
      setSignupMsg({ type: 'error', text: 'Please choose an admin username.' });
      return;
    }
    if (signupForm.password.length < 6) {
      setSignupMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setSignupMsg({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    const res = signUpAdmin({
      fullName: signupForm.fullName,
      username: signupForm.username,
      email: signupForm.email,
      phone: signupForm.phone,
      role: signupForm.role,
      password: signupForm.password
    });

    if (res.success) {
      setSignupMsg({ type: 'success', text: res.message });
      // Pre-fill login credentials and switch to Login tab so user can log in!
      setLoginIdentifier(signupForm.username);
      setLoginPassword(signupForm.password);
      setTimeout(() => {
        setAuthMode('login');
      }, 1200);
    } else {
      setSignupMsg({ type: 'error', text: res.message });
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both username/email and password.');
      return;
    }

    const res = loginAdmin(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  // If not logged in, render the Sign Up / Login Portal
  if (!isAdmin) {
    return (
      <div className="py-12 sm:py-20 bg-slate-100 flex items-center justify-center px-4">
        <SEOHead title="Admin Portal Authentication" />
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
          
          {/* Header banner */}
          <div className="bg-primary text-white p-6 text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-white p-1 mx-auto shadow-md border-2 border-accent">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
                }}
              />
            </div>
            <h1 className="text-xl sm:text-2xl font-black">Institute Admin Portal</h1>
            <p className="text-xs text-slate-300">
              {config.name} • Naudero Campus
            </p>
          </div>

          {/* Toggle Tabs: Sign Up First vs Sign In */}
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              onClick={() => {
                setAuthMode('signup');
                setSignupMsg(null);
              }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-white text-primary border-b-2 border-accent'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>1. Sign Up (Create Account)</span>
            </button>
            <button
              onClick={() => {
                setAuthMode('login');
                setLoginError('');
              }}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                authMode === 'login'
                  ? 'bg-white text-primary border-b-2 border-accent'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>2. Sign In (Log In)</span>
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {/* SIGN UP FORM */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-base font-bold text-navy-900">Register Institute Admin Account</h2>
                  <p className="text-xs text-slate-500">
                    Create your authorized administrative profile to maintain courses, admissions, and fees.
                  </p>
                </div>

                {signupMsg && (
                  <div
                    className={`p-3 rounded-lg text-xs font-semibold ${
                      signupMsg.type === 'success'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {signupMsg.text}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={signupForm.fullName}
                    onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                    placeholder="e.g. Sir Farooque Ali Soomro"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Admin Username <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={signupForm.username}
                      onChange={(e) => setSignupForm({ ...signupForm, username: e.target.value })}
                      placeholder="e.g. director_naudero"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Official Email
                    </label>
                    <input
                      type="email"
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                      placeholder="admin@gics-naudero.edu.pk"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      placeholder="03272960762"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Administrative Role
                    </label>
                    <select
                      value={signupForm.role}
                      onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                    >
                      <option value="Institute Director & Administrator">Institute Director & Administrator</option>
                      <option value="Head of Admissions & Examination">Head of Admissions & Examination</option>
                      <option value="Faculty Instructor & Lab Manager">Faculty Instructor & Lab Manager</option>
                      <option value="Accounts & Registration Desk">Accounts & Registration Desk</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                      placeholder="Minimum 6 characters"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={signupForm.confirmPassword}
                      onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                      placeholder="Re-enter password"
                      className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-navy-950 font-bold py-3 px-4 rounded-xl shadow transition cursor-pointer text-sm"
                >
                  Create Admin Account
                </button>

                <p className="text-center text-xs text-slate-500">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Click here to Sign In
                  </button>
                </p>
              </form>
            )}

            {/* LOGIN FORM */}
            {authMode === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-base font-bold text-navy-900">Sign In to Admin Dashboard</h2>
                  <p className="text-xs text-slate-500">
                    Enter your registered admin username or email and password.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-lg text-xs font-semibold">
                    {loginError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Enter your admin username or email"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-navy-950 font-bold py-3 px-4 rounded-xl shadow transition cursor-pointer text-sm"
                >
                  Sign In to Management Dashboard
                </button>

                <div className="pt-3 border-t border-slate-100 flex flex-col gap-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginIdentifier('admin');
                      setLoginPassword('password123');
                      loginAdmin('admin', 'password123');
                    }}
                    className="text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 py-2 px-3 rounded-lg border border-emerald-200 font-semibold cursor-pointer"
                  >
                    Quick One-Click Demo Admin Login (admin / password123)
                  </button>

                  <p className="text-xs text-slate-500">
                    Need a new admin profile?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-primary font-bold hover:underline cursor-pointer"
                    >
                      Sign Up First Here
                    </button>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.fatherName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.mobileNumber.includes(appSearch) ||
      (app.id && app.id.toLowerCase().includes(appSearch.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      name: settingsForm.name,
      slogan: settingsForm.slogan,
      announcementText: settingsForm.announcementText,
      announcementActive: settingsForm.announcementActive,
      contact: {
        ...config.contact,
        primaryPhone: settingsForm.primaryPhone,
        whatsappNumber: settingsForm.whatsappNumber,
        whatsappIntl: settingsForm.whatsappIntl || settingsForm.whatsappNumber.replace(/^0/, '92'),
        email: settingsForm.email
      },
      location: {
        ...config.location,
        fullAddress: settingsForm.fullAddress
      },
      hours: {
        ...config.hours,
        morningSession: settingsForm.morningSession,
        eveningSession: settingsForm.eveningSession
      },
      facilities: {
        ...config.facilities,
        airConditionedClassrooms: settingsForm.airConditionedClassrooms,
        backupPowerSupport: settingsForm.backupPowerSupport,
        dedicatedComputerLab: settingsForm.dedicatedComputerLab
      },
      leadership: settingsForm.leadership
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export applications to CSV
  const handleExportCSV = () => {
    const headers = [
      'Application ID',
      'Date',
      'Student Name',
      'Father Name',
      'Mobile',
      'WhatsApp',
      'Course',
      'Shift',
      'Qualification',
      'Marks Obtained',
      'Total Marks',
      'Status'
    ];
    const rows = applications.map((a) => [
      a.id || '',
      a.submittedAt || '',
      `"${a.studentName}"`,
      `"${a.fatherName}"`,
      a.mobileNumber,
      a.whatsappNumber,
      a.selectedCourseId,
      a.preferredShift,
      a.highestQualification,
      a.obtainedMarks,
      a.totalMarks,
      a.status || 'Pending'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `GICS_Naudero_Admissions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // WhatsApp helper for contacting applicant
  const getWhatsAppMessageUrl = (app: AdmissionApplication) => {
    const courseObj = courses.find((c) => c.id === app.selectedCourseId);
    const courseTitle = courseObj ? courseObj.name : app.selectedCourseId;
    const cleanNumber = app.whatsappNumber.startsWith('0')
      ? '92' + app.whatsappNumber.slice(1)
      : app.whatsappNumber.replace(/[^0-9]/g, '');

    const message = encodeURIComponent(
      `Assalam-o-Alaikum ${app.studentName},\n\nThis is regarding your admission application (${app.id || 'Recent'}) for ${courseTitle} at ${config.name}.\n\nYour application status is: *${app.status || 'Under Review'}*.\n\nPlease visit our campus in Naudero or reply to this message for batch allotment.\n\nHelpline: ${config.contact.primaryPhone}`
    );

    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <SEOHead title="Institute Management Dashboard" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Bar Header */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 object-contain rounded-full shadow-sm border border-slate-200 bg-white"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-navy-900">Admin Control Center</h1>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Live Sync
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Logged in as: <strong className="text-navy-900">{adminUser ? adminUser.fullName : 'Administrator'}</strong>{' '}
                <span className="text-emerald-700 font-semibold">({adminUser ? adminUser.role : 'Authorized Admin'})</span> • Helpline:{' '}
                <strong className="text-navy-900 font-mono">{config.contact.primaryPhone}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <button
              onClick={() => navigate('/')}
              className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="text-xs font-semibold px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Total Applications</span>
              <p className="text-2xl font-black text-navy-900">{applications.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Pending Review</span>
              <p className="text-2xl font-black text-amber-600">
                {applications.filter((a) => a.status === 'Pending').length}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Active Courses</span>
              <p className="text-2xl font-black text-emerald-600">{courses.length}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs text-slate-500 font-medium">Helpline Active</span>
              <p className="text-sm font-bold text-navy-900 truncate">{config.contact.primaryPhone}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'applications'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Admissions & Students ({applications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Manage Courses & Fees ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Institute Info & Phone</span>
          </button>

          <button
            onClick={() => setActiveTab('branding')}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap cursor-pointer ${
              activeTab === 'branding'
                ? 'bg-primary text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Logo & Insignia</span>
          </button>
        </div>

        {/* TAB 1: APPLICATIONS / ADMISSIONS */}
        {activeTab === 'applications' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Admission Applications</h2>
                <p className="text-xs text-slate-500">
                  Review student admissions, check marks and documents, update status, and chat via WhatsApp.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleExportCSV}
                  className="text-xs font-semibold px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to Excel/CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
              <div className="sm:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by student name, father name, application ID, or phone..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div className="sm:col-span-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3">ID / Date</th>
                    <th className="py-3 px-3">Student Name</th>
                    <th className="py-3 px-3">Course / Shift</th>
                    <th className="py-3 px-3">Marks (Obtained/Total)</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => {
                    const courseObj = courses.find((c) => c.id === app.selectedCourseId);
                    return (
                      <tr key={app.id || app.studentName} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-3 font-mono">
                          <span className="font-bold text-navy-900">{app.id || 'N/A'}</span>
                          <span className="block text-[10px] text-slate-400">{app.submittedAt}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-900 block">{app.studentName}</span>
                          <span className="text-[11px] text-slate-500">S/D/O {app.fatherName}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-semibold text-primary block">
                            {courseObj ? courseObj.name : app.selectedCourseId}
                          </span>
                          <span className="text-[11px] text-slate-500">{app.preferredShift} Shift</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-800">
                            {app.obtainedMarks} / {app.totalMarks}
                          </span>
                          {app.cgpaPercentage && (
                            <span className="block text-[10px] text-emerald-600 font-semibold">
                              {app.cgpaPercentage}
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <a
                            href={`tel:${app.mobileNumber}`}
                            className="font-mono text-slate-700 hover:text-accent block font-medium"
                          >
                            {app.mobileNumber}
                          </a>
                          <span className="text-[10px] text-slate-400">{app.city}</span>
                        </td>
                        <td className="py-3 px-3">
                          <select
                            value={app.status || 'Pending'}
                            onChange={(e) =>
                              updateApplicationStatus(
                                app.id!,
                                e.target.value as NonNullable<AdmissionApplication['status']>
                              )
                            }
                            className={`text-[11px] font-bold px-2 py-1 rounded-md border cursor-pointer ${
                              app.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : app.status === 'Enrolled'
                                ? 'bg-blue-50 text-blue-700 border-blue-300'
                                : app.status === 'Pending'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : app.status === 'Contacted'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                                : 'bg-rose-50 text-rose-700 border-rose-300'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Approved">Approved</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              title="View Full Admission Dossier"
                              className="p-1.5 text-slate-600 hover:text-primary hover:bg-slate-200 rounded transition cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <a
                              href={getWhatsAppMessageUrl(app)}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Message Student on WhatsApp"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete application for ${app.studentName}?`)) {
                                  deleteApplication(app.id!);
                                }
                              }}
                              title="Delete Application"
                              className="p-1.5 text-rose-500 hover:bg-rose-50 rounded transition cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {filteredApps.length === 0 && (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No admission applications match your filter.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: COURSE MANAGEMENT */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Courses & Tuition Fees</h2>
                <p className="text-xs text-slate-500">
                  Update fees, batch durations, class schedules, or add new training courses.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsNewCourse(true);
                  setEditingCourse({
                    id: 'course-' + Date.now(),
                    name: '',
                    fullForm: '',
                    category: 'Certificate',
                    tagline: '',
                    overview: '',
                    duration: '3 Months',
                    feeDetails: {
                      monthlyFee: 'PKR 1,500',
                      admissionFee: 'PKR 500'
                    },
                    schedule: {
                      days: 'Monday to Friday',
                      classDuration: '1 hour per class'
                    },
                    entryRequirements: ['Basic literacy'],
                    requiredDocuments: ['CNIC or B-Form copy', 'Photographs'],
                    learningObjectives: ['Practical computer training'],
                    topicsCovered: ['Fundamentals'],
                    skillsLearned: ['Computer skills'],
                    intendedAudience: ['Students and youth'],
                    admissionStatus: 'Open'
                  });
                }}
                className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {course.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {course.admissionStatus}
                      </span>
                    </div>

                    <h3 className="font-bold text-navy-900 text-base">{course.name}</h3>
                    {course.fullForm && (
                      <p className="text-xs text-slate-500">{course.fullForm}</p>
                    )}

                    <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-semibold text-slate-800">{course.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Monthly Fee:</span>
                        <span className="font-bold text-navy-900">
                          {course.feeDetails.monthlyFee || 'On Inquiry'}
                        </span>
                      </div>
                      {course.feeDetails.admissionFee && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Admission Fee:</span>
                          <span className="font-semibold text-slate-800">{course.feeDetails.admissionFee}</span>
                        </div>
                      )}
                      {course.feeDetails.certificateFee && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cert. Fee:</span>
                          <span className="font-semibold text-slate-800">{course.feeDetails.certificateFee}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setIsNewCourse(false);
                        setEditingCourse({ ...course });
                      }}
                      className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit Course & Fee</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete ${course.name}?`)) {
                          deleteCourse(course.id);
                        }
                      }}
                      className="text-xs text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                      title="Delete Course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS & PHONE NUMBER */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-navy-900">Institute Contact & Configuration</h2>
                <p className="text-xs text-slate-500">
                  Update your contact phone, WhatsApp desk, announcement ribbon, and facilities.
                </p>
              </div>

              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>

            {saveSuccess && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs p-3 rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Settings updated successfully! The entire website is now using the new configuration.</span>
              </div>
            )}

            {/* Official Helpline & Phone (Primary User Request) */}
            <div className="bg-emerald-50/60 border border-emerald-200 p-5 rounded-xl space-y-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-700" />
                <h3 className="font-bold text-navy-900 text-sm">Official Contact Phone & WhatsApp</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Phone Number (Local Format)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.primaryPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, primaryPhone: e.target.value })}
                    placeholder="03272960762"
                    className="w-full text-sm font-mono font-bold p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Shown in header, footer, & contact page.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Desk Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    placeholder="03272960762"
                    className="w-full text-sm font-mono font-bold p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">For direct WhatsApp chats.</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp International Format (No plus sign)
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappIntl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappIntl: e.target.value })}
                    placeholder="923272960762"
                    className="w-full text-sm font-mono font-bold p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  <span className="text-[10px] text-slate-500 mt-0.5 block">e.g. 923272960762 for WhatsApp API links.</span>
                </div>
              </div>
            </div>

            {/* Announcement Ribbon */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy-900 text-sm">Top Announcement Ribbon</span>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={settingsForm.announcementActive}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementActive: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-accent cursor-pointer"
                  />
                  <span>Show ribbon on website</span>
                </label>
              </div>

              <input
                type="text"
                value={settingsForm.announcementText}
                onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                placeholder="e.g. New admissions now enrolling for Morning & Evening Batches!"
                className="w-full text-xs sm:text-sm p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academy Name</label>
                <input
                  type="text"
                  value={settingsForm.name}
                  onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Motto / Slogan</label>
                <input
                  type="text"
                  value={settingsForm.slogan}
                  onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Morning Shift Window</label>
                <input
                  type="text"
                  value={settingsForm.morningSession}
                  onChange={(e) => setSettingsForm({ ...settingsForm, morningSession: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evening Shift Window</label>
                <input
                  type="text"
                  value={settingsForm.eveningSession}
                  onChange={(e) => setSettingsForm({ ...settingsForm, eveningSession: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            {/* Facilities Toggles */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <span className="font-bold text-navy-900 text-sm block">Facilities & Badges</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-800">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.airConditionedClassrooms}
                    onChange={(e) => setSettingsForm({ ...settingsForm, airConditionedClassrooms: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-accent cursor-pointer"
                  />
                  <div>
                    <span className="font-bold block">Air-Conditioned Classrooms</span>
                    <span className="text-[10px] text-slate-500">Toggle AC classroom badge</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.backupPowerSupport}
                    onChange={(e) => setSettingsForm({ ...settingsForm, backupPowerSupport: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-accent cursor-pointer"
                  />
                  <div>
                    <span className="font-bold block">Backup Power Support</span>
                    <span className="text-[10px] text-slate-500">UPS / Generator support</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settingsForm.dedicatedComputerLab}
                    onChange={(e) => setSettingsForm({ ...settingsForm, dedicatedComputerLab: e.target.checked })}
                    className="rounded text-emerald-600 focus:ring-accent cursor-pointer"
                  />
                  <div>
                    <span className="font-bold block">Dedicated Computer Lab</span>
                    <span className="text-[10px] text-slate-500">Machine for each student</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Faculty & Leadership order */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <span className="font-bold text-navy-900 text-sm block">Faculty & Leadership Directory</span>
              <div className="space-y-2">
                {settingsForm.leadership.map((person, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-white p-2.5 rounded-lg border border-slate-200">
                    <span className="w-6 h-6 rounded bg-slate-100 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={person.name}
                      onChange={(e) => {
                        const updated = [...settingsForm.leadership];
                        updated[idx].name = e.target.value;
                        setSettingsForm({ ...settingsForm, leadership: updated });
                      }}
                      className="text-xs p-2 rounded border border-slate-200 w-1/2 focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Faculty Name"
                    />
                    <input
                      type="text"
                      value={person.designation}
                      onChange={(e) => {
                        const updated = [...settingsForm.leadership];
                        updated[idx].designation = e.target.value;
                        setSettingsForm({ ...settingsForm, leadership: updated });
                      }}
                      className="text-xs p-2 rounded border border-slate-200 w-1/2 focus:outline-none focus:ring-1 focus:ring-accent"
                      placeholder="Designation"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Admin Profiles */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-navy-900 text-sm block">Authorized Administrator Profiles</span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-semibold">
                  {adminAccounts.length} Active Accounts
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {adminAccounts.map((acc) => (
                  <div key={acc.id} className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-start">
                    <div>
                      <p className="font-bold text-navy-900">{acc.fullName}</p>
                      <p className="text-[11px] text-slate-500 font-mono">@{acc.username} • {acc.role}</p>
                      {acc.email && <p className="text-[10px] text-slate-400">{acc.email}</p>}
                    </div>
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                      {acc.createdAt}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all website data to initial defaults?')) {
                    resetAllToDefaults();
                    alert('Data restored to defaults.');
                  }
                }}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>

              <button
                type="submit"
                className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-2.5 rounded-lg text-xs flex items-center gap-2 shadow transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: BRANDING & LOGO */}
        {activeTab === 'branding' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-navy-900">Institute Logo & Insignia</h2>
              <p className="text-xs text-slate-500">
                Official circular emblem of Global Institute of Computer Science Naudero.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-44 h-44 rounded-full bg-white p-3 shadow-lg border-2 border-primary flex items-center justify-center">
                  <img
                    src="/logo.png"
                    alt="Official Logo"
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <span className="bg-accent text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Official Active Logo
                  </span>
                  <p className="text-xs text-slate-500 mt-1">GLOBAL ICS NAUDERO Emblem</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
                <h3 className="font-bold text-navy-900 text-sm">Emblem Features:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Circular Badge:</strong> Features "GLOBAL" top arch and "ICS NAUDERO" bottom banner.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Torch of Knowledge & Technology:</strong> Educational torch surmounted with an active flame.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Computer Monitor:</strong> Representing IT, coding, and software skills.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>Golden & Green Laurel Wreath:</strong> Representing academic excellence and honor.</span>
                  </li>
                </ul>

                <div className="pt-2">
                  <p className="text-slate-500">
                    The logo is seamlessly integrated across the website header, footer, favicon, and print records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: APPLICANT DOSSIER MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Candidate Dossier • {selectedApp.id}
                </span>
                <h3 className="text-xl font-bold text-navy-900">{selectedApp.studentName}</h3>
                <p className="text-xs text-slate-500">Father / Guardian: {selectedApp.fatherName}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Applied Course</span>
                <span className="font-bold text-primary">
                  {courses.find((c) => c.id === selectedApp.selectedCourseId)?.name || selectedApp.selectedCourseId}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Preferred Shift</span>
                <span className="font-bold text-slate-800">{selectedApp.preferredShift} Shift</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Date of Birth</span>
                <span className="font-bold text-slate-800">{selectedApp.dob || 'Not provided'}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Mobile Number</span>
                <a href={`tel:${selectedApp.mobileNumber}`} className="font-bold text-navy-900 hover:underline">
                  {selectedApp.mobileNumber}
                </a>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">WhatsApp</span>
                <a
                  href={`https://wa.me/92${selectedApp.whatsappNumber.replace(/^0/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline"
                >
                  {selectedApp.whatsappNumber}
                </a>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">City</span>
                <span className="font-bold text-slate-800">{selectedApp.city}</span>
              </div>
            </div>

            {/* Academic Record with SEPARATE Obtained Marks & Total Marks */}
            <div className="bg-blue-50/50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-2">
              <span className="font-bold text-navy-900 block">Verified Academic Qualifications:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px] block">Level:</span>
                  <span className="font-semibold text-slate-800">{selectedApp.highestQualification}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Group:</span>
                  <span className="font-semibold text-slate-800">{selectedApp.group}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Obtained Marks:</span>
                  <span className="font-black text-navy-900 text-sm">{selectedApp.obtainedMarks}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Total Marks:</span>
                  <span className="font-black text-navy-900 text-sm">{selectedApp.totalMarks}</span>
                </div>
              </div>
              {selectedApp.educationalInstitution && (
                <p className="text-[11px] text-slate-600">
                  <strong>School/College:</strong> {selectedApp.educationalInstitution}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="text-xs bg-slate-50 p-3 rounded-lg">
              <span className="text-slate-400 text-[10px] block">Residential Address:</span>
              <p className="font-medium text-slate-800">{selectedApp.address}, {selectedApp.city}</p>
            </div>

            {/* Documents checklist */}
            <div className="text-xs space-y-1.5">
              <span className="font-bold text-slate-800">Physical Documents Brought:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedApp.documentChecklist.length > 0 ? (
                  selectedApp.documentChecklist.map((doc, i) => (
                    <span key={i} className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                      ✓ {doc}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-400">None checked</span>
                )}
              </div>
            </div>

            {/* Note & Admin remarks */}
            {selectedApp.additionalMessage && (
              <div className="text-xs bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900">
                <strong>Applicant Message:</strong> {selectedApp.additionalMessage}
              </div>
            )}

            {/* Status Selector & WhatsApp button */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-600">Update Status:</span>
                <select
                  value={selectedApp.status || 'Pending'}
                  onChange={(e) => {
                    const newStatus = e.target.value as NonNullable<AdmissionApplication['status']>;
                    updateApplicationStatus(selectedApp.id!, newStatus);
                    setSelectedApp({ ...selectedApp, status: newStatus });
                  }}
                  className="text-xs font-bold p-1.5 rounded border border-slate-300 focus:ring-accent"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Approved">Approved</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="flex gap-2 w-full sm:w-auto justify-end">
                <a
                  href={getWhatsAppMessageUrl(selectedApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Send WhatsApp Update</span>
                </a>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: COURSE EDIT / CREATE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-navy-900">
                {isNewCourse ? 'Add New Course' : `Edit ${editingCourse.name}`}
              </h3>
              <button
                onClick={() => setEditingCourse(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Short Name</label>
                  <input
                    type="text"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                    placeholder="e.g. C.I.T or Python"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Program Title</label>
                  <input
                    type="text"
                    value={editingCourse.fullForm || ''}
                    onChange={(e) => setEditingCourse({ ...editingCourse, fullForm: e.target.value })}
                    placeholder="e.g. Certificate in Information Tech"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editingCourse.category}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        category: e.target.value as Course['category']
                      })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Certificate">Certificate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Skill">Skill</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Admission Status</label>
                  <select
                    value={editingCourse.admissionStatus}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        admissionStatus: e.target.value as Course['admissionStatus']
                      })
                    }
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Open">Open</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Inquire">Inquire</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Monthly Fee</label>
                  <input
                    type="text"
                    value={editingCourse.feeDetails.monthlyFee || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        feeDetails: { ...editingCourse.feeDetails, monthlyFee: e.target.value }
                      })
                    }
                    placeholder="e.g. PKR 1,200"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Admission Fee</label>
                  <input
                    type="text"
                    value={editingCourse.feeDetails.admissionFee || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        feeDetails: { ...editingCourse.feeDetails, admissionFee: e.target.value }
                      })
                    }
                    placeholder="e.g. PKR 500"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Certificate Fee</label>
                  <input
                    type="text"
                    value={editingCourse.feeDetails.certificateFee || ''}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        feeDetails: { ...editingCourse.feeDetails, certificateFee: e.target.value }
                      })
                    }
                    placeholder="e.g. PKR 3,000"
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Duration & Schedule</label>
                <input
                  type="text"
                  value={editingCourse.duration}
                  onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                  placeholder="e.g. 6 Months"
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Overview</label>
                <textarea
                  rows={3}
                  value={editingCourse.overview}
                  onChange={(e) => setEditingCourse({ ...editingCourse, overview: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingCourse(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!editingCourse.name.trim()) return;
                  if (isNewCourse) {
                    addCourse(editingCourse);
                  } else {
                    updateCourse(editingCourse.id, editingCourse);
                  }
                  setEditingCourse(null);
                }}
                className="px-5 py-2 bg-accent hover:bg-accent-hover text-navy-950 font-bold rounded-lg text-xs shadow transition cursor-pointer"
              >
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
