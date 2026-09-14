const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf-8');

// Replace Colors
content = content.replace(/var\(--copper-light\)/g, 'var(--primary-light)');
content = content.replace(/var\(--copper-dim\)/g, 'var(--primary-dim)');
content = content.replace(/var\(--copper-pale\)/g, 'var(--primary-pale)');
content = content.replace(/var\(--copper\)/g, 'var(--primary)');
content = content.replace(/rgba\(184,115,51/g, 'rgba(214,26,32');

// Replace Fonts
content = content.replace(/fontFamily:"'Cormorant Garamond',serif", /g, 'fontWeight: 700, letterSpacing: "-0.02em", ');
content = content.replace(/fontFamily:"'Cinzel',serif", /g, 'fontWeight: 800, ');
content = content.replace(/fontFamily:"'DM Sans',sans-serif", /g, '');

// Clean up weird artifacts if any
content = content.replace(/font-weight: 300;/g, 'font-weight: 400;');

// Replace specific words (Fortis -> Fusion Hub)
content = content.replace(/FORTIS/g, 'FUSION HUB');
content = content.replace(/Human Capital Solutions/g, 'Integrated Business Solutions');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx updated!');
