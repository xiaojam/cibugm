// --- SLIDER DESKTOP ---
const textSlides = document.querySelectorAll('.text-slide');
const imgSlides = document.querySelectorAll('.img-slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
const totalSlides = textSlides.length;

function goToSlide(n) {
    textSlides.forEach(s => s.classList.remove('active'));
    imgSlides.forEach(s => s.classList.remove('active'));
    indicators.forEach(i => i.classList.remove('active'));
    
    currentSlide = n;
    if (currentSlide >= totalSlides) currentSlide = 0;
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    
    if(textSlides[currentSlide]) textSlides[currentSlide].classList.add('active');
    if(imgSlides[currentSlide]) imgSlides[currentSlide].classList.add('active');
    if(indicators[currentSlide]) indicators[currentSlide].classList.add('active');
}

setInterval(() => {
    if(window.innerWidth > 968) goToSlide(currentSlide + 1);
}, 6000);

// --- COPYRIGHT YEAR AUTOMATIC ---
const yearSpan = document.getElementById('copyright-year');
if(yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// --- MOBILE MENU TOGGLE ---
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const navMenu = document.getElementById('main-nav');
const iconOpen = document.getElementById('icon-menu-open');
const iconClose = document.getElementById('icon-menu-close');

if(menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggleBtn.classList.toggle('active');
        
        if(navMenu.classList.contains('active')) {
            iconOpen.style.display = 'none';
            iconClose.style.display = 'block';
        } else {
            iconOpen.style.display = 'block';
            iconClose.style.display = 'none';
        }
    });
}

// --- DROPDOWN MOBILE ACCORDION ---
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.dropdown-toggle');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault(); 
            dropdown.classList.toggle('open');
        }
    });
});