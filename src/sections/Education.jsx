import { Award, GraduationCap, CheckCircle2, BookOpen } from "lucide-react";
import { education } from "../data/portfolioData";

export default function Education() {
  return (
    <section
      id="education"
      className="py-24 relative overflow-hidden bg-white/40"
    >
      {/* Background glow */}
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#D9F9DF] opacity-15 blur-[120px] pointer-events-none" />

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        id="education-container"
      >
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={16} className="text-brand-purple" />

            <span className="text-xs font-mono tracking-widest text-brand-purple uppercase font-bold">
              // 06 . EDUCATION
            </span>
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Academic <span className="text-gradient">Background</span>
          </h2>
        </div>

        {/* Education Cards */}
        <div
          className="max-w-5xl mx-auto flex flex-col gap-8"
          id="education-grid"
        >
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-8 md:p-10 rounded-[32px] bg-white/60 border border-white backdrop-blur-xl shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-radial from-brand-purple/5 to-transparent pointer-events-none" />

              <div className="relative z-10">
                {/* Degree Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">
                  <div>
                    {/* Period + Status */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex px-2.5 py-1 rounded-lg text-[9px] font-mono border font-extrabold text-brand-purple bg-[#9FA1FF]/10 border-brand-purple/20 uppercase tracking-widest">
                        {edu.period}
                      </span>

                      {edu.status === "CURRENT" && (
                        <span className="inline-flex px-2 py-0.5 rounded-md text-[8px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 uppercase tracking-wider">
                          IN PROGRESS
                        </span>
                      )}
                    </div>

                    {/* Degree */}
                    <h3 className="font-display font-black text-2xl md:text-3xl text-slate-900 uppercase tracking-tight leading-tight">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <h4 className="font-sans font-bold text-brand-purple text-sm md:text-base mt-2">
                      {edu.institution}
                    </h4>
                  </div>

                  {/* Score */}
                  {edu.score && (
                    <div className="px-4 py-2.5 rounded-2xl bg-[#D9F9DF]/80 border border-emerald-200/50 text-slate-800 text-center font-mono text-xs font-extrabold flex items-center justify-center gap-1.5 h-10 shadow-sm self-start">
                      <Award size={14} className="text-emerald-600" />

                      <span>{edu.score}</span>
                    </div>
                  )}
                </div>

                {/* Relevant Coursework */}
                {edu.courses && edu.courses.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3.5 text-slate-700">
                      <BookOpen size={14} className="text-brand-purple" />

                      <h4 className="font-display font-bold text-xs uppercase tracking-wide">
                        Relevant Coursework
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono font-bold tracking-wider text-slate-600 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl shadow-xs"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic Highlights */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-2 mb-3 text-slate-700">
                      <Award size={14} className="text-brand-purple" />

                      <h4 className="font-display font-bold text-xs uppercase tracking-wide">
                        Academic Highlights
                      </h4>
                    </div>

                    <ul className="flex flex-col gap-3">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs md:text-sm text-slate-600 leading-relaxed font-sans"
                        >
                          <span className="mt-0.5 text-emerald-500 flex-shrink-0">
                            <CheckCircle2 size={13} />
                          </span>

                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
