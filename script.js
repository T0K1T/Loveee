const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Fungsi Matematika Hati (Parametrik)
function heart(t) {
  return {
    x: 16 * Math.pow(Math.sin(t), 3),
    y: 13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  };
}

let particles = [];
// Dikurangi agar teks tidak terlalu rapat dan pusing dibaca
const TOTAL = 80;

for (let i = 0; i < TOTAL; i++) {
  let t = (i / TOTAL) * Math.PI * 2;
  let pos = heart (t);
  particles.push({ x: pos.x, y: pos.y });
}

let scale = 15; // Ukuran hati
let angle = 0;

function draw() {
  // Memberikan efek trail sedikit agar gerakan halus
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Pengaturan Style Teks
  ctx.font = "bold 17px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  
  // Warna Gradasi & Glow
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#0a1f6b";
  ctx.fillStyle = "#ffc0cb";
  
  // Update sudut: Semakin kecil angka ini, semakin lambat putarannya
  angle += 0.002;
  
  particles.forEach((p, i) => {
    // Efek warna dinamis (berubah sedikit tiap partikel)
    ctx.fillStyle = `hsl(${340 + (i % 20)}, 100%, 70%)`;
    
    let x = p.x;
    let y = p.y;
    
    // Rotasi Dasar
    let rotX = x * Math.cos(angle) - y * Math.sin(angle);
    let rotY = x * Math.sin(angle) + y * Math.cos(angle);
    
    let finalX = canvas.width / 2 + rotX * scale;
    let finalY = canvas.height / 2 - rotY * scale;
    
    ctx.save();
    ctx.translate(finalX, finalY);
    
    // Membatalkan rotasi pada teks agar tulisan SELALU tegak lurus (mudah dibaca)
    // Jika ingin teks ikut miring sedikit, hapus baris di bawah ini
    ctx.rotate(0);
    
    ctx.fillText("𝐀𝐥𝐞𝐤𝐬𝐞𝐲", 0, 0);
    ctx.restore();
  });
  
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);