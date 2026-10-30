// ---------- Mobile menu ----------
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('is-open');
  burger.classList.toggle('is-open');
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
);

// ---------- Header hide on scroll down ----------
const header = document.getElementById('header');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 200) header.style.transform = 'translateY(-100%)';
  else header.style.transform = 'translateY(0)';
  lastY = y;
});

// ---------- Hero carousel ----------
const slides = document.querySelectorAll('.hero__slide');
const dotsWrap = document.getElementById('heroDots');
let heroIndex = 0;

slides.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  if (i === 0) b.classList.add('is-active');
  b.addEventListener('click', () => goToHero(i));
  dotsWrap.appendChild(b);
});
const heroDots = dotsWrap.querySelectorAll('button');

function goToHero(i) {
  slides[heroIndex].classList.remove('is-active');
  heroDots[heroIndex].classList.remove('is-active');
  heroIndex = i;
  slides[heroIndex].classList.add('is-active');
  heroDots[heroIndex].classList.add('is-active');
}
let heroTimer = setInterval(() => goToHero((heroIndex + 1) % slides.length), 6000);
dotsWrap.addEventListener('click', () => {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToHero((heroIndex + 1) % slides.length), 6000);
});

// ---------- Testimonials carousel ----------
const quotes = document.querySelectorAll('.quote');
const qDotsWrap = document.getElementById('quotesDots');
let qIndex = 0;

quotes.forEach((_, i) => {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'Testimonial ' + (i + 1));
  if (i === 0) b.classList.add('is-active');
  b.addEventListener('click', () => goToQuote(i));
  qDotsWrap.appendChild(b);
});
const qDots = qDotsWrap.querySelectorAll('button');

function goToQuote(i) {
  quotes[qIndex].classList.remove('is-active');
  qDots[qIndex].classList.remove('is-active');
  qIndex = i;
  quotes[qIndex].classList.add('is-active');
  qDots[qIndex].classList.add('is-active');
}
setInterval(() => goToQuote((qIndex + 1) % quotes.length), 5000);

// ---------- Scroll reveal ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// ---------- Newsletter ----------
const form = document.getElementById('signupForm');
const msg = document.getElementById('signupMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  msg.textContent = 'Thank you — welcome to the warm.';
  form.reset();
});
