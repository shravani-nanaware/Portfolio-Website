import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar({ sections }) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll height to adjust style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to highlight active nav link based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/40 backdrop-blur-md py-3.5 border-b border-white/60 shadow-sm shadow-slate-200/30'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="flex items-center gap-2.5 group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:border-brand-purple/40 group-hover:scale-105">
            <Terminal size={16} className="text-brand-purple" />
          </div>
          <div>
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-800 block leading-none">
              Shrawani's <span className="text-gradient">Portfolio</span>
            </span>
            <span className="text-[9px] font-mono text-slate-400 tracking-widest font-semibold">FULL-STACK & ANALYTICS</span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8" id="desktop-menu">
          <ul className="flex items-center gap-6">
            {sections.map((sec) => (
              <li key={sec.id} className="relative">
                <a
                  href={`#${sec.id}`}
                  onClick={(e) => handleNavClick(e, sec.id)}
                  className={`font-sans text-sm tracking-wide transition-colors py-2 px-1 relative block ${
                    activeSection === sec.id 
                      ? 'text-brand-purple font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {sec.label}
                  {activeSection === sec.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-purple rounded-full animate-fade-in" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-mono font-bold tracking-wide text-slate-700 hover:text-brand-purple hover:border-brand-purple/40 hover:shadow-md active:scale-95 transition-all duration-300"
          >
            CONTACT ME
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
          aria-label="Toggle mobile menu"
          id="mobile-menu-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-white/95 border-b border-slate-200/80 backdrop-blur-xl px-6 py-6 flex flex-col gap-5 shadow-lg" id="mobile-drawer">
          <ul className="flex flex-col gap-3">
            {sections.map((sec) => (
              <li key={sec.id}>
                <a
                  href={`#${sec.id}`}
                  onClick={(e) => handleNavClick(e, sec.id)}
                  className={`font-sans text-base tracking-wide transition-colors py-2 block ${
                    activeSection === sec.id ? 'text-brand-purple font-bold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="w-full text-center py-3 rounded-full text-sm font-mono font-bold tracking-wide bg-slate-900 border border-slate-850 text-white hover:bg-brand-purple hover:text-slate-950 transition-all duration-300"
          >
            CONTACT ME
          </a>
        </div>
      )}
    </nav>
  );
}
