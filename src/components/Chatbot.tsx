import React, { useState, useRef, useEffect } from 'react';
import { useAcademy } from '../context/AcademyContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  Trash2, 
  ChevronRight, 
  GraduationCap, 
  Phone, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  action?: {
    type: 'apply' | 'whatsapp' | 'courses' | 'contact';
    label: string;
    payload?: string;
  };
}

interface ChatbotProps {
  navigate: (path: string) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ navigate }) => {
  const { config, courses } = useAcademy();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'msg-init',
    sender: 'assistant',
    text: `Assalam-o-Alaikum! Welcome to **${config.name}**.\n\nI am your **Smart Student Advisor**. You can ask me anything about our diploma & certificate courses, tuition fee details, shift timings, admission requirements, or campus facilities in Naudero!`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    action: {
      type: 'courses',
      label: 'Explore All Courses'
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

  const quickPrompts = [
    'What courses do you offer?',
    'What are the shift timings?',
    'What are the admission requirements?',
    'How do I apply online?',
    'Tell me about Web Development',
    'Do you have computer lab backup power?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Intelligent Context-Aware Knowledge Engine for Instant, Accurate Responses
  const generateAssistantResponse = async (userPrompt: string): Promise<{ text: string; action?: ChatMessage['action'] }> => {
    const query = userPrompt.toLowerCase();

    // 1. Shift & Timings
    if (query.includes('timing') || query.includes('shift') || query.includes('time') || query.includes('hours') || query.includes('waqt')) {
      return {
        text: `At **${config.name}**, classes run **Monday through Friday** (1 hour per day).\n\nWe offer two convenient shift windows:\n• **Morning Shift:** ${config.hours.morningSession}\n• **Evening Shift:** ${config.hours.eveningSession}\n\nStudents select their preferred 1-hour slot during admission.`,
        action: { type: 'apply', label: 'Select Shift in Online Admission Form' }
      };
    }

    // 2. Admission Process & Requirements
    if (query.includes('admission') || query.includes('apply') || query.includes('dakhla') || query.includes('register') || query.includes('eligib')) {
      return {
        text: `Admissions are currently **OPEN** at our Naudero campus!\n\n**Admission Process:**\n1. Complete our online admission application (or visit campus).\n2. Submit copies of educational certificates (e.g. 5th, 8th, or Matric marksheets).\n3. CNIC or B-Form copy + 2 passport photographs.\n4. Confirm your preferred 1-hour morning or evening batch.\n\nWould you like to fill out the form now?`,
        action: { type: 'apply', label: 'Open Online Admission Form' }
      };
    }

    // 3. Contact & Phone
    if (query.includes('phone') || query.includes('contact') || query.includes('number') || query.includes('whatsapp') || query.includes('call') || query.includes('rabta')) {
      return {
        text: `You can reach our official admissions and helpline desk at:\n\n📞 **Primary Phone:** ${config.contact.primaryPhone}\n💬 **WhatsApp Desk:** ${config.contact.whatsappNumber}\n📍 **Campus Address:** ${config.location.fullAddress}\n\nOur office is open during morning (${config.hours.morningSession}) and evening (${config.hours.eveningSession}) shifts.`,
        action: { type: 'whatsapp', label: `Chat on WhatsApp (${config.contact.primaryPhone})` }
      };
    }

    // 4. Lab Facilities, AC, Backup Power
    if (query.includes('facility') || query.includes('lab') || query.includes('computer') || query.includes('ac') || query.includes('generator') || query.includes('power')) {
      const acStatus = config.facilities.airConditionedClassrooms ? 'Yes, air-conditioned and comfortable classroom.' : 'Equipped with comfortable environment and high ventilation.';
      return {
        text: `**Campus Facilities at ${config.name}:**\n\n• **1:1 Computer Lab Workstations:** Every student receives hands-on computer practice.\n• **Backup Power Support:** Generator / UPS backup support so training never stops during loadshedding.\n• **Air-Conditioning:** ${acStatus}\n• **Expert Mentorship:** Dedicated instructors for typing, office automation, web design, and programming.`,
        action: { type: 'contact', label: 'Visit Campus in Naudero' }
      };
    }

    // 5. Specific Course: Web Development
    if (query.includes('web') || query.includes('html') || query.includes('javascript') || query.includes('css')) {
      const course = courses.find((c) => c.id === 'web-development');
      return {
        text: `**Web Development Course:**\n\n• **Overview:** Learn modern front-end web development with semantic HTML5, modern CSS3 (Flexbox/Grid), and interactive JavaScript.\n• **Focus:** Building responsive, mobile-friendly websites and project hosting.\n• **Duration:** Practical batch modules (Morning & Evening sessions available).\n• **Eligibility:** Basic computer knowledge and logical interest.`,
        action: { type: 'apply', label: 'Apply for Web Development' }
      };
    }

    // 6. Specific Course: Graphic Designing
    if (query.includes('graphic') || query.includes('design') || query.includes('photoshop') || query.includes('poster')) {
      return {
        text: `**Graphic Designing Course:**\n\n• **Overview:** Master visual communication, photo editing, raster & vector graphics, social media post creation, and marketing banners.\n• **Skills:** Typography, layout harmony, photo retouching, and branding.\n• **Batches:** Mon–Fri 1-hour sessions with daily lab work.`,
        action: { type: 'apply', label: 'Apply for Graphic Design' }
      };
    }

    // 7. Specific Course: Java or Database
    if (query.includes('java') || query.includes('programming') || query.includes('database') || query.includes('sql')) {
      return {
        text: `We offer advanced coding tracks:\n\n• **Java Programming Language Course:** Object-Oriented Programming (OOP), algorithms, loops, functions, and console applications.\n• **Database Systems Course:** Relational DBMS design, ER diagrams, and SQL queries (SELECT, INSERT, UPDATE, JOINS).\n\nBoth programs emphasize practical coding on individual lab PCs.`,
        action: { type: 'courses', label: 'View Programming Courses' }
      };
    }

    // 8. Specific Course: DIT or COP or Typing
    if (query.includes('dit') || query.includes('diploma') || query.includes('cop') || query.includes('typing')) {
      return {
        text: `**Professional IT & Skill Diplomas:**\n\n• **D.I.T (Diploma in Information Technology):** Comprehensive multi-month diploma covering advanced office automation, databases, and programming concepts.\n• **C.O.P (Computer Operator):** Rapid data entry, commercial typing, and clerical document operations.\n• **Typing Course:** High-speed English & Urdu touch typing drills to achieve 40+ WPM with 95%+ accuracy.`,
        action: { type: 'courses', label: 'View Diploma & Skill Details' }
      };
    }

    // 9. All Courses List
    if (query.includes('course') || query.includes('program') || query.includes('offer') || query.includes('parh') || query.includes('fees') || query.includes('fee')) {
      const courseListStr = courses.map((c) => `• **${c.name}** (${c.category}) — ${c.duration}`).join('\n');
      return {
        text: `**Courses Available at ${config.name}:**\n\n${courseListStr}\n\nAll courses include dedicated practical lab time. Tuition fees are kept affordable for the youth and students of Naudero.`,
        action: { type: 'courses', label: 'Browse Full Course Catalog' }
      };
    }

    // 10. General Fallback
    return {
      text: `Thank you for your question! **${config.name}** offers 9+ IT and computer training programs with morning and evening sessions in Naudero.\n\nWould you like information on:\n1. 🎓 **Course list & syllabus**\n2. 🕒 **Morning / Evening shift timings**\n3. 📝 **How to apply online**\n4. 📞 **Direct WhatsApp helpline (${config.contact.primaryPhone})**?`,
      action: { type: 'whatsapp', label: `Ask on WhatsApp (${config.contact.primaryPhone})` }
    };
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(async () => {
      const responseData = await generateAssistantResponse(query);
      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: responseData.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        action: responseData.action
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: NonNullable<ChatMessage['action']>) => {
    if (action.type === 'apply') {
      navigate('/apply');
      setIsOpen(false);
    } else if (action.type === 'courses') {
      navigate('/courses');
      setIsOpen(false);
    } else if (action.type === 'contact') {
      navigate('/contact');
      setIsOpen(false);
    } else if (action.type === 'whatsapp') {
      window.open(`https://wa.me/${config.contact.whatsappIntl}`, '_blank');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary hover:bg-primary-light text-white p-3.5 sm:px-4 sm:py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 group transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-accent cursor-pointer"
          aria-label="Open AI Student Advisor"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-accent group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-accent rounded-full"></span>
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="font-extrabold text-xs tracking-wide text-white">Ask GICS AI</span>
            <span className="text-[10px] text-accent font-medium leading-none">Instant Student Advisor</span>
          </div>
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[410px] h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-900 via-primary to-navy-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white p-0.5 border border-accent shadow-sm shrink-0">
                <img
                  src="/logo.png"
                  alt="GICS Logo"
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/Screenshot_20250912-103759_29eddee8.png';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-extrabold text-white">GICS AI Student Advisor</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="text-[10px] text-slate-300">
                  Global Institute of Computer Science Naudero
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([initialGreeting])}
                title="Clear Conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/80 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none'
                  }`}
                >
                  {/* Format simple bolding */}
                  {msg.text.split('\n').map((line, idx) => (
                    <p key={idx} className={idx > 0 ? 'mt-1' : ''}>
                      {line.split('**').map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>

                {/* Optional Action Button */}
                {msg.action && (
                  <button
                    onClick={() => handleActionClick(msg.action!)}
                    className="mt-1.5 text-[11px] font-bold bg-accent hover:bg-accent-hover text-navy-950 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>{msg.action.label}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <span className="text-[9px] text-slate-400 mt-0.5 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 w-fit">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></span>
                <span className="text-[10px] text-slate-400 font-medium ml-1">Advisor is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="bg-white px-3 py-2 border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap text-[10px] font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200 transition cursor-pointer shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, fees, timings, admissions..."
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-accent hover:bg-accent-hover disabled:opacity-40 text-navy-950 p-2.5 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
