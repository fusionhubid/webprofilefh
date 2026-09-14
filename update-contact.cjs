const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Replace Field component
content = content.replace(
  'function Field({ label, placeholder, type="text" }) {\n  return (\n    <div>\n      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.6rem" }}>{label}</label>\n      <motion.input type={type} placeholder={placeholder}',
  'function Field({ label, placeholder, type="text", value, onChange }) {\n  return (\n    <div>\n      <label style={{ display:"block", fontSize:"0.6rem", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"var(--muted)", marginBottom:"0.6rem" }}>{label}</label>\n      <motion.input type={type} placeholder={placeholder} value={value} onChange={onChange}'
);

// Replace Contact state
content = content.replace(
  'const [sent, setSent] = useState(false);',
  'const [sent, setSent] = useState(false);\n  const [form, setForm] = useState({ name: "", role: "", company: "", phone: "", module: "Bundle One Solution", message: "" });\n\n  const handleSend = () => {\n    const text = `Halo tim FUSION HUB! Saya tertarik untuk Request Demo.%0A%0A*Data Klien:*%0ANama: ${form.name}%0AJabatan: ${form.role}%0APerusahaan: ${form.company}%0ANo. WhatsApp: ${form.phone}%0A%0A*Modul Diminati:* ${form.module}%0A%0A*Pesan Tambahan:*%0A${form.message}`;\n    const waNumber = "6281234567890"; // Ganti dengan nomor WA Anda\n    window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");\n    setSent(true);\n  };'
);

// Replace Fields in form
content = content.replace('<Field label="Nama Lengkap" placeholder="John Doe" />', '<Field label="Nama Lengkap" placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />');
content = content.replace('<Field label="Posisi / Jabatan" placeholder="CTO, Manager..." />', '<Field label="Posisi / Jabatan" placeholder="CTO, Manager..." value={form.role} onChange={e => setForm({...form, role: e.target.value})} />');
content = content.replace('<Field label="Nama Perusahaan" placeholder="PT Teknologi Nusantara" />', '<Field label="Nama Perusahaan" placeholder="PT Teknologi Nusantara" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />');
content = content.replace('<Field label="Nomor WhatsApp" placeholder="+62 8xx..." />', '<Field label="Nomor WhatsApp" placeholder="+62 8xx..." value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />');

// Replace select
content = content.replace(
  '<select style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.9rem", padding:"1rem 1.2rem", outline:"none" }}>',
  '<select value={form.module} onChange={e => setForm({...form, module: e.target.value})} style={{ width:"100%", background:"var(--bg1)", border:"1px solid rgba(214,26,32,0.2)", borderRadius:"6px", color:"var(--cream)", fontFamily:"inherit", fontSize:"0.9rem", padding:"1rem 1.2rem", outline:"none" }}>'
);

// Replace textarea
content = content.replace(
  '<motion.textarea rows={4} placeholder="Jelaskan kebutuhan spesifik atau kendala sistem saat ini..."',
  '<motion.textarea rows={4} placeholder="Jelaskan kebutuhan spesifik atau kendala sistem saat ini..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}'
);

// Replace button onClick
content = content.replace(
  'onClick={() => setSent(true)} data-hover',
  'onClick={handleSend} data-hover'
);

fs.writeFileSync('src/App.jsx', content);
console.log('Contact form updated with WhatsApp logic!');
