import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Course } from '../types';
import { 
  Monitor, 
  Clock, 
  CheckCircle, 
  Calendar, 
  ArrowRight, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  MessageSquare,
  HelpCircle,
  Zap,
  Code,
  Palette,
  Award,
  Layers,
  Check,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  navigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { config, courses } = useAcademy();

  // Interactive Hero Explorer State
  const [selectedHeroCategory, setSelectedHeroCategory] = useState<'featured' | 'programming' | 'multimedia' | 'timing'>('featured');
  const [selectedHeroCourseId, setSelectedHeroCourseId] = useState<string>('web-development');

  // Filter for Courses Section
  const [activeCatalogFilter, setActiveCatalogFilter] = useState<string>('All');

  // Active hero course object
  const activeHeroCourse = courses.find((c) => c.id === selectedHeroCourseId) || courses[0];

  // Pre-filled WhatsApp link for general admission inquiries
  const waAdmissionUrl = `https://wa.me/${config.contact.whatsappIntl}?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I want to inquire about admissions and batch timings at ${config.name}. Please guide me.`
  )}`;

  // Filtered courses for catalog
  const filteredCourses = courses.filter((c) => {
    if (activeCatalogFilter === 'All') return true;
    return c.category === activeCatalogFilter;
  });

  return (
    <div className="overflow-hidden">
      
      {/* 1. HERO SECTION - BEST-IN-CLASS, ATTRACTIVE, NO ISOLATED C.I.T CARD */}
      <section className="relative bg-gradient-to-br from-navy-950 via-primary to-navy-900 text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
        
        {/* Ambient Glows & Grid Pattern */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Academy Value Proposition & Branding */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Top Banner Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-accent animate-spin [animation-duration:3s]" />
                <span>Admissions Open for Morning & Evening Sessions</span>
              </div>

              {/* Institution Identity */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 border-2 border-accent shadow-2xl shrink-0">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-full h-full object-contain rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
                    }}
                  />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
                    {config.name}
                  </h1>
                  <p className="text-emerald-300 font-semibold text-base sm:text-lg italic mt-1">
                    "{config.slogan}"
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                Step into modern computer education in Naudero. We combine dedicated computer lab workstations, 
                step-by-step instructor guidance, flexible morning & evening batch shifts, and uninterrupted backup power.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/apply')}
                  className="bg-accent hover:bg-accent-hover text-navy-950 font-extrabold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => navigate('/courses')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <span>Explore All {courses.length} Courses</span>
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-slate-900/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/30 font-semibold px-4 py-3.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Admin Portal</span>
                </button>
              </div>

              {/* Key Trust Highlights Strip */}
              <div className="pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>100% Practical Lab</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>Morning & Evening</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>Generator Backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                  <span>Verified Mentors</span>
                </div>
              </div>

            </div>

            {/* Right Column: Modern Interactive Academy Program Showcase */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-slate-700 shadow-2xl space-y-5 text-left relative overflow-hidden">
                
                {/* Decorative glow */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/20 rounded-full blur-xl pointer-events-none"></div>

                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                      Campus Interactive Showcase
                    </span>
                    <h3 className="text-lg font-black text-white">Programs & Shift Allocator</h3>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    2025–2026 Batches
                  </span>
                </div>

                {/* Explorer Category Tabs */}
                <div className="flex gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => {
                      setSelectedHeroCategory('featured');
                      setSelectedHeroCourseId('web-development');
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition text-center cursor-pointer ${
                      selectedHeroCategory === 'featured'
                        ? 'bg-accent text-navy-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Web Dev
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHeroCategory('multimedia');
                      setSelectedHeroCourseId('graphic-designing');
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition text-center cursor-pointer ${
                      selectedHeroCategory === 'multimedia'
                        ? 'bg-accent text-navy-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Graphics
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHeroCategory('programming');
                      setSelectedHeroCourseId('java-programming');
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition text-center cursor-pointer ${
                      selectedHeroCategory === 'programming'
                        ? 'bg-accent text-navy-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Coding
                  </button>
                  <button
                    onClick={() => {
                      setSelectedHeroCategory('timing');
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition text-center cursor-pointer ${
                      selectedHeroCategory === 'timing'
                        ? 'bg-accent text-navy-950 shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Shifts
                  </button>
                </div>

                {/* Interactive Card Body: Course details or Shift Timings */}
                {selectedHeroCategory !== 'timing' ? (
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3.5">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                          {activeHeroCourse.category} Track
                        </span>
                        <h4 className="text-xl font-black text-white">{activeHeroCourse.name}</h4>
                        {activeHeroCourse.fullForm && (
                          <p className="text-xs text-slate-400">{activeHeroCourse.fullForm}</p>
                        )}
                      </div>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-md border border-emerald-700/50">
                        {activeHeroCourse.duration}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {activeHeroCourse.overview}
                    </p>

                    {/* Quick highlights */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>1 Hour Daily (Mon–Fri)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Monitor className="w-3.5 h-3.5 text-accent shrink-0" />
                        <span>Dedicated Lab PC</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {activeHeroCourse.skillsLearned.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="bg-slate-800/80 text-emerald-300 text-[10px] px-2 py-0.5 rounded border border-slate-700">
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Shift Timings Interactive Showcase */
                  <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                      Daily Class Windows
                    </span>
                    
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span> Morning Shift
                        </span>
                        <span className="text-amber-400 font-mono font-bold">{config.hours.morningSession}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Batches starting every hour between 09:00 AM & 12:00 PM.</p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Evening Shift
                        </span>
                        <span className="text-emerald-400 font-mono font-bold">{config.hours.eveningSession}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">Batches starting every hour between 02:00 PM & 09:00 PM.</p>
                    </div>

                    <p className="text-[10px] text-slate-400 italic">
                      Classes run Monday through Friday with 1 hour allocated daily to each student.
                    </p>
                  </div>
                )}

                {/* Hero Card Footer Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => navigate('/apply')}
                    className="w-full bg-accent hover:bg-accent-hover text-navy-950 font-bold py-2.5 px-3 rounded-xl text-xs transition text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>Enroll Now</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={waAdmissionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border border-emerald-500/50 text-emerald-300 hover:bg-emerald-950/60 font-semibold py-2.5 px-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>

                {/* Helpline quick strip */}
                <div className="text-center pt-1 border-t border-slate-800/80">
                  <p className="text-[11px] text-slate-400">
                    Official Admissions Desk: <strong className="font-mono text-emerald-400">{config.contact.primaryPhone}</strong>
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. STATS BAR & QUICK ADVANTAGES */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-navy-900">9+</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Accredited Programs</p>
              <p className="text-[11px] text-slate-400">Software, Design & Diplomas</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-navy-900">2 Shifts</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Morning & Evening</p>
              <p className="text-[11px] text-slate-400">09:00 AM – 09:00 PM</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-navy-900">1:1</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Lab Practice Workstation</p>
              <p className="text-[11px] text-slate-400">Individual machine for every learner</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600">100%</span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Practical & Hands-On</p>
              <p className="text-[11px] text-slate-400">Backup power & generator supported</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FULL ACCREDITED COURSE CATALOG (Interactive Filter) */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Curriculum Catalog</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 mt-1">
                Explore All Professional Programs
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Choose from vocational diplomas, coding bootcamps, and creative design courses.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
              {['All', 'Certificate', 'Diploma', 'Skill', 'Programming'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCatalogFilter(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    activeCatalogFilter === category
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between p-6 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {course.admissionStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-navy-900 group-hover:text-primary transition-colors mb-1">
                    {course.name}
                  </h3>
                  {course.fullForm && (
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      {course.fullForm}
                    </p>
                  )}
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </span>
                    {course.feeDetails.monthlyFee ? (
                      <span className="font-bold text-navy-900">
                        {course.feeDetails.monthlyFee}/month
                      </span>
                    ) : (
                      <span className="text-slate-400">Fee on request</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2.5 px-3 rounded-lg transition text-center cursor-pointer"
                    >
                      Full Details
                    </button>
                    <button
                      onClick={() => navigate('/apply')}
                      className="w-full bg-accent hover:bg-accent-hover text-navy-950 text-xs font-bold py-2.5 px-3 rounded-lg transition text-center cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. LEARNING ENVIRONMENT & FACILITIES */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Quality Infrastructure
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900">
              Modern Computer Lab & Learning Environment
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At {config.name}, practical hands-on machine practice is the core of every class.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">1:1 Practical Workstations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Individual personal computers for every student during their allocated 1-hour session.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Uninterrupted Backup Power</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated generator and UPS support ensures continuous classes even during power cuts.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Dual Session Shifts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Morning ({config.hours.morningSession}) & Evening ({config.hours.eveningSession}) slots.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-navy-900">Step-by-Step Mentorship</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Patient guidance from verified faculty instructors for learners starting from scratch.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SIMPLE 4-STEP ADMISSION PROCESS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">How to Join</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Admission in 4 Simple Steps
            </h2>
            <p className="text-slate-600 text-sm">
              Transparent registration for students and professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-3xl font-black text-slate-200 block">01</span>
              <h4 className="font-bold text-navy-900 text-base mt-2 mb-1">Choose Course</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse our web, software, design, or typing programs and choose a shift.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-3xl font-black text-slate-200 block">02</span>
              <h4 className="font-bold text-navy-900 text-base mt-2 mb-1">Fill Application</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit our online admission form or visit the academy desk in Naudero.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-3xl font-black text-slate-200 block">03</span>
              <h4 className="font-bold text-navy-900 text-base mt-2 mb-1">Verify Documents</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bring CNIC / B-Form, educational marksheets, and passport photos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <span className="text-3xl font-black text-slate-200 block">04</span>
              <h4 className="font-bold text-navy-900 text-base mt-2 mb-1">Start Lab Training</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive your daily 1-hour slot (Mon–Fri) and start computer classes.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/apply')}
              className="bg-accent hover:bg-accent-hover text-navy-950 font-extrabold px-8 py-3.5 rounded-xl shadow transition cursor-pointer text-sm"
            >
              Start Your Online Application
            </button>
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION (No isolated CIT question) */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center space-y-2">
            <HelpCircle className="w-8 h-8 text-emerald-600 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Clear answers for students and parents.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="font-bold text-navy-900 text-sm sm:text-base">
                What course timings and shifts are offered?
              </h3>
              <p className="text-slate-600 mt-2 leading-relaxed">
                We operate two daily session shifts: Morning ({config.hours.morningSession}) and Evening ({config.hours.eveningSession}). 
                Classes run Monday through Friday with 1 hour allocated daily to each student batch.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="font-bold text-navy-900 text-sm sm:text-base">
                Can beginners join with no prior computer background?
              </h3>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Yes! Our instructors start from basic computer handling, keyboard touch typing, and Windows operations before advancing to modern software and programming.
              </p>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">
              <h3 className="font-bold text-navy-900 text-sm sm:text-base">
                Where is the campus located and how can I contact you?
              </h3>
              <p className="text-slate-600 mt-2 leading-relaxed">
                Our institute is located in {config.location.fullAddress}. You can call our official helpline or chat on WhatsApp at <strong className="font-mono text-navy-900">{config.contact.primaryPhone}</strong>.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/faq')}
              className="text-primary hover:text-accent font-bold text-sm inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Academy FAQs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. WHATSAPP & ADMISSION ACTION BANNER */}
      <section className="bg-primary text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-black text-white">Have questions about courses or admission?</h3>
            <p className="text-slate-300 text-sm mt-1">
              Speak directly with academy administration: <strong className="font-mono text-accent">{config.contact.primaryPhone}</strong>
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => navigate('/apply')}
              className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-3 rounded-xl shadow-md transition text-sm cursor-pointer"
            >
              Apply Online
            </button>
            <a
              href={waAdmissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 whitespace-nowrap cursor-pointer text-sm"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
