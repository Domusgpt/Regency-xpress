import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

// Brand asset
const LOGO_URL = "https://raw.githubusercontent.com/Domusgpt/Regency-xpress/main/logo.png";

const RegencySymbol = ({ className = "" }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="relative flex items-center justify-center w-10 h-10">
      <div className="absolute w-6 h-6 border-2 border-regencyBlue rounded-tl-xl rounded-br-xl top-0 left-0"></div>
      <div className="absolute w-6 h-6 border-2 border-regencyGold rounded-tr-xl rounded-bl-xl bottom-0 right-0"></div>
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
    title: "Dedicated Transport",
    copy: "Temperature-controlled sprinters engineered for pharmaceuticals, bio-samples, and critical lab logistics.",
    icon: <Icons.Van />,
    badge: "24/7 Fleet",
    image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=3879&auto=format&fit=crop",
  },
  {
    title: "STAT Medical",
    copy: "Immediate response units for organ transport, surgical kits, and time-definite emergency deliveries.",
    icon: <Icons.Timer />,
    badge: "< 90 min launch",
    image: "https://images.unsplash.com/photo-1516574187841-693083f652eb?q=80&w=3870&auto=format&fit=crop",
  },
  {
    title: "Device Installation",
    copy: "White-glove placement for MRI machines, robotics, incubators, and high-value diagnostics.",
    icon: <Icons.MapPin />,
    badge: "Touchpoint crew",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0a4a2b9?q=80&w=3870&auto=format&fit=crop",
  },
];

const flows = [
  {
    title: "Intake",
    copy: "Dispatch triages every order with HIPAA-safe protocols, capturing chain-of-custody metadata in seconds.",
    metric: "0:04 launch",
  },
  {
    title: "Live Visibility",
    copy: "Telematics stream vehicle vitals and geofencing, so clinical teams see heat-mapped progress in real time.",
    metric: "1200 mv signal",
  },
  {
    title: "Clinical Handoff",
    copy: "Crew executes bedside or lab bench transfer with signed verification, temperature trace, and photo proof.",
    metric: "400 mv delta",
  },
  {
    title: "Archive",
    copy: "Delivery is archived into audit-grade reports with SOP alignment for trials, pharmacies, and health systems.",
    metric: "<2 min docs",
  },
];

const palette = [
  { name: "Regency Blue", value: "#255091" },
  { name: "Navy Core", value: "#0B1221" },
  { name: "Regency Gold", value: "#CFB53B" },
  { name: "Fog White", value: "#F4F4F5" },
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
        .fromTo("#hero-grid", { opacity: 0, scale: 0.95 }, { opacity: 0.6, scale: 1, duration: 1 })
        .to("#hero-logo", { y: -60, opacity: 0.3, duration: 1 }, "<")
        .to("#hero-glow", { scale: 1.2, filter: "blur(10px)", duration: 1 }, "<")
        .fromTo("#hero-tag", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");

      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      gsap.from(cards, {
        scrollTrigger: { trigger: "#services-section", start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power2.out",
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
          end: "+=1800",
          scrub: true,
          pin: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".flow-card").forEach((card, index) => {
        flowTl.to(card, { scale: 1, y: 0, opacity: 1, duration: 0.6 }, index === 0 ? 0 : ">-=0.1");
      });

      gsap.to("#about-img-parallax", {
        scrollTrigger: {
          trigger: "#about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -50,
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
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <a href="#hero-section" className="flex items-center gap-3 cursor-pointer group">
          <div className="h-10 w-32 md:w-40">
            <RegencyLogo className="h-full w-full" />
          </div>
        </a>
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-500">
          <a href="#services-section" className="hover:text-regencyBlue transition-colors">Services</a>
          <a href="#flow-section" className="hover:text-regencyBlue transition-colors">Flow</a>
          <a href="#codex-section" className="hover:text-regencyBlue transition-colors">Style Codex</a>
          <a href="#about-section" className="hover:text-regencyBlue transition-colors">Mission</a>
        </div>
        <button className="px-5 py-2 bg-regencyBlue text-white text-xs font-bold uppercase tracking-wider hover:bg-regencyDarkBlue transition-all rounded-sm">
          Portal Login
        </button>
      </nav>

      <section id="hero-section" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
        <div id="hero-glow" className="absolute inset-0 bg-gradient-to-br from-regencyBlue/20 via-regencyGold/10 to-white opacity-80 blur-3xl"></div>
        <div id="hero-grid" className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.04]"></div>
        <div className="absolute -top-24 left-10 w-96 h-96 bg-regencyBlue/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-regencyGold/25 rounded-full blur-[120px]"></div>

        <div id="hero-logo" className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center gap-10 text-center">
          <div className="w-full max-w-[620px] h-auto min-h-[220px] flex items-center justify-center">
            <RegencyLogo />
          </div>
          <p id="hero-tag" className="font-mono text-regencyBlue text-xs md:text-sm tracking-[0.4em] uppercase">Intelligent Medical Logistics</p>
        </div>

        <div id="hero-cta" className="absolute bottom-12 z-20 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest text-gray-500">Scroll to Explore the Cadence</span>
          <div className="w-[1px] h-12 bg-gray-300"></div>
        </div>
      </section>

      <div className="border-y border-gray-100 bg-regencyOffWhite py-4 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] w-max">
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue mb-2">Capabilities</h2>
              <div className="h-1 w-20 bg-regencyGold"></div>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed text-right md:text-left">
              Built around medical urgency, validated by dispatch telemetry, and delivered with composure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <div key={service.title} className={`service-card group relative h-[520px] bg-regencyOffWhite rounded-sm overflow-hidden ${idx === 1 ? "md:-translate-y-12" : ""}`}>
                <div className="absolute inset-0 bg-white/60 group-hover:bg-regencyDarkBlue/90 transition-colors duration-500"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700" style={{ backgroundImage: `url(${service.image})`, backgroundSize: "cover", backgroundPosition: "center" }}></div>

                <div className="absolute inset-0 p-10 flex flex-col justify-between backdrop-blur-[1px]">
                  <div className="flex items-center justify-between text-regencyBlue group-hover:text-regencyGold transition-colors">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1 border border-current rounded-full">{service.badge}</span>
                    {service.icon}
                  </div>

                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-display font-bold text-regencyDarkBlue group-hover:text-white mb-4 leading-tight">{service.title}</h3>
                    <div className="h-[1px] w-full bg-gray-200 group-hover:bg-white/20 mb-4"></div>
                    <p className="text-sm text-gray-600 group-hover:text-gray-200 leading-relaxed mb-6">{service.copy}</p>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-regencyGold opacity-0 group-hover:opacity-100 transition-opacity">
                      Detail sheet <Icons.Arrow />
                    </span>
                  </div>
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
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Medical Units</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">48</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">States Covered</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">24<span className="text-regencyGold">/</span>7</span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Live Dispatch</span>
          </div>
          <div className="flex flex-col border-l border-white/20 pl-6">
            <span className="text-5xl font-display font-bold text-white mb-2">99<span className="text-regencyGold">%</span></span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">On-Time Rate</span>
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
                <span className="text-regencyBlue font-bold tracking-widest uppercase text-xs">Advanced Flow</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue leading-tight">The choreographed dispatch timeline</h2>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed text-right md:text-left">
              Scroll to watch each operational card expand from telemetry capture to clinical handoff.
            </p>
          </div>

          <div className="space-y-8">
            {flows.map((flow, idx) => (
              <div key={flow.title} className="flow-card opacity-20 scale-95 translate-y-10 bg-white/70 backdrop-blur shadow-xl border border-gray-100 rounded-xl p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-regencyBlue mb-4">
                    <span className="px-3 py-1 border border-regencyBlue/30 rounded-full">Phase {idx + 1}</span>
                    <span className="text-gray-400">{flow.metric}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold text-regencyDarkBlue mb-3">{flow.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">{flow.copy}</p>
                </div>
                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-regencyBlue/15 via-regencyGold/10 to-white rounded-lg border border-gray-100 flex items-center justify-center text-regencyBlue font-bold uppercase tracking-widest text-xs">
                  {idx === 1 ? "GSAP STREAM" : "OPS SIGNAL"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-section" className="py-28 px-6 bg-regencyOffWhite relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="w-full md:w-1/2 space-y-8 z-10">
            <div className="flex items-center gap-4">
              <RegencySymbol />
              <span className="text-regencyBlue font-bold tracking-widest uppercase text-sm">The Regency Standard</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue leading-tight">
              Logistics without the <br />
              <span className="text-gray-400 italic">guessing game.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed max-w-md">
              Precision is not optional. We combine state-of-the-art telematics with HIPAA-compliant protocols to ensure every critical shipment arrives intact.
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Clinical Trials</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Biopharma</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">Hospital Systems</span>
              <span className="px-4 py-3 border border-regencyBlue/20 rounded-sm">White Glove</span>
            </div>
            <button className="px-8 py-3 border border-regencyDarkBlue text-regencyDarkBlue hover:bg-regencyDarkBlue hover:text-white transition-all uppercase tracking-widest text-xs font-bold mt-4">
              Our Fleet Technology
            </button>
          </div>

          <div className="w-full md:w-1/2 relative h-[500px]">
            <div className="w-full h-full relative overflow-hidden rounded-lg shadow-2xl">
              <img
                id="about-img-parallax"
                src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=3870&auto=format&fit=crop"
                className="absolute inset-0 w-full h-[120%] object-cover"
                alt="Pharmaceutical Logistics"
              />
              <div className="absolute inset-0 bg-regencyBlue/20 mix-blend-multiply"></div>
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl max-w-xs hidden md:block">
              <p className="font-display font-bold text-xl text-regencyDarkBlue mb-2">"Precision in every mile."</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">- CEO, Regency Xpress</p>
            </div>
          </div>
        </div>
      </section>

      <section id="codex-section" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="flex items-center gap-3">
              <RegencySymbol />
              <span className="text-regencyBlue font-bold tracking-widest uppercase text-xs">Style Codex</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-regencyDarkBlue">Future-facing brand directives</h3>
            <p className="text-gray-600 leading-relaxed">
              Use deep navy for trust, Regency Blue for kinetic highlights, and Gold for surgical accents. Combine Syne display with Inter for clarity.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {palette.map((color) => (
                <div key={color.name} className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                  <div className="h-16" style={{ backgroundColor: color.value }}></div>
                  <div className="p-3 text-xs font-bold uppercase tracking-widest text-gray-600 flex justify-between">
                    <span>{color.name}</span>
                    <span>{color.value}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-xs text-gray-500 uppercase tracking-widest">
              <p>Motion: GSAP ScrollTrigger choreography, staggered cards, parallax imagery.</p>
              <p>Shapes: Thin-line grids, blurred circles, geometric symbol inserts.</p>
              <p>Voice: Clinical, concise, confident.</p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-6 bg-regencyOffWhite border border-gray-100 rounded-xl p-8 shadow-inner">
            <h4 className="text-xl font-display font-bold text-regencyDarkBlue">Asset Set</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> SVG symbol mark for iconography and watermarks.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Gradient glows for hero and section separators.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Card scaffolds (400–1200 mv) that expand under scroll-driven timelines.</li>
              <li className="flex items-start gap-3"><span className="text-regencyGold mt-1">●</span> Glassmorphism nav and buttons for premium signal.</li>
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-regencyBlue">
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
              <span className="text-regencyDarkBlue font-bold uppercase tracking-wider text-xs">Office</span>
              <p className="leading-relaxed">1200 Logistics Way<br />Los Angeles, CA 90021</p>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-regencyDarkBlue font-bold uppercase tracking-wider text-xs">Contact</span>
              <p className="leading-relaxed"><span className="text-regencyBlue font-bold">dispatch@regencyxpress.com</span><br />(800) 555-0199</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 uppercase tracking-widest">
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
