// Select elements
const nav      = document.getElementById('mainNav');
document.body.style.transition = 'background-color 0.5s ease';
const links    = document.querySelectorAll('#navLinks a');
const toggle   = document.getElementById('navToggle');
const navRight = document.getElementById('navRight');
const badge    = document.getElementById('statusBadge');

// ── SCROLL: toggle dark nav background ──
function onScroll() {
  const isScrolled = window.scrollY > 40;

  nav.classList.toggle('scrolled', isScrolled);
  
  // JavaScript controls the background color of the menu when scrolled
  const logo = document.querySelector('.nav-logo');
  if (isScrolled) {
    nav.style.background = '#1A1714';
    if(logo) logo.style.color = '#ffffff';
    links.forEach(a => {
        if (!a.classList.contains('active')) {
            a.style.color = '#a09890';
        }
    });
  } else {
    nav.style.background = 'transparent';
    if(logo) logo.style.color = '#1A1714';
    links.forEach(a => {
        if (!a.classList.contains('active')) {
            a.style.color = '#1A1714';
        }
    });
  }

  badge.classList.toggle('scrolled', isScrolled);
  badge.textContent = isScrolled
    ? 'Scrolled — nav is dark'
    : 'Not scrolled — nav transparent';

  highlightActive();
}

window.addEventListener('scroll', onScroll, { passive: true });

// ── JS INTERACTIVITY: HOVER ──
// JavaScript controls the font/background color when a menu item is hovered
const bodyHoverColors = ['#FADADD', '#D4F1F4', '#CDE7F0', '#FFF5BA']; // Light pink, mint blue, baby blue, pale yellow
let currentSectionBg = ''; // Global tracker for section background

links.forEach((a, index) => {
  a.addEventListener('mouseenter', () => {
    document.body.setAttribute('data-hovering', 'true');
    // Change the background color of the entire page
    document.body.style.backgroundColor = bodyHoverColors[index % bodyHoverColors.length];

    // If it is not the active link, we apply the hover style via JS
    if (!a.classList.contains('active')) {
      a.style.background = '#C1502E';
      a.style.color = '#ffffff';
    }
  });

  a.addEventListener('mouseleave', () => {
    document.body.removeAttribute('data-hovering');
    // Revert body background to current section state
    document.body.style.backgroundColor = currentSectionBg;

    // Revert to the scroll state colors via JS
    if (!a.classList.contains('active')) {
      a.style.background = 'transparent';
      const isScrolled = window.scrollY > 40;
      a.style.color = isScrolled ? '#a09890' : '#1A1714';
    }
  });
});

// ── ACTIVE LINK: highlight the link matching the current section ──
function highlightActive() {
  let currentId = 'home';

  document.querySelectorAll('section[id]').forEach(section => {
    // Trigger color change when section is near the middle of the viewport
    if (window.scrollY >= section.offsetTop - window.innerHeight / 2) {
      currentId = section.id;
    }
  });

  // Assign a unique background color to each section
  const sectionColors = {
    'home': '#FADADD',   // light pink
    'about': '#D4F1F4',  // mint blue
    'work': '#CDE7F0',   // baby blue
    'contact': '#FFF5BA' // pale yellow
  };

  currentSectionBg = sectionColors[currentId] || '';

  // Update body background only if not currently hovering a menu link
  if (!document.body.hasAttribute('data-hovering')) {
    document.body.style.backgroundColor = currentSectionBg;
  }

  links.forEach(a => {
    const matches = a.getAttribute('href') === '#' + currentId;
    a.classList.toggle('active', matches);
  });
}

// ── CLICK: smooth scroll to section + close mobile menu ──
links.forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    closeMobileMenu();
  });
});

// ── MOBILE HAMBURGER TOGGLE ──
toggle.addEventListener('click', () => {
  const isOpen = navRight.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when clicking outside the nav
document.addEventListener('click', e => {
  if (!nav.contains(e.target)) closeMobileMenu();
});

function closeMobileMenu() {
  navRight.classList.remove('open');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

// Run once on load to set correct initial state
onScroll();
