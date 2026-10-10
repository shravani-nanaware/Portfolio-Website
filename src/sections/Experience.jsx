import { Briefcase, Milestone, GraduationCap, CheckCircle2 } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-50/10">
      {/* Background glow */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#D9F9DF] opacity-15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" id="experience-container">
        
        {/* Section Heading */}
        <div className="flex flex-col mb-20">
          <div className="flex items-center gap-2 mb-3">
            <Milestone size={16} className="text-brand-purple" />
            <span className="text-xs font-mono tracking-widest text-brand-purple uppercase font-bold">// 03 . TIMELINE</span>
          </div>
          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Academic <span className="text-gradient">Growth & Development</span>
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Vertical central path line */}
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-brand-purple via-brand-sky to-slate-200 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-14" id="timeline-nodes">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              
              // Icon selector based on type
              let NodeIcon = Briefcase;
              let badgeColor = 'text-brand-purple bg-[#9FA1FF]/10 border-brand-purple/20';
              
              if (exp.type === 'Project') {
                NodeIcon = Milestone;
                badgeColor = 'text-[#2c4e31] bg-[#D9F9DF]/80 border-emerald-200/50';
              } else if (exp.type === 'Learning Journey') {
                NodeIcon = GraduationCap;
                badgeColor = 'text-slate-700 bg-slate-100 border-slate-300';
              }

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-stretch w-full ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Outer container alignment padding */}
                  <div className="w-full md:w-1/2 pr-0 md:pr-12 md:pl-0 pl-10 flex flex-col justify-center">
                    
                    {/* Content Card */}
                    <div className="p-8 rounded-[32px] bg-white/60 border border-white backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-brand-purple/20 transition-all duration-350 relative">
                      {/* Date Bubble */}
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold block mb-2">
                        {exp.period}
                      </span>

                      {/* Header */}
                      <div className="flex flex-col gap-1 mb-4">
                        <span className={`inline-flex self-start px-2.5 py-1 rounded-lg text-[9px] font-mono border font-extrabold ${badgeColor} uppercase tracking-widest mb-1.5`}>
                          {exp.type}
                        </span>
                        <h3 className="font-display font-black text-slate-900 text-lg md:text-xl leading-tight">
                          {exp.role}
                        </h3>
                        <h4 className="font-sans font-bold text-brand-purple text-xs tracking-wide">
                          {exp.company}
                        </h4>
                      </div>

                      {/* Summary Intro sentence */}
                      <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-sans border-l-2 border-slate-200 pl-4 py-1 italic">
                        {exp.description}
                      </p>

                      {/* Highlights / Achievements */}
                      <ul className="flex flex-col gap-3">
                        {exp.points.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed font-sans">
                            <span className="mt-1 text-emerald-500 flex-shrink-0">
                              <CheckCircle2 size={12} />
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Central Node Dot with Glow */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-8 h-8 rounded-full bg-white border-2 border-[#9FA1FF] flex items-center justify-center -translate-x-1/2 z-10 shadow-md">
                    <NodeIcon size={12} className="text-brand-purple" />
                  </div>

                  {/* Empty Spacer Column for layout mapping */}
                  <div className="hidden md:block w-1/2 pl-12 pr-12" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
