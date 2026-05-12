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

// Galeria carousel + download
const gTrack = document.getElementById('galleryTrack');
if (gTrack) {
  document.querySelector('#gallery .car-btn.prev').addEventListener('click', () => {
    gTrack.scrollBy({ left: -380, behavior: 'smooth' });
  });
  document.querySelector('#gallery .car-btn.next').addEventListener('click', () => {
    gTrack.scrollBy({ left: 380, behavior: 'smooth' });
  });

  document.querySelectorAll('.gallery .photo').forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      const name = link.getAttribute('download') || 'foto.jpg';
      try {
        toast('Preparando download...');
        const res = await fetch(url, { mode: 'cors' });
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        // Fallback: abre em nova aba
        window.open(url, '_blank');
      }
    });
  });
}

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

