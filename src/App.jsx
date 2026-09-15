import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35 });
  const sy = useSpring(y, { stiffness: 400, damping: 35 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setHovered(true); };
    const out = () => setHovered(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); window.removeEventListener("mouseout", out); };
  }, []);

  return (
    <>
      <motion.div style={{ left: sx, top: sy, x: "-50%", y: "-50%", position:"fixed", borderRadius:"50%", border:"0.5px solid rgba(214,26,32,0.7)", pointerEvents:"none", zIndex:9999 }}
        animate={{ width: hovered ? 48 : 10, height: hovered ? 48 : 10 }}
        transition={{ duration: 0.2 }} />
      <motion.div style={{ left: sx, top: sy, x: "-50%", y: "-50%", position:"fixed", width:4, height:4, borderRadius:"50%", background:"var(--primary-light)", pointerEvents:"none", zIndex:9999 }} />
    </>
  );
}

function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"1rem", fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--primary)", marginBottom:"1.5rem" }}>
      {children}
      <span style={{ display:"block", width:"30px", height:"1px", background:"var(--primary)" }} />
    </div>
  );
}

function LogoAnimation({ size = 240 }) {
  return (
    <div className="logo-wrapper" style={{ width: size, height: size, flexShrink: 0 }}>
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
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [["#tentang","Tentang"],["#layanan","Layanan"],["#proses","Proses"],["#kontak","Hubungi Kami"]];
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }}
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"1.6rem 5rem", background: scrolled ? "rgba(15,17,21,0.97)" : "transparent", borderBottom: scrolled ? "0.5px solid rgba(214,26,32,0.08)" : "none", backdropFilter: scrolled ? "blur(12px)" : "none", transition:"all 0.5s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <LogoAnimation size={60} />
        <div>
          <div style={{ fontWeight:800, fontSize:"1rem", letterSpacing:"0.2em", color:"var(--primary-light)" }}>FUSION<span style={{ color:"var(--secondary)" }}>HUB</span></div>
          <div style={{ fontSize:"0.46rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--muted)", marginTop:"0.2rem" }}>Integrated Business Solutions</div>
        </div>
      </div>
      <ul style={{ display:"flex", gap:"2.5rem", listStyle:"none", alignItems:"center" }}>
        {links.map(([href, label]) => (
          <li key={href}>
            <motion.a href={href} data-hover whileHover={{ color:"var(--primary-pale)" }}
              style={{ color: href==="#kontak" ? "var(--primary-light)" : "var(--warm-gray)", fontSize:"0.62rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight: 600, textDecoration:"none", border: href==="#kontak" ? "1px solid var(--primary-dim)" : "none", borderRadius:"4px", padding: href==="#kontak" ? "0.6rem 1.4rem" : "0", cursor:"none", transition:"0.2s" }}>
              {label}
            </motion.a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start","end start"] });
  const y = useTransform(scrollYProgress, [0,1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const stats = [["99%","Uptime Sistem"],["24/7","Dukungan Teknis"]];
  const stagger = { hidden:{}, show:{ transition:{ staggerChildren:0.12 }}};
  const item = { hidden:{ opacity:0, y:30 }, show:{ opacity:1, y:0, transition:{ duration:0.9, ease:[0.16,1,0.3,1] }}};

  return (
    <section ref={ref} style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"1fr 1fr", position:"relative", overflow:"hidden" }}>
      <motion.div style={{ padding:"10rem 4rem 8rem 5rem", position:"relative", zIndex:2, y, opacity }}>
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 60% 70% at 10% 60%, rgba(214,26,32,0.06) 0%, transparent 60%)", pointerEvents:"none" }} />
        <motion.div variants={stagger} initial="hidden" animate="show" style={{ position:"relative", zIndex:1 }}>
          <motion.div variants={item} style={{ display:"flex", alignItems:"center", gap:"1rem", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--primary)", marginBottom:"2rem" }}>
            <span style={{ display:"block", width:"30px", height:"2px", background:"var(--primary)" }} />
            Transformasi Digital Terpadu
          </motion.div>
          
          <motion.div variants={item} style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize:"clamp(3.5rem,6vw,5.5rem)", fontWeight:800, lineHeight:1.1, color:"var(--ivory)", letterSpacing:"-0.02em" }}>
              Solusi Bisnis<br />
              <span style={{ color:"var(--primary)" }}>Masa Depan.</span>
            </h1>
          </motion.div>

          <motion.p variants={item} style={{ fontSize:"1rem", fontWeight:400, lineHeight:1.8, color:"var(--warm-gray)", maxWidth:"420px", marginBottom:"3.5rem" }}>
            Kami memberdayakan ekosistem digital Anda dengan Bundle One Solution & Modul Kustom: HRIS, IT-Inventory, Production Tracker, ProcureFlow, hingga Asset Management System.
          </motion.p>
          <motion.div variants={item} style={{ display:"flex", gap:"1.2rem" }}>
            <motion.a href="#kontak" data-hover whileHover={{ background:"var(--primary-light)", scale:1.02 }} whileTap={{ scale:0.98 }}
              style={{ display:"inline-block", textDecoration:"none", background:"var(--primary)", color:"var(--cream)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"1.2rem 2.5rem", borderRadius:"6px", fontWeight:700, cursor:"none", transition:"all 0.3s" }}>
              Mulai Transformasi
            </motion.a>
            <motion.a href="#layanan" data-hover whileHover={{ borderColor:"var(--primary-light)", color:"var(--primary-light)" }}
              style={{ display:"inline-block", textDecoration:"none", border:"1px solid var(--muted)", color:"var(--warm-gray)", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"1.2rem 2.5rem", borderRadius:"6px", fontWeight:600, cursor:"none", transition:"all 0.3s" }}>
              Jelajahi Solusi
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:1.2, delay:0.3 }}
        style={{ background:"var(--bg1)", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative", overflow:"hidden" }}>
        
        <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(to right, transparent, rgba(214,26,32,0.3), transparent)" }} />
        
        <div style={{ display:"flex", justifyContent:"center", alignItems:"center", flex:1 }}>
           <LogoAnimation size={400} />
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1px", background:"rgba(214,26,32,0.15)", borderTop: "1px solid rgba(214,26,32,0.1)" }}>
          {stats.map(([num, lbl], i) => (
            <motion.div key={lbl} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ delay: 0.7 + i * 0.1, duration:0.8 }}
              whileHover={{ background:"var(--bg2)" }}
              style={{ background:"var(--bg1)", padding:"2rem", cursor:"default", transition:"background 0.3s" }}>
              <div style={{ fontSize:"2.2rem", fontWeight:800, color:"var(--secondary-light)", lineHeight:1 }}>{num}</div>
              <div style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginTop:"0.8rem" }}>{lbl}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
        style={{ position:"absolute", bottom:"2.5rem", left:"5rem", display:"flex", flexDirection:"column", alignItems:"center", gap:"0.75rem" }}>
        <motion.div animate={{ scaleY:[0,1,1,0], opacity:[0,1,1,0] }} transition={{ duration:2.2, repeat:Infinity }}
          style={{ width:"2px", height:"50px", background:"linear-gradient(to bottom, var(--primary), transparent)", transformOrigin:"top" }} />
        <span style={{ fontSize:"0.5rem", fontWeight:700, letterSpacing:"0.2em", color:"var(--muted)", textTransform:"uppercase" }}>Scroll</span>
      </motion.div>
    </section>
  );
}

function Divider() {
  return (
    <div style={{ display:"flex", alignItems:"center", padding:"0 5rem" }}>
      <div style={{ flex:1, height:"1px", background:"rgba(214,26,32,0.15)" }} />
      <motion.div whileInView={{ rotate:225 }} initial={{ rotate:45 }} transition={{ duration:0.8 }}
        style={{ width:"8px", height:"8px", border:"1px solid var(--primary-dim)", margin:"0 1.5rem" }} />
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
    <section id="tentang" style={{ padding:"9rem 5rem", maxWidth:"1400px", margin:"0 auto" }}>
      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:"6rem", alignItems:"start" }}>
        <FadeUp>
          <Eyebrow>Tentang Fusion Hub</Eyebrow>
          <div style={{ fontSize:"9rem", fontWeight:800, color:"rgba(214,26,32,0.05)", lineHeight:1, userSelect:"none", letterSpacing:"-0.05em" }}>01</div>
        </FadeUp>
        <div>
          <FadeUp delay={0.1}>
            <h2 style={{ fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:700, lineHeight:1.2, color:"var(--ivory)", marginBottom:"2rem" }}>
              Membangun Ekosistem <span style={{ color:"var(--primary)" }}>Digital</span> yang Solid untuk Bisnis Anda
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p style={{ fontSize:"0.9rem", lineHeight:2, color:"var(--text-body)", marginBottom:"1.5rem" }}>
              FUSION HUB hadir sebagai pusat solusi integrasi bisnis. Kami mengerti bahwa operasional yang efisien membutuhkan teknologi yang adaptif. Itulah mengapa kami menyediakan pendekatan yang fleksibel untuk setiap perusahaan.
            </p>
            <p style={{ fontSize:"0.9rem", lineHeight:2, color:"var(--text-body)", marginBottom:"3rem" }}>
              Pilih antara Bundle One Solution kami yang revolusioner atau sistem Modular yang presisi untuk membenahi alur kerja secara bertahap.
            </p>
          </FadeUp>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(214,26,32,0.1)" }}>
            {pillars.map(([icon, name, desc], i) => (
              <FadeUp key={name} delay={0.1 + i * 0.1}>
                <motion.div whileHover={{ background:"var(--bg2)" }}
                  style={{ background:"var(--bg0)", padding:"2.5rem 2rem", borderTop:"2px solid transparent", height:"100%", cursor:"default", transition:"background 0.3s" }}
                  onHoverStart={e => e.currentTarget.style.borderTopColor="var(--primary)"}
                  onHoverEnd={e => e.currentTarget.style.borderTopColor="transparent"}>
                  <div style={{ fontSize:"1.8rem", marginBottom:"1.5rem" }}>{icon}</div>
                  <div style={{ fontSize:"1.2rem", fontWeight:700, color:"var(--ivory)", marginBottom:"0.8rem" }}>{name}</div>
                  <div style={{ fontSize:"0.8rem", lineHeight:1.8, color:"var(--warm-gray)" }}>{desc}</div>
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
  const svcs = [
    ["01","Bundle One Solution","Solusi sistem enterprise menyeluruh (ERP) yang mengintegrasikan seluruh departemen dalam satu platform tersentralisasi.","Full Stack"],
    ["02","HRIS","Manajemen data karyawan, payroll, absensi terintegrasi biometrik, KPI, hingga proses rekrutmen.","Modular"],
    ["03","IT-Inventory INSW","Pelacakan stok perangkat keras & lunak IT, manajemen lisensi, serta pemantauan life-cycle perangkat perusahaan.","Modular"],
    ["05","ProcureFlow","Digitalisasi alur persetujuan PO, manajemen vendor, hingga otomasi invoice (Procure-to-Pay).","Modular"],
    ["06","Asset Management System","Pencatatan depresiasi, jadwal pemeliharaan (maintenance), dan barcode tracking untuk semua aset fisik berharga.","Modular"],
  ];
  return (
    <section id="layanan" style={{ background:"var(--bg1)", padding:"9rem 5rem" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto" }}>
        <FadeUp>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem" }}>
            <div>
              <Eyebrow>Produk & Layanan Kami</Eyebrow>
              <h2 style={{ fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:800, color:"var(--ivory)" }}>
                Lini Solusi <span style={{ color:"var(--primary)" }}>FUSION HUB</span>
              </h2>
            </div>
            <p style={{ maxWidth:"300px", fontSize:"0.85rem", lineHeight:1.8, color:"var(--warm-gray)", textAlign:"right" }}>
              Pilih paket lengkap atau integrasikan per modul sesuai dengan skala pertumbuhan Anda.
            </p>
          </div>
        </FadeUp>
        <div style={{ display:"flex", flexDirection:"column", gap:"1px", background:"rgba(214,26,32,0.15)" }}>
          {svcs.map(([num, name, desc, tag], i) => (
            <FadeUp key={num} delay={i * 0.05}>
              <motion.div
                onHoverStart={() => setActiveIdx(i)}
                onHoverEnd={() => setActiveIdx(null)}
                animate={{ background: activeIdx === i ? "var(--bg2)" : "var(--bg1)" }}
                transition={{ duration:0.3 }}
                style={{ display:"grid", gridTemplateColumns:"80px 1fr 1fr auto", alignItems:"center", gap:"3rem", padding:"2.5rem 3rem", position:"relative", cursor:"default" }}>
                <motion.div animate={{ scaleY: activeIdx === i ? 1 : 0 }}
                  style={{ position:"absolute", left:0, top:0, bottom:0, width:"4px", background:"var(--secondary)", transformOrigin:"bottom" }}
                  transition={{ duration:0.35 }} />
                <div style={{ fontSize:"2.2rem", fontWeight:800, color:"rgba(214,26,32,0.2)" }}>{num}</div>
                <div style={{ fontSize:"1.4rem", fontWeight:700, color:"var(--ivory)" }}>{name}</div>
                <div style={{ fontSize:"0.85rem", lineHeight:1.8, color:"var(--warm-gray)" }}>{desc}</div>
                <motion.div animate={{ borderColor: activeIdx === i ? "var(--secondary)" : "var(--primary-dim)", color: activeIdx === i ? "var(--secondary-light)" : "var(--primary-light)", background: activeIdx === i ? "rgba(255,102,0,0.1)" : "transparent" }}
                  style={{ fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", border:"1px solid", borderRadius:"4px", padding:"0.5rem 1.2rem", whiteSpace:"nowrap", textAlign:"center", transition:"0.3s" }}>
                  {tag}
                </motion.div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["HRsystem","IT-Inventory","Production Tracker","ProcureFlow","Asset Management","Bundle One Solution","Enterprise ERP","Digital Transformation"];
  const doubled = [...items, ...items, ...items];
  return (
    <div style={{ padding:"3.5rem 0", overflow:"hidden", borderTop:"1px solid rgba(214,26,32,0.1)", borderBottom:"1px solid rgba(214,26,32,0.1)", background:"var(--bg0)" }}>
      <motion.div animate={{ x: [0, "-50%"] }} transition={{ duration:40, repeat:Infinity, ease:"linear" }}
        style={{ display:"flex", gap:"4rem", whiteSpace:"nowrap", willChange:"transform" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:"4rem", fontSize:"1.2rem", fontWeight:700, color:"var(--muted)", flexShrink:0 }}>
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
    <section id="proses" style={{ padding:"9rem 5rem", maxWidth:"1400px", margin:"0 auto" }}>
      <FadeUp>
        <Eyebrow>Alur Implementasi</Eyebrow>
        <h2 style={{ fontSize:"clamp(2.2rem,4vw,3.2rem)", fontWeight:800, color:"var(--ivory)", marginBottom:"5rem" }}>
          Migrasi yang <span style={{ color:"var(--primary)" }}>Mulus</span> & Efisien
        </h2>
      </FadeUp>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"0", position:"relative" }}>
        <FadeUp style={{ position:"absolute", top:"30px", left:"12.5%", right:"12.5%", zIndex:0 }}>
          <div style={{ height:"2px", background:"linear-gradient(to right, var(--primary-dim), rgba(255,102,0,0.5), var(--primary-dim))" }} />
        </FadeUp>
        {steps.map(([num, name, desc], i) => (
          <FadeUp key={num} delay={i * 0.12}>
            <motion.div whileHover={{ y:-6 }} transition={{ duration:0.3 }}
              style={{ padding:"0 1.5rem", textAlign:"center", position:"relative", cursor:"default" }}>
              <motion.div whileHover={{ borderColor:"var(--secondary)", background:"var(--bg2)", color:"var(--secondary)" }}
                style={{ width:"64px", height:"64px", borderRadius:"50%", border:"2px solid var(--primary-dim)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 2rem", background:"var(--bg1)", fontSize:"1.2rem", fontWeight:800, color:"var(--primary-light)", position:"relative", zIndex:1, transition:"all 0.3s" }}>
                {num}
              </motion.div>
              <div style={{ fontSize:"1.1rem", fontWeight:700, color:"var(--ivory)", marginBottom:"0.75rem" }}>{name}</div>
              <div style={{ fontSize:"0.8rem", lineHeight:1.8, color:"var(--warm-gray)" }}>{desc}</div>
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
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return (
    <div ref={ref} style={{ padding:"10rem 5rem", textAlign:"center", background:"var(--bg0)", position:"relative", overflow:"hidden" }}>
      <motion.div animate={{ scale:[1,1.4,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:9, repeat:Infinity }}
        style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:"700px", height:"400px", borderRadius:"50%", background:"radial-gradient(ellipse, rgba(214,26,32,0.1) 0%, transparent 70%)", pointerEvents:"none" }} />
      <motion.div style={{ scale, opacity, maxWidth:"900px", margin:"0 auto", position:"relative" }}>
        <p style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:600, color:"var(--ivory)", lineHeight:1.6, marginBottom:"2.5rem" }}>
          "Teknologi sejati adalah ketika sistem yang kompleks bersembunyi di balik <span style={{ color:"var(--secondary)" }}>kemudahan penggunaan</span>, dan modularitas menjadi katalis bagi skala bisnis Anda."
        </p>
        <div style={{ width:"60px", height:"2px", background:"var(--primary-dim)", margin:"0 auto 1.5rem" }} />
        <div style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", color:"var(--muted)" }}>— FUSION HUB Manifesto</div>
      </motion.div>
    </div>
  );
}

function Field({ label, placeholder, type="text", value, onChange }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.6rem" }}>{label}</label>
      <motion.input type={type} placeholder={placeholder} value={value} onChange={onChange}
        whileFocus={{ borderColor:"var(--primary)", background:"var(--bg2)" }}
        style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.9rem", padding:"1rem 1.2rem", outline:"none", transition:"all 0.3s" }} />
    </div>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", company: "", phone: "", module: "Bundle One Solution", message: "" });

  const handleSend = () => {
    const text = `Halo tim FUSION HUB! Saya tertarik untuk Request Demo.%0A%0A*Data Klien:*%0ANama: ${form.name}%0AJabatan: ${form.role}%0APerusahaan: ${form.company}%0ANo. WhatsApp: ${form.phone}%0A%0A*Modul Diminati:* ${form.module}%0A%0A*Pesan Tambahan:*%0A${form.message}`;
    const waNumber = "6281234567890"; // Ganti dengan nomor WA Anda
    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
    setSent(true);
  };
  return (
    <section id="kontak" style={{ background:"var(--bg2)" }}>
      <div style={{ maxWidth:"1400px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        <div style={{ padding:"8rem 5rem", borderRight:"1px solid rgba(214,26,32,0.1)" }}>
          <FadeUp>
            <Eyebrow>Konsultasi IT</Eyebrow>
            <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:800, color:"var(--ivory)", marginBottom:"1.5rem" }}>
              Jadwalkan <span style={{ color:"var(--secondary)" }}>Demo</span><br />Sekarang
            </h2>
            <p style={{ fontSize:"0.9rem", lineHeight:1.8, color:"var(--warm-gray)", marginBottom:"3rem", maxWidth:"80%" }}>
              Diskusikan arsitektur IT ideal bagi Anda. Tim ahli FUSION HUB siap melakukan audit awal secara gratis.
            </p>
          </FadeUp>
          {[].map(([lbl, val], i) => (
            <FadeUp key={lbl} delay={i * 0.08}>
              <div style={{ display:"flex", gap:"2rem", padding:"1.5rem 0", borderBottom:"1px solid rgba(214,26,32,0.1)" }}>
                <span style={{ fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--primary-light)", minWidth:"100px", paddingTop:"0.2rem" }}>{lbl}</span>
                <span style={{ fontSize:"0.9rem", color:"var(--text-body)", lineHeight:1.6, whiteSpace:"pre-line" }}>{val}</span>
              </div>
            </FadeUp>
          ))}
        </div>
        <div style={{ padding:"8rem 5rem" }}>
          <FadeUp>
            <div style={{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"2.5rem", display:"flex", alignItems:"center", gap:"1rem" }}>
              Request Demo <span style={{ display:"block", width:"30px", height:"1px", background:"var(--muted)" }} />
            </div>
          </FadeUp>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", minHeight:"450px", gap:"1.5rem" }}>
                <motion.div animate={{ scale:[1,1.1,1] }} transition={{ duration:1, repeat:2 }}
                  style={{ width:"70px", height:"70px", borderRadius:"50%", border:"2px solid var(--secondary)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", color:"var(--secondary)" }}>✓</motion.div>
                <p style={{ fontSize:"2rem", fontWeight:800, color:"var(--ivory)", textAlign:"center" }}>Request Terkirim!</p>
                <p style={{ fontSize:"0.9rem", color:"var(--warm-gray)", textAlign:"center", lineHeight:1.8 }}>Solution Architect kami akan menghubungi Anda<br/>untuk mengatur jadwal demo.</p>
                <button onClick={() => setSent(false)} data-hover
                  style={{ background:"transparent", border:"1px solid var(--muted)", borderRadius:"6px", color:"var(--warm-gray)", fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", padding:"1rem 2.5rem", cursor:"none", marginTop:"1.5rem", transition:"0.3s" }}>
                  Kirim Lagi
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                <FadeUp delay={0.1}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem" }}>
                    <Field label="Nama Lengkap" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <Field label="Posisi / Jabatan" placeholder="CTO, Manager..." value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
                  </div>
                  <div style={{ marginBottom:"1.5rem" }}><Field label="Nama Perusahaan" placeholder="PT Teknologi Nusantara" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem", marginBottom:"1.5rem" }}>
                    <Field label="Nomor WhatsApp" placeholder="+62 8xx..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    <div>
                      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.6rem" }}>Modul Diminati</label>
                      <select value={form.module} onChange={e => setForm({...form, module: e.target.value})} style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.9rem", padding:"1rem 1.2rem", outline:"none" }}>
                        <option>Bundle One Solution</option>
                        <option>HRIS</option>
                        <option>IT-Inventory INSW</option>
                        <option>Production Tracker</option>
                        <option>ProcureFlow</option>
                        <option>Asset Management</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom:"2rem" }}>
                    <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.6rem" }}>Pesan / Pertanyaan Tambahan</label>
                    <motion.textarea rows={4} placeholder="Jelaskan kebutuhan spesifik atau kendala sistem saat ini..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      whileFocus={{ borderColor:"var(--primary)", background:"var(--bg2)" }}
                      style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.9rem", padding:"1rem 1.2rem", outline:"none", resize:"none", transition:"all 0.3s" }} />
                  </div>
                  <motion.button whileHover={{ background:"var(--secondary)", color:"var(--cream)" }} whileTap={{ scale:0.98 }}
                    onClick={handleSend} data-hover
                    style={{ width:"100%", background:"var(--primary)", border:"none", borderRadius:"6px", color:"#fff", fontFamily:"inherit", fontSize:"0.7rem", fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase", padding:"1.2rem", cursor:"none", transition:"all 0.3s" }}>
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
    <footer style={{ background:"var(--bg0)", borderTop:"1px solid rgba(214,26,32,0.1)", padding:"4rem 5rem", display:"grid", gridTemplateColumns:"1fr auto 1fr", alignItems:"center", gap:"2rem" }}>
      <div>
        <div style={{ fontWeight:800, fontSize:"1.2rem", letterSpacing:"0.2em", color:"var(--primary)" }}>FUSION<span style={{ color:"var(--secondary)" }}>HUB</span></div>
        <div style={{ fontSize:"0.6rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginTop:"0.4rem" }}>Integrated Business Solutions</div>
      </div>
      <div style={{ fontSize:"0.75rem", fontWeight:500, letterSpacing:"0.1em", color:"var(--muted)", textAlign:"center" }}>© 2024 FUSION HUB · All rights reserved</div>
      <div style={{ display:"flex", gap:"2rem", justifyContent:"flex-end" }}>
        {["API Docs","Privacy Policy","Terms","Careers"].map(l => (
          <motion.a key={l} href="#" whileHover={{ color:"var(--secondary-light)" }} data-hover
            style={{ fontSize:"0.7rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:"var(--muted)", textDecoration:"none", cursor:"none", transition:"0.2s" }}>{l}</motion.a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        a,button,[data-hover]{cursor:none!important}
        
        /* Animasi SVG Logo */
        @keyframes drawLine {
            to { stroke-dashoffset: 0; }
        }
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes subtleFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
        }

        .shield-path {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            animation: drawLine 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .swirl-path {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
            animation: drawLine 1.2s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards;
        }

        .core-node {
            opacity: 0;
            transform-origin: center;
            animation: fadeInScale 0.8s ease-out 2s forwards;
        }

        .logo-wrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: subtleFloat 4s ease-in-out 2.5s infinite;
        }

        .logo-wrapper svg {
            width: 100%;
            height: 100%;
            overflow: visible;
        }
      `}</style>
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
