document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Móvil
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Cerrar menú al hacer clic en un enlace
    if (navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false;
            });
        });
    }

    // 2. Smooth Scroll (Desplazamiento suave)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Animación simple de aparición (Fade In)
    // Muy ligera para el procesador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const elementos = document.querySelectorAll('.servicio, .testimonio-card');
    elementos.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 4. Lazy Loading (Carga diferida de imágenes)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imgObserver.observe(img));
    }
});

// Función global para WhatsApp
function getWhatsAppLink() {
    const phoneNumber = "+529834539979";
    const message = "¡Hola Sara! Me interesa una consulta, ¿me puedes dar más información?";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    return `${baseUrl}?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
}