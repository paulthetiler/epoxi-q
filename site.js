const toggle = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (toggle && mobileNav) {
  const closeMenu = () => {
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('open', !isOpen);
  });

  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
}

const sections = [...document.querySelectorAll('main section[id], main > .hero')];
const desktopLinks = [...document.querySelectorAll('header nav a')];

if ('IntersectionObserver' in window && desktopLinks.length) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const id = visible.target.classList.contains('hero') ? 'top' : visible.target.id;
    desktopLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
  }, { rootMargin: '-30% 0px -55%', threshold: [0.05, 0.25, 0.5] });
  sections.forEach((section) => observer.observe(section));
}

document.querySelectorAll('[aria-disabled="true"]').forEach((item) => {
  item.addEventListener('click', (event) => event.preventDefault());
});
