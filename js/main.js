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

  // === Gallery Images (real Instagram products from @b2__shop_vetemment) ===
  const galleryImages = [
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.2885-15/482006071_17941080104967758_1473240740957647758_n.jpg', cat: 'homme', label: 'Jean Diesel' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/729578961_17997137870967758_8333459578623706970_n.jpg', cat: 'collection', label: 'Nouvelle Arrivage' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730463929_17996989898967758_55202870687828460_n.jpg', cat: 'homme', label: 'Collection' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730045686_17996843909967758_2617382734085417286_n.jpg', cat: 'homme', label: 'Style Tendance' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727159096_17996695808967758_5029176312718669528_n.jpg', cat: 'collection', label: 'Look du Jour' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/728951284_17996546735967758_16463228073791349_n.jpg', cat: 'shop', label: 'Nouveauté' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/723961729_17996261276967758_8553865686091458932_n.jpg', cat: 'homme', label: 'ASICS Collection' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727235865_17995956344967758_7090710050161862794_n.jpg', cat: 'collection', label: 'Promotions' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/722286344_17995805228967758_7657968703257658041_n.jpg', cat: 'shop', label: 'B2 Shop' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.71878-15/726294873_2838433889687558_53583195970935051_n.jpg', cat: 'homme', label: 'Salomon' },
    { src: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.71878-15/721642430_1307155661628886_1703678441588063690_n.jpg', cat: 'collection', label: 'Short Jean' },
    { src: 'https://instagram.falg7-1.fna.fbcdn.net/v/t51.71878-15/723704347_1909686116361797_1744085672139441047_n.jpg', cat: 'shop', label: 'Nike' },
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

  // === Products (using real product images from Instagram) ===
  const products = [
    { name: 'Jean Diesel', desc: 'Qualité premium, coupe parfaite', price: '6,500 DA', badge: 'Nouveau', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.2885-15/482006071_17941080104967758_1473240740957647758_n.jpg' },
    { name: 'Nouvelle Arrivage', desc: 'Collection été 2026', price: 'À partir de 3,500 DA', badge: 'Tendance', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/729578961_17997137870967758_8333459578623706970_n.jpg' },
    { name: 'Look Tendance', desc: 'Style urbain et décontracté', price: '4,900 DA', badge: 'Populaire', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730463929_17996989898967758_55202870687828460_n.jpg' },
    { name: 'Ensemble Streetwear', desc: 'Look élégant et moderne', price: '8,200 DA', badge: 'Nouveau', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730045686_17996843909967758_2617382734085417286_n.jpg' },
    { name: 'Style du Jour', desc: 'Casual chic', price: '5,500 DA', badge: 'Tendance', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727159096_17996695808967758_5029176312718669528_n.jpg' },
    { name: 'Nouveauté', desc: 'Pièce unique', price: '7,200 DA', badge: 'Exclusif', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/728951284_17996546735967758_16463228073791349_n.jpg' },
    { name: 'ASICS Sport', desc: 'Chaussures sport lifestyle', price: '9,500 DA', badge: 'Sport', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/723961729_17996261276967758_8553865686091458932_n.jpg' },
    { name: 'Promo Spéciale', desc: 'Offre limitée', price: '2,900 DA', badge: 'Promo', img: 'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727235865_17995956344967758_7090710050161862794_n.jpg' },
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

  // === Instagram Feed (real posts from @b2__shop_vetemment) ===
  const instaPosts = [
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.2885-15/482006071_17941080104967758_1473240740957647758_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/729578961_17997137870967758_8333459578623706970_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730463929_17996989898967758_55202870687828460_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/730045686_17996843909967758_2617382734085417286_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727159096_17996695808967758_5029176312718669528_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/728951284_17996546735967758_16463228073791349_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/723961729_17996261276967758_8553865686091458932_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/727235865_17995956344967758_7090710050161862794_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.82787-15/722286344_17995805228967758_7657968703257658041_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.71878-15/726294873_2838433889687558_53583195970935051_n.jpg',
    'https://instagram.falg7-6.fna.fbcdn.net/v/t51.71878-15/721642430_1307155661628886_1703678441588063690_n.jpg',
    'https://instagram.falg7-1.fna.fbcdn.net/v/t51.71878-15/723704347_1909686116361797_1744085672139441047_n.jpg',
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
