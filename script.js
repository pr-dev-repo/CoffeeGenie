
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker failed', err));
}

// Brew profiles per method and strength
const brewProfiles = {
  espresso: {
    light: { ratio: 2.0, time: 20 },
    medium: { ratio: 2.25, time: 25 },
    strong: { ratio: 2.5, time: 30 }
  },
  pour_over: {
    light: { ratio: 15, time: 180 },
    medium: { ratio: 16.5, time: 210 },
    strong: { ratio: 18, time: 240 }
  },
  moka_pot: {
    light: { ratio: 9, time: 90 },
    medium: { ratio: 10, time: 120 },
    strong: { ratio: 11, time: 150 }
  }
};

const doseRecommendations = {
  espresso: {
    light: 16,
    medium: 18,
    strong: 20
  },
  pour_over: {
    light: 18,
    medium: 22,
    strong: 26
  },
  moka_pot: {
    light: 14,
    medium: 17,
    strong: 20
  }
};

const tempSuggestions = {
  espresso: "90–96°C (195–205°F)",
  pour_over: "93–96°C (200–205°F)",
  moka_pot: "Room temp (the Moka pot heats it up)"
};

const grindTips = {
  espresso: "Fine grind (like powdered sugar)",
  pour_over: "Medium-coarse (like sea salt)",
  moka_pot: "Medium-fine (like table salt)"
};

// DOM elements
const brewMethodEl = document.getElementById("brewMethod");
const strengthLevelEl = document.getElementById("strengthLevel");
const doseSliderEl = document.getElementById("doseSlider");
const doseValueEl = document.getElementById("doseValue");

const waterOutputEl = document.getElementById("waterOutput");
const ratioOutputEl = document.getElementById("ratioOutput");
const timeOutputEl = document.getElementById("timeOutput");
const tempOutputEl = document.getElementById("tempOutput");
const grindTipEl = document.getElementById("grindTip");

const startTimerEl = document.getElementById("startTimer");
const resetTimerEl = document.getElementById("resetTimer");
const timerDisplayEl = document.getElementById("timerDisplay");

let timerInterval = null;

// Load saved settings
function loadSettings() {
  const saved = JSON.parse(localStorage.getItem("coffeeGeeniePrefs"));
  if (saved) {
    brewMethodEl.value = saved.method || "espresso";
    strengthLevelEl.value = saved.strength || "medium";
    doseSliderEl.value = saved.dose || 18;
    doseValueEl.textContent = `${saved.dose || 18}g`;
  }
}

// Save settings
function saveSettings() {
  const prefs = {
    method: brewMethodEl.value,
    strength: strengthLevelEl.value,
    dose: parseInt(doseSliderEl.value)
  };
  localStorage.setItem("coffeeGeeniePrefs", JSON.stringify(prefs));
}

// Update outputs
function updateCalculations(autoDose = false) {
  const method = brewMethodEl.value;
  const strength = strengthLevelEl.value;

  if (autoDose) {
    const recommendedDose = doseRecommendations[method][strength];
    doseSliderEl.value = recommendedDose;
    doseValueEl.textContent = `${recommendedDose}g`;
  }

  const dose = parseInt(doseSliderEl.value);
  const profile = brewProfiles[method][strength];
  const water = (dose * profile.ratio).toFixed(1);
  const time = profile.time;

  waterOutputEl.textContent = `${water} ml`;
  ratioOutputEl.textContent = `1:${profile.ratio}`;
  timeOutputEl.textContent = `${time} seconds`;
  tempOutputEl.textContent = tempSuggestions[method];
  grindTipEl.textContent = `Grind Tip: ${grindTips[method]}`;

  saveSettings();
}

// Timer logic
function startBrewTimer() {
  clearInterval(timerInterval);
  const timeStr = timeOutputEl.textContent.split(" ")[0];
  let time = parseInt(timeStr);

  if (isNaN(time)) {
    timerDisplayEl.textContent = "Invalid time";
    return;
  }

  timerDisplayEl.textContent = `${time}s`;
  timerInterval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(timerInterval);
      timerDisplayEl.textContent = "Done! ☕";
      return;
    }
    timerDisplayEl.textContent = `${time}s`;
  }, 1000);
}

function resetBrewTimer() {
  clearInterval(timerInterval);
  timerDisplayEl.textContent = "";
}

// Event listeners
brewMethodEl.addEventListener("change", () => updateCalculations(true));
strengthLevelEl.addEventListener("change", () => updateCalculations(true));

doseSliderEl.addEventListener("input", () => {
  doseValueEl.textContent = `${doseSliderEl.value}g`;
  updateCalculations(); // no autoDose
});

startTimerEl.addEventListener("click", startBrewTimer);
resetTimerEl.addEventListener("click", resetBrewTimer);

// Init
loadSettings();
updateCalculations(true);
