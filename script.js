document.addEventListener('DOMContentLoaded', () => {
    // 1. MENÚ MÓVIL
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if (navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

    // 2. SCROLL REVEAL (Aparición mágica)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elements = document.querySelectorAll('section, .servicio, .testimonio-card, .img-unica-transformacion');
    elements.forEach(el => {
        el.classList.add('fade-init'); 
        observer.observe(el);
    });

    // 3. LAZY LOAD
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }
});

// WHATSAPP
function getWhatsAppLink() {
    const phoneNumber = "+50239424561";
    const message = "¡Hola Sara! Necesito ayuda. ¿Podría asesorarme?";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    return `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
}