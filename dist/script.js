// These variables store the current state of the model.
let isLightOn = false;
let brightness = 50;
let timerHours = null;
let cycleHour = 0;

// One real second represents one simulated hour.
const DEMO_HOUR_MS = 1000;

const plantRoom = document.querySelector("#plantRoom");
const powerButton = document.querySelector("#powerButton");
const powerDot = document.querySelector("#powerDot");
const statusText = document.querySelector("#statusText");
const sceneLabel = document.querySelector("#sceneLabel");
const startButton = document.querySelector("#startButton");
const cancelButton = document.querySelector("#cancelButton");
const timerDots = document.querySelectorAll(".timer-dot");
const brightnessInputs = document.querySelectorAll('input[name="brightness"]');
const hourReadout = document.querySelector("#hourReadout");
const cycleProgress = document.querySelector("#cycleProgress");
const cycleText = document.querySelector("#cycleText");

function updatePage() {
  // Visual feedback: CSS classes change the room, plant, and lamp glow.
  plantRoom.classList.toggle("light-on", isLightOn);
  plantRoom.classList.toggle("light-off", !isLightOn);
  plantRoom.classList.toggle("light-100", brightness === 100);
  powerButton.classList.toggle("is-on", isLightOn);
  powerButton.setAttribute("aria-pressed", isLightOn);
  powerDot.classList.toggle("is-on", isLightOn);

  timerDots.forEach((dot) => {
    const dotHours = Number(dot.dataset.hours);
    dot.classList.toggle("active", dotHours === timerHours);
  });

  if (timerHours === null) {
    statusText.textContent = `Manual mode · light is ${isLightOn ? "on" : "off"} at ${brightness}% brightness`;
    sceneLabel.textContent = isLightOn ? `Manual light on · ${brightness}%` : "Light is off";
    hourReadout.textContent = "—";
    cycleProgress.style.width = "0%";
    cycleText.textContent = "No daily timer is active.";
  } else {
    // If the timer is active, the first timerHours in each 24-hour cycle are lit.
    const phase = isLightOn ? "ON" : "OFF";
    const remaining = isLightOn ? timerHours - cycleHour : 24 - cycleHour;

    statusText.textContent = `${timerHours}H daily schedule · light is ${phase} · changes in ${remaining}s`;
    sceneLabel.textContent = `Scheduled light ${phase} · simulated hour ${cycleHour + 1}`;
    hourReadout.textContent = `Hour ${cycleHour + 1} / 24`;
    cycleProgress.style.width = `${((cycleHour + 1) / 24) * 100}%`;
    cycleProgress.style.background = isLightOn ? "var(--yellow)" : "var(--deep-green)";
    cycleText.textContent = `${timerHours}s on · ${24 - timerHours}s off · repeats every 24s`;
  }
}

function clearSchedule() {
  timerHours = null;
  cycleHour = 0;
}

powerButton.addEventListener("click", () => {
  // Simplification: using Power always returns the model to manual mode.
  isLightOn = !isLightOn;
  clearSchedule();

  updatePage();
});

brightnessInputs.forEach((input) => {
  input.addEventListener("change", () => {
    brightness = Number(input.value);
    updatePage();
  });
});

startButton.addEventListener("click", () => {
  // Start cycles through the choices and begins a fresh simulated day.
  if (timerHours === null) {
    timerHours = 4;
  } else if (timerHours === 4) {
    timerHours = 8;
  } else if (timerHours === 8) {
    timerHours = 12;
  } else {
    timerHours = 4;
  }

  cycleHour = 0;
  isLightOn = true;
  updatePage();
});

cancelButton.addEventListener("click", () => {
  // This matches the observed behavior: cancelling keeps the light on.
  const hadActiveSchedule = timerHours !== null;
  clearSchedule();
  if (hadActiveSchedule) {
    isLightOn = true;
  }
  updatePage();
});

setInterval(() => {
  if (timerHours !== null) {
    cycleHour = (cycleHour + 1) % 24;
    isLightOn = cycleHour < timerHours;
    updatePage();
  }
}, DEMO_HOUR_MS);

updatePage();
