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
// ANIMATED BULL LOGO SVG - Precise geometric design matching the logo
// ============================================================================
const AnimatedBullLogo = ({ className = "", animate = false, showText = true }: { className?: string; animate?: boolean; showText?: boolean }) => (
  <svg viewBox={showText ? "0 0 240 200" : "0 0 240 150"} className={className}>
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#CFB53B"/>
        <stop offset="50%" stopColor="#E8D378"/>
        <stop offset="100%" stopColor="#CFB53B"/>
      </linearGradient>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2B5091"/>
        <stop offset="100%" stopColor="#1E3A6B"/>
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <filter id="glowStrong" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g fill="none" stroke="#2B5091" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
       className={animate ? "animate-pulse" : ""} filter={animate ? "url(#glowStrong)" : undefined}
       transform="translate(20, 5)">
      {/* LEFT HORN - outer */}
      <path d="M25 60 L50 10 L75 55"/>
      {/* LEFT HORN - inner panels */}
      <path d="M50 10 L58 32 L75 55"/>
      <path d="M35 45 L58 32"/>
      <path d="M50 10 L42 35"/>

      {/* RIGHT HORN - outer */}
      <path d="M175 60 L150 10 L125 55"/>
      {/* RIGHT HORN - inner panels */}
      <path d="M150 10 L142 32 L125 55"/>
      <path d="M165 45 L142 32"/>
      <path d="M150 10 L158 35"/>

      {/* HEAD TOP FRAME */}
      <path d="M75 55 L85 48 L100 58 L115 48 L125 55"/>

      {/* LEFT CHEEK PANELS */}
      <path d="M75 55 L60 65 L52 90 L65 110"/>
      <path d="M60 65 L78 72"/>
      <path d="M52 90 L75 88"/>
      <path d="M25 60 L35 65 L38 85"/>
      <path d="M35 65 L60 65"/>
      <path d="M38 85 L52 90"/>

      {/* RIGHT CHEEK PANELS */}
      <path d="M125 55 L140 65 L148 90 L135 110"/>
      <path d="M140 65 L122 72"/>
      <path d="M148 90 L125 88"/>
      <path d="M175 60 L165 65 L162 85"/>
      <path d="M165 65 L140 65"/>
      <path d="M162 85 L148 90"/>

      {/* FOREHEAD INNER STRUCTURE */}
      <path d="M85 48 L85 72 L75 88"/>
      <path d="M115 48 L115 72 L125 88"/>
      <path d="M100 58 L100 75"/>
      <path d="M85 60 L95 72 L100 68 L105 72 L115 60"/>

      {/* SNOUT / NOSE FRAME */}
      <path d="M75 88 L80 108 L100 125 L120 108 L125 88"/>
      <path d="M65 110 L80 108"/>
      <path d="M135 110 L120 108"/>

      {/* NOSE DETAIL - inner bridge */}
      <path d="M88 90 L92 105 L100 112 L108 105 L112 90"/>
      <path d="M80 108 L92 105"/>
      <path d="M120 108 L108 105"/>

      {/* NOSTRILS */}
      <circle cx="92" cy="115" r="5" fill="#2B5091" stroke="none"/>
      <circle cx="108" cy="115" r="5" fill="#2B5091" stroke="none"/>

      {/* EYES - small triangular marks */}
      <path d="M82 82 L88 90 L94 82" fill="#2B5091" stroke="none"/>
      <path d="M106 82 L112 90 L118 82" fill="#2B5091" stroke="none"/>
    </g>

    {/* Text below logo - styled to match */}
    {showText && (
      <g>
        <text x="120" y="165" textAnchor="middle" fill="#CFB53B" fontFamily="'Georgia', 'Times New Roman', serif" fontWeight="bold" fontSize="26" fontStyle="italic">
          Regency Xpress
        </text>
        <text x="120" y="188" textAnchor="middle" fill="#CFB53B" fontFamily="'Arial', sans-serif" fontWeight="400" fontSize="11" letterSpacing="10">
          LOGISTICS
        </text>
      </g>
    )}
  </svg>
);

// ============================================================================
// LOGO COMPONENT - Uses actual PNG logo
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

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img
        src={LOGO_URL}
        alt="Regency Xpress Logistics"
        className="w-full h-auto object-contain drop-shadow-lg"
      />
    </div>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================
const Navigation = ({ scrolled }: { scrolled: boolean }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-2 bg-regencyNavy/95 backdrop-blur-lg shadow-lg' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex-shrink-0">
          <RegencyLogo size="small" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {["Services", "About", "Metrics", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
               className="text-sm font-medium text-white/70 hover:text-regencyGold transition-colors">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a href="tel:1-800-555-0199" className="flex items-center gap-2 text-sm text-white/70 hover:text-white">
            <Icons.Phone className="w-4 h-4" />
            <span className="hidden lg:inline">1-800-555-0199</span>
          </a>
          <button className="px-5 py-2 bg-regencyGold text-regencyNavy font-semibold text-sm rounded-lg hover:bg-regencyGold/90 transition-all shadow-lg shadow-regencyGold/20">
            Get Quote
          </button>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-regencyNavy/98 backdrop-blur-lg py-6 px-4 border-t border-white/10">
          {["Services", "About", "Metrics", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
               className="block py-3 text-white/80 hover:text-regencyGold transition-colors"
               onClick={() => setMobileOpen(false)}>
              {item}
            </a>
          ))}
          <button className="mt-4 w-full py-3 bg-regencyGold text-regencyNavy font-semibold rounded-lg">
            Get Quote
          </button>
        </div>
      )}
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
  <section id="services" className="py-20 md:py-32 bg-regencyDark">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="services-header text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-regencyGold/10 text-regencyGold text-xs tracking-[0.2em] uppercase mb-4 animate-pulse">
          Our Capabilities
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
          Specialized Medical<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold bg-[length:200%_100%] animate-shimmer">
            Logistics Solutions
          </span>
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          Behind every shipment is a patient waiting. We understand the stakes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <div key={index} className="service-card group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-regencyGold/50 transition-all duration-500 transform-gpu">
            {/* Card Glow Effect */}
            <div className="card-glow absolute inset-0 opacity-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-regencyGold/20 via-transparent to-regencyBlue/20 blur-xl" />
            </div>

            {/* Background Image */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-700">
              <img src={service.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-regencyGold/50 via-regencyBlue/50 to-regencyGold/50 bg-[length:200%_100%] animate-shimmer" style={{ padding: '1px' }}>
                <div className="w-full h-full rounded-2xl bg-regencyDark/95" />
              </div>
            </div>

            <div className="relative p-6 md:p-8 z-10">
              {/* Icon with pulse effect */}
              <div className="w-14 h-14 rounded-xl bg-regencyGold/10 border border-regencyGold/20 flex items-center justify-center text-regencyGold mb-6 group-hover:scale-110 group-hover:bg-regencyGold/20 group-hover:shadow-lg group-hover:shadow-regencyGold/20 transition-all duration-300">
                <service.icon className="w-7 h-7 group-hover:animate-pulse" />
              </div>

              {/* Content */}
              <span className="text-regencyBlue text-xs font-semibold tracking-widest uppercase">{service.subtitle}</span>
              <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1 mb-3 group-hover:text-regencyGold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{service.description}</p>

              {/* Features with hover effects */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature, i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10 hover:border-regencyGold/30 hover:text-regencyGold hover:bg-regencyGold/5 transition-all duration-300 cursor-default">
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
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-regencyBlue/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-regencyGold/10 rounded-full blur-[80px] animate-float-delayed" />
    </div>

    <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-2 rounded-full bg-regencyBlue/10 text-regencyBlue text-xs tracking-[0.2em] uppercase mb-4">
          By the Numbers
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
          Performance <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyBlue via-cyan-400 to-regencyBlue bg-[length:200%_100%] animate-shimmer">Metrics</span>
        </h2>
      </div>

      <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {[
          { value: 500, suffix: "+", label: "Medical Units", desc: "Active fleet" },
          { value: 48, suffix: "", label: "States", desc: "Nationwide coverage" },
          { value: 24, suffix: "/7", label: "Dispatch", desc: "Always available" },
          { value: 99, suffix: "%", label: "On-Time", desc: "Industry leading" },
        ].map((stat, i) => (
          <div key={i} className="stat-item group text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-regencyGold/30 hover:bg-white/8 transition-all duration-500 transform-gpu hover:scale-105">
            {/* Glow on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-regencyGold/10 to-regencyBlue/10 blur-xl" />
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="stat-value text-4xl md:text-5xl font-display font-bold text-white" data-value={stat.value} data-suffix="">
                  {stat.value}
                </span>
                <span className="text-2xl md:text-3xl font-display font-bold text-regencyGold animate-pulse">{stat.suffix}</span>
              </div>
              <span className="text-white font-semibold block group-hover:text-regencyGold transition-colors duration-300">{stat.label}</span>
              <span className="text-white/40 text-sm">{stat.desc}</span>
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
  <section id="about" className="py-20 md:py-32 bg-regencyDark">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="about-content">
          <span className="inline-block px-4 py-2 rounded-full bg-regencyGold/10 text-regencyGold text-xs tracking-[0.2em] uppercase mb-6">
            The Regency Standard
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
            Logistics Without<br />
            <span className="text-white/40">The Guessing Game</span>
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

          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Icons.Shield, text: "HIPAA Compliant" },
              { icon: Icons.Thermometer, text: "Cold Chain" },
              { icon: Icons.Clock, text: "Real-Time Tracking" },
              { icon: Icons.Medical, text: "FDA Registered" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <item.icon className="w-5 h-5 text-regencyGold flex-shrink-0" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>

          <button className="mt-8 px-6 py-3 border border-regencyGold text-regencyGold font-semibold text-sm uppercase tracking-wider rounded-lg hover:bg-regencyGold hover:text-regencyNavy transition-all duration-300">
            Our Technology
          </button>
        </div>

        <div className="about-image relative">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={IMAGES.about} alt="Medical Logistics" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-regencyDark via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-regencyNavy/90 backdrop-blur-sm border border-white/10 max-w-[200px] hidden md:block">
            <p className="font-display font-bold text-white text-lg">"Precision in every mile."</p>
            <p className="text-white/50 text-sm mt-1">— Regency Xpress</p>
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
    <div className="absolute inset-0 opacity-20">
      <svg className="w-full h-full">
        <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#CFB53B" strokeWidth="0.5"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#ctaGrid)" />
      </svg>
    </div>

    {/* Floating orbs */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-regencyGold/20 rounded-full blur-[60px] animate-float" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-regencyBlue/20 rounded-full blur-[80px] animate-float-delayed" />
    </div>

    <div id="cta-content" className="relative z-10 max-w-3xl mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
        Ready to<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-regencyGold via-yellow-300 to-regencyGold bg-[length:200%_100%] animate-shimmer">
          Get Started?
        </span>
      </h2>
      <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
        Experience the gold standard in medical logistics. Request a consultation today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="group px-8 py-4 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded-lg hover:shadow-xl hover:shadow-regencyGold/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
          Request Quote
          <Icons.ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <a href="tel:1-800-555-0199" className="group px-8 py-4 bg-white/5 border border-white/20 text-white font-medium text-sm uppercase tracking-wider rounded-lg hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
          <Icons.Phone className="w-4 h-4 group-hover:animate-pulse" />
          Call Now
        </a>
      </div>
    </div>
  </section>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => (
  <footer id="contact" className="pt-16 pb-8 bg-regencyNavy border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-2">
          <RegencyLogo size="default" className="mb-4" />
          <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
            Premier logistics provider specializing in expedited medical freight,
            pharmaceutical transport, and white-glove delivery solutions nationwide.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
          <ul className="space-y-2">
            {["Dedicated Fleet", "STAT Medical", "White Glove", "Nationwide"].map((item, i) => (
              <li key={i}>
                <a href="#services" className="text-white/50 hover:text-regencyGold text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-white/50 text-sm">
              <Icons.MapPin className="w-4 h-4 text-regencyGold flex-shrink-0 mt-0.5" />
              <span>1200 Logistics Way<br />Los Angeles, CA 90021</span>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Icons.Phone className="w-4 h-4 text-regencyGold flex-shrink-0" />
              <a href="tel:1-800-555-0199" className="hover:text-regencyGold transition-colors">(800) 555-0199</a>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Icons.Mail className="w-4 h-4 text-regencyGold flex-shrink-0" />
              <a href="mailto:dispatch@regencyxpress.com" className="hover:text-regencyGold transition-colors">dispatch@regencyxpress.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-white/30 text-xs">&copy; 2024 Regency Xpress Services. All rights reserved.</span>
        <div className="flex gap-6 text-white/30 text-xs">
          <a href="#" className="hover:text-regencyGold transition-colors">Privacy</a>
          <a href="#" className="hover:text-regencyGold transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

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
      // Hero Intro Animation - quick and snappy
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .from("#hero-logo", { y: 30, opacity: 0, scale: 0.95, duration: 0.8 })
        .from("#hero-tagline > *", { y: 20, opacity: 0, stagger: 0.08, duration: 0.6 }, "-=0.4")
        .from("#hero-cta > *", { y: 15, opacity: 0, stagger: 0.08, duration: 0.5 }, "-=0.3")
        .from("#hero-stats > *", { y: 15, opacity: 0, stagger: 0.04, duration: 0.4 }, "-=0.2")
        .from("#scroll-indicator", { opacity: 0, duration: 0.4 }, "-=0.1");

      // Hero Parallax on Scroll - smoother
      gsap.timeline({
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1.5 }
      })
        .to("#hero-logo", { y: -60, scale: 0.97 })
        .to("#hero-tagline", { y: -30 }, "<")
        .to("#hero-cta", { y: -15 }, "<0.05");

      // Services - IMMEDIATE visibility with enhanced entrance
      // Set initial state via CSS, only animate enhancement
      gsap.set(".services-header", { opacity: 1, y: 0 });
      gsap.set(".service-card", { opacity: 1, y: 0 });

      ScrollTrigger.create({
        trigger: "#services",
        start: "top 95%",
        onEnter: () => {
          gsap.from(".services-header", { y: 25, opacity: 0.3, duration: 0.5, ease: "power2.out" });
          gsap.from(".service-card", { y: 35, opacity: 0.3, scale: 0.98, stagger: 0.1, duration: 0.5, ease: "power2.out" });
        },
        once: true
      });

      // Stats - animate in but start almost visible
      gsap.set(".stat-item", { opacity: 1, y: 0 });
      ScrollTrigger.create({
        trigger: "#metrics",
        start: "top 95%",
        onEnter: () => {
          gsap.from(".stat-item", { y: 25, opacity: 0.3, scale: 0.95, stagger: 0.08, duration: 0.4, ease: "power2.out" });
        },
        once: true
      });

      // About - slide in effect
      gsap.set(".about-content", { opacity: 1, x: 0 });
      gsap.set(".about-image", { opacity: 1, x: 0 });
      ScrollTrigger.create({
        trigger: "#about",
        start: "top 95%",
        onEnter: () => {
          gsap.from(".about-content", { x: -25, opacity: 0.3, duration: 0.6, ease: "power2.out" });
          gsap.from(".about-image", { x: 25, opacity: 0.3, duration: 0.6, ease: "power2.out" });
        },
        once: true
      });

      // CTA Section parallax
      gsap.to("#cta-content", {
        scrollTrigger: { trigger: "#cta-section", start: "top bottom", end: "bottom top", scrub: 1 },
        y: -20
      });

      // Dynamic card hover effects with GSAP
      document.querySelectorAll('.service-card').forEach((card) => {
        const cardEl = card as HTMLElement;
        cardEl.addEventListener('mouseenter', () => {
          gsap.to(cardEl, { scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(cardEl.querySelector('.card-glow'), { opacity: 1, duration: 0.3 });
        });
        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, { scale: 1, duration: 0.3, ease: "power2.out" });
          gsap.to(cardEl.querySelector('.card-glow'), { opacity: 0, duration: 0.3 });
        });
      });

      // Stat counter animation when in view
      ScrollTrigger.create({
        trigger: "#metrics",
        start: "top 80%",
        onEnter: () => {
          document.querySelectorAll('.stat-value').forEach((el) => {
            const target = parseInt(el.getAttribute('data-value') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            gsap.to({ val: 0 }, {
              val: target,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function() {
                (el as HTMLElement).textContent = Math.round(this.targets()[0].val) + suffix;
              }
            });
          });
        },
        once: true
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
