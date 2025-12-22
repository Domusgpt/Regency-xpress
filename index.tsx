import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugin globally
gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// 🚨 PASTE YOUR LOGO LINK HERE 🚨
// 1. Upload logo.png to GitHub.
// 2. Click "Raw" to get the direct link.
// 3. Paste it inside the quotes below.
// ============================================================================
const LOGO_URL: string = ""; 
// Example: "https://raw.githubusercontent.com/yourname/your-repo/main/logo.png"


// --- Brand Logo Component ---
// logic: Tries to load LOGO_URL. If empty or fails, renders professional HTML text.
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

  // Fallback: Professional CSS Typography Version
  // This shows if no URL is provided or the link breaks.
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
       <div className="flex flex-col items-center">
          {/* Symbol Representation */}
          <div className="mb-2 opacity-90">
             <div className="flex items-center gap-1">
                <div className="w-8 h-8 border-2 border-regencyBlue rounded-tl-xl rounded-br-xl"></div>
                <div className="w-8 h-8 border-2 border-regencyGold rounded-tr-xl rounded-bl-xl -ml-4 mt-4"></div>
             </div>
          </div>
          {/* Wordmark */}
          <div className="flex items-baseline gap-2">
             <span className="font-sans font-bold text-2xl md:text-3xl text-regencyGold tracking-tight">Regency</span>
             <span className="font-sans font-bold text-2xl md:text-3xl text-regencyGold tracking-tight">Xpress</span>
          </div>
          <span className="text-[10px] md:text-xs font-bold text-regencyBlue tracking-[0.4em] uppercase mt-1">Services</span>
       </div>
    </div>
  );
};

// SVG Icons (Darker strokes for light theme)
const Icons = {
  Van: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
  ),
  Box: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
  ),
  Timer: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  )
};

const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    if (loading || !mainRef.current) return;
    
    const ctx = gsap.context(() => {
      
      // 1. Hero Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        }
      });

      if (document.getElementById("hero-logo-container")) {
        // Logo Parallax - Moves slightly slower than bg
        tl.to("#hero-logo-container", { scale: 0.9, y: -50, opacity: 0, duration: 1 })
          .to("#hero-bg-img", { scale: 1.1, filter: "blur(4px)", duration: 1 }, "<")
          .fromTo("#hero-cta", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5");
      }

      // 2. Services Entrance
      const cards = gsap.utils.toArray(".service-card");
      gsap.from(cards, {
          scrollTrigger: {
            trigger: "#services-section",
            start: "top 80%",
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out"
      });

      // 3. Stats Count Up
      gsap.from("#stats-grid", {
         scrollTrigger: {
            trigger: "#stats-section",
            start: "top 85%",
         },
         y: 30,
         opacity: 0,
         duration: 1
      });

      // 4. About Parallax
      if (document.getElementById("about-img-parallax")) {
        gsap.to("#about-img-parallax", {
          scrollTrigger: {
            trigger: "#about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: true
          },
          y: -50
        });
      }

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
      
      {/* Navigation - White Glassmorphism */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
        <a href="#hero-section" className="flex items-center gap-3 cursor-pointer group">
          <div className="h-10 w-32 md:w-40">
             <RegencyLogo className="h-full w-full" />
          </div>
        </a>
        
        <div className="hidden md:flex gap-8 text-xs font-bold tracking-widest uppercase text-gray-500">
          <a href="#services-section" className="hover:text-regencyBlue transition-colors">Services</a>
          <a href="#about-section" className="hover:text-regencyBlue transition-colors">Mission</a>
        </div>
        
        <button className="px-5 py-2 bg-regencyBlue text-white text-xs font-bold uppercase tracking-wider hover:bg-regencyDarkBlue transition-all rounded-sm">
          Portal Login
        </button>
      </nav>

      {/* HERO SECTION - BRIGHT & CLEAN */}
      <section id="hero-section" className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
        
        {/* Background - High Key Professional Logistics */}
        <div id="hero-bg-img" className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=3870&auto=format&fit=crop" 
            alt="Logistics Planning" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50"></div>
          {/* Subtle Grid Pattern for Technical Feel */}
          <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.03]"></div>
        </div>

        {/* The Main Event: The Image Logo */}
        <div id="hero-logo-container" className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center">
          <div className="w-full max-w-[600px] h-auto min-h-[200px] flex items-center justify-center">
             <RegencyLogo />
          </div>
          <p className="mt-8 font-mono text-regencyBlue text-xs md:text-sm tracking-[0.4em] uppercase text-center">
             Intelligent Logistics Solutions
          </p>
        </div>

        {/* CTA */}
        <div id="hero-cta" className="absolute bottom-12 z-20 opacity-0 flex flex-col items-center gap-4">
             <a href="#services-section" className="group flex flex-col items-center gap-3 cursor-pointer">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-regencyBlue transition-colors">Scroll to Discover</span>
                <div className="w-[1px] h-12 bg-gray-300 group-hover:bg-regencyBlue transition-colors"></div>
             </a>
        </div>
      </section>

      {/* MARQUEE SECTION - Clean & Technical */}
      <div className="border-y border-gray-100 bg-regencyOffWhite py-4 overflow-hidden">
        <div className="flex gap-12 animate-[marquee_30s_linear_infinite] w-max">
           {[...Array(6)].map((_, i) => (
             <span key={i} className="text-gray-400 font-display font-bold text-xl tracking-wider flex items-center gap-12">
               DEDICATED FLEET <span className="text-regencyGold text-sm">●</span> 
               EXPEDITED GROUND <span className="text-regencyGold text-sm">●</span> 
               NATIONWIDE <span className="text-regencyGold text-sm">●</span>
             </span>
           ))}
        </div>
      </div>

      {/* SERVICES SECTION */}
      <section id="services-section" className="py-32 px-6 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-gray-100 pb-8">
            <div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue mb-2">Our Capabilities</h2>
                <div className="h-1 w-20 bg-regencyGold"></div>
            </div>
            <p className="text-gray-500 max-w-sm text-sm leading-relaxed text-right md:text-left">
                We replace traditional complexity with direct solutions. No hubs, no transfers, just A to B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Service 1: Sprinter */}
            <div className="service-card group relative h-[500px] bg-regencyOffWhite hover:shadow-2xl hover:shadow-regencyBlue/10 transition-all duration-500 rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=3871&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-white group-hover:bg-regencyDarkBlue/90 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-regencyBlue group-hover:text-regencyGold transition-colors">
                     <Icons.Van />
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl font-display font-bold text-regencyDarkBlue group-hover:text-white mb-4">Sprinter<br/>Fleet</h3>
                  <div className="h-[1px] w-full bg-gray-200 group-hover:bg-white/20 mb-4"></div>
                  <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed mb-6">
                    High-roof extended vans designed for palletized freight. The speed of a courier with the capacity of a truck.
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-regencyGold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Specs &rarr;
                  </span>
                </div>
              </div>
            </div>

            {/* Service 2: Expedited */}
            <div className="service-card group relative h-[500px] bg-regencyOffWhite hover:shadow-2xl hover:shadow-regencyBlue/10 transition-all duration-500 rounded-sm overflow-hidden md:-translate-y-12">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?q=80&w=3272&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-white group-hover:bg-regencyDarkBlue/90 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                 <div className="text-regencyBlue group-hover:text-regencyGold transition-colors">
                     <Icons.Timer />
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-display font-bold text-regencyDarkBlue group-hover:text-white mb-4">Time<br/>Critical</h3>
                    <div className="h-[1px] w-full bg-gray-200 group-hover:bg-white/20 mb-4"></div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed mb-6">
                      When "tomorrow" isn't fast enough. Dedicated teams driving non-stop to ensure morning delivery.
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-regencyGold opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More &rarr;
                    </span>
                </div>
              </div>
            </div>

            {/* Service 3: Dedicated */}
            <div className="service-card group relative h-[500px] bg-regencyOffWhite hover:shadow-2xl hover:shadow-regencyBlue/10 transition-all duration-500 rounded-sm overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=3870&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-white group-hover:bg-regencyDarkBlue/90 transition-colors duration-500"></div>
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="text-regencyBlue group-hover:text-regencyGold transition-colors">
                     <Icons.MapPin />
                  </div>
                  
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-display font-bold text-regencyDarkBlue group-hover:text-white mb-4">Final<br/>Mile</h3>
                    <div className="h-[1px] w-full bg-gray-200 group-hover:bg-white/20 mb-4"></div>
                    <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed mb-6">
                      White-glove delivery services for sensitive equipment, medical supplies, and high-value retail.
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-regencyGold opacity-0 group-hover:opacity-100 transition-opacity">
                      Coverage Map &rarr;
                    </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS - Clean Corporate */}
      <section id="stats-section" className="py-24 bg-regencyDarkBlue text-white relative overflow-hidden">
        {/* Abstract shape */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-regencyBlue/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div id="stats-grid" className="max-w-6xl mx-auto px-6 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="flex flex-col border-l border-white/20 pl-6">
              <span className="text-5xl font-display font-bold text-white mb-2">500<span className="text-regencyGold">+</span></span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Active Units</span>
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

      {/* ETHOS / ABOUT */}
      <section id="about-section" className="py-32 px-6 bg-regencyOffWhite relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-20 items-center">
           <div className="w-full md:w-1/2 space-y-8 z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-regencyBlue"></div>
                <span className="text-regencyBlue font-bold tracking-widest uppercase text-sm">The Regency Standard</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold text-regencyDarkBlue leading-tight">
                Logistics without the <br/>
                <span className="text-gray-400 italic">guessing game.</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                We believe in transparency, speed, and absolute reliability. Our fleet is equipped with state-of-the-art telematics, giving you real-time visibility into your critical shipments.
              </p>
              <button className="px-8 py-3 border border-regencyDarkBlue text-regencyDarkBlue hover:bg-regencyDarkBlue hover:text-white transition-all uppercase tracking-widest text-xs font-bold mt-4">
                Our Fleet Technology
              </button>
           </div>
           
           <div className="w-full md:w-1/2 relative h-[500px]">
              <div className="w-full h-full relative overflow-hidden rounded-lg shadow-2xl">
                  <img 
                    id="about-img-parallax"
                    src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=3870&auto=format&fit=crop" 
                    className="absolute inset-0 w-full h-[120%] object-cover"
                    alt="Warehouse Logistics"
                  />
                  <div className="absolute inset-0 bg-regencyBlue/20 mix-blend-multiply"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white p-6 shadow-xl max-w-xs hidden md:block">
                  <p className="font-display font-bold text-xl text-regencyDarkBlue mb-2">"Precision in every mile."</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">- CEO, Regency Xpress</p>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-white pt-24 pb-12 px-6 border-t border-gray-100">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
            <div className="space-y-6">
               <div className="w-32 h-auto">
                   {/* Footer Logo - Same Logic */}
                   <RegencyLogo />
               </div>
               <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                 Regency Xpress Services is a premier logistics provider specializing in expedited ground freight and final mile delivery.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16 text-sm text-gray-500">
               <div className="flex flex-col gap-4">
                 <span className="text-regencyDarkBlue font-bold uppercase tracking-wider text-xs">Office</span>
                 <p className="leading-relaxed">1200 Logistics Way<br/>Los Angeles, CA 90021</p>
               </div>
               <div className="flex flex-col gap-4">
                 <span className="text-regencyDarkBlue font-bold uppercase tracking-wider text-xs">Contact</span>
                 <p className="leading-relaxed"><span className="text-regencyBlue font-bold">dispatch@regencyxpress.com</span><br/>(800) 555-0199</p>
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