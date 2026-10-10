import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formState.name || !formState.email || !formState.message) {
      setStatus("error");

      setTimeout(() => setStatus("idle"), 3000);

      return;
    }

    setStatus("submitting");

    // Simulate API form submission (Formspree / EmailJS behavior)
    setTimeout(() => {
      setStatus("success");

      setFormState({
        name: "",
        email: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-slate-50/10"
    >
      {/* Background glow blur */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#AEE2FF] opacity-10 blur-[120px] pointer-events-none" />

      <div
        className="max-w-7xl mx-auto px-6 relative z-10"
        id="contact-container"
      >
        {/* Section Heading */}
        <div className="flex flex-col mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Mail size={16} className="text-brand-purple" />

            <span className="text-xs font-mono tracking-widest text-brand-purple uppercase font-bold">
              // 07 . GET IN TOUCH
            </span>
          </div>

          <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 uppercase tracking-tighter">
            Let's Build Something{" "}
            <span className="text-gradient">Outstanding</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
          id="contact-grid"
        >
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div
              className="p-8 rounded-[32px] bg-white/60 border border-white backdrop-blur-xl shadow-xl shadow-slate-200/50 flex-1 flex flex-col justify-between"
              id="contact-info-card"
            >
              <div>
                <h3 className="font-display font-black text-lg text-slate-800 uppercase tracking-tight mb-6">
                  Contact Information
                </h3>

                {/* Contact Details */}
                <div className="flex flex-col gap-5">
                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-500 group-hover:text-brand-purple group-hover:bg-[#9FA1FF]/10 transition-all duration-300">
                      <Mail size={16} />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold block uppercase leading-none mb-1">
                        EMAIL
                      </span>

                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="text-slate-700 hover:text-brand-purple font-sans text-sm font-semibold transition-colors"
                      >
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-150 flex items-center justify-center text-slate-500 group-hover:text-brand-purple group-hover:bg-[#9FA1FF]/10 transition-all duration-300">
                      <MapPin size={16} />
                    </div>

                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold block uppercase leading-none mb-1">
                        LOCATION
                      </span>

                      <span className="text-slate-700 font-sans text-sm font-semibold">
                        {personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Minimal Abstract Map Element */}
              <div className="h-44 mt-8 rounded-[24px] border border-slate-150 bg-slate-50 overflow-hidden relative p-4 flex flex-col justify-end shadow-inner">
                {/* Visual grid styling for map simulation */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #94a3b8 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />

                {/* Decorative coordinate paths */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-35"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0,80 Q100,50 200,90 T400,30"
                    fill="none"
                    stroke="#9FA1FF"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  <path
                    d="M50,0 Q180,120 280,40"
                    fill="none"
                    stroke="#AEE2FF"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Simulated center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-brand-purple animate-ping absolute" />

                  <div className="w-3 h-3 rounded-full bg-brand-purple relative border-2 border-white shadow-md" />
                </div>

                <div className="relative z-10 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200/50 inline-self-start shadow-sm">
                  <span className="text-[9px] font-mono font-bold text-slate-600 tracking-wider">
                    NAVI MUMBAI REGION // 19.0330° N, 73.0297° E
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div
              className="p-8 md:p-10 rounded-[32px] bg-white/60 border border-white backdrop-blur-xl shadow-xl shadow-slate-200/50"
              id="contact-form-card"
            >
              <h3 className="font-display font-black text-lg text-slate-800 uppercase tracking-tight mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase"
                  >
                    Your Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        name: e.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    disabled={status === "submitting"}
                    className="w-full px-4.5 py-3.5 rounded-2xl bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 text-slate-800 text-sm placeholder:text-slate-300 shadow-xs outline-none transition-all duration-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                    placeholder="name@company.com"
                    disabled={status === "submitting"}
                    className="w-full px-4.5 py-3.5 rounded-2xl bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 text-slate-800 text-sm placeholder:text-slate-300 shadow-xs outline-none transition-all duration-300"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[10px] font-mono font-bold text-slate-400 tracking-wider uppercase"
                  >
                    Message Details
                  </label>

                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        message: e.target.value,
                      })
                    }
                    placeholder="Hi, I would love to connect about..."
                    disabled={status === "submitting"}
                    className="w-full px-4.5 py-3.5 rounded-2xl bg-white border border-slate-200 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple/20 text-slate-800 text-sm placeholder:text-slate-300 shadow-xs outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-display font-bold text-sm tracking-wide shadow-xl shadow-slate-200 hover:bg-slate-800 active:scale-97 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {status === "submitting" ? (
                    <span>DISPATCHING MESSAGE...</span>
                  ) : (
                    <>
                      <span>TRANSMIT DETAILS</span>
                      <Send size={14} />
                    </>
                  )}
                </button>

                {/* Success Message */}
                {status === "success" && (
                  <div className="p-4 rounded-2xl bg-[#D9F9DF] border border-emerald-200 text-[#2c4e31] flex items-center gap-2.5 animate-fadeIn">
                    <CheckCircle
                      size={18}
                      className="text-emerald-600 flex-shrink-0"
                    />

                    <span className="text-xs font-semibold font-mono leading-none">
                      Transmission confirmed! I will check my inbox and get back
                      to you shortly.
                    </span>
                  </div>
                )}

                {/* Error Message */}
                {status === "error" && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5 animate-fadeIn">
                    <AlertCircle
                      size={18}
                      className="text-rose-600 flex-shrink-0"
                    />

                    <span className="text-xs font-semibold font-mono leading-none">
                      Validation failure. Please ensure all inputs are complete
                      and try again.
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Simple keyframes for fade-in trigger */
if (typeof document !== "undefined") {
  const styleElement = document.createElement("style");

  styleElement.innerHTML = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;

  document.head.appendChild(styleElement);
}
