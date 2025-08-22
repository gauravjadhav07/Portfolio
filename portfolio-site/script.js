
/* Icons */
window.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* Smooth scroll for same-page links */
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Close mobile menu if open
  mobileMenu.classList.remove('open');
  mobileMenu.style.display = 'none';
});

/* Mobile menu */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = open ? 'none' : 'flex';
    mobileMenu.classList.toggle('open', !open);
  });
}

/* Copy buttons */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy');
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.innerHTML;
      btn.innerHTML = 'Copied!';
      setTimeout(() => btn.innerHTML = original, 1200);
    } catch (err) {
      alert('Copy failed: ' + err);
    }
  });
});

/* Reveal on scroll */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{ threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));


// Dark mode toggle
const themeToggle = document.createElement('button');
themeToggle.textContent = '🌙';
themeToggle.className = 'btn outline';
themeToggle.style.marginLeft = '8px';
document.querySelector('.nav-cta').appendChild(themeToggle);

function setDark(dark) {
  if (dark) document.body.classList.add('dark');
  else document.body.classList.remove('dark');
  localStorage.setItem('dark', dark ? '1' : '0');
}
setDark(localStorage.getItem('dark')==='1');

themeToggle.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark');
  setDark(dark);
});
