import { AcademyContactPerson } from '../types';

export const ACADEMY_CONFIG = {
  name: 'Global Institute of Computer Science Naudero',
  shortName: 'GICS Naudero',
  slogan: 'Empowering Your Minds Through Technology...!',
  logoUrl: '/logo.png',
  announcementText: 'New admissions now enrolling for Morning & Evening Batches!',
  announcementActive: true,
  location: {
    city: 'Naudero',
    district: 'Larkana',
    province: 'Sindh',
    country: 'Pakistan',
    fullAddress: 'Naudero, Sindh, Pakistan',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14087.525655768564!2d68.349603!3d27.659972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3935b6b15e21973f%3A0xe54d6faebad7a2db!2sNaudero%2C%20Larkana%2C%20Sindh!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk'
  },
  contact: {
    primaryPhone: '03272960762',
    whatsappNumber: '03272960762',
    whatsappIntl: '923272960762',
    email: 'info@gics-naudero.edu.pk'
  },
  currency: 'PKR',
  hours: {
    morningSession: '09:00 AM – 12:00 PM',
    eveningSession: '02:00 PM – 09:00 PM',
    days: 'Monday through Friday (Saturday & Sunday special workshops as announced)'
  },
  // Exact specified leadership order:
  leadership: [
    { name: 'Sir Farooque Ali Soomro', designation: 'Institute Faculty / Leadership' },
    { name: 'Sir Ashfaque Ali Bhutto', designation: 'Institute Faculty / Leadership' },
    { name: 'Sir Shahzada Tufail Ahmed Channa', designation: 'Institute Faculty / Leadership' }
  ] as AcademyContactPerson[],

  // Facilities: "Air-conditioned and comfortable classroom" is made an editable boolean flag
  facilities: {
    dedicatedComputerLab: true,
    practicalWorkstations: true,
    backupPowerSupport: true,
    comfortableLearningEnvironment: true,
    airConditionedClassrooms: false // Set to true once confirmed by administration
  },
  socialLinks: {
    facebook: '#',
    instagram: '#',
    youtube: '#'
  }
};
