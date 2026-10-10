import { useState } from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [verifiedIndices, setVerifiedIndices] = useState({});

  const handleVerify = (index) => {
    setVerifiedIndices((prev) => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setVerifiedIndices((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-slate-50/10">
      {/* Background glow blur */}
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B5BAFF] opacity-10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="certifications-container">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-brand-purple" />
            <span className="text-xs font-mono tracking-widest text-brand-purple uppercase font-bold">// 05 . CREDENTIALS</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Verified <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="certifications-grid">
          {certifications.map((cert, index) => {
            const isHovered = hoveredIndex === index;
            const isVerified = verifiedIndices[index];

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="p-6 rounded-[28px] bg-white/60 border border-white backdrop-blur-xl shadow-md hover:shadow-xl hover:border-brand-purple/20 transition-all duration-350 flex items-start gap-5 relative overflow-hidden group"
              >
                {/* Visual decoration overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-radial from-brand-purple/5 to-transparent pointer-events-none" />

                {/* Left Side Icon Loader */}
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-600 group-hover:text-brand-purple group-hover:bg-brand-purple/10 transition-all duration-300 flex-shrink-0 shadow-xs">
                  <ShieldCheck size={20} className="text-brand-purple" />
                </div>

                {/* Right Side Content details */}
                <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 font-bold uppercase block mb-1">
                      {cert.issuer}
                    </span>
                    <h3 className="font-display font-black text-base text-slate-800 uppercase tracking-tight leading-snug group-hover:text-brand-purple transition-colors duration-300 truncate">
                      {cert.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 mt-4 pt-4">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-medium">
                      <Calendar size={12} />
                      <span>{cert.date}</span>
                    </div>

                    {/* Action link */}
                    <button
                      onClick={() => handleVerify(index)}
                      className={`px-3.5 py-1.5 rounded-xl border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all duration-300 shadow-sm cursor-pointer ${
                        isVerified 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400'
                      }`}
                    >
                      <span>{isVerified ? 'VERIFIED ✓' : 'VERIFY'}</span>
                      {!isVerified && <ExternalLink size={10} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
