import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// LOGO CONFIGURATION
// ============================================================================
const LOGO_URL: string = "https://raw.githubusercontent.com/Domusgpt/Regency-xpress/main/logo.png";

// ============================================================================
// ICONS
// ============================================================================
const Icons = {
  Van: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Medical: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
      <path d="M9 16h6"/>
      <path d="M12 13v6"/>
    </svg>
  ),
  Shield: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  Clock: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Globe: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
      <path d="M2 12h20"/>
    </svg>
  ),
  Thermometer: ({ className = "w-8 h-8" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>
    </svg>
  ),
  ArrowRight: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  ),
  ArrowDown: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14"/>
      <path d="m19 12-7 7-7-7"/>
    </svg>
  ),
  Phone: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  Mail: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  MapPin: ({ className = "w-5 h-5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Menu: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="6" y2="6"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  X: ({ className = "w-6 h-6" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  ),
};

// ============================================================================
// GEOMETRIC BULL LOGO (SVG VERSION)
// ============================================================================
const GeometricBullLogo = ({ className = "", showText = true }) => (
  <div className={`flex flex-col items-center ${className}`}>
    <svg viewBox="0 0 200 160" className="w-full h-auto max-w-[300px]">
      {/* Bull Head - Geometric Line Art */}
      <g fill="none" stroke="#2B5091" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Left Horn */}
        <path d="M30 50 L50 20 L70 50"/>
        {/* Right Horn */}
        <path d="M130 50 L150 20 L170 50"/>
        {/* Head Top */}
        <path d="M50 50 L70 35 L100 45 L130 35 L150 50"/>
        {/* Head Sides */}
        <path d="M50 50 L40 80 L55 100"/>
        <path d="M150 50 L160 80 L145 100"/>
        {/* Face Shape */}
        <path d="M55 100 L70 85 L85 95 L100 90 L115 95 L130 85 L145 100"/>
        {/* Nose/Snout */}
        <path d="M70 85 L75 110 L100 120 L125 110 L130 85"/>
        <path d="M75 110 L85 105 L100 108 L115 105 L125 110"/>
        {/* Nostrils */}
        <circle cx="88" cy="112" r="3" fill="#2B5091"/>
        <circle cx="112" cy="112" r="3" fill="#2B5091"/>
        {/* Inner Face Details */}
        <path d="M70 50 L80 65 L100 55 L120 65 L130 50"/>
        <path d="M80 65 L75 80 L85 75"/>
        <path d="M120 65 L125 80 L115 75"/>
        {/* Eyes */}
        <path d="M85 78 L90 85 L95 78" fill="#2B5091"/>
        <path d="M105 78 L110 85 L115 78" fill="#2B5091"/>
      </g>
    </svg>
    {showText && (
      <>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="font-display font-bold text-3xl md:text-4xl text-regencyGold tracking-tight">Regency</span>
          <span className="font-display font-bold text-3xl md:text-4xl text-regencyGold tracking-tight">Xpress</span>
        </div>
        <span className="text-xs font-semibold text-regencyBlue tracking-[0.4em] uppercase mt-2">SERVICES</span>
      </>
    )}
  </div>
);

// ============================================================================
// LOGO COMPONENT WITH FALLBACK
// ============================================================================
type LogoSize = "small" | "default" | "large" | "hero";

interface RegencyLogoProps {
  className?: string;
  showText?: boolean;
  size?: LogoSize;
}

const RegencyLogo: React.FC<RegencyLogoProps> = ({ className = "", showText = true, size = "default" }) => {
  const [imageError, setImageError] = useState(false);
  const hasUrl = LOGO_URL && LOGO_URL.length > 0;

  const sizeClasses: Record<LogoSize, string> = {
    small: "max-w-[120px]",
    default: "max-w-[200px]",
    large: "max-w-[400px]",
    hero: "max-w-[500px]"
  };

  if (hasUrl && !imageError) {
    return (
      <div className={`relative ${sizeClasses[size]} ${className}`}>
        <img
          src={LOGO_URL}
          alt="Regency Xpress Services"
          className="w-full h-auto object-contain"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return <GeometricBullLogo className={className} showText={showText} />;
};

// ============================================================================
// ANIMATED BACKGROUND ORBS
// ============================================================================
const BackgroundOrbs = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    <div className="orb w-[600px] h-[600px] bg-regencyBlue/20 top-[-200px] left-[-200px] animate-pulse-glow" />
    <div className="orb w-[500px] h-[500px] bg-regencyGold/10 top-[30%] right-[-150px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
    <div className="orb w-[400px] h-[400px] bg-regencyBlue/15 bottom-[-100px] left-[30%] animate-pulse-glow" style={{ animationDelay: '3s' }} />
  </div>
);

// ============================================================================
// GEOMETRIC GRID BACKGROUND
// ============================================================================
const GridBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-50" />
);

// ============================================================================
// FLOATING PARTICLES
// ============================================================================
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${6 + Math.random() * 4}s`,
    size: `${2 + Math.random() * 4}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `rgba(207, 181, 59, ${0.2 + Math.random() * 0.3})`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================
interface NavigationProps {
  scrolled: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ scrolled }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-3 glass' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <RegencyLogo size="small" className="transition-transform duration-300 group-hover:scale-105" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-white/70 hover:text-regencyGold transition-colors">Services</a>
          <a href="#about" className="text-sm font-medium text-white/70 hover:text-regencyGold transition-colors">About</a>
          <a href="#stats" className="text-sm font-medium text-white/70 hover:text-regencyGold transition-colors">Metrics</a>
          <a href="#contact" className="text-sm font-medium text-white/70 hover:text-regencyGold transition-colors">Contact</a>
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:1-800-555-0199" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
            <Icons.Phone className="w-4 h-4" />
            <span>1-800-555-0199</span>
          </a>
          <button className="px-6 py-2.5 bg-regencyGold text-regencyNavy font-semibold text-sm rounded border-gradient hover:shadow-glow-gold transition-all duration-300">
            Request Quote
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass py-6 px-6 flex flex-col gap-4">
          <a href="#services" className="text-white/80 hover:text-regencyGold py-2" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#about" className="text-white/80 hover:text-regencyGold py-2" onClick={() => setMobileOpen(false)}>About</a>
          <a href="#stats" className="text-white/80 hover:text-regencyGold py-2" onClick={() => setMobileOpen(false)}>Metrics</a>
          <a href="#contact" className="text-white/80 hover:text-regencyGold py-2" onClick={() => setMobileOpen(false)}>Contact</a>
          <button className="mt-4 px-6 py-3 bg-regencyGold text-regencyNavy font-semibold text-sm rounded">
            Request Quote
          </button>
        </div>
      )}
    </nav>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================
const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-b from-regencyNavy via-regencyDark to-regencyDark" />

    {/* Animated Grid Lines */}
    <div className="absolute inset-0">
      <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2B5091" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    {/* Main Content */}
    <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
      {/* Logo */}
      <div id="hero-logo" className="mb-8">
        <RegencyLogo size="hero" className="mx-auto" />
      </div>

      {/* Tagline */}
      <div id="hero-tagline" className="mb-12">
        <p className="font-mono text-regencyBlue text-sm md:text-base tracking-[0.3em] uppercase mb-6">
          Premium Medical Logistics
        </p>
        <h1 className="hero-title font-display font-bold text-white mb-6">
          Precision in
          <span className="block text-shimmer">Every Mile</span>
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
          Temperature-controlled transport, STAT delivery, and white-glove service
          for clinical trials, pharmaceuticals, and medical devices.
        </p>
      </div>

      {/* CTA Buttons */}
      <div id="hero-cta" className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button className="group px-8 py-4 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded hover:shadow-glow-gold transition-all duration-300 flex items-center gap-3">
          Get Started
          <Icons.ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="px-8 py-4 glass-light text-white font-medium text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all duration-300">
          View Services
        </button>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div id="scroll-indicator" className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
      <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to Explore</span>
      <div className="w-[1px] h-16 bg-gradient-to-b from-regencyGold to-transparent animate-pulse" />
    </div>
  </section>
);

// ============================================================================
// MARQUEE SECTION
// ============================================================================
const MarqueeSection = () => (
  <section className="relative py-6 border-y border-white/10 overflow-hidden bg-regencyNavy/50">
    <div className="flex gap-16 animate-marquee w-max">
      {[...Array(8)].map((_, i) => (
        <span key={i} className="text-white/30 font-display font-bold text-xl tracking-wider flex items-center gap-16 whitespace-nowrap">
          CLINICAL TRIALS <span className="w-2 h-2 rounded-full bg-regencyGold" />
          STAT DELIVERY <span className="w-2 h-2 rounded-full bg-regencyBlue" />
          WHITE GLOVE <span className="w-2 h-2 rounded-full bg-regencyGold" />
          TEMPERATURE CONTROLLED <span className="w-2 h-2 rounded-full bg-regencyBlue" />
        </span>
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
    features: ["GPS Tracking", "Temperature Logs", "Chain of Custody"],
    image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: Icons.Clock,
    title: "STAT Medical",
    subtitle: "Emergency Response",
    description: "24/7 immediate dispatch for organ transport, surgical kits, and time-critical medical deliveries.",
    features: ["< 60 Min Response", "24/7 Dispatch", "Priority Routing"],
    image: "https://images.unsplash.com/photo-1516574187841-693083f652eb?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: Icons.Shield,
    title: "White Glove",
    subtitle: "Premium Handling",
    description: "Specialized delivery and installation for MRI machines, diagnostic equipment, and sensitive robotics.",
    features: ["Inside Delivery", "Installation", "Debris Removal"],
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1000&auto=format&fit=crop"
  },
  {
    icon: Icons.Globe,
    title: "Nationwide Coverage",
    subtitle: "Coast to Coast",
    description: "Comprehensive logistics network spanning all 48 continental states with strategic hub locations.",
    features: ["48 States", "Same Day Available", "Cross-Docking"],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1000&auto=format&fit=crop"
  }
];

const ServicesSection = () => (
  <section id="services" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="services-header mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div>
            <span className="text-regencyGold font-mono text-sm tracking-widest uppercase mb-4 block">Our Capabilities</span>
            <h2 className="section-title font-display font-bold text-white">
              Specialized Medical<br />
              <span className="text-gradient-gold">Logistics Solutions</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-lg leading-relaxed">
            Behind every shipment is a patient waiting. We understand the stakes and deliver accordingly.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card group relative overflow-hidden rounded-lg perspective-container"
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
              <img src={service.image} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Glass Card */}
            <div className="relative glass p-8 md:p-10 h-full min-h-[400px] flex flex-col justify-between transition-all duration-500 group-hover:bg-regencyBlue/10 card-3d">
              {/* Icon */}
              <div className="mb-8">
                <div className="w-16 h-16 rounded-lg glass-gold flex items-center justify-center text-regencyGold group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-regencyBlue text-xs font-semibold tracking-widest uppercase">{service.subtitle}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mt-2 mb-4 group-hover:text-regencyGold transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/70 border border-white/10">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a href="#contact" className="inline-flex items-center gap-2 text-regencyGold font-medium text-sm group-hover:gap-4 transition-all">
                  Learn More
                  <Icons.ArrowRight className="w-4 h-4" />
                </a>
              </div>
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
const stats = [
  { value: "500", suffix: "+", label: "Medical Units", description: "Active fleet vehicles" },
  { value: "48", suffix: "", label: "States Covered", description: "Nationwide network" },
  { value: "24", suffix: "/7", label: "Live Dispatch", description: "Always available" },
  { value: "99", suffix: "%", label: "On-Time Rate", description: "Industry leading" },
];

const StatsSection = () => (
  <section id="stats" className="relative py-32 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-r from-regencyNavy via-regencyBlue/20 to-regencyNavy" />

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-20">
        <span className="text-regencyGold font-mono text-sm tracking-widest uppercase mb-4 block">By the Numbers</span>
        <h2 className="section-title font-display font-bold text-white">
          Performance <span className="text-gradient-blue">Metrics</span>
        </h2>
      </div>

      {/* Stats Grid */}
      <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item text-center md:text-left md:border-l border-white/20 md:pl-8">
            <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
              <span className="text-5xl md:text-6xl font-display font-bold text-white stat-number">
                {stat.value}
              </span>
              <span className="text-3xl md:text-4xl font-display font-bold text-regencyGold">
                {stat.suffix}
              </span>
            </div>
            <span className="text-white font-semibold text-lg block">{stat.label}</span>
            <span className="text-white/40 text-sm">{stat.description}</span>
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
  <section id="about" className="relative py-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Content */}
        <div className="about-content">
          <span className="text-regencyGold font-mono text-sm tracking-widest uppercase mb-6 block">The Regency Standard</span>
          <h2 className="section-title font-display font-bold text-white mb-8">
            Logistics Without<br />
            <span className="text-white/40 italic">The Guessing Game</span>
          </h2>
          <div className="space-y-6 text-white/60 text-lg leading-relaxed">
            <p>
              In medical logistics, precision is not optional. Every temperature deviation,
              every delayed shipment, every break in chain of custody puts patient outcomes at risk.
            </p>
            <p>
              We combine state-of-the-art telematics with HIPAA-compliant protocols to ensure
              the integrity of every critical shipment. Real-time visibility, proactive communication,
              and zero compromises.
            </p>
          </div>

          {/* Features List */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              { icon: Icons.Shield, text: "HIPAA Compliant" },
              { icon: Icons.Thermometer, text: "Cold Chain Certified" },
              { icon: Icons.Clock, text: "Real-Time Tracking" },
              { icon: Icons.Medical, text: "FDA Registered" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-white/70">
                <item.icon className="w-5 h-5 text-regencyGold" />
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          <button className="mt-10 px-8 py-4 border border-regencyGold text-regencyGold font-semibold text-sm uppercase tracking-wider rounded hover:bg-regencyGold hover:text-regencyNavy transition-all duration-300">
            Our Technology
          </button>
        </div>

        {/* Image */}
        <div className="about-image relative">
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden glow-blue">
            <img
              id="about-parallax-img"
              src="https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?q=80&w=1000&auto=format&fit=crop"
              alt="Medical Logistics"
              className="w-full h-[120%] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-regencyDark via-transparent to-transparent" />
          </div>

          {/* Floating Quote Card */}
          <div className="absolute -bottom-8 -left-8 glass p-6 max-w-xs hidden md:block">
            <p className="font-display font-bold text-xl text-white mb-2">
              "Precision in every mile."
            </p>
            <p className="text-white/50 text-sm">— Leadership, Regency Xpress</p>
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
  <section className="relative py-32 overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-regencyBlue/30 via-regencyDark to-regencyGold/20" />
    <div className="absolute inset-0 grid-bg opacity-30" />

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <span className="text-regencyGold font-mono text-sm tracking-widest uppercase mb-6 block">Ready to Get Started?</span>
      <h2 className="hero-title font-display font-bold text-white mb-8">
        Let's Move
        <span className="block text-shimmer">Forward Together</span>
      </h2>
      <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
        Experience the gold standard in medical logistics. Request a consultation today.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="group px-10 py-5 bg-regencyGold text-regencyNavy font-bold text-sm uppercase tracking-wider rounded hover:shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-3">
          Request Quote
          <Icons.ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </button>
        <a href="tel:1-800-555-0199" className="px-10 py-5 glass-light text-white font-medium text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
          <Icons.Phone className="w-4 h-4" />
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
  <footer id="contact" className="relative pt-24 pb-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        {/* Logo & Description */}
        <div className="md:col-span-2">
          <RegencyLogo size="default" className="mb-6" />
          <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
            Regency Xpress Services is a premier logistics provider specializing in
            expedited medical freight, pharmaceutical transport, and white-glove delivery
            solutions nationwide.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-regencyGold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/50 hover:text-regencyGold transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Services</h4>
          <ul className="space-y-3">
            {["Dedicated Fleet", "STAT Medical", "White Glove", "Nationwide Coverage"].map((item, i) => (
              <li key={i}>
                <a href="#services" className="text-white/50 hover:text-regencyGold text-sm transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-6">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white/50 text-sm">
              <Icons.MapPin className="w-5 h-5 text-regencyGold flex-shrink-0 mt-0.5" />
              <span>1200 Logistics Way<br />Los Angeles, CA 90021</span>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Icons.Phone className="w-5 h-5 text-regencyGold flex-shrink-0" />
              <a href="tel:1-800-555-0199" className="hover:text-regencyGold transition-colors">(800) 555-0199</a>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Icons.Mail className="w-5 h-5 text-regencyGold flex-shrink-0" />
              <a href="mailto:dispatch@regencyxpress.com" className="hover:text-regencyGold transition-colors">dispatch@regencyxpress.com</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-white/30 text-xs uppercase tracking-widest">
          &copy; 2024 Regency Xpress Services. All rights reserved.
        </span>
        <div className="flex gap-8 text-white/30 text-xs uppercase tracking-widest">
          <a href="#" className="hover:text-regencyGold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-regencyGold transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// ============================================================================
// LOADING SCREEN
// ============================================================================
interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => (
  <div id="loader" className="fixed inset-0 z-[100] bg-regencyDark flex flex-col items-center justify-center">
    <div className="mb-8">
      <GeometricBullLogo showText={false} className="w-32 h-32 animate-pulse" />
    </div>
    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-regencyBlue to-regencyGold transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
    <span className="mt-4 text-white/40 text-xs uppercase tracking-[0.3em]">Loading Experience</span>
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

  // Loading simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    if (loading || !mainRef.current) return;

    const ctx = gsap.context(() => {
      // ========================================
      // HERO ANIMATIONS - Phase Based
      // ========================================
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Intro Phase
      heroTl
        .from("#hero-logo", { y: 60, opacity: 0, duration: 1.2, delay: 0.3 })
        .from("#hero-tagline > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15
        }, "-=0.6")
        .from("#hero-cta", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from("#scroll-indicator", { opacity: 0, duration: 0.5 }, "-=0.2");

      // ========================================
      // HERO SCROLL CHOREOGRAPHY
      // ========================================
      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      heroScrollTl
        .to("#hero-logo", { y: -100, opacity: 0, scale: 0.9, duration: 1 })
        .to("#hero-tagline", { y: -50, opacity: 0, duration: 1 }, "<")
        .to("#hero-cta", { y: -30, opacity: 0, duration: 0.5 }, "<0.2");

      // ========================================
      // SERVICES SECTION - Stagger Wave
      // ========================================
      gsap.from(".services-header", {
        scrollTrigger: {
          trigger: "#services",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Service Cards - Center Origin Stagger
      const serviceCards = gsap.utils.toArray(".service-card");
      gsap.from(serviceCards, {
        scrollTrigger: {
          trigger: "#services",
          start: "top 60%",
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: "center"
        },
        ease: "power2.out"
      });

      // ========================================
      // STATS SECTION - Count Up Effect
      // ========================================
      gsap.from("#stats-grid", {
        scrollTrigger: {
          trigger: "#stats",
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 1
      });

      // Stagger stat items
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: "#stats",
          start: "top 70%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out"
      });

      // ========================================
      // ABOUT SECTION - Parallax
      // ========================================
      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      gsap.from(".about-image", {
        scrollTrigger: {
          trigger: "#about",
          start: "top 75%",
        },
        x: 60,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Image Parallax
      gsap.to("#about-parallax-img", {
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -80
      });

      // ========================================
      // SMOOTH SCROLL LINKS
      // ========================================
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e: Event) => {
          e.preventDefault();
          const href = anchor.getAttribute('href');
          if (href) {
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [loading]);

  if (loading) {
    return <LoadingScreen progress={loadProgress} />;
  }

  return (
    <div ref={mainRef} className="relative min-h-screen bg-regencyDark text-white overflow-hidden">
      {/* Background Elements */}
      <BackgroundOrbs />
      <GridBackground />
      <FloatingParticles />

      {/* Navigation */}
      <Navigation scrolled={scrolled} />

      {/* Main Content */}
      <main className="relative z-10">
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
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
