(() => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persists in localStorage)
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  const updateIcon = () => {
    const isLight = root.getAttribute("data-theme") === "light";
    const icon = btn?.querySelector(".theme-toggle-icon");
    if (icon) icon.textContent = isLight ? "☼" : "☾";
  };
  updateIcon();

  btn?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });

  // Active nav link based on scroll position
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav a")];

  const setActive = (id) => {
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, { rootMargin: "-20% 0px -70% 0px", threshold: [0.15, 0.35, 0.6] });

  sections.forEach(s => observer.observe(s));
})();
