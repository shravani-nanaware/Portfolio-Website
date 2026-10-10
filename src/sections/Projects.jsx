import { useState } from "react";
import { Github, FolderGit2, Sparkles } from "lucide-react";
import { projects } from "../data/portfolioData";

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [tiltStyles, setTiltStyles] = useState({});

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    if (!centerX || !centerY) return;

    const rotateX = ((centerY - y) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyles((prev) => ({
      ...prev,
      [id]: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyles((prev) => ({
      ...prev,
      [id]: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    }));

    setHoveredProjectId(null);
  };

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const gradientStyles = {
    neurosphere: "from-[#9FA1FF] via-[#B5BAFF] to-[#AEE2FF]",
    vaporengine: "from-[#AEE2FF] via-[#B5BAFF] to-[#D9F9DF]",
    prism: "from-[#D9F9DF] via-[#9FA1FF] to-[#B5BAFF]",
    aura: "from-[#B5BAFF] via-[#AEE2FF] to-[#D9F9DF]",
  };

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white/40 py-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#9FA1FF] opacity-10 blur-[120px]" />

      <div
        id="projects-container"
        className="relative z-10 mx-auto max-w-7xl px-6"
      >
        {/* Section heading */}
        <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="flex flex-col">
            <div className="mb-3 flex items-center gap-2">
              <FolderGit2 size={16} className="text-brand-purple" />

              <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-purple">
                // 04 . WORK SAMPLES
              </span>
            </div>

            <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-slate-900 md:text-5xl">
              Featured{" "}
              <span className="text-gradient">Engineering Projects</span>
            </h2>
          </div>

          {/* Category filters */}
          <div
            id="projects-filter-tabs"
            className="flex flex-wrap items-center gap-2"
          >
            {[
              { id: "all", label: "All Projects" },
              { id: "frontend", label: "Frontend" },
              { id: "fullstack", label: "Fullstack" },
              { id: "ai", label: "AI Products" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={activeTab === tab.id}
                className={`rounded-2xl px-4 py-2.5 font-mono text-xs font-bold tracking-wider transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "border border-slate-200 bg-white text-slate-500 shadow-sm hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div
          id="projects-grid"
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;

            const currentTilt =
              tiltStyles[project.id] ||
              "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

            const gradientClass =
              gradientStyles[project.image] ||
              "from-[#9FA1FF] via-[#B5BAFF] to-[#AEE2FF]";

            return (
              <div
                key={project.id}
                onMouseMove={(e) => handleMouseMove(e, project.id)}
                onMouseLeave={() => handleMouseLeave(project.id)}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                style={{
                  transform: currentTilt,
                  transition: "transform 0.15s ease-out",
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-white bg-white/75 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
              >
                {/* Project visual */}
                <div className="relative flex h-56 flex-col justify-between overflow-hidden bg-slate-900 p-6">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-110`}
                  />

                  <div className="absolute inset-0 z-0 bg-slate-950/65" />

                  {/* Category and featured badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-brand-sky backdrop-blur-md">
                      {String(project.category ?? "").toUpperCase()}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/40 bg-[#D9F9DF] px-3 py-1.5 font-mono text-[10px] font-bold tracking-widest text-[#2c4e31] shadow-sm">
                        <Sparkles size={10} />
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Decorative dashboard */}
                  <div className="relative z-10 flex h-24 w-full flex-col justify-between overflow-hidden rounded-t-xl border border-white/10 bg-white/5 p-4 shadow-inner">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#9FA1FF]/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#AEE2FF]/70" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#D9F9DF]/70" />
                      <div className="ml-1 h-1.5 w-24 rounded-full bg-white/10" />
                    </div>

                    <div className="mt-1 grid h-10 grid-cols-4 items-end gap-2">
                      <div className="h-4 animate-pulse rounded-sm bg-[#9FA1FF]/40" />
                      <div className="h-8 rounded-sm bg-[#AEE2FF]/40" />
                      <div className="h-6 animate-pulse rounded-sm bg-[#D9F9DF]/40" />
                      <div className="h-10 rounded-sm bg-[#B5BAFF]/40" />
                    </div>
                  </div>
                </div>

                {/* Hover border */}
                <div
                  className={`pointer-events-none absolute inset-0 z-20 rounded-[32px] border-[2px] transition-opacity duration-300 ${
                    isHovered
                      ? "border-brand-purple opacity-100"
                      : "border-transparent opacity-0"
                  }`}
                />

                {/* Project details */}
                <div className="relative z-10 flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h3 className="mb-2.5 font-display text-xl font-black uppercase tracking-tight text-slate-900 transition-colors duration-300 group-hover:text-brand-purple">
                      {project.title}
                    </h3>

                    <p className="mb-6 font-sans text-xs leading-relaxed text-slate-500 md:text-sm">
                      {project.description}
                    </p>
                  </div>

                  {/* Technology tags */}
                  <div>
                    <div className="mb-6 flex flex-wrap items-center gap-2">
                      {(project.tags ?? []).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-slate-600 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* GitHub repository button only */}
                    <div className="flex items-center gap-3.5 border-t border-slate-100 pt-5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 font-mono text-xs font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:text-slate-900"
                        >
                          <Github size={14} />
                          REPOSITORIES
                        </a>
                      )}
                    </div>
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
