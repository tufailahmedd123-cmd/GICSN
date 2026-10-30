import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { config, courses } = useAcademy();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const citCourse = courses.find((c) => c.id === 'cit') || courses[0];

  const faqs = [
    {
      q: 'What is the full form, duration, and fee of the CIT course?',
      a: `C.I.T stands for Certificate in Information Technology. It is a ${citCourse.duration} program running Monday through Friday (1 hour per class). The monthly tuition fee is ${citCourse.feeDetails.monthlyFee || 'PKR 1,200'}, the admission fee is ${citCourse.feeDetails.admissionFee || 'PKR 500'}, and the certificate fee is ${citCourse.feeDetails.certificateFee || 'PKR 3,000 (subject to confirmation and examination terms)'}.`
    },
    {
      q: 'What shift timings are offered for students?',
      a: `We offer two dedicated session windows: Morning shift (${config.hours.morningSession}) and Evening shift (${config.hours.eveningSession}). Students select a 1-hour slot suited to their schedule.`
    },
    {
      q: 'What are the required documents for admission?',
      a: `For foundational courses like CIT, required documents subject to verification include: 5th-class certificate, CNIC or B-Form copy, and 2 passport-size photographs.`
    },
    {
      q: 'Are beginner students with zero computer background accepted?',
      a: `Absolutely. Foundational programs are specifically designed for beginners starting from keyboard typing, operating system navigation, file management, and office automation.`
    },
    {
      q: 'Are certificates government recognized?',
      a: `${config.name} issues verified institutional completion certificates based on coursework attendance and examination performance. Certification recognition details and terms are communicated transparently upon enrollment without false claims.`
    },
    {
      q: 'How do I pay my fees or verify admissions?',
      a: `Fees are collected at the institute accounts desk in Naudero upon admission and monthly registration. Contact ${config.contact.primaryPhone} for authorized payment procedures and batch allocations.`
    }
  ];

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead
        title="Frequently Asked Questions"
        description={`Got questions about admissions, fees, timings, or courses at ${config.name}? Read our FAQs.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <HelpCircle className="w-8 h-8 text-accent mx-auto" />
          <h1 className="text-3xl font-extrabold text-navy-900">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm">
            Common questions regarding admissions, schedules, fees, and institute policies.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-navy-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-accent shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
