import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import { personalInfo } from "../data/portfolioData";
import profilePhoto from "../assets/images/Portfoliophoto.png";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    "Full-Stack Web Developer",
    "Data Analyst & Insights Miner",
    "Interactive 3D Web Creator",
    "Self-Motivated Problem Solver",
  ];

  // Typing effect loop
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer;

    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length - 1));
      }, 40);
    } else {
      timer = setTimeout(() => {
        setTypedText(currentRole.substring(0, typedText.length + 1));
      }, 80);
    }

    if (!isDeleting && typedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D WebGL Background Canvas */}
      <ThreeCanvas />

      {/* Decorative dashed orbits background from Bold Typography design */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] border border-dashed border-slate-200 rounded-full opacity-40 animate-[spin_120s_linear_infinite]"></div>
        <div className="w-[420px] h-[420px] border border-dashed border-slate-200 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60 animate-[spin_80s_linear_infinite_reverse]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-[#9FA1FF] to-[#AEE2FF] blur-[80px] opacity-10"></div>
      </div>

      {/* Ambient gradient glows from theme specs */}
      <div className="absolute top-[-50px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#9FA1FF] opacity-15 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-150px] w-[600px] h-[600px] rounded-full bg-[#D9F9DF] opacity-25 blur-[150px] pointer-events-none"></div>
      <div className="absolute top-[25%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#AEE2FF] opacity-15 blur-[100px] pointer-events-none"></div>

      {/* Main Content Container */}
      <div
        className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-10 pb-16 lg:pb-0"
        id="hero-container"
      >
        {/* Left Column: Text, Subtitle, CTA & Socials */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Status Badge */}
          <div className="mb-6 px-4.5 py-1.5 rounded-full bg-[#D9F9DF]/80 border border-emerald-200/50 flex items-center gap-2.5 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#2c4e31] uppercase">
              Available for Hire &bull; Navi Mumbai, MH, India
            </span>
          </div>

          {/* Display Typography */}
          <div className="flex flex-col gap-1.5 mb-6 max-w-4xl select-none">
            <h1 className="font-display font-black text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.0] text-slate-900 tracking-tighter uppercase">
              Full Stack Developer
            </h1>
            <h1 className="font-display font-black text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.0] tracking-tighter uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FA1FF] to-[#AEE2FF]">
                MERN Stack & Python Specialist
              </span>
            </h1>
            <h1 className="font-display font-black text-[32px] sm:text-[44px] md:text-[56px] lg:text-[64px] leading-[1.0] text-slate-900 tracking-tighter uppercase"></h1>
          </div>

          {/* Typed Subtitle */}
          <div className="h-8 flex items-center justify-center lg:justify-start mb-8 font-mono text-sm sm:text-base font-bold text-slate-500 tracking-wider">
            <span className="mr-1">ROLE // </span>
            <span className="text-brand-purple">{typedText}</span>
            <span className="w-[2.5px] h-4 bg-brand-purple ml-1 animate-pulse" />
          </div>

          {/* Description Intro */}
          <p className="max-w-xl text-slate-500 text-sm sm:text-base md:text-lg mb-10 leading-relaxed font-sans px-2 lg:px-0">
            {personalInfo.intro}
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
            <button
              onClick={() => handleScrollTo("projects")}
              className="w-full sm:w-auto px-8 py-4.5 bg-slate-900 text-white rounded-2xl font-display font-bold text-base shadow-xl shadow-slate-200/80 hover:bg-slate-800 active:scale-97 transition-all flex items-center justify-center gap-2.5"
            >
              Explore Projects
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => handleScrollTo("contact")}
              className="w-full sm:w-auto px-8 py-4.5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-display font-bold text-base hover:bg-slate-50 hover:border-slate-300 active:scale-97 transition-all flex items-center justify-center gap-2"
            >
              Let's Connect
            </button>
          </div>

          {/* Social Links & Quick stats link */}
          <div className="flex items-center gap-4.5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-brand-purple/40 hover:shadow-sm transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-brand-purple/40 hover:shadow-sm transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="w-11 h-11 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:text-slate-950 hover:border-brand-purple/40 hover:shadow-sm transition-all duration-300"
              aria-label="Send Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Premium Portrait Photo Frame */}
        <div
          className="lg:col-span-5 flex justify-center w-full z-10"
          id="hero-image-column"
        >
          <div className="relative w-full max-w-[360px] aspect-square rounded-[36px] p-4 bg-white/40 border border-white/60 backdrop-blur-xl shadow-2xl shadow-slate-200/50 group animate-float-medium">
            {/* Mesh background behind photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9FA1FF]/20 via-[#AEE2FF]/10 to-[#D9F9DF]/10 rounded-[36px] pointer-events-none" />

            <div className="relative w-full h-120 rounded-[26px] overflow-hidden border border-slate-150 shadow-inner">
              <img
                src="/src/assets/images/Portfoliophoto.png"
                alt="Shrawani Nanaware - Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle overlay shading */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#9FA1FF] to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan z-10 pointer-events-none" />

              {/* Interactive micro info tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/75 backdrop-blur-md border border-white/40 p-3 rounded-2xl flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[8px] font-mono tracking-widest text-slate-400 block uppercase font-black leading-none mb-1">
                    LATEST FOCUS
                  </span>
                  <span className="text-xs font-display font-black text-slate-800 uppercase tracking-tight block leading-none">
                    FULL STACK DEVELOEPR
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#9FA1FF] animate-pulse" />
              </div>
            </div>

            {/* Corner styling accents */}
            <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#9FA1FF] rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#AEE2FF] rounded-br-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-brand-purple transition-colors cursor-pointer z-10"
        onClick={() => handleScrollTo("about")}
      >
        <span className="text-[9px] font-mono tracking-widest uppercase font-bold">
          Scroll Down
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
