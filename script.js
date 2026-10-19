const roleElement = document.getElementById("typed-role");
const roles = ["Aspiring Software Developer", "Web Dev in Progress", "Machine Learning Explorer", "Professional Problem Solver"];
let roleIndex = 0, letterIndex = 0, deleting = false;
function typeRole() {
  if (!roleElement || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (roleElement) roleElement.textContent = roles[0];
    return;
  }
  const current = roles[roleIndex];
  roleElement.textContent = current.slice(0, letterIndex);
  if (!deleting && letterIndex < current.length) { letterIndex++; setTimeout(typeRole, 68); }
  else if (!deleting) { deleting = true; setTimeout(typeRole, 1350); }
  else if (letterIndex > 0) { letterIndex--; setTimeout(typeRole, 30); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 250); }
}
typeRole();
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuToggle?.setAttribute("aria-expanded", "false");
}));
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("visible"));
document.getElementById("year").textContent = new Date().getFullYear();

// Dark / light theme toggle. Preference is kept for this browser session.
const themeToggle = document.getElementById("theme-toggle");
const themeMeta = document.getElementById("theme-color-meta");
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const light = theme === "light";
  if (themeToggle) {
    themeToggle.textContent = light ? "☾ Dark" : "☀ Light";
    themeToggle.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
    themeToggle.title = light ? "Switch to dark theme" : "Switch to light theme";
  }
  if (themeMeta) themeMeta.setAttribute("content", light ? "#f7f7fb" : "#101018");
}
const savedTheme = (() => { try { return sessionStorage.getItem("srija-theme"); } catch (_) { return null; } })();
setTheme(savedTheme === "light" ? "light" : "dark");
themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  setTheme(next);
  try { sessionStorage.setItem("srija-theme", next); } catch (_) {}
});
