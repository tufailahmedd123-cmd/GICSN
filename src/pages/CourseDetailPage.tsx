import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { 
  Calendar, 
  CheckCircle, 
  FileText, 
  Users, 
  ArrowLeft, 
  MessageSquare, 
  AlertCircle 
} from 'lucide-react';

interface CourseDetailPageProps {
  courseId: string;
  navigate: (path: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ courseId, navigate }) => {
  const { config, courses } = useAcademy();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="py-20 text-center max-w-xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-navy-900 mb-2">Course Not Found</h2>
        <p className="text-slate-600 text-sm mb-6">The course you are looking for does not exist in our catalog.</p>
        <button
          onClick={() => navigate('/courses')}
          className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const waInquiry = `https://wa.me/${config.contact.whatsappIntl}?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I want information about the ${course.name} course at ${config.name}. Please share the details.`
  )}`;

  return (
    <div className="py-10 sm:py-14 bg-slate-50">
      <SEOHead
        title={`${course.name} Course Details`}
        description={course.overview}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>

        {/* Course Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded bg-slate-100 text-slate-700">
              {course.category} Program
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Admission Status: {course.admissionStatus}
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-navy-900">
              {course.name}
            </h1>
            {course.fullForm && (
              <p className="text-base text-slate-500 font-medium mt-1">
                {course.fullForm}
              </p>
            )}
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {course.overview}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate('/apply')}
              className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-2.5 rounded-lg text-sm transition cursor-pointer"
            >
              Apply for this Course
            </button>
            <a
              href={waInquiry}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold px-5 py-2.5 rounded-lg text-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp ({config.contact.primaryPhone})</span>
            </a>
          </div>
        </div>

        {/* Detailed Fee & Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Fee Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <span>Fee Structure</span>
            </h3>

            <div className="space-y-2.5 text-sm">
              {course.feeDetails.monthlyFee && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Monthly Tuition Fee:</span>
                  <span className="font-bold text-navy-900">{course.feeDetails.monthlyFee}</span>
                </div>
              )}
              {course.feeDetails.admissionFee && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Admission / Registration:</span>
                  <span className="font-bold text-navy-900">{course.feeDetails.admissionFee}</span>
                </div>
              )}
              {course.feeDetails.certificateFee && (
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Certificate Fee:</span>
                  <span className="font-bold text-navy-900">{course.feeDetails.certificateFee}</span>
                </div>
              )}
              {course.feeDetails.customNote && (
                <p className="text-xs text-slate-500 italic pt-1">
                  * Note: {course.feeDetails.customNote}
                </p>
              )}
              <div className="p-3 bg-slate-50 rounded text-xs text-slate-500 mt-2">
                Call or WhatsApp our admissions desk at <strong className="font-mono text-navy-900">{config.contact.primaryPhone}</strong> for immediate fee verification.
              </div>
            </div>
          </div>

          {/* Schedule Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Class Schedule & Timings</span>
            </h3>

            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Course Duration:</span>
                <span className="font-bold text-navy-900">{course.duration}</span>
              </div>
              {course.schedule.days && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Class Days:</span>
                  <span className="font-medium text-slate-800">{course.schedule.days}</span>
                </div>
              )}
              {course.schedule.classDuration && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Daily Class Duration:</span>
                  <span className="font-medium text-slate-800">{course.schedule.classDuration}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Morning Shift Window:</span>
                <span className="font-medium text-slate-800">{config.hours.morningSession}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Evening Shift Window:</span>
                <span className="font-medium text-slate-800">{config.hours.eveningSession}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modules & Topics */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="text-lg font-bold text-navy-900 mb-1">Topics & Syllabus Covered</h3>
            <p className="text-xs text-slate-500">Hands-on modules structured to build practical workplace competence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.topicsCovered.map((topic, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">{topic}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-sm font-bold text-navy-900 mb-2">Skills You Will Acquire:</h4>
            <div className="flex flex-wrap gap-2">
              {course.skillsLearned.map((skill, idx) => (
                <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Requirements & Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>Entry Requirements</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {course.entryRequirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="font-bold text-navy-900 text-base flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <span>Required Documents</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
              {course.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certification Notice (Truthful & Non-invented) */}
        <div className="bg-slate-100 p-4 sm:p-5 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-navy-900">Certification & Recognition Notice:</p>
            <p>
              Course completion credentials are provided according to institutional attendance and examination standards. 
              {config.name} maintains truthful records and does not assert unverified government board affiliations unless officially documented.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
