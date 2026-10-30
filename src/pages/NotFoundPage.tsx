import React from 'react';
import { AlertCircle } from 'lucide-react';

interface NotFoundPageProps {
  navigate: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ navigate }) => {
  return (
    <div className="py-24 text-center max-w-xl mx-auto px-4">
      <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
      <h1 className="text-4xl font-black text-navy-900 mb-2">404</h1>
      <h2 className="text-xl font-bold text-slate-800 mb-3">Page Not Found</h2>
      <p className="text-slate-600 text-sm mb-6">
        The page you requested does not exist or may have been relocated.
      </p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-light transition cursor-pointer"
      >
        Return to Homepage
      </button>
    </div>
  );
};
