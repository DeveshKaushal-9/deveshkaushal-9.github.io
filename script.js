const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const revealNodes = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const delay = Number(entry.target.getAttribute("data-delay") || 0);
      window.setTimeout(() => {
        entry.target.classList.add("show");
      }, delay);
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node) => revealObserver.observe(node));

const menuBtn = document.getElementById("menuBtn");
const siteMenu = document.getElementById("siteMenu");
if (menuBtn && siteMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = siteMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const meterBar = document.getElementById("scrollMeterBar");
const updateMeter = () => {
  if (!meterBar) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  meterBar.style.width = `${pct}%`;
};

window.addEventListener("scroll", updateMeter, { passive: true });
window.addEventListener("resize", updateMeter);
updateMeter();

const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sectionIds = navLinks
  .map((a) => a.getAttribute("href"))
  .filter((href) => href && href.startsWith("#"));
const sections = sectionIds
  .map((id) => document.querySelector(id))
  .filter((node) => node instanceof HTMLElement);

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = `#${entry.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    });
  },
  { threshold: 0.35 }
);

sections.forEach((section) => activeObserver.observe(section));
