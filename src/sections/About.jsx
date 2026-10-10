import { User, Sparkles, Award } from "lucide-react";

export default function About() {
  const highlights = [
    {
      title: "Full-Stack Development",
      desc: "Building responsive and scalable web applications with modern frontend and backend technologies, from intuitive interfaces to reliable APIs.",
    },
    {
      title: "Performance First",
      desc: "Focused on creating fast, responsive applications with optimized rendering, efficient data handling, and smooth user experiences.",
    },
    {
      title: "Data-Driven Solutions",
      desc: "Combining SQL, Power BI, and application development to transform complex data into clear, actionable insights.",
    },
    {
      title: "Product Engineering",
      desc: "Bringing clean code, thoughtful architecture, and modern design together to create accessible and engaging digital products.",
    },
  ];

  return (
    <section
      id="about"
      className="py-24 relative overflow-hidden bg-slate-50/20"
    >
      {/* Background glow */}
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#B5BAFF] opacity-10 blur-[100px] pointer-events-none" />

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        id="about-container"
      >
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-brand-purple" />

            <span className="text-xs font-mono tracking-widest text-brand-purple uppercase font-bold">
              // 01 . THE BUILDER
            </span>
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Engineering Code with{" "}
            <span className="text-gradient">Architectural Precision</span>
          </h2>
        </div>

        {/* Content Panel */}
        <div className="mb-8">
          <div
            className="p-8 md:p-10 rounded-[32px] bg-white/60 border border-white backdrop-blur-xl shadow-xl shadow-slate-200/50 relative overflow-hidden"
            id="about-card"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-brand-purple/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-4 text-brand-purple">
                <Sparkles size={18} />

                <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                  Professional Objective
                </h3>
              </div>

              <p className="text-slate-600 leading-relaxed font-sans text-sm md:text-base mb-6">
                I am a highly motivated developer and analyst focused on
                building modern, user-friendly web applications and data-driven
                solutions. I enjoy working across the full development
                lifecycle, from designing responsive interfaces to developing
                APIs, databases, and interactive dashboards.
              </p>

              <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
                With an academic background in Information Technology and
                hands-on experience through personal projects, I focus on
                writing clean, modular code and turning ideas into practical
                digital products. I am continuously learning modern technologies
                and looking for opportunities to contribute to innovative
                engineering teams.
              </p>
            </div>
          </div>
        </div>

        {/* Highlights Row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          id="highlights-grid"
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              className="p-6 rounded-[24px] bg-white/60 border border-white backdrop-blur-xl shadow-md hover:shadow-xl hover:border-brand-purple/20 transition-all duration-300 flex flex-col gap-3 group"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-purple group-hover:text-emerald-500 group-hover:bg-brand-mint/20 transition-all duration-300">
                <Award size={16} />
              </div>

              <div>
                <h4 className="font-display font-bold text-slate-800 text-sm mb-1 group-hover:text-brand-purple transition-colors">
                  {h.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {h.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
