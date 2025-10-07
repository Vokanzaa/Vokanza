const toggle = document.getElementById('theme-toggle');
const logoImg = document.getElementById('logo-img');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  document.body.classList.remove('dark-theme', 'light-theme');
  document.body.classList.add(savedTheme);
  if (toggle) toggle.checked = savedTheme === 'light-theme';
  if (logoImg) logoImg.src = savedTheme === 'light-theme' ? 'logo1.png' : 'logo.png';
}

if (toggle) {
  toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
    const currentTheme = document.body.classList.contains('light-theme') ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', currentTheme);
    if (logoImg) logoImg.src = currentTheme === 'light-theme' ? 'logo1.png' : 'logo.png';
  });
}

if (logoImg) {
  logoImg.style.cursor = 'pointer';
  logoImg.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));

  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });
  }

  const carousels = document.querySelectorAll('.carousel-container');

  function adjustCarouselHeight() {
    const viewportHeight = window.innerHeight;
    const rows = 4.5;
    const offset = 150;
    const carouselHeight = (viewportHeight - offset) / rows;
    carousels.forEach(c => c.style.height = `${carouselHeight}px`);
  }

  window.addEventListener('load', adjustCarouselHeight);
  window.addEventListener('resize', adjustCarouselHeight);

  carousels.forEach(container => {
    const track = container.querySelector('.carousel-track');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');
    let index = 0;
    const items = Array.from(track.children);
    const shuffled = items.sort(() => Math.random() - 0.5);
    track.innerHTML = '';
    shuffled.forEach(item => track.appendChild(item));

    const updatePosition = () => {
      const itemWidth = shuffled[0].getBoundingClientRect().width + 16;
      const maxIndex = shuffled.length - Math.floor(track.getBoundingClientRect().width / itemWidth);
      if (index > maxIndex) index = 0;
      if (index < 0) index = maxIndex;
      track.style.transform = `translateX(-${index * itemWidth}px)`;
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index--;
        updatePosition();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index++;
        updatePosition();
      });
    }

    window.addEventListener('resize', updatePosition);
    updatePosition();
  });
});

document.querySelectorAll('.product-carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const images = track.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');
  let index = 0;

  function updateCarousel() {
    const width = images[0].clientWidth;
    track.style.transform = `translateX(-${index * width}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % images.length;
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      updateCarousel();
    });
  }

  window.addEventListener('resize', updateCarousel);
});

// Параллакс баннера
window.addEventListener('scroll', () => {
  const bannerImg = document.querySelector('.banner img');
  if (bannerImg) {
    const offset = window.scrollY;
    bannerImg.style.transform = `translateY(${offset * 0.2}px)`; // 0.2 = скорость параллакса
  }
});

// PDF переключение
const pdfButtons = document.querySelectorAll('.pdf-file-btn');
const pdfFrame = document.getElementById('pdf-frame');

pdfButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.dataset.src;
    pdfFrame.src = src;
  });
});

// Полноэкранный режим
const fullscreenBtn = document.getElementById('pdf-fullscreen-btn');
const pdfDisplay = document.querySelector('.pdf-display');

fullscreenBtn.addEventListener('click', () => {
  pdfDisplay.classList.toggle('pdf-fullscreen');
});

