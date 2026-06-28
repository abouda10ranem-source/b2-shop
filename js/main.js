(function() {
  'use strict';

  // === Loader ===
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
  });

  // === Navbar Scroll ===
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // === Hero Slider ===
  let slideIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const slideInterval = 5000;
  let slideTimer;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
  }

  window.moveSlide = function(dir) {
    clearInterval(slideTimer);
    showSlide(slideIndex + dir);
    slideTimer = setInterval(() => showSlide(slideIndex + 1), slideInterval);
  };

  slideTimer = setInterval(() => showSlide(slideIndex + 1), slideInterval);

  // === Stats Counter ===
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target === 43 ? '4.3' : target.toLocaleString();
        }
      };
      update();
    });
  }

  const statsSection = document.querySelector('.stats');
  let statsAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) observer.observe(statsSection);

  // === Gallery Images ===
  const galleryImages = [
    { src: 'images/01.jpg', cat: 'homme', label: 'Style Urbain' },
    { src: 'images/02.jpg', cat: 'collection', label: 'Collection Été' },
    { src: 'images/03.jpg', cat: 'homme', label: 'Look Tendance' },
    { src: 'images/04.jpg', cat: 'homme', label: 'Casual Chic' },
    { src: 'images/05.jpg', cat: 'collection', label: 'Nouvelle Collection' },
    { src: 'images/06.jpg', cat: 'shop', label: 'Notre Boutique' },
    { src: 'images/07.jpg', cat: 'homme', label: 'Sneakers' },
    { src: 'images/08.jpg', cat: 'collection', label: 'Accessoires' },
    { src: 'images/09.jpg', cat: 'shop', label: 'Showroom' },
    { src: 'images/10.jpg', cat: 'homme', label: 'Mode Homme' },
    { src: 'images/11.jpg', cat: 'collection', label: 'Tenues' },
    { src: 'images/12.jpg', cat: 'shop', label: 'Collections' },
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  let currentFilter = 'all';

  function renderGallery(filter) {
    const filtered = filter === 'all' ? galleryImages : galleryImages.filter(img => img.cat === filter);
    galleryGrid.innerHTML = filtered.map(img => `
      <div class="gallery-item" data-cat="${img.cat}">
        <img src="${img.src}" alt="${img.label}" loading="lazy">
        <div class="overlay"><span>${img.label}</span></div>
      </div>
    `).join('');

    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        openLightbox(imgSrc);
      });
    });
  }

  renderGallery('all');

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGallery(currentFilter);
    });
  });

  // === Products ===
  const products = [
    { name: 'Veste Premium', desc: 'Style élégant, qualité supérieure', price: '6,500 DA', badge: 'Nouveau', img: 'images/01.jpg' },
    { name: 'Collection Été', desc: 'Tendances 2026', price: 'À partir de 3,500 DA', badge: 'Tendance', img: 'images/02.jpg' },
    { name: 'Look Casual', desc: 'Style urbain et décontracté', price: '4,900 DA', badge: 'Populaire', img: 'images/03.jpg' },
    { name: 'Ensemble Chic', desc: 'Look moderne et élégant', price: '8,200 DA', badge: 'Nouveau', img: 'images/04.jpg' },
    { name: 'T-Shirt Design', desc: 'Coton bio, confort absolu', price: '2,500 DA', badge: 'Tendance', img: 'images/05.jpg' },
    { name: 'Chemise Zara', desc: 'Coupe moderne', price: '6,200 DA', badge: 'Populaire', img: 'images/06.jpg' },
    { name: 'Sneakers Premium', desc: 'Édition limitée', price: '8,900 DA', badge: 'Exclusif', img: 'images/07.jpg' },
    { name: 'Accessoires', desc: 'Ceintures, sacs et plus', price: '1,500 DA', badge: 'Nouveau', img: 'images/08.jpg' },
  ];

  const productsGrid = document.getElementById('productsGrid');
  productsGrid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <span class="product-badge">${p.badge}</span>
      </div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <p>${p.desc}</p>
        <span class="product-price">${p.price}</span>
      </div>
    </div>
  `).join('');

  // === Instagram Feed ===
  const instaPosts = [
    'images/01.jpg', 'images/02.jpg', 'images/03.jpg', 'images/04.jpg',
    'images/05.jpg', 'images/06.jpg', 'images/07.jpg', 'images/08.jpg',
    'images/09.jpg', 'images/10.jpg', 'images/11.jpg', 'images/12.jpg',
  ];

  const instaGrid = document.getElementById('instaGrid');
  instaGrid.innerHTML = instaPosts.map(src => `
    <div class="insta-item">
      <img src="${src}" alt="Instagram post" loading="lazy">
      <div class="insta-overlay">
        <span><i class="fas fa-heart"></i> 2.5k</span>
        <span><i class="fas fa-comment"></i> 124</span>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.insta-item').forEach(item => {
    item.addEventListener('click', () => {
      window.open('https://www.instagram.com/b2__shop_vetemment/', '_blank');
    });
  });

  // === Lightbox ===
  function openLightbox(src) {
    const lb = document.createElement('div');
    lb.className = 'lightbox active';
    lb.innerHTML = `
      <button class="lightbox-close">&times;</button>
      <img src="${src}" alt="Photo">
    `;
    document.body.appendChild(lb);
    lb.addEventListener('click', (e) => {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) {
        lb.classList.remove('active');
        setTimeout(() => lb.remove(), 300);
      }
    });
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') {
        lb.classList.remove('active');
        setTimeout(() => lb.remove(), 300);
        document.removeEventListener('keydown', escHandler);
      }
    });
  }

  // === Contact Form ===
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
      btn.disabled = true;
    });
  }

})();
