// Ahmad Albash Zia — Portfolio interactions
(function () {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    // Auto-tag common repeating elements so we don't need to hand-edit every node
    document
      .querySelectorAll(
        ".project-card, main .cert-card, .skills-list, .intro-box, #Projects > ul, #Certifications > ul"
      )
      .forEach((el) => el.setAttribute("data-reveal", ""));

    const targets = document.querySelectorAll("[data-reveal]");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in-view"));
      return;
    }

    // Stagger cards within the same parent slightly
    const seen = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const parent = entry.target.parentElement;
            const index = seen.get(parent) || 0;
            seen.set(parent, index + 1);
            entry.target.style.transitionDelay = Math.min(index * 45, 300) + "ms";
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
  }

  /* ---------- Hero typing effect ---------- */
  function initTyping() {
    const el = document.getElementById("typed-name");
    if (!el) return;
    const full = el.getAttribute("data-text") || el.textContent.trim();
    if (reduceMotion) {
      el.textContent = full;
      return;
    }
    el.textContent = "";
    let i = 0;
    const speed = 55;
    (function step() {
      if (i <= full.length) {
        el.textContent = full.slice(0, i);
        i++;
        setTimeout(step, speed);
      }
    })();
  }

  /* ---------- Active tab highlighting on scroll ---------- */
  function initActiveTabs() {
    const tabs = document.querySelectorAll(".tab[href^='#']");
    if (!tabs.length) return;
    const sections = Array.from(tabs)
      .map((t) => document.querySelector(t.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const tab = document.querySelector(`.tab[href='${id}']`);
          if (!tab) return;
          if (entry.isIntersecting) {
            tabs.forEach((t) => t.classList.remove("active"));
            tab.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initReveal();
    initTyping();
    initActiveTabs();
  });
})();
