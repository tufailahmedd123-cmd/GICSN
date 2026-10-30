import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { Search, Clock, MessageSquare } from 'lucide-react';

interface CoursesPageProps {
  navigate: (path: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ navigate }) => {
  const { config, courses } = useAcademy();
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCourses = courses.filter((course) => {
    const matchesFilter = filter === 'All' || course.category === filter;
    const matchesSearch = 
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.fullForm && course.fullForm.toLowerCase().includes(searchTerm.toLowerCase())) ||
      course.overview.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead
        title="Courses & Diplomas"
        description={`Explore computer courses at ${config.name}: CIT, DIT, Web Development, Graphic Design, Typing, and more.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Educational Offerings</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
            Our Academic & Skill Courses
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Detailed information on all available programs at {config.name}.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4 items-center">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {['All', 'Certificate', 'Diploma', 'Skill', 'Programming'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  filter === category
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search course name or topic..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const waInquiry = `https://wa.me/${config.contact.whatsappIntl}?text=${encodeURIComponent(
              `Assalam-o-Alaikum, I want information about the ${course.name} course at ${config.name}. Please share the details.`
            )}`;

            return (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {course.category}
                    </span>
                    <span className="text-xs font-bold text-accent">
                      {course.admissionStatus}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-navy-900">
                    {course.name}
                  </h3>
                  {course.fullForm && (
                    <p className="text-xs text-slate-500 font-medium mb-2">
                      {course.fullForm}
                    </p>
                  )}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.overview}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </span>
                    {course.feeDetails.monthlyFee ? (
                      <span className="font-bold text-navy-900">
                        {course.feeDetails.monthlyFee}/mo
                      </span>
                    ) : (
                      <span className="text-slate-400">Fee on request</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2 px-3 rounded text-center transition cursor-pointer"
                    >
                      Full Details
                    </button>
                    <button
                      onClick={() => navigate('/apply')}
                      className="bg-accent hover:bg-accent-hover text-navy-950 text-xs font-bold py-2 px-3 rounded text-center transition cursor-pointer"
                    >
                      Apply Now
                    </button>
                  </div>

                  <a
                    href={waInquiry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center justify-center gap-1 pt-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="bg-white p-12 text-center rounded-xl border border-slate-200">
            <p className="text-slate-500 text-sm">No courses found matching your search.</p>
          </div>
        )}

      </div>
    </div>
  );
};
