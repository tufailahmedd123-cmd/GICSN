import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { Phone, MapPin, MessageSquare, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  navigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { config, courses } = useAcademy();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Institute Info with Official Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-700 shrink-0">
                <img
                  src="/logo.png"
                  alt="Official Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
                  }}
                />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
                {config.name}
              </h3>
            </div>
            <p className="text-accent text-sm italic font-medium">
              "{config.slogan}"
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Serving the youth and learners of Naudero with quality computer training, hands-on lab learning, and digital skill education.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-accent transition flex items-center gap-1.5 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-accent transition flex items-center gap-1.5 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> About the Academy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/courses')} className="hover:text-accent transition flex items-center gap-1.5 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> All Courses
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/apply')} className="hover:text-accent transition flex items-center gap-1.5 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Online Admission Form
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-accent transition flex items-center gap-1.5 cursor-pointer">
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" /> Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/dashboard')} className="text-emerald-400 hover:text-emerald-300 font-bold transition flex items-center gap-1.5 cursor-pointer">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin Control Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Courses */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-b border-slate-800 pb-2">
              Featured Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              {courses.slice(0, 5).map((course) => (
                <li key={course.id}>
                  <button
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="hover:text-accent transition text-left flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>{course.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4 border-b border-slate-800 pb-2">
              Institute Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{config.location.fullAddress}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <a href={`tel:${config.contact.primaryPhone}`} className="hover:text-white font-mono font-bold">
                  {config.contact.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-accent shrink-0" />
                <a
                  href={`https://wa.me/${config.contact.whatsappIntl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-mono"
                >
                  WhatsApp: {config.contact.whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p>Morning: {config.hours.morningSession}</p>
                  <p>Evening: {config.hours.eveningSession}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => navigate('/dashboard')} className="text-emerald-400 hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Portal
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-slate-300 cursor-pointer">
              Terms & Conditions
            </button>
            <button onClick={() => navigate('/privacy')} className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
