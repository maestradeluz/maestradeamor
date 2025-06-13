document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling para los enlaces de navegación
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animación simple para los servicios
    const servicios = document.querySelectorAll('.servicio');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    servicios.forEach(servicio => {
        servicio.style.opacity = '0';
        servicio.style.transform = 'translateY(20px)';
        servicio.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(servicio);
    });

    // Carrusel simple para testimonios
    const testimoniosCarousel = document.querySelector('.testimonios-carousel');
    let isDown = false;
    let startX;
    let scrollLeft;

    testimoniosCarousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - testimoniosCarousel.offsetLeft;
        scrollLeft = testimoniosCarousel.scrollLeft;
    });

    testimoniosCarousel.addEventListener('mouseleave', () => {
        isDown = false;
    });

    testimoniosCarousel.addEventListener('mouseup', () => {
        isDown = false;
    });

    testimoniosCarousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - testimoniosCarousel.offsetLeft;
        const walk = (x - startX) * 2;
        testimoniosCarousel.scrollLeft = scrollLeft - walk;
    });
});

// Lazy loading para imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Reemplaza data-src por src
            img.removeAttribute('data-src'); // Limpia el atributo data-src
            observer.unobserve(img); // Deja de observar esta imagen
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

function getWhatsAppLink() {
    const phoneNumber = "+529994498188";
    const message = "¡Hola! Me interesa una consulta, ¿me puedes dar más información?";
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.checked = false; 
        });
    });
});