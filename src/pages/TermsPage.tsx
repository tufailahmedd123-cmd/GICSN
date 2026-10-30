import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { config } = useAcademy();

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead title="Admission Terms & Conditions" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <FileText className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-extrabold text-navy-900">Admission Terms and Conditions</h1>
            <p className="text-xs text-slate-500">{config.name}</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">1. Verification of Documents</h2>
          <p>
            Admission is subject to verification of required educational credentials (e.g. 5th-class or 8th-class / matric marksheets as applicable), CNIC / B-Form, and passport photographs. Submitting false credentials will void registration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">2. Attendance & Lab Conduct</h2>
          <p>
            Students must attend their allocated 1-hour daily class slot (Monday through Friday) regularly. Maintaining discipline inside the computer lab, respecting equipment, and avoiding unauthorized software modification is mandatory.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">3. Fee Schedule & Certification</h2>
          <p>
            Monthly fees must be settled in accordance with the academy calendar. Examination and certificate fees are subject to confirmation and applicable terms. Fees paid are generally non-refundable once batch training commences.
          </p>
        </section>
      </div>
    </div>
  );
};
