

//  1. PAGE LOADER 
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('hidden'), 1600);
    }
});


//  2. SCROLL REVEAL

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});

const observeReveal = (el) => {
    if (el && !el.classList.contains('visible')) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    }
};

//  3. STAGGERED CARDS
// Why Choose Us cards appear one by one
document.querySelectorAll('.cards-container .card').forEach((card, i) => {
    card.style.transitionDelay = `${(i + 1) * 0.12}s`;
});

// Testimonial cards stagger
document.querySelectorAll('.testimonials-grid .testimonial-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i + 1) * 0.15}s`;
});

// Blog cards stagger
document.querySelectorAll('.blog-grid .blog-card').forEach((card, i) => {
    card.style.transitionDelay = `${(i + 1) * 0.15}s`;
});

// Process steps stagger
document.querySelectorAll('.process-steps .process-step').forEach((step, i) => {
    step.style.transitionDelay = `${(i + 1) * 0.15}s`;
    observeReveal(step);
});

// Service items stagger
document.querySelectorAll('.services-grid .service-item').forEach((item, i) => {
    item.style.transitionDelay = `${(i + 1) * 0.12}s`;
    observeReveal(item);
});


// 4. COUNTER ANIMATION 
function animateCounter(el) {
    const raw    = el.innerText.trim();
    const target = parseInt(raw.replace(/\D/g, ''));
    const suffix = raw.replace(/[0-9]/g, '');
    if (isNaN(target)) return;

    let count = 0;
    const duration = 1200;           // ms
    const steps    = 60;
    const stepVal  = target / steps;
    const interval = duration / steps;

    const timer = setInterval(() => {
        count += stepVal;
        if (count >= target) {
            el.innerText = target + suffix;
            clearInterval(timer);
        } else {
            el.innerText = Math.floor(count) + suffix;
        }
    }, interval);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target); 
        }
    });
}, { threshold: 0.6 });

// Targets both hero stats and about stats
document.querySelectorAll(
    '.hero-achieve h3, .about-achieve h3'
).forEach(el => counterObserver.observe(el));


// 5. ACTIVE NAV LINK ON SCROLL 
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navigation nav a');

if (sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href').includes(id)) {
                        link.classList.add('active-nav');
                    }
                });
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => navObserver.observe(s));
}


//  6. HEADER SHRINK ON SCROLL 

const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}


//7. SMOOTH SCROLL FOR ANCHOR LINKS 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// 8. RUNNING TEXT PAUSE ON HOVER 
const runningText = document.querySelector('.running-text p');
const runningContainer = document.querySelector('.running-text-container');

if (runningText && runningContainer) {
    runningContainer.addEventListener('mouseenter', () => {
        runningText.style.animationPlayState = 'paused';
    });
    runningContainer.addEventListener('mouseleave', () => {
        runningText.style.animationPlayState = 'running';
    });
}