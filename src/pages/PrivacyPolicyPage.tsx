import React from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { Shield } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { config } = useAcademy();

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead title="Privacy Policy" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm leading-relaxed">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Shield className="w-8 h-8 text-emerald-600" />
          <div>
            <h1 className="text-2xl font-extrabold text-navy-900">Privacy Policy</h1>
            <p className="text-xs text-slate-500">{config.name} — Naudero, Sindh</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">1. Information Collection</h2>
          <p>
            When you submit an admission inquiry through our online admission system or contact desk, we collect student details including full name, father's/guardian's name, date of birth, contact numbers, residential address, academic records (marks obtained and total marks), and preferred course details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">2. Purpose of Processing</h2>
          <p>
            Collected student data is used strictly for processing institutional admissions, evaluating course eligibility, organizing batch timings, verifying academic credentials, and communicating with students or their guardians via phone or WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">3. Data Confidentiality & Protection</h2>
          <p>
            We do not sell, rent, or trade student records to any third-party marketing companies. Records are restricted to authorized institute administration. We do not store sensitive private credentials or student passwords in plain text.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy-900">4. Contact & Inquiries</h2>
          <p>
            If you have questions regarding your personal information or wish to amend submitted records, contact the administration directly at <strong className="font-mono">{config.contact.primaryPhone}</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};
