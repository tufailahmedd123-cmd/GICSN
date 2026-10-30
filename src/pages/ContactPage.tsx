import React, { useState } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { SEOHead } from '../components/SEOHead';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { config } = useAcademy();
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSubmitted(true);
  };

  const directWa = `https://wa.me/${config.contact.whatsappIntl}?text=${encodeURIComponent(
    `Assalam-o-Alaikum, I am ${form.name || 'a student'}. ${form.message || 'I have an inquiry regarding your institute.'}`
  )}`;

  return (
    <div className="py-12 sm:py-16 bg-slate-50">
      <SEOHead
        title="Contact & Location"
        description={`Contact ${config.name}, Sindh, Pakistan. Call or WhatsApp ${config.contact.primaryPhone}.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-wider">Get in Touch</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
            Contact & Campus Location
          </h1>
          <p className="text-slate-600 text-sm">
            Reach out directly for admissions, fee verification, or campus visits in Naudero.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-navy-900 text-lg">Central Academy Helpline</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 text-accent rounded-lg shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Phone / Call Desk:</span>
                    <p className="font-bold text-navy-900 text-base font-mono">
                      <a href={`tel:${config.contact.primaryPhone}`} className="hover:text-accent">
                        {config.contact.primaryPhone}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-emerald-50 text-accent rounded-lg shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">WhatsApp Desk:</span>
                    <p className="font-bold text-navy-900 text-base font-mono">
                      <a 
                        href={`https://wa.me/${config.contact.whatsappIntl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-accent"
                      >
                        {config.contact.whatsappNumber}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-lg shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Campus Location:</span>
                    <p className="font-semibold text-slate-800">{config.location.fullAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-blue-50 text-primary rounded-lg shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500">Institute Class Hours:</span>
                    <p className="text-xs text-slate-700 font-medium">Morning: {config.hours.morningSession}</p>
                    <p className="text-xs text-slate-700 font-medium">Evening: {config.hours.eveningSession}</p>
                    <p className="text-xs text-slate-500">{config.hours.days}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Academy Contacts (Strict prompt order) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="font-bold text-navy-900 text-sm">Designated Faculty Contacts:</h4>
              <p className="text-xs text-slate-500">
                You may inquire with administration regarding appointments with:
              </p>
              
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                {config.leadership.map((leader, i) => (
                  <li key={i} className="flex items-center gap-2 p-2 rounded bg-slate-50">
                    <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-navy-900">{leader.name}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right: Interactive Message Form & Google Maps */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-navy-900 text-lg mb-4">Send a Message</h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-xl text-center space-y-3 border border-emerald-200 animate-fadeIn">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-navy-900">Message Prepared!</h4>
                  <p className="text-xs text-slate-600">
                    To ensure immediate delivery to our office, transmit this message through our WhatsApp gateway.
                  </p>
                  <a
                    href={directWa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-navy-950 font-bold px-5 py-2.5 rounded-lg text-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open in WhatsApp ({config.contact.primaryPhone})</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ali Raza"
                      className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="03XXXXXXXXX"
                      className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Message or Inquiry</label>
                    <textarea
                      rows={4}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="How can we assist you with admissions or courses?"
                      className="w-full text-sm p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-navy-950 font-bold px-6 py-2.5 rounded-lg text-sm shadow transition flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-navy-900 text-sm mb-3">Naudero Location Map</h4>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100">
                <iframe
                  title="Academy Location Naudero"
                  src={config.location.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
