/* Función Global para WhatsApp
   Se define fuera del evento DOMContentLoaded para que funcione con los onclick del HTML */
function getWhatsAppLink() {
    // He actualizado el número al que venía en tu script (+52...)
    const phoneNumber = "+529834539979"; 
    const message = "¡Hola Sara! Me interesa una consulta de amor y protección, ¿me puedes dar más información?";
    const encodedMessage = encodeURIComponent(message);
    
    // Detecta si es dispositivo móvil para usar api.whatsapp o web.whatsapp
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? "https://api.whatsapp.com/send" : "https://web.whatsapp.com/send";
    
    return `${baseUrl}?phone=${phoneNumber}&text=${encodedMessage}`;
}

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cierre automático del menú móvil al hacer clic en un enlace
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (navToggle) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.checked = false; // Desmarca el checkbox para cerrar el menú
            });
        });
    }

    // 2. Smooth Scrolling (Desplazamiento suave) para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Solo aplicamos si el enlace es un ID válido en la página
            if (targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Animación de aparición (Fade-in) al hacer scroll
    // Usamos clases CSS en lugar de estilos inline para no romper los efectos hover del diseño
    const observerOptions = {
        threshold: 0.2, // Se activa cuando el 20% del elemento es visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Aplicar observador a servicios, testimonios y secciones principales
    const elementosAnimables = document.querySelectorAll('.servicio, .testimonio-card, h2, .img-unica-transformacion');
    
    elementosAnimables.forEach(el => {
        el.classList.add('fade-in-up'); // Clase inicial (invisible)
        observer.observe(el);
    });

    // 4. Lazy Loading para imágenes (Optimización de carga)
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded'); // Para efecto visual opcional
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});