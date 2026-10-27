import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  Cpu,
  TrendingUp,
  Users,
  Database,
  Activity,
  FileText,
  Box,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Image as ImageIcon,
  ArrowRight,
  RefreshCw,
  Check
} from "lucide-react";
import inventory1 from "./assets/inventory_1.png";
import inventory2 from "./assets/inventory_2.png";
import inventory3 from "./assets/inventory_3.png";
import inventory4 from "./assets/inventory_4.png";
import inventory5 from "./assets/inventory_5.png";

const INVENTORY_IMAGES = [
  { src: inventory1, title: "Portal Login & Keamanan Captcha Fusion Hub" },
  { src: inventory2, title: "Dashboard Saldo Awal & Cleansing Data INSW" },
  { src: inventory3, title: "Modul Penerimaan Barang & Integrasi Dokumen" },
  { src: inventory4, title: "Manajemen Stock Opname Terintegrasi" },
  { src: inventory5, title: "Laporan Adjustment & Rekonsiliasi Stok" }
];

/* =========================================================
   PRESERVED SVG LOGO ANIMATION
   ========================================================= */
function LogoAnimation({ size = 240, style = {} }) {
  return (
    <div className="logo-wrapper" style={{ width: size, maxWidth: "100%", height: "auto", flexShrink: 0, ...style }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ferrariRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E60000" />
            <stop offset="100%" stopColor="#990000" />
          </linearGradient>
          <linearGradient id="mclarenOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8000" />
            <stop offset="100%" stopColor="#FF3300" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          className="shield-path"
          d="M 100 20 C 140 20, 175 35, 175 55 C 175 120, 130 165, 100 180 C 70 165, 25 120, 25 55 C 25 35, 60 20, 100 20 Z"
          fill="none"
          stroke="url(#ferrariRed)"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <g className="swirl-group">
          <path
            className="swirl-path"
            d="M 100 25 C 140 25, 160 70, 125 100 C 110 118, 90 105, 100 100"
            fill="none"
            stroke="url(#ferrariRed)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            className="swirl-path"
            d="M 175 100 C 175 140, 130 160, 100 125 C 82 110, 95 90, 100 100"
            fill="none"
            stroke="url(#mclarenOrange)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            className="swirl-path"
            d="M 100 175 C 60 175, 40 130, 75 100 C 90 82, 110 95, 100 100"
            fill="none"
            stroke="url(#ferrariRed)"
            strokeWidth="18"
            strokeLinecap="round"
          />
          <path
            className="swirl-path"
            d="M 25 100 C 25 60, 70 40, 100 75 C 118 90, 105 110, 100 100"
            fill="none"
            stroke="url(#mclarenOrange)"
            strokeWidth="18"
            strokeLinecap="round"
          />
        </g>
        <circle className="core-node" cx="100" cy="100" r="10" fill="#FFFFFF" filter="url(#glow)" />
        <circle className="core-node" cx="100" cy="100" r="6" fill="#FF8000" />
      </svg>
    </div>
  );
}

/* =========================================================
   GALLERY MODAL (SCREENSHOT VIEWER)
   ========================================================= */
function GalleryModal({ images, initialIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, onClose]);

  if (!images || images.length === 0) return null;
  const currentItem = images[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="gallery-modal-overlay"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "1080px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
          padding: "0 0.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "clamp(0.85rem, 2.5vw, 1rem)", fontWeight: 700, color: "#FFFFFF" }}>
            {currentItem.title}
          </span>
          <span
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              color: "#FF8000",
              background: "rgba(255, 102, 0, 0.15)",
              border: "1px solid rgba(255, 102, 0, 0.3)",
              padding: "0.2rem 0.65rem",
              borderRadius: "20px",
              fontWeight: 600
            }}
          >
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            background: "rgba(255, 255, 255, 0.12)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div className="gallery-stage" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "0.5rem",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "white",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={currentItem.src}
            alt={currentItem.title}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "10px",
              boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.12)"
            }}
          />
        </AnimatePresence>

        <button
          onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "0.5rem",
            background: "rgba(15, 23, 42, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            color: "white",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "0.65rem",
          marginTop: "1.1rem",
          maxWidth: "100%",
          overflowX: "auto",
          padding: "0.4rem 0.5rem"
        }}
      >
        {images.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            style={{
              width: "68px",
              height: "44px",
              flexShrink: 0,
              backgroundImage: `url(${item.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "6px",
              cursor: "pointer",
              border: currentIndex === idx ? "2px solid var(--secondary)" : "1px solid rgba(255,255,255,0.25)",
              opacity: currentIndex === idx ? 1 : 0.5,
              transition: "all 0.2s",
              transform: currentIndex === idx ? "scale(1.06)" : "scale(1)"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* =========================================================
   REUSABLE EYEBROW BADGE
   ========================================================= */
function Eyebrow({ children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        fontSize: "0.7rem",
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--primary)",
        background: "var(--primary-light)",
        border: "1px solid var(--primary-border)",
        padding: "0.35rem 0.85rem",
        borderRadius: "999px",
        marginBottom: "1.15rem"
      }}
    >
      <span
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary), var(--secondary))"
        }}
      />
      {children}
    </div>
  );
}

/* =========================================================
   NAVIGATION BAR
   ========================================================= */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    ["#tentang", "Tentang"],
    ["#layanan", "Lini Solusi"],
    ["#proses", "Implementasi"],
    ["#kontak", "Request Demo"]
  ];

  return (
    <>
      <header
        className="nav-header"
        style={{
          background: scrolled || menuOpen ? "var(--bg-glass)" : "rgba(255, 255, 255, 0.7)",
          borderBottom: scrolled || menuOpen ? "1px solid var(--border-subtle)" : "1px solid transparent",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "var(--shadow-sm)" : "none"
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.8rem", textDecoration: "none" }}>
          <LogoAnimation size={42} />
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
                letterSpacing: "0.14em",
                color: "var(--ink-primary)",
                whiteSpace: "nowrap"
              }}
            >
              FUSION<span style={{ color: "var(--primary)" }}>HUB</span>
            </div>
            <div
              style={{
                fontSize: "0.52rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginTop: "0.1rem",
                whiteSpace: "nowrap"
              }}
            >
              Integrated Business Solutions
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="nav-desktop-links">
          {links.map(([href, label]) => {
            const isCTA = href === "#kontak";
            return (
              <li key={href}>
                <a
                  href={href}
                  style={{
                    color: isCTA ? "#FFFFFF" : "var(--ink-secondary)",
                    background: isCTA
                      ? "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)"
                      : "transparent",
                    fontSize: "0.78rem",
                    letterSpacing: "0.04em",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderRadius: "8px",
                    padding: isCTA ? "0.6rem 1.25rem" : "0.4rem 0.2rem",
                    boxShadow: isCTA ? "0 4px 12px rgba(214, 26, 32, 0.22)" : "none",
                    transition: "all 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem"
                  }}
                >
                  {label}
                  {isCTA && <ArrowUpRight size={15} />}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "8px",
            padding: "0.5rem",
            color: "var(--ink-primary)",
            cursor: "pointer"
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              top: "62px",
              left: 0,
              right: 0,
              background: "#FFFFFF",
              borderBottom: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-lg)",
              zIndex: 99,
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.65rem"
            }}
          >
            {links.map(([href, label]) => {
              const isCTA = href === "#kontak";
              return (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    color: isCTA ? "#FFFFFF" : "var(--ink-primary)",
                    background: isCTA
                      ? "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)"
                      : "var(--bg-subtle)",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    border: isCTA ? "none" : "1px solid var(--border-subtle)",
                    textAlign: "center"
                  }}
                >
                  {label}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   HERO SECTION WITH INTERACTIVE ECOSYSTEM TELEMETRY
   ========================================================= */
function Hero({ onSelectModuleForDemo }) {
  const [activeNode, setActiveNode] = useState(1);

  const ecosystemNodes = [
    {
      id: 0,
      label: "HRIS & Payroll",
      metric: "Biometric & KPI Sync",
      latency: "14ms",
      status: "Synced",
      color: "#D61A20"
    },
    {
      id: 1,
      label: "IT-Inventory INSW",
      metric: "Regulasi Bea Cukai Live",
      latency: "9ms",
      status: "Active Stream",
      color: "#FF6600"
    },
    {
      id: 2,
      label: "Production OEE",
      metric: "Efisiensi Lini 98.4%",
      latency: "11ms",
      status: "Monitoring",
      color: "#D61A20"
    },
    {
      id: 3,
      label: "ProcureFlow",
      metric: "Auto PO & Vendor Approval",
      latency: "16ms",
      status: "Verified",
      color: "#FF6600"
    }
  ];

  // Auto-cycle the telemetry highlight every 3.8s so the hub feels alive and purposeful
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % ecosystemNodes.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [ecosystemNodes.length]);

  const currentTelemetry = ecosystemNodes[activeNode];

  return (
    <section className="hero-section bg-grid-pattern">
      {/* Left Column: Editorial Value Proposition */}
      <div className="hero-left">
        <div>
          <Eyebrow>Transformasi Digital Terpadu</Eyebrow>

          <h1
            style={{
              fontSize: "clamp(2.35rem, 5.2vw, 4.35rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              color: "var(--ink-primary)",
              letterSpacing: "-0.03em",
              marginBottom: "1.5rem"
            }}
          >
            Satu Pusat Kendali untuk{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              Operasional Bisnis.
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
              lineHeight: 1.75,
              color: "var(--ink-body)",
              maxWidth: "520px",
              marginBottom: "2.25rem"
            }}
          >
            FUSION HUB menyatukan seluruh alur kerja perusahaan melalui{" "}
            <strong style={{ color: "var(--ink-primary)", fontWeight: 600 }}>Bundle One Solution</strong> maupun{" "}
            <strong style={{ color: "var(--ink-primary)", fontWeight: 600 }}>Modul Kustom</strong>: HRIS, IT-Inventory
            INSW, Production Tracker, ProcureFlow, hingga Asset Management.
          </p>

          <div className="hero-btn-group" style={{ marginBottom: "2.75rem" }}>
            <a
              href="#kontak"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                textDecoration: "none",
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                color: "#FFFFFF",
                fontSize: "0.85rem",
                fontWeight: 700,
                padding: "0.95rem 1.85rem",
                borderRadius: "10px",
                boxShadow: "var(--shadow-accent)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease"
              }}
            >
              Jadwalkan Demo Gratis
              <ArrowRight size={17} />
            </a>
            <a
              href="#layanan"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                background: "#FFFFFF",
                border: "1px solid var(--border-strong)",
                color: "var(--ink-primary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                padding: "0.95rem 1.75rem",
                borderRadius: "10px",
                boxShadow: "var(--shadow-sm)",
                transition: "border-color 0.2s ease, background-color 0.2s ease"
              }}
            >
              Eksplorasi 6 Modul
            </a>
          </div>

          {/* Trust & Architecture Pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.25rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-subtle)"
            }}
          >
            {[
              ["INSW Ready", "Integrasi Regulasi Bea Cukai"],
              ["Modular & ERP", "Adopsi Bertahap / Full Bundle"],
              ["99.9% SLA", "Dukungan Teknis 24/7"]
            ].map(([title, sub]) => (
              <div key={title} style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
                <CheckCircle2 size={17} color="var(--primary)" style={{ flexShrink: 0 }} />
                <div style={{ fontSize: "0.78rem" }}>
                  <span style={{ fontWeight: 700, color: "var(--ink-primary)" }}>{title}</span>{" "}
                  <span style={{ color: "var(--ink-muted)" }}>— {sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Interactive Fusion Core Hub + Preserved SVG Logo */}
      <div className="hero-right">
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem 1.5rem",
            position: "relative"
          }}
        >
          {/* Interactive Ecosystem Container */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(214, 26, 32, 0.14)",
              borderRadius: "24px",
              padding: "clamp(1.25rem, 3vw, 2rem)",
              width: "100%",
              maxWidth: "480px",
              boxShadow: "0 24px 48px -12px rgba(15, 23, 42, 0.08)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative"
            }}
          >
            {/* Top Status Header inside Card */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid var(--border-subtle)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#10B981",
                    boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.2)"
                  }}
                />
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    color: "var(--ink-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em"
                  }}
                >
                  FUSION CORE ENGINE v4.2
                </span>
              </div>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--secondary)",
                  background: "var(--secondary-light)",
                  border: "1px solid var(--secondary-border)",
                  padding: "0.15rem 0.55rem",
                  borderRadius: "99px",
                  fontWeight: 600
                }}
              >
                LIVE SYNC
              </span>
            </div>

            {/* Central Preserved Animated SVG Logo */}
            <div style={{ position: "relative", margin: "0.5rem 0 1.25rem" }}>
              <LogoAnimation size={220} style={{ width: "clamp(170px, 42vw, 220px)" }} />
            </div>

            {/* Interactive Module Nodes Selector (Click to inspect live telemetry) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.6rem",
                width: "100%",
                marginBottom: "1rem"
              }}
            >
              {ecosystemNodes.map((node, idx) => {
                const isSelected = activeNode === idx;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(idx)}
                    style={{
                      background: isSelected ? "#FFFFFF" : "var(--bg-subtle)",
                      border: isSelected ? `1.5px solid ${node.color}` : "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      padding: "0.65rem 0.8rem",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      boxShadow: isSelected ? "0 6px 16px -4px rgba(214, 26, 32, 0.14)" : "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "0.5rem"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: isSelected ? "var(--ink-primary)" : "var(--ink-secondary)"
                        }}
                      >
                        {node.label}
                      </div>
                      <div style={{ fontSize: "0.65rem", color: "var(--ink-muted)", marginTop: "0.1rem" }}>
                        {node.metric}
                      </div>
                    </div>
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: isSelected ? node.color : "var(--border-strong)",
                        flexShrink: 0
                      }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Live Animated Telemetry Feed Bar */}
            <div
              style={{
                width: "100%",
                background: "var(--ink-primary)",
                color: "#FFFFFF",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "0.75rem",
                fontSize: "0.74rem",
                fontFamily: "var(--font-mono)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", overflow: "hidden" }}>
                <RefreshCw size={14} color="#FF8000" style={{ flexShrink: 0 }} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTelemetry.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    [{currentTelemetry.status}] {currentTelemetry.label} → Core
                  </motion.span>
                </AnimatePresence>
              </div>
              <span style={{ color: "#FF8533", fontWeight: 700, flexShrink: 0 }}>{currentTelemetry.latency}</span>
            </div>
          </div>
        </div>

        {/* Bottom Stats Strip */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            borderTop: "1px solid var(--border-subtle)",
            background: "#FFFFFF"
          }}
        >
          <div style={{ padding: "1.35rem 2rem", borderRight: "1px solid var(--border-subtle)" }}>
            <div
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
                fontWeight: 800,
                color: "var(--primary)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1
              }}
            >
              99.9%
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginTop: "0.4rem"
              }}
            >
              Uptime Sistem Operasional
            </div>
          </div>
          <div style={{ padding: "1.35rem 2rem" }}>
            <div
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.1rem)",
                fontWeight: 800,
                color: "var(--secondary)",
                fontFamily: "var(--font-mono)",
                lineHeight: 1
              }}
            >
              24/7
            </div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
                marginTop: "0.4rem"
              }}
            >
              Dukungan Teknis & SLA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ABOUT SECTION (ARCHITECTURAL SWISS GRID)
   ========================================================= */
function About() {
  const pillars = [
    {
      icon: Layers,
      accent: "var(--primary)",
      bg: "var(--primary-light)",
      border: "var(--primary-border)",
      name: "Terintegrasi Penuh",
      desc: "Bundle One Solution mengikat seluruh proses lintas departemen ke dalam satu sumber data tunggal yang kohesif tanpa duplikasi input."
    },
    {
      icon: Cpu,
      accent: "var(--secondary)",
      bg: "var(--secondary-light)",
      border: "var(--secondary-border)",
      name: "Arsitektur Modular",
      desc: "Kustomisasi fleksibel dengan modul spesifik yang dapat diadopsi bertahap sesuai prioritas operasional perusahaan saat ini."
    },
    {
      icon: TrendingUp,
      accent: "var(--primary)",
      bg: "var(--primary-light)",
      border: "var(--primary-border)",
      name: "Skalabel & Aman",
      desc: "Infrastruktur siap mendukung pertumbuhan transaksi dari skala menengah hingga enterprise dengan standar keamanan berlapis."
    }
  ];

  return (
    <section id="tentang" className="section-pad">
      <div className="about-grid">
        <div>
          <Eyebrow>Tentang Fusion Hub</Eyebrow>
          <div
            style={{
              fontSize: "clamp(3.2rem, 7vw, 5.5rem)",
              fontWeight: 800,
              fontFamily: "var(--font-mono)",
              color: "rgba(214, 26, 32, 0.12)",
              lineHeight: 1,
              userSelect: "none"
            }}
          >
            01
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginTop: "0.5rem", fontWeight: 500 }}>
            Fondasi Ekosistem Enterprise
          </p>
        </div>

        <div>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.8vw, 2.75rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "var(--ink-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "1.25rem"
            }}
          >
            Membangun Ekosistem <span style={{ color: "var(--primary)" }}>Digital</span> yang Presisi & Mudah Digunakan
          </h2>

          <p style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink-body)", marginBottom: "1rem" }}>
            FUSION HUB hadir sebagai pusat solusi integrasi bisnis modern. Kami memahami bahwa sistem enterprise yang
            kuat tidak boleh rumit bagi penggunanya. Karena itu, setiap antarmuka dirancang bersih, cepat, dan adaptif.
          </p>
          <p style={{ fontSize: "0.98rem", lineHeight: 1.8, color: "var(--ink-body)", marginBottom: "2.5rem" }}>
            Pilih antara pendekatan <strong>Bundle One Solution</strong> yang menyeluruh atau adopsi{" "}
            <strong>Sistem Modular</strong> untuk membenahi alur kerja departemen secara terukur.
          </p>

          <div className="pillars-grid">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  style={{
                    background: "var(--bg-card)",
                    padding: "1.75rem 1.5rem",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "14px",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease"
                  }}
                >
                  <div>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px",
                        background: pillar.bg,
                        border: `1px solid ${pillar.border}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: pillar.accent,
                        marginBottom: "1.25rem"
                      }}
                    >
                      <IconComponent size={22} />
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--ink-primary)",
                        marginBottom: "0.6rem"
                      }}
                    >
                      {pillar.name}
                    </h3>
                    <p style={{ fontSize: "0.86rem", lineHeight: 1.7, color: "var(--ink-body)" }}>{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SERVICES SECTION: INTERACTIVE MODULE EXPLORER
   (All 6 modules always visible + Live Interactive Preview)
   ========================================================= */
const MODULES_DATA = [
  {
    num: "01",
    code: "ERP-CORE",
    name: "Bundle One Solution",
    tag: "Full Stack ERP",
    icon: Layers,
    shortDesc: "Integrasi menyeluruh seluruh departemen dalam satu platform enterprise tersentralisasi.",
    desc: "Solusi sistem enterprise menyeluruh (ERP) yang menghubungkan HR, Inventory, Produksi, Procurement, dan Keuangan secara real-time dalam satu dashboard eksekutif.",
    flow: ["Multi-Departemen Input", "Fusion Core Database", "Executive Analytics & Audit"],
    features: [
      "Single Sign-On (SSO) & Role-Based Access Control",
      "Sinkronisasi data antar-divisi otomatis tanpa jeda",
      "Dashboard eksekutif real-time & laporan konsolidasi",
      "Skalabilitas penuh untuk multi-cabang & pabrik"
    ],
    metricLabel: "Efisiensi Operasional",
    metricValue: "+45% Lebih Cepat"
  },
  {
    num: "02",
    code: "MOD-HRIS",
    name: "HRIS",
    tag: "Modular",
    icon: Users,
    shortDesc: "Manajemen karyawan, payroll otomatis, absensi biometrik, KPI, dan rekrutmen.",
    desc: "Otomatisasi penuh pengelolaan SDM mulai dari absensi mesin biometrik/mobile, perhitungan lembur & PPh 21, distribusi slip gaji digital, hingga evaluasi KPI tahunan.",
    flow: ["Biometrik & Mobile Attendance", "Payroll & Tax Engine", "Slip Gaji & Analitik KPI"],
    features: [
      "Integrasi langsung mesin absensi & Geolocation",
      "Kalkulasi otomatis Payroll, BPJS, Lembur & Pajak",
      "Employee Self-Service (Cuti, Klaim, Reimbursement)",
      "Pelacakan KPI & penilaian performa terstruktur"
    ],
    metricLabel: "Waktu Proses Payroll",
    metricValue: "Hemat 80% Waktu"
  },
  {
    num: "03",
    code: "MOD-INSW",
    name: "IT-Inventory INSW",
    tag: "Modular · Populer",
    icon: Database,
    shortDesc: "Pelacakan mutasi barang, Saldo Awal, Stock Opname, & integrasi pelaporan INSW.",
    desc: "Sistem IT-Inventory yang dirancang khusus untuk kepatuhan regulasi Kawasan Berikat & INSW: mencakup Saldo Awal, Pemasukan, Pengeluaran, Stock Opname, Adjustment, hingga Cleansing & Pengiriman Live ke portal INSW.",
    flow: ["Transaksi Gudang & Dokumen", "Cleansing & Validasi INSW", "Live Sync Portal INSW"],
    features: [
      "Manajemen Saldo Awal, Pemasukan & Pengeluaran Barang",
      "Fitur Cleansing INSW & Finalisasi satu klik",
      "Rekonsiliasi Stock Opname & Adjustment otomatis",
      "Export Excel standar Bea Cukai & Browser INSW Live"
    ],
    metricLabel: "Kepatuhan Regulasi",
    metricValue: "100% Standar INSW",
    hasScreenshots: true
  },
  {
    num: "04",
    code: "MOD-PROD",
    name: "Production Tracker",
    tag: "Modular",
    icon: Activity,
    shortDesc: "Monitoring jalur produksi real-time, efisiensi mesin (OEE), dan kontrol kualitas.",
    desc: "Pantau jalannya lini manufaktur dari bahan baku (WIP) hingga barang jadi secara transparan. Identifikasi bottleneck produksi dan tingkatkan skor OEE pabrik Anda.",
    flow: ["Work Order & Bahan Baku", "Real-Time Line Tracking", "QC Pass & Barang Jadi"],
    features: [
      "Pelacakan Work-in-Progress (WIP) per stasiun kerja",
      "Kalkulasi otomatis Overall Equipment Effectiveness (OEE)",
      "Pencatatan tingkat defect / Quality Control (QC)",
      "Integrasi langsung dengan pengurangan stok gudang"
    ],
    metricLabel: "Visibilitas Produksi",
    metricValue: "Real-Time 24/7"
  },
  {
    num: "05",
    code: "MOD-PROC",
    name: "ProcureFlow",
    tag: "Modular",
    icon: FileText,
    shortDesc: "Digitalisasi persetujuan PO, manajemen vendor, dan otomasi Procure-to-Pay.",
    desc: "Hilangkan antrean dokumen kertas dalam pengadaan barang. Kelola Purchase Request (PR), perbandingan harga vendor, multi-level approval PO, hingga pencocokan invoice.",
    flow: ["Purchase Request (PR)", "Multi-Level Approval PO", "Receiving & Invoice Match"],
    features: [
      "Persetujuan PO berjenjang via notifikasi instan",
      "Database histori harga & evaluasi performa vendor",
      "Three-Way Matching (PO, Good Receipt, Invoice)",
      "Kontrol anggaran (Budget Control) per departemen"
    ],
    metricLabel: "Siklus Persetujuan PO",
    metricValue: "3x Lebih Cepat"
  },
  {
    num: "06",
    code: "MOD-ASSET",
    name: "Asset Management System",
    tag: "Modular",
    icon: Box,
    shortDesc: "Pencatatan depresiasi, jadwal maintenance, dan QR/Barcode tracking aset fisik.",
    desc: "Lacak seluruh siklus hidup aset perusahaan mulai dari akuisisi, penempatan lokasi/PIC, jadwal pemeliharaan berkala, hingga perhitungan penyusutan nilai buku.",
    flow: ["Registrasi & Tagging QR", "Maintenance & Mutasi", "Kalkulasi Depresiasi"],
    features: [
      "Audit fisik cepat menggunakan pemindaian QR/Barcode",
      "Pengingat otomatis jadwal Preventive Maintenance",
      "Perhitungan depresiasi otomatis (Garis Lurus / Saldo Menurun)",
      "Riwayat lengkap perpindahan tangan & lokasi aset"
    ],
    metricLabel: "Akurasi Audit Aset",
    metricValue: "99.8% Terlacak"
  }
];

function Services({ onChooseModule }) {
  // Default selected module is index 2 (IT-Inventory INSW) so users immediately see the rich interactive preview + screenshots
  const [selectedIdx, setSelectedIdx] = useState(2);
  const [galleryState, setGalleryState] = useState({ open: false, index: 0 });

  const activeModule = MODULES_DATA[selectedIdx];
  const ActiveIcon = activeModule.icon;

  return (
    <section
      id="layanan"
      style={{
        background: "var(--bg-subtle)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)"
      }}
    >
      <div className="section-pad">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "1.5rem",
            marginBottom: "3rem"
          }}
        >
          <div>
            <Eyebrow>Produk & Lini Solusi</Eyebrow>
            <h2
              style={{
                fontSize: "clamp(1.85rem, 4vw, 2.85rem)",
                fontWeight: 800,
                color: "var(--ink-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15
              }}
            >
              Eksplorasi Modul <span style={{ color: "var(--primary)" }}>FUSION HUB</span>
            </h2>
          </div>
          <p style={{ maxWidth: "400px", fontSize: "0.92rem", lineHeight: 1.7, color: "var(--ink-body)" }}>
            Klik salah satu dari <strong>6 modul di bawah</strong> untuk melihat alur kerja sistem, fitur utama, dan
            tampilan antarmuka secara interaktif.
          </p>
        </div>

        {/* Interactive Split Explorer: Left = All 6 Modules (Always Visible), Right = Live Inspector */}
        <div className="services-layout">
          {/* Left Column: All 6 Modules List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {MODULES_DATA.map((mod, idx) => {
              const Icon = mod.icon;
              const isSelected = selectedIdx === idx;
              return (
                <button
                  key={mod.num}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`module-tab-btn ${isSelected ? "active" : ""}`}
                >
                  {/* Left active bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeModuleBar"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "5px",
                        background: "linear-gradient(to bottom, var(--primary), var(--secondary))"
                      }}
                    />
                  )}

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: isSelected ? "#FFFFFF" : "var(--primary)",
                        background: isSelected
                          ? "linear-gradient(135deg, var(--primary), var(--secondary))"
                          : "var(--primary-light)",
                        border: isSelected ? "none" : "1px solid var(--primary-border)",
                        width: "38px",
                        height: "38px",
                        borderRadius: "9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "0.1rem",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {mod.num}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: "1.05rem",
                            fontWeight: 700,
                            color: "var(--ink-primary)"
                          }}
                        >
                          {mod.name}
                        </span>
                        {mod.hasScreenshots && (
                          <span
                            style={{
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              color: "var(--secondary)",
                              background: "var(--secondary-light)",
                              border: "1px solid var(--secondary-border)",
                              padding: "0.15rem 0.5rem",
                              borderRadius: "99px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem"
                            }}
                          >
                            <ImageIcon size={11} /> 5 Screenshot
                          </span>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--ink-body)",
                          marginTop: "0.25rem",
                          lineHeight: 1.5
                        }}
                      >
                        {mod.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "0.35rem",
                      flexShrink: 0
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.62rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: isSelected ? "var(--primary)" : "var(--ink-muted)",
                        background: isSelected ? "var(--primary-light)" : "var(--bg-subtle)",
                        border: `1px solid ${isSelected ? "var(--primary-border)" : "var(--border-subtle)"}`,
                        padding: "0.2rem 0.55rem",
                        borderRadius: "6px"
                      }}
                    >
                      {mod.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Live Module Inspector */}
          <div style={{ position: "sticky", top: "5.5rem" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule.num}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "18px",
                  padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  boxShadow: "var(--shadow-lg)",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Top Accent Strip */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)"
                  }}
                />

                {/* Module Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "1rem",
                    marginBottom: "1.25rem",
                    flexWrap: "wrap"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: "linear-gradient(135deg, var(--primary-light), var(--secondary-light))",
                        border: "1px solid var(--primary-border)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--primary)"
                      }}
                    >
                      <ActiveIcon size={24} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          color: "var(--secondary)",
                          letterSpacing: "0.08em"
                        }}
                      >
                        MODUL {activeModule.num} // {activeModule.code}
                      </div>
                      <h3
                        style={{
                          fontSize: "clamp(1.35rem, 2.5vw, 1.65rem)",
                          fontWeight: 800,
                          color: "var(--ink-primary)"
                        }}
                      >
                        {activeModule.name}
                      </h3>
                    </div>
                  </div>

                  <div
                    style={{
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      padding: "0.45rem 0.85rem",
                      textAlign: "right"
                    }}
                  >
                    <div style={{ fontSize: "0.65rem", color: "var(--ink-muted)", fontWeight: 600 }}>
                      {activeModule.metricLabel}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 800,
                        color: "var(--primary)",
                        fontFamily: "var(--font-mono)"
                      }}
                    >
                      {activeModule.metricValue}
                    </div>
                  </div>
                </div>

                {/* Full Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    lineHeight: 1.75,
                    color: "var(--ink-body)",
                    marginBottom: "1.5rem"
                  }}
                >
                  {activeModule.desc}
                </p>

                {/* Animated Interactive Architecture Pipeline */}
                <div
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "12px",
                    padding: "1rem",
                    marginBottom: "1.5rem"
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-muted)",
                      marginBottom: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    <Sparkles size={13} color="var(--secondary)" /> Alur Integrasi Data Otomatis
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                      gap: "0.5rem",
                      alignItems: "center"
                    }}
                  >
                    {activeModule.flow.map((step, i) => (
                      <div
                        key={step}
                        style={{
                          background: "#FFFFFF",
                          border: i === 1 ? "1px solid var(--secondary-border)" : "1px solid var(--border-subtle)",
                          borderRadius: "8px",
                          padding: "0.6rem 0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          boxShadow: "var(--shadow-sm)"
                        }}
                      >
                        <span
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            background: i === 1 ? "var(--secondary)" : "var(--primary-light)",
                            color: i === 1 ? "#FFFFFF" : "var(--primary)",
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            fontFamily: "var(--font-mono)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}
                        >
                          {i + 1}
                        </span>
                        <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "var(--ink-primary)" }}>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features Checklist */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--ink-muted)",
                      marginBottom: "0.75rem"
                    }}
                  >
                    Kapabilitas Utama Modul:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.55rem" }}>
                    {activeModule.features.map((feat) => (
                      <div
                        key={feat}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.65rem",
                          fontSize: "0.86rem",
                          color: "var(--ink-secondary)",
                          fontWeight: 500
                        }}
                      >
                        <span
                          style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            background: "var(--primary-light)",
                            color: "var(--primary)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Screenshot Strip if IT-Inventory INSW */}
                {activeModule.hasScreenshots && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #FFF7ED 0%, #FFF1F2 100%)",
                      border: "1px solid var(--secondary-border)",
                      borderRadius: "12px",
                      padding: "1rem",
                      marginBottom: "1.5rem"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.75rem",
                        flexWrap: "wrap",
                        gap: "0.5rem"
                      }}
                    >
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--ink-primary)" }}>
                        Preview Antarmuka Web IT-Inventory INSW:
                      </span>
                      <button
                        type="button"
                        onClick={() => setGalleryState({ open: true, index: 0 })}
                        style={{
                          background: "var(--primary)",
                          color: "#FFFFFF",
                          border: "none",
                          borderRadius: "6px",
                          padding: "0.35rem 0.75rem",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem"
                        }}
                      >
                        <ImageIcon size={13} /> Perbesar Semua (5 Foto)
                      </button>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(5, 1fr)",
                        gap: "0.5rem"
                      }}
                    >
                      {INVENTORY_IMAGES.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setGalleryState({ open: true, index: i })}
                          title={img.title}
                          style={{
                            aspectRatio: "16 / 10",
                            backgroundImage: `url(${img.src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "6px",
                            border: "1.5px solid #FFFFFF",
                            boxShadow: "var(--shadow-sm)",
                            cursor: "pointer",
                            transition: "transform 0.15s ease"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Action Bar */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid var(--border-subtle)"
                  }}
                >
                  <a
                    href="#kontak"
                    onClick={() => onChooseModule && onChooseModule(activeModule.name)}
                    style={{
                      flex: 1,
                      minWidth: "200px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                      background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                      color: "#FFFFFF",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      padding: "0.85rem 1.25rem",
                      borderRadius: "10px",
                      boxShadow: "var(--shadow-accent)"
                    }}
                  >
                    Jadwalkan Demo {activeModule.name}
                    <ArrowRight size={16} />
                  </a>

                  {!activeModule.hasScreenshots && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedIdx(2);
                        setGalleryState({ open: true, index: 0 });
                      }}
                      style={{
                        background: "var(--bg-subtle)",
                        border: "1px solid var(--border-strong)",
                        color: "var(--ink-secondary)",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        padding: "0.85rem 1.1rem",
                        borderRadius: "10px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}
                    >
                      <ImageIcon size={15} color="var(--secondary)" /> Lihat Contoh UI INSW
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {galleryState.open && (
          <GalleryModal
            images={INVENTORY_IMAGES}
            initialIndex={galleryState.index}
            onClose={() => setGalleryState({ open: false, index: 0 })}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   PROCESS SECTION: INTERACTIVE IMPLEMENTATION ROADMAP
   ========================================================= */
function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      roman: "I",
      name: "Audit Sistem & Gap Analysis",
      duration: "Minggu 1",
      desc: "Kami memetakan alur kerja berjalan, mengidentifikasi titik hambat (pain-points), serta mengevaluasi kesiapan struktur data Anda.",
      deliverable: "Dokumen Blueprint Arsitektur"
    },
    {
      num: "02",
      roman: "II",
      name: "Konfigurasi Modul & Kustomisasi",
      duration: "Minggu 2–3",
      desc: "Penyesuaian parameter Bundle One Solution atau modul pilihan agar presisi mengikuti SOP dan regulasi industri perusahaan Anda.",
      deliverable: "Staging & Sandbox Environment"
    },
    {
      num: "03",
      roman: "III",
      name: "Integrasi & Migrasi Data",
      duration: "Minggu 4",
      desc: "Proses cleansing dan pemindahan saldo awal/data historis secara aman ke server produksi tanpa menghentikan operasional harian.",
      deliverable: "Zero-Downtime Data Cutover"
    },
    {
      num: "04",
      roman: "IV",
      name: "Pelatihan User & Go-Live SLA",
      duration: "Ongoing 24/7",
      desc: "Pendampingan intensif bagi tim operasional dan dukungan teknis berkelanjutan dengan jaminan SLA tingkat enterprise.",
      deliverable: "Sertifikasi User & Support 24/7"
    }
  ];

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <section id="proses" className="section-pad">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: "1.5rem",
          marginBottom: "2.5rem"
        }}
      >
        <div>
          <Eyebrow>Alur Implementasi</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "var(--ink-primary)",
              letterSpacing: "-0.02em"
            }}
          >
            Migrasi Sistem yang <span style={{ color: "var(--primary)" }}>Terukur</span> & TanpaHambatan
          </h2>
        </div>

        {/* Interactive Progress Bar Pill */}
        <div
          style={{
            background: "var(--bg-subtle)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "12px",
            padding: "0.75rem 1.15rem",
            minWidth: "240px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.72rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "var(--ink-secondary)",
              marginBottom: "0.4rem"
            }}
          >
            <span>TAHAP {activeStep + 1} DARI 4</span>
            <span style={{ color: "var(--primary)" }}>{progressPercentage}% READY</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "var(--border-subtle)",
              borderRadius: "99px",
              overflow: "hidden"
            }}
          >
            <motion.div
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--primary), var(--secondary))",
                borderRadius: "99px"
              }}
            />
          </div>
        </div>
      </div>

      <div className="process-grid">
        {steps.map((step, i) => {
          const isCurrent = activeStep === i;
          const isPassed = i <= activeStep;
          return (
            <div
              key={step.num}
              onClick={() => setActiveStep(i)}
              onMouseEnter={() => setActiveStep(i)}
              style={{
                background: isCurrent ? "#FFFFFF" : "var(--bg-subtle)",
                border: isCurrent ? "1.5px solid var(--primary)" : "1px solid var(--border-subtle)",
                borderRadius: "16px",
                padding: "1.6rem 1.4rem",
                cursor: "pointer",
                transition: "all 0.22s ease",
                boxShadow: isCurrent ? "var(--shadow-md)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative"
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.25rem"
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: isPassed
                        ? "linear-gradient(135deg, var(--primary), var(--secondary))"
                        : "#FFFFFF",
                      border: isPassed ? "none" : "1px solid var(--border-strong)",
                      color: isPassed ? "#FFFFFF" : "var(--ink-muted)",
                      fontWeight: 800,
                      fontSize: "0.95rem",
                      fontFamily: "var(--font-mono)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.25s ease"
                    }}
                  >
                    {step.roman}
                  </div>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      color: isCurrent ? "var(--secondary)" : "var(--ink-muted)",
                      background: isCurrent ? "var(--secondary-light)" : "#FFFFFF",
                      border: `1px solid ${isCurrent ? "var(--secondary-border)" : "var(--border-subtle)"}`,
                      padding: "0.2rem 0.6rem",
                      borderRadius: "99px"
                    }}
                  >
                    {step.duration}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: "1.08rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                    marginBottom: "0.6rem"
                  }}
                >
                  {step.name}
                </h3>
                <p style={{ fontSize: "0.84rem", lineHeight: 1.7, color: "var(--ink-body)", marginBottom: "1.25rem" }}>
                  {step.desc}
                </p>
              </div>

              <div
                style={{
                  paddingTop: "0.85rem",
                  borderTop: "1px dashed var(--border-strong)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: isCurrent ? "var(--primary)" : "var(--ink-secondary)"
                }}
              >
                <ShieldCheck size={15} color={isCurrent ? "var(--primary)" : "var(--ink-muted)"} />
                <span>Output: {step.deliverable}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT / REQUEST DEMO SECTION
   ========================================================= */
function Field({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-secondary)",
          marginBottom: "0.45rem"
        }}
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
      />
    </div>
  );
}

function Contact({ selectedModuleFromServices }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    phone: "",
    module: "Bundle One Solution",
    message: ""
  });

  useEffect(() => {
    if (selectedModuleFromServices) {
      setForm((prev) => ({ ...prev, module: selectedModuleFromServices }));
    }
  }, [selectedModuleFromServices]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!form.name.trim()) {
      alert("Silakan isi Nama Lengkap terlebih dahulu.");
      return;
    }

    const messageTemplate = `Halo Tim FUSION HUB! 👋
Saya ingin mengajukan *Request Demo* sistem.

📋 *Data Calon Klien:*
• *Nama:* ${form.name.trim()}
• *Posisi / Jabatan:* ${form.role.trim() || "-"}
• *Perusahaan:* ${form.company.trim() || "-"}
• *No. WhatsApp:* ${form.phone.trim() || "-"}

🚀 *Modul yang Diminati:*
• ${form.module}

💬 *Catatan / Kebutuhan Tambahan:*
${form.message.trim() ? form.message.trim() : "-"}

Mohon informasi ketersediaan jadwal demo. Terima kasih!`;

    const waNumber = "62895321643665";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(messageTemplate)}`;

    window.open(waUrl, "_blank");
    setSent(true);
  };

  return (
    <section
      id="kontak"
      style={{
        background: "linear-gradient(180deg, var(--bg-subtle) 0%, #FFFFFF 100%)",
        borderTop: "1px solid var(--border-subtle)"
      }}
    >
      <div className="contact-container">
        {/* Left Info Column */}
        <div>
          <Eyebrow>Konsultasi & Demo Sistem</Eyebrow>
          <h2
            style={{
              fontSize: "clamp(1.85rem, 4vw, 2.85rem)",
              fontWeight: 800,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.15rem"
            }}
          >
            Jadwalkan <span style={{ color: "var(--primary)" }}>Live Demo</span> Bersama Solution Architect Kami
          </h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "var(--ink-body)", marginBottom: "2rem" }}>
            Diskusikan arsitektur IT yang paling tepat untuk operasional perusahaan Anda. Tim teknis FUSION HUB siap
            memberikan sesi demo langsung dan audit kebutuhan awal tanpa biaya.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              [
                "Sesi Demo Kustom",
                "Demo difokuskan langsung pada alur kerja & studi kasus spesifik industri Anda."
              ],
              [
                "Konsultasi Regulasi INSW",
                "Diskusi teknis kesiapan integrasi IT-Inventory untuk Kawasan Berikat."
              ],
              [
                "Estimasi Transparan",
                "Rekomendasi skema implementasi modular atau Full ERP sesuai skala perusahaan."
              ]
            ].map(([title, desc]) => (
              <div
                key={title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "1rem 1.2rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <CheckCircle2 size={19} color="var(--secondary)" style={{ flexShrink: 0, marginTop: "0.15rem" }} />
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--ink-primary)" }}>{title}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--ink-body)", marginTop: "0.15rem" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Form Card */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid var(--border-subtle)",
            borderRadius: "18px",
            padding: "clamp(1.5rem, 3.5vw, 2.5rem)",
            boxShadow: "var(--shadow-lg)"
          }}
        >
          <div
            style={{
              fontSize: "0.72rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--primary)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "0.85rem",
              borderBottom: "1px solid var(--border-subtle)"
            }}
          >
            <span>FORMULIR REQUEST DEMO</span>
            <span style={{ color: "var(--ink-muted)" }}>DIRECT WHATSAPP</span>
          </div>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "340px",
                  gap: "1rem",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "var(--secondary-light)",
                    border: "2px solid var(--secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--secondary)"
                  }}
                >
                  <Check size={28} strokeWidth={3} />
                </div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--ink-primary)" }}>
                  Format Pesan Siap Dikirim!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--ink-body)", lineHeight: 1.7, maxWidth: "360px" }}>
                  Anda telah diarahkan ke WhatsApp tim FUSION HUB. Silakan tekan tombol kirim pada aplikasi WhatsApp
                  Anda.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  style={{
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--border-strong)",
                    borderRadius: "8px",
                    color: "var(--ink-primary)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "0.75rem 1.75rem",
                    cursor: "pointer",
                    marginTop: "0.5rem"
                  }}
                >
                  Ubah Data / Kirim Ulang
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSend}>
                <div className="contact-row">
                  <Field
                    label="Nama Lengkap *"
                    placeholder="Budi Santoso"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Field
                    label="Posisi / Jabatan"
                    placeholder="IT Manager, Direktur..."
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                  />
                </div>

                <div style={{ marginBottom: "1.15rem" }}>
                  <Field
                    label="Nama Perusahaan"
                    placeholder="PT Teknologi Nusantara"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>

                <div className="contact-row">
                  <Field
                    label="Nomor WhatsApp Aktif"
                    placeholder="08xx-xxxx-xxxx"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: "var(--ink-secondary)",
                        marginBottom: "0.45rem"
                      }}
                    >
                      Modul Diminati
                    </label>
                    <select
                      value={form.module}
                      onChange={(e) => setForm({ ...form, module: e.target.value })}
                      className="form-input"
                    >
                      <option>Bundle One Solution</option>
                      <option>HRIS</option>
                      <option>IT-Inventory INSW</option>
                      <option>Production Tracker</option>
                      <option>ProcureFlow</option>
                      <option>Asset Management System</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--ink-secondary)",
                      marginBottom: "0.45rem"
                    }}
                  >
                    Catatan / Kebutuhan Spesifik
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan singkat kebutuhan integrasi atau kendala sistem Anda saat ini..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="form-input"
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    padding: "1rem 1.5rem",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    transition: "transform 0.15s ease"
                  }}
                >
                  Kirim Request Demo via WhatsApp
                  <ArrowRight size={17} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function Footer() {
  return (
    <footer style={{ background: "#FFFFFF", borderTop: "1px solid var(--border-subtle)" }}>
      <div className="footer-container">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: " inherit" }}>
          <LogoAnimation size={34} />
          <div style={{ textAlign: "left" }}>
            <div style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "0.14em", color: "var(--ink-primary)" }}>
              FUSION<span style={{ color: "var(--primary)" }}>HUB</span>
            </div>
            <div
              style={{
                fontSize: "0.55rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ink-muted)"
              }}
            >
              Integrated Business Solutions
            </div>
          </div>
        </div>

        <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", fontWeight: 500 }}>
          © {new Date().getFullYear()} FUSION HUB · All rights reserved
        </div>

        <div className="footer-links">
          {["Tentang", "Lini Solusi", "Implementasi", "Kontak"].map((label, idx) => {
            const hrefs = ["#tentang", "#layanan", "#proses", "#kontak"];
            return (
              <a
                key={label}
                href={hrefs[idx]}
                style={{
                  fontSize: "0.76rem",
                  fontWeight: 600,
                  color: "var(--ink-secondary)",
                  textDecoration: "none"
                }}
              >
                {label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedModule, setSelectedModule] = useState("Bundle One Solution");

  return (
    <>
      <Nav />
      <main>
        <Hero onSelectModuleForDemo={setSelectedModule} />
        <About />
        <Services onChooseModule={setSelectedModule} />
        <Process />
        <Contact selectedModuleFromServices={selectedModule} />
      </main>
      <Footer />
    </>
  );
}
