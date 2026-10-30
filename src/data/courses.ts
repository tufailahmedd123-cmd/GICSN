import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'cit',
    name: 'C.I.T',
    fullForm: 'Certificate in Information Technology',
    category: 'Certificate',
    tagline: 'Comprehensive 6-month foundational computer and information technology program.',
    overview: 'The Certificate in Information Technology (C.I.T) is an intensive foundational program designed to equip students with practical computer operating, office productivity, and essential digital computing competencies.',
    duration: '6 Months',
    feeDetails: {
      monthlyFee: 'PKR 1,200',
      admissionFee: 'PKR 500',
      certificateFee: 'PKR 3,000 (Subject to confirmation and applicable terms)',
      customNote: 'Standard institutional fee schedule. Subject to administrative updates.'
    },
    schedule: {
      days: 'Monday to Friday',
      classDuration: '1 hour per class',
      morningShift: '09:00 AM to 12:00 PM (Batch allocations within this window)',
      eveningShift: '02:00 PM to 09:00 PM (Batch allocations within this window)',
      note: 'Students select a 1-hour daily slot within their chosen shift.'
    },
    entryRequirements: [
      'Minimum 8th class pass (Subject to verification upon registration)',
      'Basic interest in computing and digital literacy'
    ],
    requiredDocuments: [
      '5th-class certificate (Subject to verification)',
      'CNIC or B-Form copy',
      '2 passport-size photographs'
    ],
    learningObjectives: [
      'Master personal computer fundamentals and operating system handling',
      'Operate office productivity software (Word processing, Spreadsheets, Presentations)',
      'Gain practical familiarity with Internet research, email etiquette, and cyber hygiene',
      'Understand essential computer hardware concepts and troubleshooting'
    ],
    topicsCovered: [
      'Introduction to Information Technology & Computer Systems',
      'Operating Systems (Windows configuration, file management, settings)',
      'Word Processing (MS Word - formatting, letters, documentation)',
      'Spreadsheets (MS Excel - arithmetic formulas, basic tables, spreadsheets)',
      'Presentations (MS PowerPoint - slides, formatting, basic presentations)',
      'Inpage Urdu / Regional typing foundations',
      'Internet, Cloud Email, and Cyber Safety Fundamentals'
    ],
    skillsLearned: [
      'Fast typing & document formatting',
      'Office paperwork and reports handling',
      'Basic data entry & spreadsheet record keeping',
      'Computer troubleshooting and operating systems navigation'
    ],
    intendedAudience: [
      'School and college students seeking digital competence',
      'Job seekers preparing for clerical and office operator roles',
      'Anyone beginning their formal journey in information technology'
    ],
    certificateInfo: 'Institutional certificate awarded upon satisfactory attendance, coursework completion, and exam passing. (Certification terms subject to confirmation).',
    admissionStatus: 'Open'
  },
  {
    id: 'dit',
    name: 'D.I.T',
    fullForm: 'Diploma in Information Technology',
    category: 'Diploma',
    tagline: 'In-depth diploma curriculum covering advanced computing, office management, and software basics.',
    overview: 'The Diploma in Information Technology provides an expanded study track building upon computer foundations, exploring deeper software utilization, programming basics, database tools, and web concepts.',
    duration: 'Please check with administration for current term duration',
    feeDetails: {
      customNote: 'Contact institute administration for current fee schedule and admission details.'
    },
    schedule: {
      days: 'Monday to Friday',
      classDuration: '1 hour per class',
      morningShift: '09:00 AM to 12:00 PM',
      eveningShift: '02:00 PM to 09:00 PM'
    },
    entryRequirements: [
      'Matriculation or equivalent prior education recommended',
      'Contact administration for verified eligibility criteria'
    ],
    requiredDocuments: [
      'Educational certificates/marksheets',
      'CNIC or B-Form copy',
      '2 passport-size photographs'
    ],
    learningObjectives: [
      'Broaden technical knowledge beyond entry-level computing',
      'Develop intermediate productivity and database handling skills',
      'Understand foundational programming and web principles'
    ],
    topicsCovered: [
      'Advanced Office Automation & Business Documents',
      'Information Systems & Database Basics',
      'Introduction to Web Design & HTML',
      'Computer Networking & Peripherals Management',
      'Practical Project and Lab Assignments'
    ],
    skillsLearned: [
      'Advanced computing & office management',
      'Database querying foundations',
      'Technical problem solving and documentation'
    ],
    intendedAudience: [
      'Intermediate/Matric students seeking technical credentials',
      'Individuals aiming for professional IT support roles'
    ],
    certificateInfo: 'Diploma awarded upon curriculum completion and successful exam evaluation.',
    admissionStatus: 'Open'
  },
  {
    id: 'cop',
    name: 'C.O.P',
    fullForm: 'Certificate in Computer Operator',
    category: 'Certificate',
    tagline: 'Focused vocational training for data entry, office administration, and computer operations.',
    overview: 'A job-oriented training track concentrated on operational computer speed, accurate data entry, commercial typing, and everyday business computer tasks.',
    duration: 'Contact administration for batch schedule',
    feeDetails: {
      customNote: 'Contact institute administration for current fee structure.'
    },
    schedule: {
      days: 'Monday to Friday',
      morningShift: '09:00 AM to 12:00 PM',
      eveningShift: '02:00 PM to 09:00 PM'
    },
    entryRequirements: [
      'Middle / 8th class or Matriculation',
      'Eagerness to build office operational skills'
    ],
    requiredDocuments: [
      'Educational certificate copy',
      'CNIC or B-Form copy',
      'Passport-size photographs'
    ],
    learningObjectives: [
      'Acquire swift and accurate computer operational capabilities',
      'Handle corporate forms, records, data tables, and print operations',
      'Operate office machinery and scanners connected to computers'
    ],
    topicsCovered: [
      'Computer Operation Basics & OS Management',
      'English & Urdu Typing Drills',
      'Spreadsheet Data Entry & Auditing',
      'Document Scanning, Printing & Record Maintenance'
    ],
    skillsLearned: [
      'Rapid typing and error-free record entry',
      'File management and office protocol'
    ],
    intendedAudience: [
      'Candidates preparing for government or private computer operator tests'
    ],
    admissionStatus: 'Open'
  },
  {
    id: 'ece',
    name: 'E.C.E',
    fullForm: 'Early Childhood Education',
    category: 'Skill',
    tagline: 'Pedagogical and early learner instructional methodologies for educators and trainers.',
    overview: 'A dedicated course exploring developmental milestones, playful learning approaches, classroom organization, and modern instructional techniques for young minds.',
    duration: 'Contact administration for current term duration',
    feeDetails: {
      customNote: 'Inquire directly with administration for session schedules and fee structure.'
    },
    schedule: {
      days: 'Contact administration for weekly schedule'
    },
    entryRequirements: [
      'Intermediate / Matriculation pass or practicing teachers'
    ],
    requiredDocuments: [
      'Educational qualification certificates',
      'CNIC copy',
      'Photographs'
    ],
    learningObjectives: [
      'Understand foundational child psychology and developmental learning phases',
      'Plan engaging early-childhood classroom activities and visual aids',
      'Foster inclusive, safe, and motivating learning environments'
    ],
    topicsCovered: [
      'Principles of Early Childhood Education',
      'Activity-Based Learning & Motor Skill Development',
      'Classroom Management & Child Safety',
      'Designing Lesson Plans and Visual Learning Aids'
    ],
    skillsLearned: [
      'Lesson planning for young learners',
      'Creative educational material design'
    ],
    intendedAudience: [
      'Aspiring pre-school / primary educators and mothers'
    ],
    admissionStatus: 'Inquire'
  },
  {
    id: 'web-development',
    name: 'Web Development Course',
    category: 'Programming',
    tagline: 'Practical website building with modern HTML, CSS, JavaScript, and responsive design.',
    overview: 'Learn how modern websites work and write clean code to build interactive, mobile-friendly websites from scratch using the fundamental languages of the World Wide Web.',
    duration: 'Contact administration for batch duration',
    feeDetails: {
      customNote: 'Affordable fee package available. Contact academy on WhatsApp for details.'
    },
    schedule: {
      days: 'Monday to Friday (Morning & Evening sessions available)'
    },
    entryRequirements: [
      'Basic familiarity with operating a computer',
      'Keen interest in coding and logic building'
    ],
    requiredDocuments: [
      'CNIC or B-Form copy',
      'Photographs'
    ],
    learningObjectives: [
      'Structure clean web pages with HTML5',
      'Style layouts and user interfaces with modern CSS3',
      'Add interactivity using JavaScript fundamentals',
      'Understand domain names, web hosting, and website publishing'
    ],
    topicsCovered: [
      'HTML5 Semantic Markup',
      'CSS3 Styles, Flexbox, and Responsive Layouts',
      'JavaScript Variables, Logic, and DOM Manipulation',
      'Building a Complete Multi-page Website Project',
      'Publishing and Hosting Basics'
    ],
    skillsLearned: [
      'Front-end website creation',
      'Mobile-responsive layout styling',
      'Debugging code'
    ],
    intendedAudience: [
      'Students and youth interested in software development and freelancing'
    ],
    admissionStatus: 'Open'
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing Course',
    category: 'Skill',
    tagline: 'Master visual communication, digital illustration, photo editing, and creative branding.',
    overview: 'Discover visual creativity by learning digital design software. Learn typography, layout harmony, photo editing, social media banner creation, and marketing collateral design.',
    duration: 'Contact administration for course timeline',
    feeDetails: {
      customNote: 'Inquire at the institute for current batch fee structure.'
    },
    schedule: {
      days: 'Monday to Friday'
    },
    entryRequirements: [
      'Basic computer literacy and visual creativity'
    ],
    requiredDocuments: [
      'CNIC or B-Form copy',
      'Photographs'
    ],
    learningObjectives: [
      'Learn visual design principles (contrast, balance, hierarchy)',
      'Create digital graphics, logos, and promotional banners',
      'Edit and retouch photos professionally'
    ],
    topicsCovered: [
      'Principles of Graphic Design & Color Theory',
      'Raster Graphic Editing (Photo retouching, layers, masks)',
      'Vector Graphics & Logo Creation',
      'Social Media Posts, Flyers, and Banner Design',
      'Portfolio Development'
    ],
    skillsLearned: [
      'Creative software handling',
      'Marketing poster creation',
      'Digital branding'
    ],
    intendedAudience: [
      'Creative individuals, aspiring designers, and digital content creators'
    ],
    admissionStatus: 'Open'
  },
  {
    id: 'typing-course',
    name: 'Typing Course',
    category: 'Skill',
    tagline: 'Build accurate, high-speed touch typing skills in English and regional scripts.',
    overview: 'A focused, hands-on drill course aimed at building proper finger placement, rhythm, accuracy, and Words-Per-Minute (WPM) speed for office and commercial tests.',
    duration: 'Short-term / Flexible duration',
    feeDetails: {
      customNote: 'Contact institute for monthly / short-course fee options.'
    },
    schedule: {
      days: 'Daily practice batches available Monday to Friday'
    },
    entryRequirements: [
      'Open to all age groups and skill levels'
    ],
    requiredDocuments: [
      'CNIC / B-Form copy'
    ],
    learningObjectives: [
      'Memorize touch-typing key layout without looking at the keyboard',
      'Achieve high speed and 95%+ typing accuracy',
      'Prepare for competitive government and private typing exams'
    ],
    topicsCovered: [
      'Home Row, Top Row, and Bottom Row Techniques',
      'Numeric Keypad Drills',
      'Speed Building Exercises and Timed Tests',
      'English & Urdu / Sindhi Keyboard Layouts'
    ],
    skillsLearned: [
      'High-speed touch typing',
      'Zero-look keyboard mastery'
    ],
    intendedAudience: [
      'Anyone looking to accelerate everyday computer typing speed'
    ],
    admissionStatus: 'Open'
  },
  {
    id: 'java-programming',
    name: 'Java Programming Language Course',
    category: 'Programming',
    tagline: 'Object-Oriented Programming (OOP), algorithmic thinking, and core software development.',
    overview: 'Build a rigorous foundation in software engineering using Java. Study data types, control flow, functions, Object-Oriented principles, and problem-solving techniques.',
    duration: 'Contact administration for batch schedule',
    feeDetails: {
      customNote: 'Contact the institute for current course fee and schedules.'
    },
    schedule: {
      days: 'Monday to Friday'
    },
    entryRequirements: [
      'Basic computing knowledge; intermediate mathematics or analytical interest recommended'
    ],
    requiredDocuments: [
      'CNIC or B-Form copy',
      'Photographs'
    ],
    learningObjectives: [
      'Understand computer programming syntax and algorithms',
      'Implement Object-Oriented Programming (Classes, Inheritance, Polymorphism)',
      'Debug and execute console applications'
    ],
    topicsCovered: [
      'Java Syntax, Variables, and Data Types',
      'Control Structures (Loops, If-Else, Switch)',
      'OOP Principles (Encapsulation, Inheritance, Abstraction, Polymorphism)',
      'Arrays, Strings, and Collections Overview',
      'Basic File I/O and Exception Handling'
    ],
    skillsLearned: [
      'Algorithmic problem-solving',
      'Object-oriented system modeling'
    ],
    intendedAudience: [
      'Computer science students, college learners, and software aspirants'
    ],
    admissionStatus: 'Open'
  },
  {
    id: 'database-systems',
    name: 'Database Systems Course',
    category: 'Programming',
    tagline: 'Relational data design, SQL querying, schema architecture, and data management.',
    overview: 'Learn how business applications store, query, and manage vital data. This course covers relational database concepts, entity modeling, and practical SQL queries.',
    duration: 'Contact administration for batch schedule',
    feeDetails: {
      customNote: 'Contact institute administration for current fee details.'
    },
    schedule: {
      days: 'Monday to Friday'
    },
    entryRequirements: [
      'Familiarity with computers and basic logical operations'
    ],
    requiredDocuments: [
      'CNIC or B-Form copy'
    ],
    learningObjectives: [
      'Understand relational database design and normalization',
      'Write SQL queries (SELECT, INSERT, UPDATE, DELETE, JOINS)',
      'Create and manage tables with constraints'
    ],
    topicsCovered: [
      'Introduction to DBMS & Relational Architecture',
      'Entity Relationship (ER) Diagrams',
      'SQL Fundamentals (DDL, DML, DQL)',
      'Aggregate Functions, Grouping, and Complex Joins',
      'Database Backup and Integrity Basics'
    ],
    skillsLearned: [
      'Structured Query Language (SQL)',
      'Data modeling and query optimization'
    ],
    intendedAudience: [
      'IT students, aspiring backend developers, and office record administrators'
    ],
    admissionStatus: 'Open'
  }
];
