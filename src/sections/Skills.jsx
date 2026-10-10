import { useState } from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Settings, 
  GitBranch, 
  Layers, 
  Cpu 
} from 'lucide-react';
import { skills } from '../data/portfolioData';
import DynamicIcon from '../components/DynamicIcon';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', label: 'All Skills', icon: Layers },
    { id: 'Frontend', label: 'Frontend', icon: Code2 },
    { id: 'Backend', label: 'Backend', icon: Server },
    { id: 'Programming Languages', label: 'Languages', icon: Code2 },
    { id: 'Databases', label: 'Databases', icon: Database },
    { id: 'Tools', label: 'Tools', icon: Settings },
    { id: 'Version Control', label: 'Git & DevOps', icon: GitBranch },
  ];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" id="skills-container">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#6366F1] mb-4">
              <Cpu size={12} className="text-[#6366F1]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">MY EXPERTISE</span>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Skills &amp; <span className="text-[#818CF8]">Technologies</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-slate-500 text-sm md:text-base leading-relaxed">
              A comprehensive toolkit of technologies and tools I use to build scalable and impactful solutions.
            </p>
          </div>

          {/* Decorative Isometric Graphic */}
          <div className="hidden lg:flex items-center justify-end relative opacity-90 pointer-events-none">
            <div className="relative w-80 h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/40 via-purple-100/40 to-blue-100/40 blur-2xl rounded-full" />
              {/* Isometric blocks layout preview */}
              <div className="relative flex gap-4 transform -rotate-12 skew-y-6 scale-90">
                <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-xl backdrop-blur-md flex items-center justify-center border border-white text-indigo-500 font-bold text-lg">
                  &lt;/&gt;
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-xl backdrop-blur-md flex items-center justify-center border border-white text-purple-500 font-bold text-lg translate-y-3">
                  &#123;&#125;
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/80 shadow-xl backdrop-blur-md flex items-center justify-center border border-white text-blue-500 font-bold text-lg -translate-y-2">
                  &gt;_
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="p-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-sm mb-10 flex flex-wrap items-center gap-1">
          {categories.map((cat, idx) => {
            const CatIcon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <div key={cat.id} className="flex items-center">
                <button
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#818CF8] text-white shadow-md shadow-indigo-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <CatIcon size={14} className={isActive ? 'text-white' : 'text-slate-500'} />
                  {cat.label}
                </button>
                {/* Visual vertical divider between tab buttons */}
                {idx < categories.length - 1 && (
                  <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {/* Cards Grid (4 columns layout as shown in design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name || index}
              className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[140px]"
            >
              {/* Card Top Row: Soft Round Icon + Title + Category Pill */}
              <div className="flex items-start gap-3.5">
                {/* Circle Icon Container */}
                <div className="w-11 h-11 rounded-full bg-[#F0F7FF] flex items-center justify-center shrink-0">
                  <DynamicIcon name={skill.iconName} size={20} className="text-slate-700" />
                </div>

                <div className="flex flex-col items-start pt-0.5">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">
                    {skill.name}
                  </h3>
                  
                  {/* Category Pill Tag */}
                  <span className="mt-1 px-2 py-0.5 rounded-md bg-[#EEF2FF] text-[#6366F1] text-[10px] font-semibold tracking-wide">
                    {skill.category}
                  </span>
                </div>
              </div>

              {/* Card Description Text */}
              <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
                {skill.description || 'Modern, performant framework tailored for web and app development.'}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}