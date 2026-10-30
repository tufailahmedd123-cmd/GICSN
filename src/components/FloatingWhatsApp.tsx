import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAcademy } from '../context/AcademyContext';

export const FloatingWhatsApp: React.FC = () => {
  const { config } = useAcademy();
  const defaultMessage = encodeURIComponent(
    `Assalam-o-Alaikum, I want information about admissions at ${config.name}. Please share the details.`
  );
  const whatsappUrl = `https://wa.me/${config.contact.whatsappIntl}?text=${defaultMessage}`;

  return (
    <aside aria-label="WhatsApp Quick Contact">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:p-4 rounded-full shadow-2xl flex items-center gap-2 group transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 cursor-pointer"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline font-semibold text-sm pr-1">
          WhatsApp Us
        </span>
      </a>
    </aside>
  );
};
