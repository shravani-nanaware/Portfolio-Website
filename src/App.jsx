import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Education from "./sections/Education";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { Terminal } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const sections = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ];

  // Simulated premium interactive developer loading screen
  useEffect(() => {
    const duration = 1200; // ms
    const intervalTime = 15;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          // Wait slightly before closing
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="fixed inset-0 z-[10000] bg-[#F8FAFF] flex flex-col items-center justify-center font-sans overflow-hidden"
        id="loading-screen"
      >
        {/* Background ambient glowing circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[#9FA1FF] opacity-20 blur-[100px]"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-[500px] h-[500px] rounded-full bg-[#D9F9DF] opacity-30 blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-[#AEE2FF] opacity-20 blur-[80px]"></div>

        {/* Core Loading Panel */}
        <div className="flex flex-col items-center gap-6 text-center max-w-sm px-6 relative z-10 select-none">
          <div
            className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-brand-purple animate-bounce"
            id="loading-icon"
          >
            <Terminal size={26} />
          </div>

          <div>
            <span className="font-display font-extrabold text-2xl tracking-tight text-slate-800 block leading-none">
              Shravani's <span className="text-gradient">Portfolio</span>
            </span>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest font-semibold uppercase mt-1 block">
              PORTFOLIO CORE ONLINE
            </span>
          </div>

          {/* Loading status progress percentage */}
          <div className="w-48 mt-4">
            <div className="flex justify-between items-center mb-2 font-mono text-[10px] text-slate-500 font-bold uppercase">
              <span>SYSTEM COMPILES</span>
              <span className="text-brand-purple font-black">
                {Math.floor(loadProgress)}%
              </span>
            </div>

            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#9FA1FF] to-[#AEE2FF] rounded-full transition-all duration-75"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Decorative orbit ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          <div className="w-[500px] h-[500px] border border-dashed border-slate-300 rounded-full"></div>
          <div className="w-[350px] h-[350px] border border-dashed border-slate-300 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-[#F8FAFF] text-slate-800 font-sans relative antialiased overflow-x-hidden selection:bg-[#9FA1FF]/20 selection:text-slate-900"
      id="app-root"
    >
      {/* Decorative dashed orbits background */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <div className="w-[800px] h-[800px] border border-dashed border-slate-200/50 rounded-full animate-[spin_180s_linear_infinite]" />
        <div className="w-[550px] h-[550px] border border-dashed border-slate-200/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-[spin_120s_linear_infinite_reverse]" />
      </div>

      {/* Interactive premium Cursor (subtle design follow-ring) */}
      <CustomCursor />

      {/* Floating navigation header */}
      <Navbar sections={sections} />

      {/* Main Sections Assembly */}
      <main className="relative z-10 w-full" id="main-content">
        {/* Full Screen Hero with 3D Background */}
        <Hero />

        {/* About bio card highlights */}
        <About />

        {/* Skills grid progress display */}
        <Skills />

        {/* Experiences timeline tracker */}
        <Experience />

        {/* Project display grid with tilts */}
        <Projects />

        {/* Certifications badges check */}
        <Certifications />

        {/* Education track and dynamic counters */}
        <Education />

        {/* Interactive contact formulary */}
        <Contact />
      </main>

      {/* Standard Footer actions & credits */}
      <Footer />
    </div>
  );
}
