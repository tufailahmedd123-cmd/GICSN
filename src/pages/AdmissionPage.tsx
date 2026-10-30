import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { AdmissionApplication } from '../types';
import { SEOHead } from '../components/SEOHead';
import { 
  Send, 
  CheckCircle2, 
  AlertTriangle, 
  MessageSquare, 
  FileCheck, 
  User, 
  Phone, 
  GraduationCap 
} from 'lucide-react';

interface AdmissionPageProps {
  navigate: (path: string) => void;
}

export const AdmissionPage: React.FC<AdmissionPageProps> = () => {
  const { config, courses, addApplication } = useAcademy();

  const [formData, setFormData] = useState<AdmissionApplication>({
    studentName: '',
    fatherName: '',
    dob: '',
    gender: 'Male',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    address: '',
    city: 'Naudero',
    selectedCourseId: courses[0]?.id || 'cit',
    highestQualification: 'Matriculation',
    educationalInstitution: '',
    obtainedMarks: '',
    totalMarks: '',
    cgpaPercentage: '',
    group: 'General',
    preferredShift: 'Morning',
    documentChecklist: [],
    additionalMessage: '',
    agreedToPolicy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedSuccess, setSubmittedSuccess] = useState<boolean>(false);
  const [generatedAppId, setGeneratedAppId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Validate required fields strictly
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.studentName.trim()) errs.studentName = 'Student full name is required.';
    if (!formData.fatherName.trim()) errs.fatherName = "Father's or Guardian's name is required.";
    if (!formData.dob) errs.dob = 'Date of birth is required.';
    if (!formData.mobileNumber.trim()) errs.mobileNumber = 'Mobile number is required.';
    if (!formData.whatsappNumber.trim()) errs.whatsappNumber = 'WhatsApp number is required.';
    if (!formData.address.trim()) errs.address = 'Complete address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.selectedCourseId) errs.selectedCourseId = 'Please select a course.';

    // Obtained Marks & Total Marks must be strictly separate fields:
    if (!formData.obtainedMarks.trim()) errs.obtainedMarks = 'Obtained marks are required.';
    if (!formData.totalMarks.trim()) errs.totalMarks = 'Total marks are required.';

    if (!formData.agreedToPolicy) {
      errs.agreedToPolicy = 'You must agree to the admission policies and terms.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCheckboxChange = (doc: string) => {
    setFormData((prev) => {
      const exists = prev.documentChecklist.includes(doc);
      return {
        ...prev,
        documentChecklist: exists
          ? prev.documentChecklist.filter((d) => d !== doc)
          : [...prev.documentChecklist, doc]
      };
    });
  };

  // Submission handler: saves into AcademyContext so admin immediately sees it in Dashboard
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Save locally to AcademyContext store
      const appId = addApplication(formData);
      setGeneratedAppId(appId);

      // Backend integration point if configured
      const apiUrl = (import.meta as { env?: Record<string, string> }).env?.VITE_API_URL;
      if (apiUrl) {
        await fetch(`${apiUrl}/admissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: appId })
        }).catch((e) => console.warn('Backend sync failed, saved locally:', e));
      }

      setSubmittedSuccess(true);
    } catch {
      setSubmittedSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate URL-encoded pre-filled WhatsApp application string
  const selectedCourseName = courses.find((c) => c.id === formData.selectedCourseId)?.name || formData.selectedCourseId;
  const waApplicationText = encodeURIComponent(
    `*NEW ADMISSION APPLICATION - ${config.name}*\n` +
    `*Application ID:* ${generatedAppId || 'NEW'}\n\n` +
    `• *Student Name:* ${formData.studentName}\n` +
    `• *Father's Name:* ${formData.fatherName}\n` +
    `• *Course Applied:* ${selectedCourseName}\n` +
    `• *Preferred Shift:* ${formData.preferredShift}\n` +
    `• *Mobile:* ${formData.mobileNumber}\n` +
    `• *WhatsApp:* ${formData.whatsappNumber}\n` +
    `• *City / Address:* ${formData.city}, ${formData.address}\n` +
    `• *Qualification:* ${formData.highestQualification} (${formData.group})\n` +
    `• *Marks:* Obtained ${formData.obtainedMarks} / Total ${formData.totalMarks} ${formData.cgpaPercentage ? `(${formData.cgpaPercentage})` : ''}\n` +
    `• *Additional Note:* ${formData.additionalMessage || 'None'}\n\n` +
    `Please confirm receipt and guide me regarding batch admission.`
  );

  const directWhatsAppUrl = `https://wa.me/${config.contact.whatsappIntl}?text=${waApplicationText}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead
        title="Online Admission Form"
        description={`Apply for admission online at ${config.name}. Safe, direct application for CIT, DIT, and computer courses.`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Registration Desk</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
            Online Admission Form
          </h1>
          <p className="text-slate-600 text-sm">
            Complete the fields below to register your application with {config.name}.
          </p>
        </div>

        {/* Success Screen */}
        {submittedSuccess ? (
          <div className="bg-white p-8 sm:p-12 rounded-2xl border border-emerald-200 shadow-md text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-navy-900">
              Admission Application Recorded!
            </h2>

            <div className="inline-block bg-primary text-white font-mono text-xs px-4 py-1.5 rounded-full shadow-sm font-bold">
              Application ID: {generatedAppId}
            </div>

            <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
              Thank you, <strong>{formData.studentName}</strong>. Your application for{' '}
              <strong>{selectedCourseName}</strong> has been logged in our admissions portal.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs text-slate-700 space-y-1">
              <p><strong>Candidate:</strong> {formData.studentName} S/D/O {formData.fatherName}</p>
              <p><strong>Selected Shift:</strong> {formData.preferredShift} Shift</p>
              <p><strong>Marks Entered:</strong> Obtained {formData.obtainedMarks} / Total {formData.totalMarks}</p>
              <p><strong>Contact:</strong> {formData.whatsappNumber}</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-3 rounded-lg text-sm shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Copy via WhatsApp ({config.contact.primaryPhone})</span>
              </a>
              <button
                onClick={() => {
                  setSubmittedSuccess(false);
                  setFormData({
                    studentName: '',
                    fatherName: '',
                    dob: '',
                    gender: 'Male',
                    mobileNumber: '',
                    whatsappNumber: '',
                    email: '',
                    address: '',
                    city: 'Naudero',
                    selectedCourseId: courses[0]?.id || 'cit',
                    highestQualification: 'Matriculation',
                    educationalInstitution: '',
                    obtainedMarks: '',
                    totalMarks: '',
                    cgpaPercentage: '',
                    group: 'General',
                    preferredShift: 'Morning',
                    documentChecklist: [],
                    additionalMessage: '',
                    agreedToPolicy: false
                  });
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-lg text-sm cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Safe Notice Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Transparent Registration System: </span>
                Your submission is instantly recorded in the institute administration queue and you can also send a verified copy directly to the academy WhatsApp desk (<strong>{config.contact.primaryPhone}</strong>).
              </div>
            </div>

            {/* 1. Student Personal Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-navy-900 text-base">Candidate Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="Enter student full name"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's / Guardian's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fatherName}
                    onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                    placeholder="Enter father or guardian name"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.fatherName && <p className="text-red-500 text-xs mt-1">{errors.fatherName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 2. Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <Phone className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-navy-900 text-base">Contact & Residence</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    placeholder="03XXXXXXXXX"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                    placeholder="03XXXXXXXXX"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.whatsappNumber && <p className="text-red-500 text-xs mt-1">{errors.whatsappNumber}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Naudero, Larkana, etc."
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Complete Residential Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Mohalla / Street / Area address"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            {/* 3. Course & Shift Selection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-navy-900 text-base">Course & Batch Selection</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Selected Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.selectedCourseId}
                    onChange={(e) => setFormData({ ...formData, selectedCourseId: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent font-medium text-navy-900 cursor-pointer"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.fullForm ? `— ${c.fullForm}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Shift <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.preferredShift}
                    onChange={(e) => setFormData({ ...formData, preferredShift: e.target.value as 'Morning' | 'Evening' })}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  >
                    <option value="Morning">Morning Shift ({config.hours.morningSession})</option>
                    <option value="Evening">Evening Shift ({config.hours.eveningSession})</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Academic Background (Obtained Marks and Total Marks strictly separate fields) */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <FileCheck className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-navy-900 text-base">Academic Record</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.highestQualification}
                    onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                  >
                    <option value="Middle / 8th Class">Middle / 8th Class</option>
                    <option value="Matriculation">Matriculation</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Master or Higher">Master or Higher</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Group
                  </label>
                  <input
                    type="text"
                    value={formData.group}
                    onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                    placeholder="Science, Arts, General, Pre-Eng"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institution / School (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.educationalInstitution}
                    onChange={(e) => setFormData({ ...formData, educationalInstitution: e.target.value })}
                    placeholder="School or college name"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* DISTINCT Obtained Marks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Obtained Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.obtainedMarks}
                    onChange={(e) => setFormData({ ...formData, obtainedMarks: e.target.value })}
                    placeholder="e.g. 720"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.obtainedMarks && <p className="text-red-500 text-xs mt-1">{errors.obtainedMarks}</p>}
                </div>

                {/* DISTINCT Total Marks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Total Marks <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: e.target.value })}
                    placeholder="e.g. 1100"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                  {errors.totalMarks && <p className="text-red-500 text-xs mt-1">{errors.totalMarks}</p>}
                </div>

                {/* Separate Optional Marks/CGPA field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Marks % or CGPA (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.cgpaPercentage}
                    onChange={(e) => setFormData({ ...formData, cgpaPercentage: e.target.value })}
                    placeholder="e.g. 68% or 3.2 CGPA"
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            </div>

            {/* 5. Document Checklist */}
            <div className="space-y-3">
              <h3 className="font-bold text-navy-900 text-sm">Admission Document Checklist</h3>
              <p className="text-xs text-slate-500">Please check the physical copies you will bring to the academy:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700">
                {[
                  '5th / 8th Class Certificate',
                  'Matric Certificate / Marksheet',
                  'CNIC or B-Form Copy',
                  '2 Passport-size Photographs',
                  'Father/Guardian CNIC Copy'
                ].map((doc) => (
                  <label key={doc} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={formData.documentChecklist.includes(doc)}
                      onChange={() => handleCheckboxChange(doc)}
                      className="rounded text-emerald-600 focus:ring-accent cursor-pointer"
                    />
                    <span>{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 6. Message */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Message / Questions (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.additionalMessage}
                onChange={(e) => setFormData({ ...formData, additionalMessage: e.target.value })}
                placeholder="Any special timing preference or query..."
                className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* 7. Consent */}
            <div>
              <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.agreedToPolicy}
                  onChange={(e) => setFormData({ ...formData, agreedToPolicy: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-accent mt-0.5 cursor-pointer"
                />
                <span>
                  I certify that the information provided is accurate and agree to follow all institute 
                  rules, attendance policies, and terms of admission.
                </span>
              </label>
              {errors.agreedToPolicy && (
                <p className="text-red-500 text-xs mt-1">{errors.agreedToPolicy}</p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-slate-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-navy-950 font-bold px-8 py-3 rounded-lg text-sm shadow transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Recording Application...' : 'Submit Admission Application'}</span>
              </button>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Or register directly via WhatsApp Desk</span>
              </a>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
