import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGO_URL = "https://raw.githubusercontent.com/Domusgpt/Regency-xpress/main/logo.png";

const RegencySymbol = ({ className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="relative flex items-center justify-center w-12 h-12">
      <div className="absolute w-8 h-8 border-2 border-regencyBlue rounded-tl-2xl rounded-br-2xl top-0 left-0"></div>
      <div className="absolute w-8 h-8 border-2 border-regencyGold rounded-tr-2xl rounded-bl-2xl bottom-0 right-0"></div>
    </div>
  </div>
);

const RegencyBackupLogo = ({ className = "" }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <div className="flex flex-col items-center">
      <div className="mb-2 opacity-90 scale-125">
        <RegencySymbol />
      </div>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="font-sans font-bold text-2xl md:text-3xl text-regencyGold tracking-tight">Regency</span>
        <span className="font-sans font-bold text-2xl md:text-3xl text-regencyGold tracking-tight">Xpress</span>
      </div>
      <span className="text-[10px] md:text-xs font-bold text-regencyBlue tracking-[0.4em] uppercase mt-1">Services</span>
    </div>
  </div>
);

const RegencyLogo = ({ className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const hasUrl = LOGO_URL && LOGO_URL.length > 0;

  if (hasUrl && !imageError) {
    return (
      <div className={`relative ${className}`}>
        <img
          src={LOGO_URL}
          alt="Regency Xpress Services"
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return <RegencyBackupLogo className={className} />;
};

const Icons = {
  Van: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  Box: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Timer: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  Arrow: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
};

const services = [
  {
    title: "STAT Clinical",
    copy: "Direct-to-OR, organ transport, crash-cart resupply, and critical lab shuttles with biometric custody capture.",
    icon: <Icons.Timer />,
    badge: "< 60 min launch",
    image: "https://images.unsplash.com/photo-1526252410460-2c27e2c4a1c8?q=80&w=3870&auto=format&fit=crop",
    accent: "from-regencyBlue/10 via-regencyGold/20 to-white",
  },
  {
    title: "Dedicated Fleet",
    copy: "Temperature-controlled sprinter network engineered for biologics, cell & gene therapy, and validated pharma lanes.",
    icon: <Icons.Van />,
    badge: "Certified crews",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=3870&auto=format&fit=crop",
    accent: "from-regencyGold/15 via-white to-regencyBlue/10",
  },
  {
    title: "Install & Integrate",
    copy: "White-glove device placement for MRI, robotics, and diagnostics with rigging partners and sterile zone discipline.",
    icon: <Icons.MapPin />,
    badge: "Touchpoint crew",
    image: "https://images.unsplash.com/photo-1460672985063-6764ac8b9c74?q=80&w=3870&auto=format&fit=crop",
    accent: "from-white via-regencyBlue/15 to-regencyGold/20",
  },
];

const flows = [
  {
    title: "Signal Intake",
    copy: "SOP-aligned triage captures payload specs, compliance flags, and ambient temp signatures in under four minutes.",
    metric: "0:04 prep",
    tag: "Phase 01",
  },
  {
    title: "Live Telemetry",
    copy: "Multi-sensor streaming for thermal, vibration, and geofencing keeps pharmacists and clinicians in live-view mode.",
    metric: "1200 mv stream",
    tag: "Phase 02",
  },
  {
    title: "Clinical Transfer",
    copy: "Regency crews execute bedside handoffs with sterile handling, double sign-off, and photo verification at custody.",
    metric: "400 mv delta",
    tag: "Phase 03",
  },
  {
    title: "Audit & Archive",
    copy: "Automated dossiers with chain-of-custody proofs, SOP compliance, and analytics delivered back to your governance hub.",
    metric: "< 2 min docs",
    tag: "Phase 04",
  },
];

const gallery = [
  {
    title: "Clinical white-glove",
    image: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?q=80&w=3870&auto=format&fit=crop",
  },
  {
    title: "Thermal chain control",
    image: "https://images.unsplash.com/photo-1624454002502-392c75c89b5e?q=80&w=3870&auto=format&fit=crop",
  },
  {
    title: "Strategic dispatch",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=3870&auto=format&fit=crop",
  },
];

const palette = [
  { name: "Regency Blue", value: "#255091", cue: "Kinetic highlights" },
  { name: "Navy Core", value: "#0B1221", cue: "Authority" },
  { name: "Regency Gold", value: "#CFB53B", cue: "Precision accent" },
  { name: "Fog White", value: "#F4F4F5", cue: "Clinical clarity" },
];

const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (loading || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
        }
      });

      heroTl
        .fromTo("#hero-grid", { opacity: 0, scale: 0.96 }, { opacity: 0.45, scale: 1, duration: 1 })
        .fromTo("#hero-lights", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "<")
        .fromTo("#hero-headline", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5")
        .fromTo("#hero-cards .hero-card", { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.8 });

      const cards = gsap.utils.toArray<HTMLElement>(".module-card");
      gsap.from(cards, {
        scrollTrigger: { trigger: "#services-section", start: "top 80%" },
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from("#gallery-rail .gallery-item", {
        scrollTrigger: { trigger: "#gallery-rail", start: "top 80%" },
        x: (index) => (index % 2 === 0 ? -80 : 80),
        opacity: 0,
        duration: 1,
        stagger: 0.18,
        ease: "power3.out",
      });

      gsap.from("#stats-grid", {
        scrollTrigger: { trigger: "#stats-section", start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 1,
      });

      const flowTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#flow-section",
          start: "top top",
          end: "+=1900",
          scrub: true,
          pin: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".flow-card").forEach((card, index) => {
        flowTl.to(card, { scale: 1, y: 0, opacity: 1, duration: 0.65 }, index === 0 ? 0 : ">-=0.08");
      });

      gsap.to("#about-img-parallax", {
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -60,
      });
    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center animate-pulse">
          <div className="w-64 h-32 flex items-center justify-center">
            <span className="text-regencyBlue font-bold tracking-widest text-xs uppercase">Loading Experience</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={mainRef} className="bg-white min-h-screen text-regencyDarkBlue selection:bg-regencyGold selection:text-white">
      <section id="hero-section" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <div id="hero-grid" className="absolute inset-0 bg-grid-pattern bg-[length:36px_36px] opacity-[0.06]"></div>
        <div id="hero-lights" className="absolute inset-0">
          <div className="absolute -top-24 left-0 w-96 h-96 bg-regencyBlue/20 rounded-full blur-[140px]"></div>
          <div className="absolute -bottom-20 right-4 w-[480px] h-[480px] bg-regencyGold/25 rounded-full blur-[160px]"></div>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[520px] h-[520px] bg-gradient-to-br from-white via-regencyOffWhite to-regencyBlue/10 opacity-60 rounded-full blur-[200px]"></div>
        </div>

        <div className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center">
          <div className="space-y-8" id="hero-headline">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-white/60 backdrop-blur rounded-full border border-white/50 text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Precision Medical Freight
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-[1.1] text-regencyDarkBlue drop-shadow-sm max-w-4xl mx-auto">
              A multi-layered dispatch system tuned for <span className="text-regencyBlue">clinical certainty</span> and <span className="text-regencyGold">human calm</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Regency Xpress orchestrates every mile with telemetry, design, and disciplined crews—so hospital command centers see proof, not promises.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4" id="hero-cards">
              <div className="hero-card px-5 py-3 bg-white/70 border border-gray-100 rounded-full shadow-md shadow-regencyBlue/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-regencyBlue flex items-center gap-2 hover:shadow-lg hover:border-regencyBlue/20 transition-all duration-300">
                <Icons.Box /> Chain-of-custody
              </div>
              <div className="hero-card px-5 py-3 bg-white/70 border border-gray-100 rounded-full shadow-md shadow-regencyBlue/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-regencyGold flex items-center gap-2 hover:shadow-lg hover:border-regencyGold/20 transition-all duration-300">
                <Icons.Van /> Thermal fleet
              </div>
              <div className="hero-card px-5 py-3 bg-white/70 border border-gray-100 rounded-full shadow-md shadow-regencyBlue/5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-600 flex items-center gap-2 hover:shadow-lg transition-all duration-300">
                <Icons.Timer /> 24/7 crews
              </div>
            </div>
          </div>
        </div>

        <div id="hero-cta" className="absolute bottom-12 z-20 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll to experience the choreography</span>
          <div className="w-[1px] h-12 bg-gray-300"></div>
        </div>
      </section>

      <div className="border-y border-gray-100 bg-regencyOffWhite py-4 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_26s_linear_infinite] w-max">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-gray-400 font-display font-bold text-xl tracking-wider flex items-center gap-12">
              CLINICAL TRIALS <span className="text-regencyGold text-sm">●</span>
              STAT DELIVERY <span className="text-regencyGold text-sm">●</span>
              WHITE GLOVE <span className="text-regencyGold text-sm">●</span>
            </span>
          ))}
        </div>
      </div>

      <section id="services-section" className="py-28 px-6 relative z-10 bg-white">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-regencyOffWhite/50 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue mb-2">Precision Modules</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-regencyBlue to-regencyGold"></div>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed md:text-right">
              Multi-disciplinary crews, telemetry-first vehicles, and white-glove discipline built for hospital-grade calm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.title} className="module-card group relative h-[540px] bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_30px_120px_-60px_rgba(37,80,145,0.5)]">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.accent}`}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ backgroundImage: `url(${service.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-regencyDarkBlue/80 via-regencyDarkBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-regencyBlue group-hover:text-regencyGold transition-colors">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] px-3 py-1 border border-current rounded-full bg-white/60 backdrop-blur">
                      {service.badge}
                    </span>
                    {service.icon}
                  </div>

                  <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-display font-bold text-regencyDarkBlue group-hover:text-white mb-4 leading-tight">{service.title}</h3>
                    <div className="h-[1px] w-full bg-gray-200 group-hover:bg-white/30 mb-4"></div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-100 leading-relaxed mb-6">
                      {service.copy}
                    </p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-regencyGold opacity-0 group-hover:opacity-100 transition-opacity">
                      Detail sheet <Icons.Arrow />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery-section" className="py-16 px-6 bg-regencyOffWhite/70">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RegencySymbol />
              <span className="text-xs font-bold uppercase tracking-[0.32em] text-regencyBlue">Proof of care</span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.32em] text-gray-500">Human-led, sensor-backed</span>
          </div>
          <div id="gallery-rail" className="grid md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.title} className="gallery-item relative overflow-hidden rounded-xl h-64 md:h-72 shadow-[0_20px_80px_-60px_rgba(12,18,33,0.8)] border border-white/60 bg-white">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-regencyDarkBlue/80 via-regencyDarkBlue/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase tracking-[0.32em] text-regencyGold mb-2">Field Capture</p>
                  <h4 className="text-lg font-display font-bold leading-tight">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats-section" className="py-20 bg-regencyDarkBlue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[520px] h-[520px] bg-regencyBlue/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div id="stats-grid" className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">500<span className="text-regencyGold">+</span></span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-[0.32em]">Medical Units</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">48</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-[0.32em]">States Covered</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">24<span className="text-regencyGold">/</span>7</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-[0.32em]">Live Dispatch</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">99<span className="text-regencyGold">%</span></span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-[0.32em]">On-Time Rate</span>
          </div>
        </div>
      </section>

      <section id="flow-section" className="relative bg-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-regencyOffWhite/70 via-white to-regencyOffWhite/40"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <RegencySymbol />
                <span className="text-regencyBlue font-bold tracking-[0.32em] uppercase text-xs">Advanced Flow</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue leading-tight">The choreographed dispatch timeline</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed md:text-right">
              Scroll to watch operational cards expand as signals intensify from telemetry capture to clinical handoff.
            </p>
          </div>

          <div className="space-y-8">
            {flows.map((flow, idx) => (
              <div key={flow.title} className="flow-card opacity-20 scale-95 translate-y-10 bg-white/80 backdrop-blur shadow-xl border border-gray-100 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-regencyBlue/15 via-regencyGold/10 to-white rounded-xl border border-gray-100 flex flex-col items-center justify-center text-regencyBlue font-bold uppercase tracking-[0.3em] text-xs shadow-inner">
                  <span className="text-[10px] text-gray-500">{flow.tag}</span>
                  <span>{flow.metric}</span>
                  <div className="mt-3 h-[2px] w-16 bg-gradient-to-r from-regencyBlue to-regencyGold"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-regencyBlue mb-4">
                    <span className="px-3 py-1 border border-regencyBlue/30 rounded-full">{flow.tag}</span>
                    <span className="text-gray-400">{flow.metric}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-regencyDarkBlue mb-3">{flow.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{flow.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-section" className="py-28 px-6 bg-regencyOffWhite relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-regencyOffWhite to-white"></div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center relative z-10">
          <div className="w-full md:w-1/2 space-y-8">
            <div className="flex items-center gap-4">
              <RegencySymbol />
              <span className="text-regencyBlue font-bold tracking-[0.32em] uppercase text-sm">The Regency Standard</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue leading-tight">
              Logistics without the <br />
              <span className="text-gray-400 italic">guessing game.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              We map every dispatch on a design system: clarity-first information, human calm at the curb, and telemetry that matches your governance stack.
            </p>
            <div className="grid grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-[0.26em] text-gray-500">
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Clinical Trials</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Biopharma</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Hospital Systems</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">White Glove</span>
            </div>
            <button className="px-8 py-3 border border-regencyDarkBlue text-regencyDarkBlue hover:bg-regencyDarkBlue hover:text-white transition-all uppercase tracking-[0.28em] text-[11px] font-bold mt-4 rounded-full">
              Our Fleet Technology
            </button>
          </div>

          <div className="w-full md:w-1/2 relative h-[520px]">
            <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-2xl border border-white">
              <img
                id="about-img-parallax"
                src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=3870&auto=format&fit=crop"
                className="absolute inset-0 w-full h-[120%] object-cover"
                alt="Pharmaceutical Logistics"
              />
              <div className="absolute inset-0 bg-regencyBlue/20 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl max-w-xs hidden md:block border border-gray-100 rounded-xl">
              <p className="font-display font-bold text-xl text-regencyDarkBlue mb-2">"Precision in every mile."</p>
              <p className="text-xs text-gray-500 uppercase tracking-[0.32em]">- CEO, Regency Xpress</p>
            </div>
          </div>
        </div>
      </section>

      <section id="codex-section" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <RegencySymbol />
              <span className="text-regencyBlue font-bold tracking-[0.32em] uppercase text-xs">Style Codex</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-regencyDarkBlue">Future-facing brand directives</h3>
            <p className="text-gray-600 leading-relaxed">
              Build everything with orchestration in mind: dual-tone gradients, glass layers, and kinetic motion that mirrors our dispatch timeline.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {palette.map((color) => (
                <div key={color.name} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm bg-white">
                  <div className="h-16" style={{ backgroundColor: color.value }}></div>
                  <div className="p-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-600 flex justify-between">
                    <span>{color.name}</span>
                    <span>{color.value}</span>
                  </div>
                  <div className="px-3 pb-3 text-[10px] uppercase tracking-[0.3em] text-gray-400">{color.cue}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-[11px] text-gray-500 uppercase tracking-[0.32em]">
              <p>Motion: GSAP choreography, staggered cards, parallax, glow pulses.</p>
              <p>Shapes: Thin grids, concentric light fields, geometric symbol inserts.</p>
              <p>Voice: Clinical, composed, conviction.</p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-6 bg-regencyOffWhite border border-gray-100 rounded-xl p-8 shadow-inner">
            <h4 className="text-xl font-display font-bold text-regencyDarkBlue">Asset Set</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> SVG symbol mark for iconography, corner caps, and watermarking.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Gradient glows for hero, separators, and data callouts.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Scroll-triggered cards (400–1200 mv) expanding along the dispatch timeline.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Glassmorphism nav, chips, and CTA pills to signify premium control.</li>
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 text-[11px] font-bold uppercase tracking-[0.32em] text-regencyBlue">
              <span className="px-4 py-3 bg-white border border-gray-200 rounded-sm">Syne / Display</span>
              <span className="px-4 py-3 bg-white border border-gray-200 rounded-sm">Inter / Body</span>
              <span className="px-4 py-3 bg-white border border-gray-200 rounded-sm">GSAP Choreo</span>
              <span className="px-4 py-3 bg-white border border-gray-200 rounded-sm">Grid Overlays</span>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-white pt-20 pb-12 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-6">
            <div className="w-32 h-auto">
              <RegencyLogo />
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Regency Xpress Services is a premier logistics provider specializing in expedited medical freight, pharmaceutical transport, and white-glove delivery.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-16 text-sm text-gray-500">
            <div className="flex flex-col gap-4">
              <span className="text-regencyDarkBlue font-bold uppercase tracking-[0.32em] text-xs">Office</span>
              <p className="leading-relaxed">1200 Logistics Way<br />Los Angeles, CA 90021</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-regencyDarkBlue font-bold uppercase tracking-[0.32em] text-xs">Contact</span>
              <p className="leading-relaxed"><span className="text-regencyBlue font-bold">dispatch@regencyxpress.com</span><br />(800) 555-0199</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-[0.32em]">
          <span>© 2024 Regency Xpress Services</span>
          <div className="flex gap-8 mt-4 md:mt-0">
            <span className="hover:text-regencyBlue cursor-pointer">Privacy</span>
            <span className="hover:text-regencyBlue cursor-pointer">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
