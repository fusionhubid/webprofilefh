const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Update LogoAnimation signature
content = content.replace('function LogoAnimation() {', 'function LogoAnimation({ size = 240 }) {');
content = content.replace('<div className="logo-wrapper">', '<div className="logo-wrapper" style={{ width: size, height: size, flexShrink: 0 }}>');

// Update Nav logo wrapper
content = content.replace(
  '<div style={{ transform: "scale(0.2)", width: "40px", height: "40px", display:"flex", alignItems:"center", justifyContent:"center" }}>\n          <LogoAnimation />\n        </div>',
  '<LogoAnimation size={60} />'
);

// Update Nav gap
content = content.replace(
  '<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>',
  '<div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>'
);

// Update Hero logo wrapper
content = content.replace(
  '<div style={{ transform: "scale(1.5)" }}>\n             <LogoAnimation />\n           </div>',
  '<LogoAnimation size={400} />'
);

// Remove hardcoded width/height from CSS
content = content.replace(
  '.logo-wrapper {\n            position: relative;\n            width: 240px;\n            height: 240px;',
  '.logo-wrapper {\n            position: relative;'
);

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated with dynamic logo sizes!');
