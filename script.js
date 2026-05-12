// Header scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Carousel
const track = document.getElementById('carouselTrack');
document.querySelector('.car-btn.prev').addEventListener('click', () => {
  track.scrollBy({ left: -340, behavior: 'smooth' });
});
document.querySelector('.car-btn.next').addEventListener('click', () => {
  track.scrollBy({ left: 340, behavior: 'smooth' });
});

// Toast helper
function toast(message) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = message;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 3500);
}

// Sermon play feedback
document.querySelectorAll('.sermon .play').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toast('Estamos preparando tudo para você...');
  });
});

