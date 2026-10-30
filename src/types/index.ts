export interface Course {
  id: string;
  name: string;
  fullForm?: string;
  category: 'Certificate' | 'Diploma' | 'Skill' | 'Programming';
  tagline: string;
  overview: string;
  duration: string;
  feeDetails: {
    monthlyFee?: string;
    admissionFee?: string;
    certificateFee?: string;
    customNote?: string;
  };
  schedule: {
    days?: string;
    classDuration?: string;
    morningShift?: string;
    eveningShift?: string;
    note?: string;
  };
  entryRequirements: string[];
  requiredDocuments: string[];
  learningObjectives: string[];
  topicsCovered: string[];
  skillsLearned: string[];
  intendedAudience: string[];
  certificateInfo?: string;
  admissionStatus: 'Open' | 'Upcoming' | 'Inquire';
}

export interface AdmissionApplication {
  id?: string;
  studentName: string;
  fatherName: string;
  dob: string;
  gender: string;
  mobileNumber: string;
  whatsappNumber: string;
  email?: string;
  address: string;
  city: string;
  selectedCourseId: string;
  highestQualification: string;
  educationalInstitution?: string;
  obtainedMarks: string;
  totalMarks: string;
  cgpaPercentage?: string;
  group: string;
  preferredShift: 'Morning' | 'Evening';
  documentChecklist: string[];
  additionalMessage?: string;
  agreedToPolicy: boolean;
  status?: 'Pending' | 'Contacted' | 'Approved' | 'Enrolled' | 'Rejected';
  submittedAt?: string;
  adminNotes?: string;
}

export interface AcademyContactPerson {
  name: string;
  designation: string;
  phone?: string;
}
