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
    // Configurazione degli slider
    function setupSlider(sliderId, prevId, nextId, dotsId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return; // Previeni errori se l'elemento non esiste

        const track = slider.querySelector('.slider-track');
        const slides = track.querySelectorAll('.project-card-container');
        const prevBtn = document.getElementById(prevId);
        const nextBtn = document.getElementById(nextId);
        const dotsContainer = document.getElementById(dotsId);

        // Variabili di stato
        let currentIndex = 0;
        let slidesToShow = 3;
        let slideWidth = 0;
        let slideGap = 20; // Spazio tra le card (gap nel CSS)

        // Creazione dei pallini indicatori
        function createDots() {
            dotsContainer.innerHTML = '';
            const totalGroups = Math.ceil(slides.length / slidesToShow);

            for (let i = 0; i < totalGroups; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', () => {
                    goToSlide(i * slidesToShow);
                });

                dotsContainer.appendChild(dot);
            }
        }

        // Aggiornamento dei pallini attivi
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            const activeIndex = Math.floor(currentIndex / slidesToShow);

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }

        // Funzione per calcolare la larghezza dello slide e slides visibili
        function calcSlideWidth() {
            const sliderWidth = slider.querySelector('.slider-container').offsetWidth;

            // Responsive
            if (window.innerWidth < 768) {
                slidesToShow = 1;
            } else if (window.innerWidth < 992) {
                slidesToShow = 2;
            } else {
                slidesToShow = 3;
            }

            // Calcola la larghezza delle slide considerando il gap
            // Sottrai il valore totale dei gap per ottenere lo spazio effettivo per le card
            const totalGapWidth = (slidesToShow - 1) * slideGap;
            slideWidth = (sliderWidth - totalGapWidth) / slidesToShow;

            // Imposta larghezza delle slide
            slides.forEach(slide => {
                slide.style.minWidth = `${slideWidth}px`;
            });

            // Ricalcola e crea dots
            createDots();

            // Aggiorna posizione
            goToSlide(currentIndex);
        }

        // Funzione per andare ad uno slide specifico
        function goToSlide(index) {
            // Limitiamo l'indice
            if (index < 0) index = 0;
            if (index > slides.length - slidesToShow) index = slides.length - slidesToShow;

            currentIndex = index;

            // Calcola la traslazione considerando anche i gap tra le card
            const translation = currentIndex * (slideWidth + slideGap);
            track.style.transform = `translateX(-${translation}px)`;

            updateDots();
        }

        // Eventi per i bottoni
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - slidesToShow);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + slidesToShow);
        });

        // Inizializzazione
        calcSlideWidth();

        // Gestione resize
        window.addEventListener('resize', calcSlideWidth);

        return { goToSlide, calcSlideWidth };
    }

    // Inizializza gli slider
    try {
        const uniSlider = setupSlider('university-slider', 'uni-prev', 'uni-next', 'uni-dots');
        const personalSlider = setupSlider('personal-slider', 'personal-prev', 'personal-next', 'personal-dots');
    } catch (e) {
        console.log('Slider initialization error:', e);
    }
});