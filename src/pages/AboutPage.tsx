import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { Target, BookOpen, UserCheck, Shield } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { config } = useAcademy();

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead 
        title="About Us"
        description={`Learn about ${config.name}, our mission, leadership, and IT education facilities.`}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="w-20 h-20 rounded-full mx-auto p-1 bg-white border-2 border-primary shadow-md overflow-hidden">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-contain rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
              }}
            />
          </div>
          <span className="text-xs font-bold text-accent uppercase tracking-wider block">About Our Institute</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
            {config.name}
          </h1>
          <p className="text-slate-600 text-base italic">
            "{config.slogan}"
          </p>
        </div>

        {/* Mission & Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 bg-emerald-50 text-accent rounded-lg w-fit">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Our Institutional Mission</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Our mission is to empower the youth, students, and aspiring workforce of Naudero and surrounding regions 
              with practical, accessible, and high-quality computer education. We bridge the digital divide by equipping learners 
              with essential technical skills that open doors to academic excellence, employment, and digital independence.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="p-3 bg-blue-50 text-primary rounded-lg w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-900">Educational Philosophy</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We believe practical computing cannot be acquired through passive listening. Our teaching philosophy 
              pairs theoretical conceptual clarity with mandatory daily computer lab practice, step-by-step guidance from 
              dedicated instructors, and progressive skill evaluations.
            </p>
          </div>
        </div>

        {/* Official Faculty & Leadership (Strictly adhering to specified order & truthfulness) */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-accent uppercase tracking-wider">Faculty & Leadership</span>
            <h3 className="text-2xl font-extrabold text-navy-900 mt-1">
              Academy Contacts & Mentorship
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              In accordance with academy leadership records, the following faculty and administrators oversee institute operations:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {config.leadership.map((person, index) => (
              <div 
                key={index} 
                className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-primary text-accent flex items-center justify-center font-bold text-lg mb-4">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-navy-900">
                    {person.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {person.designation}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-400">
                  {config.name}
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-100 p-4 rounded-lg text-xs text-slate-600 flex items-start gap-2">
            <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              For all institutional admissions, batch schedules, or queries, please contact the central academy helpline at 
              <strong className="text-navy-900 ml-1 font-mono">{config.contact.primaryPhone}</strong>.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
