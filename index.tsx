import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// LOGO CONFIGURATION - Using dark/transparent logo
// ============================================================================
const LOGO_URL = "https://raw.githubusercontent.com/Domusgpt/Regency-xpress/claude/design-regency-xpress-site-b8R1a/logo-dark.png";

// ============================================================================
// PROFESSIONAL IMAGES - Medical Logistics Focused
// ============================================================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
  fleet: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
  medical: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  delivery: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
  about: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
  // Morphing Section Images
  cargoPlane: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80",
  airportCargo: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=1920&q=80",
  medicalLab: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80",
  hospitalCorridor: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80",
  deliveryVan: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=1920&q=80",
  coldChain: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1920&q=80",
  logistics: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80",
  medicalSupplies: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
};

// ============================================================================
// ICONS
// ============================================================================
const Icons = {
  Van: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Medical: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"/><path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/><path d="M9 16h6"/><path d="M12 13v6"/>
    </svg>
  ),
  Shield: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Clock: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Globe: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
    </svg>
  ),
  Thermometer: ({ className = "w-8 h-8" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  Phone: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  MapPin: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Menu: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
};

// ============================================================================
// LOGO COMPONENT - Uses actual PNG logo with "SERVICES" text overlay
// ============================================================================
type LogoSize = "small" | "default" | "large" | "hero";

const RegencyLogo = ({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: LogoSize;
}) => {
  const sizeClasses: Record<LogoSize, string> = {
    small: "w-28 md:w-32",
    default: "w-44 md:w-52",
    large: "w-60 md:w-80",
    hero: "w-72 md:w-96 lg:w-[28rem]"
  };

  const textSizes: Record<LogoSize, string> = {
    small: "text-[6px] md:text-[7px] tracking-[0.25em]",
    default: "text-[8px] md:text-[9px] tracking-[0.3em]",
    large: "text-[10px] md:text-[12px] tracking-[0.35em]",
    hero: "text-[12px] md:text-[14px] lg:text-[16px] tracking-[0.4em]"
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative">
        {/* PNG Logo - cropped to hide "LOGISTICS" text */}
        <div className="overflow-hidden" style={{ paddingBottom: '0%' }}>
          <img
            src={LOGO_URL}
            alt="Regency Xpress Services"
            className="w-full h-auto object-contain object-top drop-shadow-lg"
            style={{
              clipPath: 'inset(0 0 12% 0)',
              marginBottom: '-12%'
            }}
          />
        </div>
        {/* "SERVICES" text overlay in matching gold color */}
        <div className="w-full text-center" style={{ marginTop: '-2%' }}>
          <span
            className={`font-sans font-normal uppercase ${textSizes[size]}`}
            style={{
              color: '#CFB53B',
              letterSpacing: '0.35em',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            SERVICES
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================
const Navigation = ({ scrolled }: { scrolled: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-2 bg-regencyNavy/95 backdrop-blur-lg shadow-xl shadow-black/20' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-regencyGold/50 rounded-lg" aria-label="Regency Xpress Home">
          <RegencyLogo size="small" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Services", "About", "Metrics", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
               className="relative text-sm font-medium text-white/70 hover:text-regencyGold transition-colors py-2 group focus:outline-none focus:text-regencyGold">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-regencyGold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:1-800-555-0199" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors focus:outline-none focus:text-regencyGold" aria-label="Call us at 1-800-555-0199">
            <Icons.Phone className="w-4 h-4" />
            <span className="hidden lg:inline">(800) 555-0199</span>
          </a>
          <button className="px-5 py-2.5 bg-regencyGold text-regencyNavy font-semibold text-sm rounded-xl hover:bg-regencyGold/90 hover:shadow-xl hover:shadow-regencyGold/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-regencyGold/50 focus:ring-offset-2 focus:ring-offset-regencyNavy">
            Get Quote
          </button>
        </div>

        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-regencyGold/50"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 top-1 w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-5 w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu with animation */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-regencyNavy/98 backdrop-blur-xl border-t border-white/10 overflow-hidden transition-all duration-300 ease-out ${
        mobileOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="py-6 px-4">
          {["Services", "About", "Metrics", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="flex items-center justify-between py-4 text-white/80 hover:text-regencyGold transition-colors border-b border-white/5 last:border-0 group"
              onClick={() => setMobileOpen(false)}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className="text-lg font-medium">{item}</span>
              <Icons.ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-regencyGold" />
            </a>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <a href="tel:1-800-555-0199" className="flex items-center justify-center gap-2 py-3 text-white/70 border border-white/10 rounded-xl hover:border-regencyGold/30 transition-colors">
              <Icons.Phone className="w-4 h-4" />
              <span>(800) 555-0199</span>
            </a>
            <button className="w-full py-3.5 bg-regencyGold text-regencyNavy font-bold rounded-xl hover:bg-regencyGold/90 transition-all">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// ============================================================================
// HERO SECTION - Premium showcase with SVG logo
// ============================================================================
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-regencyNavy">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-regencyNavy via-regencyNavy/95 to-regencyDark z-10" />
      <img src={IMAGES.hero} alt="" className="w-full h-full object-cover opacity-25" />
    </div>

    {/* Animated Background Elements */}
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-regencyBlue/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-regencyGold/15 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-regencyBlue/10 rounded-full blur-[150px] animate-pulse" />
    </div>

    {/* Grid Pattern */}
    <div className="absolute inset-0 z-10 opacity-15">
      <svg className="w-full h-full">
        <pattern id="heroGrid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2B5091" strokeWidth="0.5" opacity="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#heroGrid)" />
      </svg>
    </div>

    {/* Content */}
    <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 text-center pt-16 md:pt-20">
      {/* Logo with Enhanced Glow */}
      <div id="hero-logo" className="mb-6 md:mb-8 relative">
        {/* Multi-layer glow effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-regencyGold/20 rounded-full blur-[100px] animate-pulse" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 md:w-56 md:h-56 bg-regencyBlue/30 rounded-full blur-[60px] animate-float" />
        </div>
        {/* PNG Logo - exact brand logo */}
        <RegencyLogo size="hero" className="relative mx-auto" />
      </div>

      {/* Tagline */}
      <div id="hero-tagline" className="mb-8 md:mb-10">
        <p className="inline-block px-5 py-2.5 rounded-full bg-regencyBlue/20 border border-regencyBlue/30 text-regencyBlue text-xs md:text-sm tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
          Premium Medical Logistics
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Precision in<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold bg-[length:200%_100%] animate-shimmer">
            Every Mile
          </span>
        </h1>
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
          Temperature-controlled transport, STAT delivery, and white-glove service
          for clinical trials, pharmaceuticals, and medical devices.
        </p>
      </div>

      {/* CTA Buttons */}
      <div id="hero-cta" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="group w-full sm:w-auto px-8 py-4 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-regencyGold/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
          Request Quote
          <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="group w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/20 text-white font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300">
          View Services
        </button>
      </div>

      {/* Stats Preview */}
      <div id="hero-stats" className="mt-12 md:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {[
          { value: "500+", label: "Medical Units" },
          { value: "48", label: "States Covered" },
          { value: "24/7", label: "Dispatch" },
          { value: "99%", label: "On-Time" },
        ].map((stat, i) => (
          <div key={i} className="text-center group">
            <div className="text-2xl md:text-3xl font-display font-bold text-regencyGold group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
            <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll Indicator */}
    <div id="scroll-indicator" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] mb-3">Scroll</span>
      <div className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2">
        <div className="w-1.5 h-2.5 bg-regencyGold rounded-full animate-bounce" />
      </div>
    </div>
  </section>
);

// ============================================================================
// MARQUEE SECTION
// ============================================================================
const MarqueeSection = () => (
  <section className="py-4 bg-regencyNavy border-y border-white/10 overflow-hidden">
    <div className="flex animate-marquee">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-8 px-8 whitespace-nowrap">
          {["CLINICAL TRIALS", "STAT DELIVERY", "WHITE GLOVE", "COLD CHAIN", "HIPAA COMPLIANT"].map((text, j) => (
            <span key={j} className="flex items-center gap-8 text-white/30 font-display font-bold text-sm tracking-wider">
              {text}
              <span className="w-1.5 h-1.5 rounded-full bg-regencyGold" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </section>
);

// ============================================================================
// MORPHING EXPERIENCE SECTION - 800vh Scroll-Locked with Smooth Transitions
// ============================================================================
const MorphingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [stateProgress, setStateProgress] = useState(0); // Progress within current state (0-1)
  const [tension, setTension] = useState(0); // Tension level (0-1) as approaching next state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevStateRef = useRef(0);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".morphing-viewport",
        pinSpacing: false,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate which state we're in and progress within that state
          const stateFloat = progress * 5;
          const newState = Math.min(4, Math.floor(stateFloat));
          const progressInState = stateFloat - newState; // 0 to 1 within current state

          setStateProgress(progressInState);

          // Calculate tension - builds up in the last 30% of each state
          const tensionThreshold = 0.7;
          if (progressInState > tensionThreshold && newState < 4) {
            const tensionAmount = (progressInState - tensionThreshold) / (1 - tensionThreshold);
            setTension(tensionAmount);
          } else {
            setTension(0);
          }

          // Detect state transition
          if (newState !== prevStateRef.current) {
            setIsTransitioning(true);
            setTimeout(() => setIsTransitioning(false), 600);
            prevStateRef.current = newState;
          }

          setActiveState(newState);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Parallax offset calculations
  const parallaxSlow = scrollProgress * 100;
  const parallaxMedium = scrollProgress * 200;
  const parallaxFast = scrollProgress * 300;

  // State-specific background images
  const stateImages = [
    IMAGES.cargoPlane,
    IMAGES.airportCargo,
    IMAGES.coldChain,
    IMAGES.hospitalCorridor,
    IMAGES.medicalSupplies,
  ];

  // Calculate smooth opacity for each background layer
  const getLayerOpacity = (layerIndex: number) => {
    const stateFloat = scrollProgress * 5;

    // Current state is fully visible at start, fades out at end
    if (layerIndex === activeState) {
      // Start fading when we're 60% through the state
      if (stateProgress > 0.6 && activeState < 4) {
        return 1 - ((stateProgress - 0.6) / 0.4) * 0.5; // Fade from 1 to 0.5
      }
      return 1;
    }

    // Next state fades in during the last 40% of current state
    if (layerIndex === activeState + 1 && activeState < 4) {
      if (stateProgress > 0.6) {
        return ((stateProgress - 0.6) / 0.4) * 0.6; // Fade from 0 to 0.6
      }
      return 0;
    }

    // Previous state lingers slightly
    if (layerIndex === activeState - 1 && stateProgress < 0.3) {
      return (0.3 - stateProgress) / 0.3 * 0.3; // Fade from 0.3 to 0
    }

    return 0;
  };

  // Calculate the brightness/filter for tension effect
  const getTensionFilter = (layerIndex: number) => {
    if (layerIndex === activeState) {
      const baseBrightness = 0.3;
      const tensionBrightness = baseBrightness - (tension * 0.1); // Gets darker as tension builds
      return `brightness(${tensionBrightness}) saturate(${0.8 + tension * 0.3})`;
    }
    if (layerIndex === activeState + 1) {
      const brightness = 0.3 + (tension * 0.15); // Gets brighter as it approaches
      return `brightness(${brightness}) saturate(${0.8 + tension * 0.2})`;
    }
    return "brightness(0.3) saturate(0.8)";
  };

  return (
    <section ref={sectionRef} id="morphing-section" className="relative" style={{ height: "800vh" }}>
      <div className="morphing-viewport h-screen w-full overflow-hidden sticky top-0 bg-regencyNavy">

        {/* ===== SMOOTH CROSSFADING BACKGROUND LAYERS ===== */}
        {stateImages.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: getLayerOpacity(i),
              transform: `translateY(${(scrollProgress - i * 0.2) * -50}px) scale(${1.1 + scrollProgress * 0.1 + (i === activeState + 1 ? tension * 0.05 : 0)})`,
              transition: 'opacity 0.15s ease-out',
              zIndex: i === activeState ? 2 : i === activeState + 1 ? 1 : 0,
            }}
          >
            <img
              src={img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-300"
              style={{ filter: getTensionFilter(i) }}
            />
          </div>
        ))}

        {/* ===== TENSION VIGNETTE OVERLAY ===== */}
        <div
          className="absolute inset-0 pointer-events-none z-[5] transition-opacity duration-200"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(11,18,33,${0.3 + tension * 0.4}) 100%)`,
            opacity: tension > 0 ? 1 : 0,
          }}
        />

        {/* ===== TRANSITION FLASH EFFECT ===== */}
        <div
          className="absolute inset-0 pointer-events-none z-[6] transition-opacity duration-300"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(207,181,59,0.15) 0%, transparent 70%)',
            opacity: isTransitioning ? 1 : 0,
          }}
        />

        {/* ===== GRADIENT OVERLAYS ===== */}
        <div className="absolute inset-0 bg-gradient-to-b from-regencyNavy/80 via-transparent to-regencyNavy/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-regencyNavy/60 via-transparent to-regencyNavy/60 z-10" />

        {/* ===== TENSION PULSE RING ===== */}
        {tension > 0.3 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[15]">
            <div
              className="rounded-full border-2 border-regencyGold/30"
              style={{
                width: `${200 + tension * 400}px`,
                height: `${200 + tension * 400}px`,
                opacity: tension * 0.5,
                transform: `scale(${1 + tension * 0.3})`,
                transition: 'all 0.2s ease-out',
              }}
            />
          </div>
        )}

        {/* ===== FLOATING PARALLAX ELEMENTS ===== */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {/* Slow layer - large blurred shapes */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[200px] transition-all duration-500"
            style={{
              background: `radial-gradient(circle, rgba(43,80,145,${0.4 + tension * 0.2}) 0%, transparent 70%)`,
              top: "10%",
              left: "-10%",
              transform: `translate(${parallaxSlow * 0.5}px, ${parallaxSlow * 0.3}px) scale(${1 + tension * 0.1})`,
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[180px] transition-all duration-500"
            style={{
              background: `radial-gradient(circle, rgba(207,181,59,${0.3 + tension * 0.3}) 0%, transparent 70%)`,
              bottom: "5%",
              right: "-5%",
              transform: `translate(${-parallaxSlow * 0.4}px, ${-parallaxSlow * 0.2}px) scale(${1 + tension * 0.15})`,
            }}
          />

          {/* Medium layer - geometric shapes with tension rotation */}
          <div
            className="absolute w-32 h-32 border border-regencyGold/20 rotate-45"
            style={{
              top: "20%",
              right: "15%",
              transform: `translate(${-parallaxMedium * 0.3}px, ${parallaxMedium * 0.2}px) rotate(${45 + scrollProgress * 90 + tension * 45}deg)`,
              opacity: 0.6 + tension * 0.3,
              borderColor: `rgba(207,181,59,${0.2 + tension * 0.4})`,
            }}
          />
          <div
            className="absolute w-20 h-20 border border-regencyBlue/30"
            style={{
              bottom: "30%",
              left: "10%",
              transform: `translate(${parallaxMedium * 0.25}px, ${-parallaxMedium * 0.15}px) rotate(${scrollProgress * 60 + tension * 30}deg)`,
              opacity: 0.5 + tension * 0.3,
            }}
          />

          {/* Fast layer - small accent dots with pulse on tension */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: `rgba(207,181,59,${0.4 + tension * 0.4})`,
                top: `${15 + i * 15}%`,
                left: `${10 + i * 15}%`,
                transform: `translate(${parallaxFast * (0.1 + i * 0.05)}px, ${parallaxFast * (0.08 - i * 0.02)}px) scale(${1 + tension * 0.5})`,
                boxShadow: tension > 0.5 ? `0 0 ${10 + tension * 10}px rgba(207,181,59,${tension * 0.5})` : 'none',
              }}
            />
          ))}
        </div>

        {/* ===== ENHANCED PROGRESS INDICATOR ===== */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="relative">
              {/* Background dot */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeState === i
                    ? "bg-regencyGold scale-150 shadow-lg shadow-regencyGold/50"
                    : activeState > i
                      ? "bg-regencyGold/60"
                      : "bg-white/30"
                }`}
              />
              {/* Progress fill for current state */}
              {activeState === i && (
                <div
                  className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-12 h-1 bg-white/10 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-regencyGold rounded-full transition-all duration-100"
                    style={{
                      width: `${stateProgress * 100}%`,
                      boxShadow: tension > 0 ? `0 0 10px rgba(207,181,59,${tension})` : 'none'
                    }}
                  />
                </div>
              )}
              {/* Tension indicator for next state */}
              {i === activeState + 1 && tension > 0 && (
                <div
                  className="absolute inset-0 rounded-full transition-all duration-200"
                  style={{
                    boxShadow: `0 0 ${5 + tension * 15}px rgba(207,181,59,${tension * 0.6})`,
                    transform: `scale(${1 + tension * 0.5})`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ===== SCROLL MOMENTUM INDICATOR ===== */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-2">
          <div
            className="w-1 h-24 bg-white/10 rounded-full overflow-hidden"
            style={{ transform: `scaleY(${1 + tension * 0.3})` }}
          >
            <div
              className="w-full bg-gradient-to-b from-regencyGold to-regencyGold/50 rounded-full transition-all duration-100"
              style={{
                height: `${scrollProgress * 100}%`,
                boxShadow: tension > 0.3 ? `0 0 15px rgba(207,181,59,${tension * 0.8})` : 'none'
              }}
            />
          </div>
          <span className="text-[10px] text-white/40 font-mono">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* ===== STATE 0: Hero Opening ===== */}
        {activeState === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30 animate-fadeIn"
            style={{
              opacity: stateProgress > 0.7 ? 1 - ((stateProgress - 0.7) / 0.3) * 0.4 : 1,
              transform: `scale(${1 - tension * 0.05}) translateY(${tension * -20}px)`,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            {/* Parallax image inset */}
            <div
              className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[40%] max-w-md aspect-[3/4] rounded-2xl overflow-hidden hidden lg:block"
              style={{
                transform: `translateY(calc(-50% + ${parallaxMedium * 0.1}px))`,
              }}
            >
              <img src={IMAGES.cargoPlane} alt="Cargo Aircraft" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-regencyNavy via-regencyNavy/30 to-transparent" />
              {/* Glassmorphism overlay card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <p className="text-white/80 text-sm font-medium">24/7 Airport Operations</p>
                <p className="text-regencyGold text-xs mt-1">Tarmac-ready teams nationwide</p>
              </div>
            </div>

            <div className="text-center max-w-2xl px-6 lg:mr-[30%]">
              <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                <Icons.Globe className="w-10 h-10 text-regencyGold" />
              </div>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                From Runway<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold">to Recovery</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60">Airport to patient. No delays. No excuses.</p>
            </div>
          </div>
        )}

        {/* ===== STATE 1: Four Pillars with Image Cards ===== */}
        {activeState === 1 && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30 animate-fadeIn"
            style={{
              opacity: stateProgress > 0.7 ? 1 - ((stateProgress - 0.7) / 0.3) * 0.4 : 1,
              transform: `scale(${1 - tension * 0.05}) translateY(${tension * -20}px)`,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <div className="max-w-6xl mx-auto px-6 w-full">
              <h3 className="text-center text-xs text-regencyGold tracking-[0.3em] uppercase mb-10">Our Pillars</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { num: "01", title: "Direct Routes", desc: "Airport to final mile", img: IMAGES.airportCargo },
                  { num: "02", title: "Chain of Custody", desc: "Documented every step", img: IMAGES.logistics },
                  { num: "03", title: "Temp Control", desc: "Maintained in transit", img: IMAGES.coldChain },
                  { num: "04", title: "Priority", desc: "Medical cargo first", img: IMAGES.medicalSupplies },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-regencyGold/40 transition-all duration-500"
                    style={{
                      transform: `translateY(${(parallaxMedium * 0.05) * (i % 2 === 0 ? 1 : -1)}px) scale(${1 + tension * 0.02 * (i % 2 === 0 ? 1 : -1)})`,
                      borderColor: tension > 0.5 ? `rgba(207,181,59,${tension * 0.3})` : undefined,
                    }}
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500">
                      <img src={item.img} alt="" loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-regencyNavy via-regencyNavy/80 to-regencyNavy/40" />

                    {/* Content */}
                    <div className="relative p-6 h-full flex flex-col justify-end min-h-[200px]">
                      <span className="text-regencyGold/50 text-xs font-mono mb-2">{item.num}</span>
                      <h4 className="text-lg md:text-xl font-display font-bold text-white mb-1 group-hover:text-regencyGold transition-colors">{item.title}</h4>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== STATE 2: Philosophy with Cinematic Background ===== */}
        {activeState === 2 && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30 animate-fadeIn"
            style={{
              opacity: stateProgress > 0.7 ? 1 - ((stateProgress - 0.7) / 0.3) * 0.4 : 1,
              transform: `scale(${1 - tension * 0.05}) translateY(${tension * -20}px)`,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            {/* Side image panels with parallax */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1/4 overflow-hidden hidden lg:block"
              style={{
                transform: `translateX(${-parallaxSlow * 0.2 - tension * 30}px)`,
                opacity: 0.4 - tension * 0.2,
              }}
            >
              <img src={IMAGES.deliveryVan} alt="" loading="lazy" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-regencyNavy" />
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-1/4 overflow-hidden hidden lg:block"
              style={{
                transform: `translateX(${parallaxSlow * 0.2 + tension * 30}px)`,
                opacity: 0.4 - tension * 0.2,
              }}
            >
              <img src={IMAGES.hospitalCorridor} alt="" loading="lazy" className="w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-regencyNavy" />
            </div>

            <div className="text-center max-w-3xl px-6">
              {/* Glassmorphism quote card */}
              <div
                className="relative p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10"
                style={{
                  boxShadow: tension > 0.3 ? `0 0 ${30 + tension * 40}px rgba(207,181,59,${tension * 0.2})` : 'none',
                  borderColor: tension > 0.5 ? `rgba(207,181,59,${tension * 0.3})` : undefined,
                }}
              >
                <span className="absolute -top-6 left-8 text-8xl md:text-9xl font-display text-regencyGold/30 leading-none">"</span>
                <p className="text-2xl md:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
                  When it lands, we're already there.
                </p>
                <span className="absolute -bottom-6 right-8 text-8xl md:text-9xl font-display text-regencyGold/30 leading-none rotate-180">"</span>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-regencyGold text-sm tracking-[0.2em] uppercase">— The Regency Promise</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== STATE 3: Journey with Image Grid ===== */}
        {activeState === 3 && (
          <div
            className="absolute inset-0 flex items-center justify-center z-30 animate-fadeIn"
            style={{
              opacity: stateProgress > 0.7 ? 1 - ((stateProgress - 0.7) / 0.3) * 0.4 : 1,
              transform: `scale(${1 - tension * 0.05}) translateY(${tension * -20}px)`,
              transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
            }}
          >
            <div className="max-w-5xl mx-auto px-6 w-full">
              <h3 className="text-center text-xs text-regencyGold tracking-[0.3em] uppercase mb-10">The Full Journey</h3>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Icons.Globe, title: "Airport Coordination", desc: "Tarmac-ready teams at major hubs", img: IMAGES.cargoPlane },
                  { icon: Icons.Thermometer, title: "Cold Chain", desc: "2-8°C maintained throughout", img: IMAGES.coldChain },
                  { icon: Icons.Van, title: "Express Fleet", desc: "GPS-tracked medical vehicles", img: IMAGES.deliveryVan },
                  { icon: Icons.Medical, title: "Hospital Delivery", desc: "Direct to facility dock", img: IMAGES.hospitalCorridor },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden"
                    style={{
                      transform: `translateY(${(parallaxMedium * 0.03) * (i < 2 ? 1 : -1)}px) scale(${1 + tension * 0.02 * (i % 2 === 0 ? 1 : -1)})`,
                      transition: 'transform 0.2s ease-out',
                    }}
                  >
                    {/* Full image background */}
                    <div className="absolute inset-0">
                      <img src={item.img} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-regencyNavy via-regencyNavy/70 to-transparent" />

                    {/* Glassmorphism content card */}
                    <div className="relative p-6 min-h-[220px] md:min-h-[280px] flex flex-col justify-end">
                      <div
                        className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-white/15 transition-all duration-300"
                        style={{
                          boxShadow: tension > 0.5 ? `0 0 ${20 + tension * 20}px rgba(207,181,59,${tension * 0.15})` : 'none',
                        }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-lg bg-regencyGold/20 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-regencyGold" />
                          </div>
                          <h4 className="text-base md:text-lg font-display font-bold text-white">{item.title}</h4>
                        </div>
                        <p className="text-white/60 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== STATE 4: Final CTA with Premium Feel ===== */}
        {activeState === 4 && (
          <div className="absolute inset-0 flex items-center justify-center z-30 animate-fadeIn">
            {/* Floating image elements */}
            <div
              className="absolute left-[5%] top-[20%] w-48 h-64 rounded-2xl overflow-hidden opacity-60 hidden lg:block"
              style={{ transform: `translateY(${parallaxMedium * 0.1}px) rotate(-6deg)` }}
            >
              <img src={IMAGES.medicalLab} alt="" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-regencyNavy/40" />
            </div>
            <div
              className="absolute right-[5%] bottom-[20%] w-40 h-56 rounded-2xl overflow-hidden opacity-60 hidden lg:block"
              style={{ transform: `translateY(${-parallaxMedium * 0.08}px) rotate(6deg)` }}
            >
              <img src={IMAGES.medicalSupplies} alt="" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-regencyNavy/40" />
            </div>

            <div className="text-center max-w-2xl px-6">
              {/* Glassmorphism CTA card */}
              <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
                <RegencyLogo size="large" className="mx-auto mb-8" />
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  Your cargo.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold">Our priority.</span>
                </h2>
                <p className="text-white/50 mb-8">Experience the Regency difference.</p>
                <button className="group px-8 py-4 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-2xl hover:shadow-regencyGold/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto">
                  Get Started Today
                  <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===== ENHANCED SCROLL HINT WITH TENSION ===== */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center z-40">
          <span
            className="text-[10px] uppercase tracking-[0.25em] transition-all duration-200"
            style={{
              color: tension > 0.5 ? `rgba(207,181,59,${0.4 + tension * 0.4})` : 'rgba(255,255,255,0.4)',
            }}
          >
            {activeState < 4
              ? tension > 0.7
                ? "Almost there..."
                : tension > 0.3
                  ? "Keep going"
                  : "Keep scrolling"
              : "Continue below"}
          </span>
          <div
            className="mt-2 w-px mx-auto transition-all duration-200"
            style={{
              height: `${32 + tension * 16}px`,
              background: tension > 0.3
                ? `linear-gradient(to bottom, rgba(207,181,59,${0.3 + tension * 0.5}), transparent)`
                : 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
            }}
          />
          {/* Pulsing dot at bottom when high tension */}
          {tension > 0.6 && (
            <div
              className="w-2 h-2 rounded-full bg-regencyGold mx-auto mt-1 animate-pulse"
              style={{
                opacity: tension,
                boxShadow: `0 0 ${10 + tension * 10}px rgba(207,181,59,${tension * 0.6})`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SERVICES SECTION
// ============================================================================
const services = [
  {
    icon: Icons.Van,
    title: "Dedicated Fleet",
    subtitle: "Temperature Controlled",
    description: "Purpose-built vehicles with real-time monitoring for pharmaceuticals, biologics, and clinical trial materials.",
    features: ["GPS Tracking", "Temp Logs", "Chain of Custody"],
    image: IMAGES.fleet
  },
  {
    icon: Icons.Clock,
    title: "STAT Medical",
    subtitle: "Emergency Response",
    description: "24/7 immediate dispatch for organ transport, surgical kits, and time-critical medical deliveries.",
    features: ["60 Min Response", "24/7 Dispatch", "Priority Routing"],
    image: IMAGES.medical
  },
  {
    icon: Icons.Shield,
    title: "White Glove",
    subtitle: "Premium Handling",
    description: "Specialized delivery and installation for MRI machines, diagnostic equipment, and medical robotics.",
    features: ["Inside Delivery", "Installation", "Setup"],
    image: IMAGES.warehouse
  },
  {
    icon: Icons.Globe,
    title: "Nationwide",
    subtitle: "Coast to Coast",
    description: "Comprehensive logistics network spanning all 48 continental states with strategic hub locations.",
    features: ["48 States", "Same Day", "Cross-Docking"],
    image: IMAGES.delivery
  }
];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-32 bg-regencyDark relative overflow-hidden">
    {/* Parallax background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-0 w-96 h-96 bg-regencyBlue/10 rounded-full blur-[150px] animate-float" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-regencyGold/10 rounded-full blur-[120px] animate-float-delayed" />
    </div>

    {/* Subtle grid overlay */}
    <div className="absolute inset-0 opacity-[0.03]">
      <svg className="w-full h-full">
        <pattern id="serviceGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#CFB53B" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#serviceGrid)" />
      </svg>
    </div>

    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="services-header text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-regencyGold/10 backdrop-blur-sm text-regencyGold text-xs tracking-[0.2em] uppercase mb-4 border border-regencyGold/20">
          Our Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
          Specialized Medical<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold bg-[length:200%_100%] animate-shimmer">
            Service Solutions
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Behind every shipment is a patient waiting. We understand the stakes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="service-card group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-regencyGold/50 transition-all duration-500 transform-gpu">
            {/* Card Glow Effect */}
            <div className="card-glow absolute inset-0 opacity-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-regencyGold/20 via-transparent to-regencyBlue/20 blur-xl" />
            </div>

            {/* Background Image with parallax hover */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-700 group-hover:scale-110">
              <img src={service.image} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-regencyDark via-regencyDark/90 to-regencyDark/70" />

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-regencyGold/50 via-regencyBlue/50 to-regencyGold/50 bg-[length:200%_100%] animate-shimmer" style={{ padding: '1px' }}>
                <div className="w-full h-full rounded-2xl bg-regencyDark/95" />
              </div>
            </div>

            <div className="relative p-6 md:p-8 z-10">
              {/* Glassmorphism icon container */}
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-regencyGold mb-6 group-hover:scale-110 group-hover:bg-regencyGold/20 group-hover:shadow-xl group-hover:shadow-regencyGold/20 transition-all duration-300">
                <service.icon className="w-8 h-8 group-hover:animate-pulse" />
              </div>

              {/* Content */}
              <span className="text-regencyBlue text-xs font-semibold tracking-widest uppercase">{service.subtitle}</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1 mb-3 group-hover:text-regencyGold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Glassmorphism feature tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/70 border border-white/10 hover:border-regencyGold/40 hover:text-regencyGold hover:bg-regencyGold/10 transition-all duration-300 cursor-default">
                    {feature}
                  </span>
                ))}
              </div>

              {/* CTA with animated arrow */}
              <a href="#contact" className="inline-flex items-center gap-2 text-regencyGold text-sm font-medium hover:gap-4 transition-all duration-300 group/link">
                Learn More
                <Icons.ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// STATS SECTION
// ============================================================================
const StatsSection = () => (
  <section id="metrics" className="py-20 md:py-32 bg-gradient-to-b from-regencyDark via-regencyNavy/50 to-regencyDark relative overflow-hidden">
    {/* Animated background particles */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-regencyBlue/15 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-regencyGold/10 rounded-full blur-[100px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-regencyBlue/5 rounded-full blur-[150px]" />
    </div>

    {/* Subtle radial gradient overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,11,0.8)_100%)]" />

    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-regencyBlue/10 backdrop-blur-sm text-regencyBlue text-xs tracking-[0.2em] uppercase mb-4 border border-regencyBlue/20">
          By the Numbers
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
          Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyBlue via-cyan-400 to-regencyBlue bg-[length:200%_100%] animate-shimmer">Metrics</span>
        </h2>
      </div>

      <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { value: 500, suffix: "+", label: "Medical Units", desc: "Active fleet", color: "regencyGold" },
          { value: 48, suffix: "", label: "States", desc: "Nationwide coverage", color: "regencyBlue" },
          { value: 24, suffix: "/7", label: "Dispatch", desc: "Always available", color: "regencyGold" },
          { value: 99, suffix: "%", label: "On-Time", desc: "Industry leading", color: "regencyBlue" },
        ].map((stat, i) => (
          <div key={i} className="stat-item group relative text-center p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-regencyGold/40 transition-all duration-500 transform-gpu hover:scale-105 overflow-hidden">
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color === 'regencyGold' ? 'from-regencyGold/10' : 'from-regencyBlue/10'} via-transparent to-transparent`} />
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className={`absolute inset-0 ${stat.color === 'regencyGold' ? 'bg-regencyGold/5' : 'bg-regencyBlue/5'} blur-2xl`} />
            </div>

            <div className="relative z-10">
              {/* Number display with glassmorphism container */}
              <div className="inline-flex items-baseline justify-center gap-1 mb-3 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <span className="stat-value text-3xl md:text-5xl font-display font-bold text-white" data-value={stat.value}>
                  {stat.value}
                </span>
                <span className={`text-xl md:text-3xl font-display font-bold ${stat.color === 'regencyGold' ? 'text-regencyGold' : 'text-regencyBlue'}`}>{stat.suffix}</span>
              </div>
              <span className="text-white font-semibold block group-hover:text-regencyGold transition-colors duration-300 text-sm md:text-base">{stat.label}</span>
              <span className="text-white/40 text-xs md:text-sm">{stat.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ============================================================================
// ABOUT SECTION
// ============================================================================
const AboutSection = () => (
  <section id="about" className="py-20 md:py-32 bg-regencyDark relative overflow-hidden">
    {/* Parallax background elements */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-regencyGold/5 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-regencyBlue/8 rounded-full blur-[150px]" />
    </div>

    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="about-content">
          <span className="inline-block px-4 py-2 rounded-full bg-regencyGold/10 backdrop-blur-sm text-regencyGold text-xs tracking-[0.2em] uppercase mb-6 border border-regencyGold/20">
            The Regency Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Logistics Without<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-white/30">The Guessing Game</span>
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              In medical logistics, precision is not optional. Every temperature deviation,
              every delayed shipment puts patient outcomes at risk.
            </p>
            <p>
              We combine state-of-the-art telematics with HIPAA-compliant protocols to ensure
              the integrity of every critical shipment.
            </p>
          </div>

          {/* Glassmorphism feature grid */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { icon: Icons.Shield, text: "HIPAA Compliant" },
              { icon: Icons.Thermometer, text: "Cold Chain" },
              { icon: Icons.Clock, text: "Real-Time Tracking" },
              { icon: Icons.Medical, text: "FDA Registered" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-regencyGold/30 hover:bg-white/10 transition-all duration-300 group">
                <div className="w-8 h-8 rounded-lg bg-regencyGold/10 flex items-center justify-center group-hover:bg-regencyGold/20 transition-colors">
                  <item.icon className="w-4 h-4 text-regencyGold" />
                </div>
                <span className="text-sm text-white/80 group-hover:text-white transition-colors">{item.text}</span>
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 bg-white/5 backdrop-blur-sm border border-regencyGold/50 text-regencyGold font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-regencyGold hover:text-regencyNavy hover:shadow-xl hover:shadow-regencyGold/20 transition-all duration-300">
            Our Technology
          </button>
        </div>

        <div className="about-image relative">
          {/* Main image with parallax frame */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden group">
            <img src={IMAGES.about} alt="Medical Logistics" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-regencyDark via-regencyDark/30 to-transparent" />

            {/* Decorative frame elements */}
            <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-regencyGold/40" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-regencyGold/40" />
          </div>

          {/* Floating glassmorphism card */}
          <div className="absolute -bottom-6 -left-6 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 max-w-[220px] hidden md:block shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-regencyGold/20 flex items-center justify-center">
                <Icons.Shield className="w-5 h-5 text-regencyGold" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-base">99.9%</p>
                <p className="text-white/50 text-xs">On-Time Delivery</p>
              </div>
            </div>
            <p className="text-white/60 text-sm italic">"Precision in every mile."</p>
          </div>

          {/* Secondary floating element */}
          <div className="absolute -top-4 -right-4 p-3 rounded-xl bg-regencyGold/10 backdrop-blur-md border border-regencyGold/30 hidden lg:block">
            <Icons.Van className="w-6 h-6 text-regencyGold" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================================
// CTA SECTION
// ============================================================================
const CTASection = () => (
  <section id="cta-section" className="py-20 md:py-32 bg-gradient-to-br from-regencyNavy via-regencyBlue/20 to-regencyNavy relative overflow-hidden">
    {/* Animated grid background */}
    <div className="absolute inset-0 opacity-10">
      <svg className="w-full h-full">
        <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CFB53B" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#ctaGrid)" />
      </svg>
    </div>

    {/* Floating orbs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-regencyGold/15 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-regencyBlue/15 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-regencyGold/5 rounded-full blur-[150px]" />
    </div>

    <div id="cta-content" className="relative z-10 max-w-4xl mx-auto px-4 md:px-6">
      {/* Glassmorphism card */}
      <div className="p-8 md:p-12 lg:p-16 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-center relative overflow-hidden">
        {/* Inner glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-regencyGold/20 rounded-full blur-[80px]" />

        <div className="relative z-10">
          {/* Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-regencyGold/10 backdrop-blur-sm text-regencyGold text-xs tracking-[0.2em] uppercase mb-6 border border-regencyGold/20">
            Ready to Transform Your Logistics?
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Let's Move Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold bg-[length:200%_100%] animate-shimmer">
              Critical Cargo
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl mx-auto leading-relaxed">
            Experience the gold standard in medical logistics. Our team is ready to deliver precision, reliability, and excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded-xl hover:shadow-2xl hover:shadow-regencyGold/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-regencyGold/50 focus:ring-offset-2 focus:ring-offset-regencyNavy">
              Request a Quote
              <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="tel:1-800-555-0199" className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-medium text-sm uppercase tracking-wider rounded-xl hover:bg-white/10 hover:border-regencyGold/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-white/30">
              <Icons.Phone className="w-4 h-4 text-regencyGold" />
              (800) 555-0199
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-white/40 text-xs">
            {["HIPAA Compliant", "24/7 Support", "Nationwide Coverage", "FDA Registered"].map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-regencyGold" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="pt-16 pb-8 bg-regencyNavy relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-regencyBlue/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-regencyGold/5 rounded-full blur-[120px]" />
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-regencyGold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <RegencyLogo size="default" className="mb-6" />
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
              Premier logistics provider specializing in expedited medical freight,
              pharmaceutical transport, and white-glove delivery solutions nationwide.
            </p>
            {/* Social links placeholder */}
            <div className="flex gap-3">
              {["LinkedIn", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={`Follow us on ${social}`}
                  className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:text-regencyGold hover:border-regencyGold/30 hover:bg-regencyGold/10 transition-all duration-300"
                >
                  <span className="text-xs font-medium">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {["Dedicated Fleet", "STAT Medical", "White Glove", "Nationwide"].map((item, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/50 hover:text-regencyGold text-sm transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-regencyGold/50 group-hover:bg-regencyGold transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/50 text-sm group hover:text-white/70 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-regencyGold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-regencyGold/20 transition-colors">
                    <Icons.MapPin className="w-4 h-4 text-regencyGold" />
                  </div>
                  <span>1200 Logistics Way<br />Los Angeles, CA 90021</span>
                </a>
              </li>
              <li>
                <a href="tel:1-800-555-0199" className="flex items-center gap-3 text-white/50 text-sm group hover:text-white/70 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-regencyGold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-regencyGold/20 transition-colors">
                    <Icons.Phone className="w-4 h-4 text-regencyGold" />
                  </div>
                  <span>(800) 555-0199</span>
                </a>
              </li>
              <li>
                <a href="mailto:dispatch@regencyxpress.com" className="flex items-center gap-3 text-white/50 text-sm group hover:text-white/70 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-regencyGold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-regencyGold/20 transition-colors">
                    <Icons.Mail className="w-4 h-4 text-regencyGold" />
                  </div>
                  <span>dispatch@regencyxpress.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white/30 text-xs">&copy; {currentYear} Regency Xpress Services. All rights reserved.</span>
          <div className="flex gap-6 text-white/30 text-xs">
            <a href="#" className="hover:text-regencyGold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-regencyGold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-regencyGold transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// LOADING SCREEN - Premium animated intro
// ============================================================================
const LoadingScreen = ({ progress }: { progress: number }) => (
  <div className="fixed inset-0 z-[100] bg-regencyNavy flex flex-col items-center justify-center overflow-hidden">
    {/* Animated background orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-regencyBlue/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-regencyGold/15 rounded-full blur-[80px] animate-float-delayed" />
    </div>

    {/* Logo with glow */}
    <div className="relative mb-10">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 bg-regencyGold/25 rounded-full blur-[60px] animate-pulse" />
      </div>
      <div className="relative w-56 md:w-72">
        <img
          src={LOGO_URL}
          alt="Regency Xpress Logistics"
          className="w-full h-auto object-contain drop-shadow-lg animate-pulse"
        />
      </div>
    </div>

    {/* Progress bar */}
    <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-regencyBlue via-regencyGold to-regencyBlue bg-[length:200%_100%] animate-shimmer rounded-full transition-all duration-300 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
    <span className="mt-4 text-white/50 text-xs uppercase tracking-[0.3em] font-light">Loading</span>
  </div>
);

// ============================================================================
// MAIN APP
// ============================================================================
const App = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    if (loading || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // ========== HERO INTRO - Choreographed entrance ==========
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from("#hero-logo", {
          y: 60,
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "elastic.out(1, 0.8)"
        })
        .from("#hero-tagline p:first-child", {
          y: 30,
          opacity: 0,
          duration: 0.6
        }, "-=0.6")
        .from("#hero-tagline h1", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out"
        }, "-=0.4")
        .from("#hero-tagline p:last-child", {
          y: 20,
          opacity: 0,
          duration: 0.5
        }, "-=0.4")
        .from("#hero-cta > *", {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, "-=0.3")
        .from("#hero-stats > *", {
          y: 20,
          opacity: 0,
          stagger: 0.06,
          duration: 0.4
        }, "-=0.2")
        .from("#scroll-indicator", {
          opacity: 0,
          y: 20,
          duration: 0.5
        }, "-=0.1");

      // ========== HERO PARALLAX - Multi-layer depth ==========
      gsap.timeline({
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 }
      })
        .to("#hero-logo", { y: -100, scale: 0.9, ease: "none" })
        .to("#hero-tagline", { y: -60, ease: "none" }, "<")
        .to("#hero-cta", { y: -30, ease: "none" }, "<")
        .to("#hero-stats", { y: -15, opacity: 0.5, ease: "none" }, "<")
        .to("#scroll-indicator", { opacity: 0, y: -20 }, "<");

      // ========== SERVICES - Staggered card reveal ==========
      gsap.set(".services-header", { opacity: 1 });
      gsap.set(".service-card", { opacity: 1 });

      // Header entrance with text split effect
      ScrollTrigger.create({
        trigger: "#services",
        start: "top 90%",
        onEnter: () => {
          gsap.from(".services-header span", {
            y: -20,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          gsap.from(".services-header h2", {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.1
          });
          gsap.from(".services-header p", {
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: 0.2
          });
        },
        once: true
      });

      // Cards with staggered 3D entrance
      ScrollTrigger.create({
        trigger: "#services .grid",
        start: "top 85%",
        onEnter: () => {
          gsap.from(".service-card", {
            y: 60,
            opacity: 0,
            scale: 0.95,
            rotationX: 10,
            stagger: {
              each: 0.15,
              from: "start"
            },
            duration: 0.7,
            ease: "power3.out"
          });
        },
        once: true
      });

      // ========== STATS - Counter animation with entrance ==========
      gsap.set(".stat-item", { opacity: 1 });

      ScrollTrigger.create({
        trigger: "#metrics",
        start: "top 85%",
        onEnter: () => {
          // Entrance animation
          gsap.from(".stat-item", {
            y: 40,
            opacity: 0,
            scale: 0.9,
            stagger: 0.1,
            duration: 0.6,
            ease: "back.out(1.4)"
          });

          // Counter animation
          document.querySelectorAll('.stat-value').forEach((el) => {
            const target = parseInt(el.getAttribute('data-value') || '0');
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2,
              delay: 0.3,
              ease: "power2.out",
              onUpdate: () => {
                (el as HTMLElement).textContent = String(Math.round(obj.val));
              }
            });
          });
        },
        once: true
      });

      // ========== ABOUT - Split screen reveal ==========
      gsap.set(".about-content", { opacity: 1 });
      gsap.set(".about-image", { opacity: 1 });

      ScrollTrigger.create({
        trigger: "#about",
        start: "top 80%",
        onEnter: () => {
          gsap.from(".about-content", {
            x: -60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          });
          gsap.from(".about-content > *", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out"
          });
          gsap.from(".about-image", {
            x: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
          });
          gsap.from(".about-image > div:last-child", {
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: 0.4
          });
        },
        once: true
      });

      // ========== CTA - Scrubbed parallax ==========
      gsap.timeline({
        scrollTrigger: {
          trigger: "#cta-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })
        .from("#cta-content", { y: 60, ease: "none" })
        .to("#cta-content", { y: -40, ease: "none" });

      // ========== FOOTER - Staggered links ==========
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 90%",
        onEnter: () => {
          gsap.from("#contact > div > div", {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5
          });
        },
        once: true
      });

      // ========== INTERACTIVE CARD EFFECTS ==========
      document.querySelectorAll('.service-card').forEach((card) => {
        const cardEl = card as HTMLElement;

        cardEl.addEventListener('mouseenter', () => {
          gsap.to(cardEl, {
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "0 20px 40px rgba(207,181,59,0.15)"
          });
          gsap.to(cardEl.querySelector('.card-glow'), {
            opacity: 1,
            duration: 0.3
          });
        });

        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            boxShadow: "none"
          });
          gsap.to(cardEl.querySelector('.card-glow'), {
            opacity: 0,
            duration: 0.3
          });
        });
      });

      // ========== MAGNETIC BUTTON EFFECT ==========
      document.querySelectorAll('button, .magnetic-btn').forEach((btn) => {
        const btnEl = btn as HTMLElement;

        btnEl.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = btnEl.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btnEl, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        btnEl.addEventListener('mouseleave', () => {
          gsap.to(btnEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)"
          });
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) return <LoadingScreen progress={loadProgress} />;

  return (
    <div ref={mainRef} className="min-h-screen bg-regencyDark text-white">
      <Navigation scrolled={scrolled} />
      <main>
        <HeroSection />
        <MarqueeSection />
        <MorphingSection />
        <ServicesSection />
        <StatsSection />
        <AboutSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

// ============================================================================
// RENDER
// ============================================================================
createRoot(document.getElementById('root')!).render(<App />);
