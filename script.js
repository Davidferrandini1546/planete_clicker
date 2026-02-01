// ================== VARIABLES ==================
let score = 0;

let clickPower = 10; // puissance clic normal
let clickCost = 200;

let autoClickLevel = 0;
let autoClickPower = 0;
let autoCost = 200;

const tickPerSecond = 10;

let isPaused = false; // état pause

// ================== PLANÈTES (30) ==================
const planets = [
  { name: "Terre 🌍", cost: 500, unlocked: false, color: "radial-gradient(circle, #3fa9f5, #004e92)" },
  { name: "Mars 🔴", cost: 1500, unlocked: false, color: "radial-gradient(circle, #ff6f61, #8b0000)" },
  { name: "Jupiter 🟠", cost: 4000, unlocked: false, color: "radial-gradient(circle, #f5b041, #935116)" },
  { name: "Saturne 🪐", cost: 9000, unlocked: false, color: "radial-gradient(circle, #d7bde2, #5b2c6f)" },
  { name: "Uranus 💙", cost: 18000, unlocked: false, color: "radial-gradient(circle, #76d7ea, #1f618d)" },
  { name: "Neptune 🌌", cost: 40000, unlocked: false, color: "radial-gradient(circle, #34495e, #2c3e50)" },
  { name: "Pluton ❄️", cost: 80000, unlocked: false, color: "radial-gradient(circle, #ccd1d1, #566573)" },
  { name: "Exoplanète 🔭", cost: 150000, unlocked: false, color: "radial-gradient(circle, #a569bd, #512e5f)" },
  { name: "Naine Rouge 🔴", cost: 300000, unlocked: false, color: "radial-gradient(circle, #ec7063, #922b21)" },
  { name: "Géante Bleue 🔵", cost: 600000, unlocked: false, color: "radial-gradient(circle, #5dade2, #1b4f72)" },
  { name: "Supernova 💥", cost: 1200000, unlocked: false, color: "radial-gradient(circle, #f4d03f, #9a7d0a)" },
  { name: "Trou Noir 🕳️", cost: 2500000, unlocked: false, color: "radial-gradient(circle, #000000, #1c2833)" },
  { name: "Multivers 🌈", cost: 5000000, unlocked: false, color: "radial-gradient(circle, #f9e79f, #7d3c98)" },
  { name: "Dimension X 🌀", cost: 10000000, unlocked: false, color: "radial-gradient(circle, #48c9b0, #0b5345)" },
  { name: "Étoile Morte ☄️", cost: 20000000, unlocked: false, color: "radial-gradient(circle, #7b7d7d, #1b2631)" },
  { name: "Nébuleuse Rose 🌸", cost: 40000000, unlocked: false, color: "radial-gradient(circle, #f1948a, #922b21)" },
  { name: "Amas Stellaire ✴️", cost: 80000000, unlocked: false, color: "radial-gradient(circle, #d4efdf, #196f3d)" },
  { name: "Hypernova ⚡", cost: 160000000, unlocked: false, color: "radial-gradient(circle, #f7dc6f, #7d6608)" },
  { name: "Faille Spatiale 🕸️", cost: 320000000, unlocked: false, color: "radial-gradient(circle, #af7ac5, #512e5f)" },
  { name: "Univers Parallèle ♾️", cost: 640000000, unlocked: false, color: "radial-gradient(circle, #85c1e9, #1f618d)" },
  { name: "Réalité Zéro 🧬", cost: 1200000000, unlocked: false, color: "radial-gradient(circle, #82e0aa, #145a32)" },
  { name: "Singularité 🔮", cost: 2500000000, unlocked: false, color: "radial-gradient(circle, #bb8fce, #4a235a)" },
  { name: "Créateur Cosmique 👁️", cost: 5000000000, unlocked: false, color: "radial-gradient(circle, #fdfefe, #17202a)" },
  { name: "Dieu Stellaire ✨", cost: 10000000000, unlocked: false, color: "radial-gradient(circle, #f5eef8, #5b2c6f)" },
  { name: "Fin du Temps ⏳", cost: 20000000000, unlocked: false, color: "radial-gradient(circle, #f2f3f4, #424949)" },
  { name: "Chaos Absolu 🔥", cost: 40000000000, unlocked: false, color: "radial-gradient(circle, #e74c3c, #641e16)" },
  { name: "Éternité ♾️", cost: 80000000000, unlocked: false, color: "radial-gradient(circle, #d6eaf8, #1f618d)" },
  { name: "Origine 🌟", cost: 160000000000, unlocked: false, color: "radial-gradient(circle, #fdebd0, #9a7d0a)" },
  { name: "Création 🔆", cost: 320000000000, unlocked: false, color: "radial-gradient(circle, #fcf3cf, #7d6608)" },
  { name: "Infini Absolu 🌀", cost: 640000000000, unlocked: false, color: "radial-gradient(circle, #ebdef0, #4a235a)" }
];

// ================== CRÉATION DES BOUTONS ==================
const planetsContainer = document.getElementById("planetsContainer");

planets.forEach((planet, index) => {
  const btn = document.createElement("button");
  btn.id = `planet${index + 1}`;
  btn.innerHTML = `<span class="planet-name">${planet.name}</span><br>Coût : ${planet.cost}`;
  btn.onclick = () => buyPlanet(index);

  // cacher toutes sauf la première
  if (index !== 0) btn.style.display = "none";

  planetsContainer.appendChild(btn);
});

// ================== AUTO-CLICK ==================
setInterval(() => {
  if (!isPaused && autoClickPower > 0) {
    score += autoClickPower / tickPerSecond;
    updateScore();
  }
}, 1000 / tickPerSecond);

// ================== CLIC MANUEL ==================
const planetEl = document.getElementById("planet");
planetEl.addEventListener("click", () => {
  if (isPaused) return;
  score += clickPower / 2; // clic normal divisé par 2
  showFloatingScore(`+${clickPower / 2}`);
  animatePlanet();
  updateScore();
});

// ================== VISUELS ==================
function showFloatingScore(text) {
  const span = document.createElement("span");
  span.className = "score-float";
  span.style.left = `${planetEl.offsetLeft + 70 + Math.random() * 40}px`;
  span.style.top = `${planetEl.offsetTop}px`;
  span.textContent = text;
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 1000);
}

function animatePlanet() {
  planetEl.style.transform = "scale(1.1)";
  setTimeout(() => planetEl.style.transform = "scale(1)", 100);
}

// ================== UPGRADES ==================
function buyUpgrade(type) {
  if (isPaused) return;

  if (type === "click" && score >= clickCost) {
    score -= clickCost;
    clickPower *= 2;
    clickCost *= 2;
    document.getElementById("clickCost").textContent = clickCost;
  }

  if (type === "auto" && score >= autoCost) {
    score -= autoCost;
    autoClickLevel++;
    autoClickPower = 320 * autoClickLevel; // auto-click ×320/sec
    autoCost *= 2;
    document.getElementById("autoCost").textContent = autoCost;
  }

  updateScore();
}

// ================== PLANÈTES ==================
function buyPlanet(index) {
  const planet = planets[index];
  const btn = document.getElementById(`planet${index + 1}`);

  if (planet.unlocked || score < planet.cost) return;

  score -= planet.cost;
  planet.unlocked = true;

  // changer planète principale
  planetEl.style.background = planet.color;
  document.getElementById("level").textContent = `${index + 1} / ${planets.length}`;

  // cacher bouton actuel
  btn.style.display = "none";

  // montrer bouton suivant
  const nextBtn = document.getElementById(`planet${index + 2}`);
  if (nextBtn) nextBtn.style.display = "inline-block";

  updateScore();
}

// ================== PLANÈTES RESTANTES ==================
function updateRemainingPlanets() {
  const unlockedCount = planets.filter(p => p.unlocked).length;
  const remaining = planets.length - unlockedCount;
  document.getElementById("remainingPlanets").textContent =
    `🌌 Planètes restantes : ${remaining}`;
}

// ================== BOUTON PAUSE ==================
function togglePause() {
  isPaused = !isPaused;
  const btn = document.getElementById("pauseButton");
  btn.textContent = isPaused ? "▶️ Jouer" : "⏸️ Pause";
}

// ================== UI ==================
function updateScore() {
  document.getElementById("score").textContent = Math.floor(score);
  updateButtons();
  updateRemainingPlanets();
}

function updateButtons() {
  planets.forEach((planet, index) => {
    const btn = document.getElementById(`planet${index + 1}`);
    if (btn.style.display !== "none") {
      btn.disabled = score < planet.cost || isPaused;
    }
  });

  document.getElementById("clickUpgrade").disabled = score < clickCost || isPaused;
  document.getElementById("autoUpgrade").disabled = score < autoCost || isPaused;
}

// ================== INIT ==================
updateButtons();
updateRemainingPlanets();
