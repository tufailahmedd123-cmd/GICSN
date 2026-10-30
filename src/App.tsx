import React, { useState, useEffect } from 'react';
import { AcademyProvider } from './context/AcademyContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Chatbot } from './components/Chatbot';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { AdmissionPage } from './pages/AdmissionPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  // Production-grade client-side hash router for zero-configuration deployment on static hosting
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.hash.replace('#', '') || '/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const path = window.location.hash.replace('#', '') || '/';
      setCurrentPath(path);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Route resolver
  const renderCurrentPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage navigate={navigate} />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/courses') {
      return <CoursesPage navigate={navigate} />;
    }
    if (currentPath.startsWith('/course/')) {
      const courseId = currentPath.replace('/course/', '');
      return <CourseDetailPage courseId={courseId} navigate={navigate} />;
    }
    if (currentPath === '/apply') {
      return <AdmissionPage navigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/faq') {
      return <FAQPage />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPolicyPage />;
    }
    if (currentPath === '/terms') {
      return <TermsPage />;
    }
    if (currentPath === '/dashboard') {
      return <DashboardPage navigate={navigate} />;
    }
    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-accent selection:text-navy-950">
      <Header currentPath={currentPath} navigate={navigate} />
      
      <main className="flex-grow">
        {renderCurrentPage()}
      </main>

      <Footer navigate={navigate} />

      <Chatbot navigate={navigate} />
      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AcademyProvider>
      <AppContent />
    </AcademyProvider>
  );
};

export default App;
