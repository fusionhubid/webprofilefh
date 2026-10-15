import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import inventory1 from './assets/inventory_1.png';
import inventory2 from './assets/inventory_2.png';
import inventory3 from './assets/inventory_3.png';
import inventory4 from './assets/inventory_4.png';
import inventory5 from './assets/inventory_5.png';

function GalleryModal({ images, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="gallery-modal-overlay"
      onClick={onClose}
    >
      {/* Top Bar with Title and Close button */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.85rem",
          padding: "0 0.5rem"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "clamp(0.8rem, 2.5vw, 0.95rem)", fontWeight: 700, color: "var(--ivory)", letterSpacing: "0.05em" }}>
            Fusion Hub IT-Inventory
          </span>
          <span style={{
            fontSize: "0.7rem",
            color: "var(--warm-gray)",
            background: "rgba(255,255,255,0.08)",
            padding: "0.2rem 0.6rem",
            borderRadius: "20px"
          }}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          data-hover
          aria-label="Close modal"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "white",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="gallery-stage"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Arrow Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
          data-hover
          aria-label="Previous image"
          style={{
            position: "absolute",
            left: "0.5rem",
            background: "rgba(15, 17, 21, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            backdropFilter: "blur(6px)",
            transition: "all 0.2s"
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Fusion Hub Screenshot ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)"
            }}
          />
        </AnimatePresence>

        {/* Right Arrow Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
          data-hover
          aria-label="Next image"
          style={{
            position: "absolute",
            right: "0.5rem",
            background: "rgba(15, 17, 21, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "white",
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            backdropFilter: "blur(6px)",
            transition: "all 0.2s"
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          gap: "0.6rem",
          marginTop: "1.2rem",
          maxWidth: "100%",
          overflowX: "auto",
          padding: "0.4rem 0.5rem"
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            data-hover
            style={{
              width: "60px",
              height: "38px",
              flexShrink: 0,
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "4px",
              cursor: "pointer",
              border: currentIndex === idx ? "2px solid var(--primary)" : "1px solid rgba(255,255,255,0.2)",
              opacity: currentIndex === idx ? 1 : 0.45,
              transition: "all 0.25s",
              transform: currentIndex === idx ? "scale(1.05)" : "scale(1)"
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkPointer = () => {
      // Only enable custom cursor if fine pointer (mouse) and screen width > 900px
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      setEnabled(isFinePointer && window.innerWidth > 900);
    };
    checkPointer();
    window.addEventListener("resize", checkPointer);

    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHovered(true); };
    const out = () => setHovered(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("resize", checkPointer);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div style={{ left: sx, top: sy, x: "-50%", y: "-50%", position:"fixed", borderRadius:"50%", border:"0.5px solid rgba(214,26,32,0.7)", pointerEvents:"none", zIndex:9999 }}
        animate={{ width: hovered ? 48 : 10, height: hovered ? 48 : 10 }}
        transition={{ duration: 0.2 }} />
      <motion.div style={{ left: sx, top: sy, x: "-50%", y: "-50%", position:"fixed", width:4, height:4, borderRadius:"50%", background:"var(--primary-light)", pointerEvents:"none", zIndex:9999 }} />
    </>
  );
}

function FadeUp({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} style={style} className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--primary)", marginBottom:"1.25rem" }}>
      {children}
      <span style={{ display:"block", width:"24px", height:"2px", background:"var(--primary)", flexShrink: 0 }} />
    </div>
  );
}

function LogoAnimation({ size = 240, style = {} }) {
  return (
    <div className="logo-wrapper" style={{ width: size, maxWidth: "100%", height: "auto", flexShrink: 0, ...style }}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ferrariRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E60000" />
            <stop offset="100%" stopColor="#800000" />
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
        <path className="shield-path" d="M 100 20 C 140 20, 175 35, 175 55 C 175 120, 130 165, 100 180 C 70 165, 25 120, 25 55 C 25 35, 60 20, 100 20 Z" 
              fill="none" stroke="url(#ferrariRed)" strokeWidth="10" strokeLinejoin="round"/>
        <g className="swirl-group">
          <path className="swirl-path" d="M 100 25 C 140 25, 160 70, 125 100 C 110 118, 90 105, 100 100" fill="none" stroke="url(#ferrariRed)" strokeWidth="18" strokeLinecap="round" />
          <path className="swirl-path" d="M 175 100 C 175 140, 130 160, 100 125 C 82 110, 95 90, 100 100" fill="none" stroke="url(#mclarenOrange)" strokeWidth="18" strokeLinecap="round" />
          <path className="swirl-path" d="M 100 175 C 60 175, 40 130, 75 100 C 90 82, 110 95, 100 100" fill="none" stroke="url(#ferrariRed)" strokeWidth="18" strokeLinecap="round" />
          <path className="swirl-path" d="M 25 100 C 25 60, 70 40, 100 75 C 118 90, 105 110, 100 100" fill="none" stroke="url(#mclarenOrange)" strokeWidth="18" strokeLinecap="round" />
        </g>
        <circle className="core-node" cx="100" cy="100" r="10" fill="#FFFFFF" filter="url(#glow)"/>
        <circle className="core-node" cx="100" cy="100" r="6" fill="#FF8000"/>
      </svg>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [["#tentang","Tentang"],["#layanan","Layanan"],["#proses","Proses"],["#kontak","Hubungi Kami"]];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
        className="nav-header"
        style={{
          background: scrolled || menuOpen ? "rgba(15,17,21,0.97)" : "transparent",
          borderBottom: scrolled || menuOpen ? "0.5px solid rgba(214,26,32,0.12)" : "none",
          backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none"
        }}
      >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.85rem", textDecoration: "none" }}>
          <LogoAnimation size={44} />
          <div>
            <div style={{ fontWeight: 800, fontSize: "clamp(0.9rem, 3.5vw, 1.05rem)", letterSpacing: "0.2em", color: "var(--primary-light)", whiteSpace: "nowrap" }}>
              FUSION<span style={{ color: "var(--secondary)" }}>HUB</span>
            </div>
            <div style={{ fontSize: "0.42rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginTop: "0.15rem", whiteSpace: "nowrap" }}>
              Integrated Business Solutions
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="nav-desktop-links" style={{ gap: "2.5rem", listStyle: "none", alignItems: "center" }}>
          {links.map(([href, label]) => (
            <li key={href}>
              <motion.a href={href} data-hover whileHover={{ color: "var(--primary-pale)" }}
                style={{
                  color: href === "#kontak" ? "var(--primary-light)" : "var(--warm-gray)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: href === "#kontak" ? "1px solid var(--primary-dim)" : "none",
                  borderRadius: "4px",
                  padding: href === "#kontak" ? "0.6rem 1.4rem" : "0",
                  transition: "0.2s"
                }}>
                {label}
              </motion.a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle Button */}
        <button
          className="nav-mobile-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          data-hover
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(214,26,32,0.3)",
            borderRadius: "6px",
            padding: "0.5rem",
            color: "var(--cream)",
            cursor: "pointer"
          }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              background: "rgba(15,17,21,0.98)",
              borderBottom: "1px solid rgba(214,26,32,0.25)",
              backdropFilter: "blur(16px)",
              zIndex: 99,
              padding: "1.25rem 1.25rem 1.75rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem"
            }}
          >
            {links.map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: href === "#kontak" ? "var(--primary-light)" : "var(--ivory)",
                  fontSize: "0.85rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                  padding: "0.85rem 1rem",
                  borderRadius: "6px",
                  background: href === "#kontak" ? "rgba(214,26,32,0.12)" : "rgba(255,255,255,0.02)",
                  border: href === "#kontak" ? "1px solid var(--primary-dim)" : "1px solid rgba(255,255,255,0.05)",
                  textAlign: "center"
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const y = useTransform(scrollYProgress, [0,1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stats = [["99%","Uptime Sistem"],["24/7","Dukungan Teknis"]];
  const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.12 }}};
  const item = { hidden:{ opacity:0, y:25 }, show:{ opacity:1, y:0, transition:{ duration:0.8, ease:[0.16,1,0.3,1] }}};

  return (
    <section ref={ref} className="hero-section">
      <motion.div className="hero-left" style={{ y, opacity }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 70% at 10% 60%, rgba(214,26,32,0.07) 0%, transparent 60%)", pointerEvents:"none" }} />
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ position:"relative", zIndex:1 }}>
          <motion.div variants={item}>
            <Eyebrow>Transformasi Digital Terpadu</Eyebrow>
          </motion.div>
          
          <motion.div variants={item} style={{ marginBottom: "1.75rem" }}>
            <h1 style={{ fontSize:"clamp(2.3rem, 6.8vw, 5.2rem)", fontWeight:800, lineHeight:1.12, color:"var(--ivory)", letterSpacing:"-0.02em", wordBreak: "normal" }}>
              Solusi Bisnis<br />
              <span style={{ color:"var(--primary)" }}>Masa Depan.</span>
            </h1>
          </motion.div>

          <motion.p variants={item} style={{ fontSize:"clamp(0.88rem, 2.4vw, 1rem)", fontWeight:400, lineHeight:1.75, color:"var(--warm-gray)", maxWidth:"460px", marginBottom:"2.5rem" }}>
            Kami memberdayakan ekosistem digital Anda dengan Bundle One Solution & Modul Kustom: HRIS, IT-Inventory, Production Tracker, ProcureFlow, hingga Asset Management System.
          </motion.p>
          <motion.div variants={item} className="hero-btn-group">
            <motion.a href="#kontak" data-hover whileHover={{ background:"var(--primary-light)", scale:1.02 }} whileTap={{ scale:0.98 }}
              style={{ display:"inline-block", textDecoration:"none", background:"var(--primary)", color:"var(--cream)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", padding:"1.1rem 2.2rem", borderRadius:"6px", fontWeight:700, transition:"all 0.3s" }}>
              Mulai Transformasi
            </motion.a>
            <motion.a href="#layanan" data-hover whileHover={{ borderColor:"var(--primary-light)", color:"var(--primary-light)" }}
              style={{ display:"inline-block", textDecoration:"none", border:"1px solid var(--muted)", color:"var(--warm-gray)", fontSize:"0.65rem", letterSpacing:"0.18em", textTransform:"uppercase", padding:"1.1rem 2.2rem", borderRadius:"6px", fontWeight:600, transition:"all 0.3s" }}>
              Jelajahi Solusi
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2, delay:0.3 }}
        className="hero-right">
        
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(214,26,32,0.3), transparent)" }} />
        
        <div className="hero-logo-box">
          <LogoAnimation size={360} style={{ width: "clamp(220px, 60vw, 360px)" }} />
        </div>

        <div className="hero-stats-grid">
          {stats.map(([num, lbl], i) => (
            <motion.div key={lbl} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.7 + i * 0.1, duration:0.8 }}
              whileHover={{ background:"var(--bg2)" }}
              className="hero-stat-card">
              <div style={{ fontSize:"clamp(1.7rem, 4.5vw, 2.2rem)", fontWeight:800, color:"var(--secondary-light)", lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:"0.58rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginTop:"0.6rem" }}>{lbl}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", padding:"0 clamp(1.25rem, 4vw, 5rem)" }}>
      <div style={{ flex:1, height:"1px", background:"rgba(214,26,32,0.15)" }} />
      <motion.div whileInView={{ rotate:225 }} initial={{ rotate:45 }} transition={{ duration:0.8 }}
        style={{ width:"8px", height:"8px", border:"1px solid var(--primary-dim)", margin:"0 1rem", flexShrink: 0 }} />
      <div style={{ flex:1, height:"1px", background:"rgba(214,26,32,0.15)" }} />
    </div>
  );
}

function About() {
  const pillars = [
    ["⚙️","Terintegrasi","Bundle One Solution mengikat seluruh proses operasional bisnis ke dalam satu ekosistem yang kohesif."],
    ["🧩","Modular","Kustomisasi tanpa batas dengan modul spesifik yang bisa diadopsi sesuai kebutuhan saat ini."],
    ["🚀","Skalabel","Infrastruktur IT yang siap mendukung pertumbuhan bisnis dari UKM hingga enterprise skala besar."],
  ];
  return (
    <section id="tentang" className="section-pad">
      <div className="about-grid">
        <FadeUp>
          <Eyebrow>Tentang Fusion Hub</Eyebrow>
          <div style={{ fontSize:"clamp(3.5rem, 9vw, 8rem)", fontWeight:800, color:"rgba(214,26,32,0.06)", lineHeight:1, userSelect:"none", letterSpacing:"-0.05em" }}>01</div>
        </FadeUp>
        <div>
          <FadeUp delay={0.1}>
            <h2 style={{ fontSize:"clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight:700, lineHeight:1.25, color:"var(--ivory)", marginBottom:"1.5rem" }}>
              Membangun Ekosistem <span style={{ color:"var(--primary)" }}>Digital</span> yang Solid untuk Bisnis Anda
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontSize:"0.9rem", lineHeight:1.85, color:"var(--text-body)", marginBottom:"1.25rem" }}>
              FUSION HUB hadir sebagai pusat solusi integrasi bisnis. Kami mengerti bahwa operasional yang efisien membutuhkan teknologi yang adaptif. Itulah mengapa kami menyediakan pendekatan yang fleksibel untuk setiap perusahaan.
            </p>
            <p style={{ fontSize:"0.9rem", lineHeight:1.85, color:"var(--text-body)", marginBottom:"2.5rem" }}>
              Pilih antara Bundle One Solution kami yang revolusioner atau sistem Modular yang presisi untuk membenahi alur kerja secara bertahap.
            </p>
          </FadeUp>
          <div className="pillars-grid">
            {pillars.map(([icon, name, desc], i) => (
              <FadeUp key={name} delay={0.1 + i * 0.1}>
                <motion.div whileHover={{ background:"var(--bg2)" }}
                  style={{ background:"var(--bg0)", padding:"2rem 1.5rem", borderTop:"2px solid transparent", borderLeft:"1px solid rgba(214,26,32,0.08)", borderRight:"1px solid rgba(214,26,32,0.08)", borderBottom:"1px solid rgba(214,26,32,0.08)", height:"100%", cursor:"default", transition:"all 0.3s", borderRadius: "6px" }}
                  onHoverStart={e => e.currentTarget.style.borderTopColor="var(--primary)"}
                  onHoverEnd={e => e.currentTarget.style.borderTopColor="transparent"}>
                  <div style={{ fontSize:"1.8rem", marginBottom:"1rem" }}>{icon}</div>
                  <div style={{ fontSize:"1.15rem", fontWeight:700, color:"var(--ivory)", marginBottom:"0.6rem" }}>{name}</div>
                  <div style={{ fontSize:"0.82rem", lineHeight:1.75, color:"var(--warm-gray)" }}>{desc}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [showGallery, setShowGallery] = useState(false);
  const svcs = [
    ["01","Bundle One Solution","Solusi sistem enterprise menyeluruh (ERP) yang mengintegrasikan seluruh departemen dalam satu platform tersentralisasi.","Full Stack"],
    ["02","HRIS","Manajemen data karyawan, payroll, absensi terintegrasi biometrik, KPI, hingga proses rekrutmen.","Modular"],
    ["03","IT-Inventory INSW","Pelacakan stok perangkat keras & lunak IT, manajemen lisensi, serta pemantauan life-cycle perangkat perusahaan.","Modular"],
    ["04","Production Tracker","Monitoring jalur produksi real-time, manajemen efisiensi (OEE), dan kontrol kualitas manufaktur.","Modular"],
    ["05","ProcureFlow","Digitalisasi alur persetujuan PO, manajemen vendor, hingga otomasi invoice (Procure-to-Pay).","Modular"],
    ["06","Asset Management System","Pencatatan depresiasi, jadwal pemeliharaan (maintenance), dan barcode tracking untuk semua aset fisik berharga.","Modular"],
  ];
  return (
    <section id="layanan" style={{ background:"var(--bg1)", padding: "clamp(4.5rem, 8vw, 9rem) clamp(1.25rem, 4vw, 5rem)" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto" }}>
        <FadeUp>
          <div className="services-header">
            <div>
              <Eyebrow>Produk & Layanan Kami</Eyebrow>
              <h2 style={{ fontSize:"clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight:800, color:"var(--ivory)" }}>
                Lini Solusi <span style={{ color:"var(--primary)" }}>FUSION HUB</span>
              </h2>
            </div>
            <p style={{ maxWidth:"320px", fontSize:"0.85rem", lineHeight:1.8, color:"var(--warm-gray)" }}>
              Pilih paket lengkap atau integrasikan per modul sesuai dengan skala pertumbuhan Anda.
            </p>
          </div>
        </FadeUp>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:"rgba(214,26,32,0.15)" }}>
          {svcs.map(([num, name, desc, tag], i) => (
            <FadeUp key={num} delay={i * 0.05}>
              <motion.div
                className="service-card"
                onHoverStart={() => setActiveIdx(i)}
                onHoverEnd={() => setActiveIdx(null)}
                onClick={() => { if(i === 2) setShowGallery(true); }}
                animate={{ background: activeIdx === i ? "var(--bg2)" : "var(--bg1)" }}
                transition={{ duration:0.3 }}
                style={{ position:"relative", cursor: i === 2 ? "pointer" : "default" }}>
                <motion.div animate={{ scaleY: activeIdx === i ? 1 : 0 }}
                  style={{ position:"absolute", left:0, top:0, bottom:0, width:"4px", background:"var(--secondary)", transformOrigin:"bottom" }}
                  transition={{ duration:0.35 }} />
                
                <div style={{ fontSize:"clamp(1.6rem, 4vw, 2.2rem)", fontWeight:800, color:"rgba(214,26,32,0.3)" }}>{num}</div>
                
                <div style={{ fontSize:"clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight:700, color:"var(--ivory)", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.6rem" }}>
                  <span>{name}</span>
                  {i === 2 && (
                    <span style={{ fontSize: "0.65rem", color: "var(--primary-light)", background: "rgba(214,26,32,0.15)", border: "1px solid rgba(214,26,32,0.3)", padding: "0.25rem 0.6rem", borderRadius: "4px", fontWeight: 600 }}>
                      Lihat Screenshot ↗
                    </span>
                  )}
                </div>
                
                <div style={{ fontSize:"0.82rem", lineHeight:1.75, color:"var(--warm-gray)" }}>{desc}</div>
                
                <motion.div animate={{ borderColor: activeIdx === i ? "var(--secondary)" : "var(--primary-dim)", color: activeIdx === i ? "var(--secondary-light)" : "var(--primary-light)", background: activeIdx === i ? "rgba(255,102,0,0.1)" : "transparent" }}
                  style={{ fontSize:"0.58rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", border:"1px solid", borderRadius:"4px", padding:"0.45rem 1rem", whiteSpace:"nowrap", textAlign:"center", transition:"0.3s" }}>
                  {tag}
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {showGallery && (
          <GalleryModal
            images={[inventory1, inventory2, inventory3, inventory4, inventory5]}
            onClose={() => setShowGallery(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Marquee() {
  const items = ["HRsystem","IT-Inventory","Production Tracker","ProcureFlow","Asset Management","Bundle One Solution","Enterprise ERP","Digital Transformation"];
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{ padding:"clamp(2.2rem, 5vw, 3.5rem) 0", overflow:"hidden", borderTop:"1px solid rgba(214,26,32,0.1)", borderBottom:"1px solid rgba(214,26,32,0.1)", background:"var(--bg0)" }}>
      <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration:35, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", gap:"clamp(2.5rem, 6vw, 4rem)", whiteSpace:"nowrap", willChange:"transform" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"clamp(2.5rem, 6vw, 4rem)", fontSize:"clamp(0.95rem, 2.5vw, 1.2rem)", fontWeight:700, color:"var(--muted)", flexShrink:0 }}>
            {item}
            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"var(--secondary-light)", display:"inline-block" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Process() {
  const steps = [
    ["I","Audit Sistem Lama","Kami menganalisis pain-points dan workflow di sistem berjalan Anda."],
    ["II","Pemilihan Modul","Rekomendasi adaptasi Bundle One Solution atau kombinasi modular yang tepat."],
    ["III","Integrasi & Migrasi","Pemasangan sistem yang seamless dengan migrasi data tanpa mengganggu operasional."],
    ["IV","Training & Support","Pelatihan komprehensif bagi user dan dukungan SLA tingkat tinggi 24/7."],
  ];
  return (
    <section id="proses" style={{ padding:"clamp(4.5rem, 8vw, 9rem) clamp(1.25rem, 4vw, 5rem)", maxWidth:"1400px", margin:"0 auto" }}>
      <FadeUp>
        <Eyebrow>Alur Implementasi</Eyebrow>
        <h2 style={{ fontSize:"clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight:800, color:"var(--ivory)", marginBottom:"clamp(2.5rem, 6vw, 4.5rem)" }}>
          Migrasi yang <span style={{ color:"var(--primary)" }}>Mulus</span> & Efisien
        </h2>
      </FadeUp>
      <div className="process-grid">
        <div className="process-line" />
        {steps.map(([num, name, desc], i) => (
          <FadeUp key={num} delay={i * 0.12}>
            <motion.div whileHover={{ y:-4 }} transition={{ duration:0.3 }}
              style={{ padding:"0 1rem", textAlign:"center", position:"relative", cursor:"default" }}>
              <motion.div whileHover={{ borderColor:"var(--secondary)", background:"var(--bg2)", color:"var(--secondary)" }}
                style={{ width:"56px", height:"56px", borderRadius:"50%", border:"2px solid var(--primary-dim)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", background:"var(--bg1)", fontSize:"1.1rem", fontWeight:800, color:"var(--primary-light)", position:"relative", zIndex:1, transition:"all 0.3s" }}>
                {num}
              </motion.div>
              <div style={{ fontSize:"1.05rem", fontWeight:700, color:"var(--ivory)", marginBottom:"0.6rem" }}>{name}</div>
              <div style={{ fontSize:"0.8rem", lineHeight:1.75, color:"var(--warm-gray)" }}>{desc}</div>
            </motion.div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:["start end","end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <div ref={ref} style={{ padding:"clamp(4.5rem, 8vw, 9rem) clamp(1.25rem, 4vw, 5rem)", textAlign:"center", background:"var(--bg0)", position:"relative", overflow:"hidden" }}>
      <motion.div animate={{ scale:[1,1.3,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:9, repeat:Infinity }}
        style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"min(700px, 90vw)", height:"min(400px, 60vw)", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(214,26,32,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
      <motion.div style={{ scale, opacity, maxWidth:"850px", margin:"0 auto", position:"relative" }}>
        <p style={{ fontSize:"clamp(1.15rem, 3.5vw, 2.2rem)", fontWeight:600, color:"var(--ivory)", lineHeight:1.65, marginBottom:"2rem" }}>
          "Teknologi sejati adalah ketika sistem yang kompleks bersembunyi di balik <span style={{ color:"var(--secondary)" }}>kemudahan penggunaan</span>, dan modularitas menjadi katalis bagi skala bisnis Anda."
        </p>
        <div style={{ width:"50px", height:"2px", background:"var(--primary-dim)", margin:"0 auto 1.25rem" }} />
        <div style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.25em", textTransform:"uppercase", color:"var(--muted)" }}>— FUSION HUB Manifesto</div>
      </motion.div>
    </div>
  );
}

function Field({ label, placeholder, type="text", value, onChange }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.5rem" }}>{label}</label>
      <motion.input type={type} placeholder={placeholder} value={value} onChange={onChange}
        whileFocus={{ borderColor:"var(--primary)", background:"var(--bg2)" }}
        style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.95rem", padding:"0.9rem 1rem", outline:"none", transition:"all 0.3s" }} />
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", phone: "", module: "Bundle One Solution", message: "" });

  const handleSend = (e) => {
    if (e) e.preventDefault();
    if (!form.name.trim()) {
      alert("Silakan isi Nama Lengkap terlebih dahulu.");
      return;
    }

    const messageTemplate = 
`Halo Tim FUSION HUB! 👋
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
    <section id="kontak" style={{ background:"var(--bg2)" }}>
      <div className="contact-container">
        <div className="contact-info-col">
          <FadeUp>
            <Eyebrow>Konsultasi IT</Eyebrow>
            <h2 style={{ fontSize:"clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight:800, color:"var(--ivory)", marginBottom:"1.25rem" }}>
              Jadwalkan <span style={{ color:"var(--secondary)" }}>Demo</span><br />Sekarang
            </h2>
            <p style={{ fontSize:"0.9rem", lineHeight:1.8, color:"var(--warm-gray)", marginBottom:"2rem", maxWidth:"90%" }}>
              Diskusikan arsitektur IT ideal bagi Anda. Tim ahli FUSION HUB siap melakukan audit awal secara gratis.
            </p>
          </FadeUp>
        </div>
        <div className="contact-form-col">
          <FadeUp>
            <div style={{ fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"2rem", display:"flex", alignItems:"center", gap:"0.75rem" }}>
              Request Demo <span style={{ display:"block", width:"24px", height:"1px", background:"var(--muted)" }} />
            </div>
          </FadeUp>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", minHeight:"380px", gap:"1.25rem" }}>
                <motion.div animate={{ scale:[1,1.1,1] }} transition={{ duration:1, repeat:2 }}
                  style={{ width:"64px", height:"64px", borderRadius:"50%", border:"2px solid var(--secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.8rem", color:"var(--secondary)" }}>✓</motion.div>
                <p style={{ fontSize:"1.8rem", fontWeight:800, color:"var(--ivory)", textAlign:"center" }}>Request Terkirim!</p>
                <p style={{ fontSize:"0.88rem", color:"var(--warm-gray)", textAlign:"center", lineHeight:1.75 }}>Solution Architect kami akan menghubungi Anda<br/>untuk mengatur jadwal demo.</p>
                <button onClick={() => setSent(false)} data-hover
                  style={{ background:"transparent", border:"1px solid var(--muted)", borderRadius:"6px", color:"var(--warm-gray)", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", padding:"0.9rem 2.2rem", cursor:"pointer", marginTop:"1rem", transition:"0.3s" }}>
                  Kirim Lagi
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                <FadeUp delay={0.1}>
                  <div className="contact-row">
                    <Field label="Nama Lengkap" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Field label="Posisi / Jabatan" placeholder="CTO, Manager..." value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                  </div>
                  <div style={{ marginBottom:"1.2rem" }}>
                    <Field label="Nama Perusahaan" placeholder="PT Teknologi Nusantara" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
                  </div>
                  <div className="contact-row">
                    <Field label="Nomor WhatsApp" placeholder="08xx-xxxx-xxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    <div>
                      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.5rem" }}>Modul Diminati</label>
                      <select value={form.module} onChange={e => setForm({...form, module: e.target.value})} style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.95rem", padding:"0.9rem 1rem", outline:"none" }}>
                        <option>Bundle One Solution</option>
                        <option>HRIS</option>
                        <option>IT-Inventory INSW</option>
                        <option>Production Tracker</option>
                        <option>ProcureFlow</option>
                        <option>Asset Management</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom:"1.8rem" }}>
                    <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.5rem" }}>Pesan / Pertanyaan Tambahan</label>
                    <motion.textarea rows={4} placeholder="Jelaskan kebutuhan spesifik atau kendala sistem saat ini..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      whileFocus={{ borderColor:"var(--primary)", background:"var(--bg2)" }}
                      style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.95rem", padding:"0.9rem 1rem", outline:"none", resize:"none", transition:"all 0.3s" }} />
                  </div>
                  <motion.button whileHover={{ background:"var(--secondary)", color:"var(--cream)" }} whileTap={{ scale:0.98 }}
                    onClick={handleSend} data-hover
                    style={{ width:"100%", background:"var(--primary)", border:"none", borderRadius:"6px", color:"#fff", fontFamily:"inherit", fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", padding:"1.1rem", cursor:"pointer", transition:"all 0.3s" }}>
                    Kirim Request Demo →
                  </motion.button>
                </FadeUp>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <div style={{ fontWeight:800, fontSize:"1.1rem", letterSpacing:"0.2em", color:"var(--primary)" }}>FUSION<span style={{ color:"var(--secondary)" }}>HUB</span></div>
        <div style={{ fontSize:"0.55rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)" }}>Integrated Business Solutions</div>
      </div>
      <div style={{ fontSize:"0.72rem", fontWeight:500, letterSpacing:"0.08em", color:"var(--muted)", textAlign:"center" }}>© 2024 FUSION HUB · All rights reserved</div>
      <div className="footer-links">
        {["API Docs","Privacy Policy","Terms","Careers"].map(l => (
          <motion.a key={l} href="#" whileHover={{ color:"var(--secondary-light)" }} data-hover
            style={{ fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", textDecoration:"none", transition:"0.2s" }}>{l}</motion.a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Services />
      <Marquee />
      <Process />
      <Manifesto />
      <Contact />
      <Footer />
    </>
  );
}
