document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        const icon = mobileBtn.querySelector('i');
        
        if (navLinks.classList.contains('mobile-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            navbar.style.background = 'rgba(11, 15, 25, 0.98)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            updateNavbarBackground();
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 2. Navbar Background Update on Scroll
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 15, 25, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(11, 15, 25, 0.5)';
            navbar.style.boxShadow = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);
    updateNavbarBackground(); // init

    // 3. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // run once
            }
        });
    }, observerOptions);

    // Provide fallback if JS is slow or fails
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('appear');
            }
            observer.observe(el);
        });
    }, 100);
});
