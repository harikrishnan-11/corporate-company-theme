const nav     = document.getElementById('navigation');
const overlay = document.getElementById('nav-overlay');
const openBtn = document.getElementById('menu-open-btn');
const closeBtn= document.getElementById('menu-close-btn');

const openMenu  = () => { nav.classList.add('open');    overlay.classList.add('active');    document.body.style.overflow = 'hidden'; }
const closeMenu = () => { nav.classList.remove('open'); overlay.classList.remove('active'); document.body.style.overflow = ''; }

openBtn .addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
overlay .addEventListener('click', closeMenu);

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));