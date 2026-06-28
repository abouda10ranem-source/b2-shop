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
    { src: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', cat: 'homme', label: 'Style Urbain' },
    { src: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400', cat: 'homme', label: 'Collection Été' },
    { src: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400', cat: 'collection', label: 'Nouvelle Collection' },
    { src: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400', cat: 'homme', label: 'Look Casual' },
    { src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', cat: 'collection', label: 'Tenues Tendances' },
    { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400', cat: 'shop', label: 'Notre Boutique' },
    { src: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400', cat: 'homme', label: 'Mode Homme' },
    { src: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400', cat: 'collection', label: 'Accessoires' },
    { src: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400', cat: 'shop', label: 'Showroom' },
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
    { name: 'Veste Prada', desc: 'Collection Automne/Hiver', price: '12,500 DA', badge: 'Nouveau', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400' },
    { name: 'Jean Premium', desc: 'Coupe slim, qualité supérieure', price: '5,800 DA', badge: 'Populaire', img: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400' },
    { name: 'T-Shirt Design', desc: 'Coton bio, confort absolu', price: '2,900 DA', badge: 'Offre spéciale', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400' },
    { name: 'Ensemble KZR Paris', desc: 'Look élégant et tendance', price: '15,200 DA', badge: 'Nouveau', img: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400' },
    { name: 'Cargo Pants', desc: 'Style streetwear', price: '4,500 DA', badge: 'Tendance', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400' },
    { name: 'Chemise Zara', desc: 'Coupe moderne', price: '6,200 DA', badge: 'Populaire', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400' },
    { name: 'Sneakers Premium', desc: 'Édition limitée', price: '8,900 DA', badge: 'Exclusif', img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400' },
    { name: 'Accessoires', desc: 'Ceintures, sacs et plus', price: '1,500 DA', badge: 'Nouveau', img: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400' },
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
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400',
    'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=400',
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
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
