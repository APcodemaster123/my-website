// ✏️ CHANGE YOUR QUESTION HERE IF YOU WANT
document.getElementById("question").textContent = "Parv, will you be my valentine?";

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const message = document.getElementById("message");
const area = document.querySelector(".buttons");

let pos = { x: 200, y: 0 };

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function placeInitial() {
  const ar = area.getBoundingClientRect();
  const br = noBtn.getBoundingClientRect();
  pos.y = (ar.height - br.height) / 2;
  noBtn.style.left = pos.x + "px";
  noBtn.style.top = pos.y + "px";
}

window.addEventListener("load", placeInitial);
window.addEventListener("resize", placeInitial);

// Smooth dodge behavior
area.addEventListener("mousemove", (e) => {
  const ar = area.getBoundingClientRect();
  const br = noBtn.getBoundingClientRect();

  const mx = e.clientX - ar.left;
  const my = e.clientY - ar.top;

  const bx = (br.left - ar.left) + br.width / 2;
  const by = (br.top - ar.top) + br.height / 2;

  const dx = bx - mx;
  const dy = by - my;
  const dist = Math.hypot(dx, dy);

  const danger = 90;

  if (dist < danger) {
    const push = (danger - dist) * 1.4;
    const nx = dx / (dist || 1);
    const ny = dy / (dist || 1);

    pos.x += nx * push;
    pos.y += ny * push;

    pos.x = clamp(pos.x, 0, ar.width - br.width);
    pos.y = clamp(pos.y, 0, ar.height - br.height);

    noBtn.style.left = pos.x + "px";
    noBtn.style.top = pos.y + "px";
  }
});

// Extra escape if hovered
noBtn.addEventListener("mouseenter", () => {
  pos.x += (Math.random() > 0.5 ? 1 : -1) * 60;
  pos.y += (Math.random() > 0.5 ? 1 : -1) * 40;

  const ar = area.getBoundingClientRect();
  const br = noBtn.getBoundingClientRect();

  pos.x = clamp(pos.x, 0, ar.width - br.width);
  pos.y = clamp(pos.y, 0, ar.height - br.height);

  noBtn.style.left = pos.x + "px";
  noBtn.style.top = pos.y + "px";
});

yesBtn.addEventListener("click", () => {
  message.textContent = "I knew it 😌❤️";
});
