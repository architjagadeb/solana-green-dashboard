const FUN_FACTS = [
  "Solana uses less energy per tx than a Google search",
  "Solana's annual energy use equals ~986 US homes",
  "Bitcoin uses 2.2 million times more energy per tx than Solana",
];

const CO2_PER_TX_SOLANA = 0.00024;
const CO2_PER_TX_BITCOIN = 543;
const CO2_SAVED_PER_MILLION = (CO2_PER_TX_BITCOIN - CO2_PER_TX_SOLANA) * 1000000;

function formatUpdatedTime(date) {
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function setLastUpdated() {
  const timeEl = document.getElementById("lastUpdated");
  if (!timeEl) return;
  const now = new Date();
  timeEl.textContent = formatUpdatedTime(now);
  timeEl.setAttribute("datetime", now.toISOString());
}

function animateCounter(element, target, decimals = 0, suffix = "", duration = 1200) {
  const start = 0;
  const startTime = performance.now();

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + (target - start) * eased;
    element.textContent = `${currentValue.toFixed(decimals)}${suffix}`;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function animateStaticMetricCounters() {
  const counters = document.querySelectorAll("[data-counter][data-target]");
  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-target") ?? "0");
    const decimals = Number(counter.getAttribute("data-decimals") ?? "0");
    const suffix = counter.getAttribute("data-suffix") ?? "";
    animateCounter(counter, target, decimals, suffix);
  });
}

function animateCO2SavedCounter() {
  const savedCounter = document.getElementById("co2SavedCounter");
  if (!savedCounter) return;

  const duration = 2200;
  const startTime = performance.now();
  const startValue = 0;

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = startValue + (CO2_SAVED_PER_MILLION - startValue) * eased;
    savedCounter.textContent = `${Math.floor(value).toLocaleString()} g`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function rotateFunFacts() {
  const factTargets = ["factText1", "factText2", "factText3"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!factTargets.length) return;

  factTargets.forEach((target, index) => {
    target.textContent = FUN_FACTS[index] ?? "";
  });
}

function setupSectionReveal() {
  const revealSections = document.querySelectorAll(".reveal");
  if (!revealSections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealSections.forEach((section) => observer.observe(section));
}

function updateDemoDataBadge() {
  const badge = document.getElementById("demoDataBadge");
  if (!badge) return;
  badge.hidden = !window.isUsingDemoTPSData;
}

async function refreshTPS() {
  const tpsValues = await window.fetchTPS();
  window.updateTPSChart(tpsValues);
  updateDemoDataBadge();

  const avgTPS = tpsValues.length
    ? tpsValues.reduce((sum, value) => sum + value, 0) / tpsValues.length
    : 0;

  const tpsMetric = document.getElementById("tpsMetric");
  if (tpsMetric) {
    animateCounter(tpsMetric, avgTPS, 0, "", 900);
  }
}

async function initializeDashboard() {
  window.initEnergyChart();
  window.initCO2Chart();
  window.initTPSChart();

  setLastUpdated();
  setupSectionReveal();
  animateStaticMetricCounters();
  animateCO2SavedCounter();
  rotateFunFacts();
  await refreshTPS();

  setInterval(async () => {
    await refreshTPS();
    setLastUpdated();
  }, 10000);
}

document.addEventListener("DOMContentLoaded", initializeDashboard);
