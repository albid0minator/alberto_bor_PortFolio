// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Form validation
(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                alert('Grazie per il tuo messaggio! Ti risponderò presto.');
                form.reset();
            }
            form.classList.add('was-validated');
        }, false);
    });
})();

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Elementi del carosello
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const currentSlideElement = document.getElementById('currentSlide');
    const totalSlidesElement = document.getElementById('totalSlides');

    // Impostazioni
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Aggiorna il numero totale di slide
    totalSlidesElement.textContent = totalSlides;

    // Funzione per aggiornare il carosello
    function updateCarousel() {
        // Sposta il track
        track.style.transform = `translateX(-${currentIndex * 50}%)`; // 50% per ogni slide

        // Aggiorna l'indicatore della slide corrente
        currentSlideElement.textContent = currentIndex + 1;

        // Attiva/disattiva i pulsanti in base alla posizione
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === totalSlides - 1;
    }

    // Event listener per i pulsanti
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Aggiungi swipe per dispositivi touch
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Minima distanza per considerare uno swipe

        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe verso sinistra (avanti)
            if (currentIndex < totalSlides - 1) {
                nextButton.click();
            }
        }

        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe verso destra (indietro)
            if (currentIndex > 0) {
                prevButton.click();
            }
        }
    }

    // Inizializza il carosello
    updateCarousel();

    // Opzionale: keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // Aggiungi un piccolo effetto di animazione alle frecce per farle notare all'utente
    function pulseArrows() {
        [prevButton, nextButton].forEach(button => {
            button.classList.add('pulse-animation');
            setTimeout(() => {
                button.classList.remove('pulse-animation');
            }, 1000);
        });
    }

    // Esegui l'animazione dopo un breve ritardo per attirare l'attenzione
    setTimeout(pulseArrows, 1000);
});