/* ============================================================
   STARFIELD CANVAS
   ============================================================ */
(function () {
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');

  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function initStars() {
    stars = [];
    const count = Math.floor((w * h) / 5000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.3 + 0.05,
        dir: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 200, 255, ${s.alpha})`;
      ctx.fill();

      s.x += Math.cos(s.dir) * s.speed;
      s.y += Math.sin(s.dir) * s.speed;

      if (s.x < 0) s.x = w;
      if (s.x > w) s.x = 0;
      if (s.y < 0) s.y = h;
      if (s.y > h) s.y = 0;

      s.alpha += (Math.random() - 0.5) * 0.02;
      s.alpha = Math.max(0.05, Math.min(0.9, s.alpha));
    }

    // Nebula gradients for depth
    const g1 = ctx.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.4);
    g1.addColorStop(0, 'rgba(145, 94, 255, 0.06)');
    g1.addColorStop(1, 'transparent');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, w, h);

    const g2 = ctx.createRadialGradient(w * 0.8, h * 0.6, 0, w * 0.8, h * 0.6, w * 0.35);
    g2.addColorStop(0, 'rgba(0, 212, 170, 0.05)');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, w, h);

    requestAnimationFrame(drawStars);
  }

  resize();
  initStars();
  drawStars();
  window.addEventListener('resize', () => { resize(); initStars(); });
})();

/* ============================================================
   TYPEWRITER
   ============================================================ */
(function () {
  const phrases = [
    'ML Models',
    'RAG Pipelines',
    'Data Insights',
    'Neural Networks',
    'AI Applications',
    'Predictive Systems',
  ];
  const el = document.getElementById('typewriter');
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 50 : 80);
  }
  setTimeout(type, 1400);
})();

/* ============================================================
   NAVBAR SCROLL EFFECT
   ============================================================ */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(5, 8, 22, 0.95)';
      nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(5, 8, 22, 0.7)';
      nav.style.boxShadow = 'none';
    }
  });

  // Smooth active link highlight
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.getAttribute('id');
    });
    links.forEach(l => {
      l.style.color = l.getAttribute('href') === '#' + current ? 'var(--white)' : '';
    });
  });
})();

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
(function () {
  const cards = document.querySelectorAll(
    '.project-card, .skill-category, .about-card, .contact-card, .about-text, .about-highlights, .timeline-item, .edu-card'
  );

  cards.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.index * 60 || 0);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(el => observer.observe(el));
})();

/* ============================================================
   PROJECT CARD STAGGER
   ============================================================ */
(function () {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.04}s`;
  });
})();

/* ============================================================
   HAMBURGER MENU (MOBILE)
   ============================================================ */
(function () {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');

  btn.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? '' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(5, 8, 22, 0.97)';
    links.style.padding = '1rem 2rem 1.5rem';
    links.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    if (open) {
      links.style.display = 'none';
    }
  });

  // Close on nav link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 680) links.style.display = 'none';
    });
  });
})();
