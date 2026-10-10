import { ArrowUp, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="py-12 bg-white border-t border-slate-100 relative z-10" id="app-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Social Navigation Handles */}
        <div className="flex items-center gap-6">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="text-xs font-mono font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors duration-300"
          >
            Email
          </a>
        </div>

        {/* Thank You message & copyright */}
        <div className="text-center flex flex-col items-center gap-1.5 md:order-2">
          <div className="text-xs text-slate-400 font-sans flex items-center gap-1.5 justify-center">
            <span>Made with passion &</span>
            <Heart size={10} className="text-brand-purple fill-brand-purple animate-pulse" />
            <span>by {personalInfo.name}</span>
          </div>
          <div className="text-[10px] font-mono text-slate-400 tracking-wider font-semibold">
            &copy; 2026 {personalInfo.name.toUpperCase()} &bull; Full-Stack & Data Analytics Portfolio
          </div>
        </div>

        {/* Back-to-Top Button & System Status */}
        <div className="flex items-center gap-4.5 md:order-3">
          {/* Active System indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">System Online</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-150 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
