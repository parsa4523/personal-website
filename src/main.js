import AOS from 'aos';
import 'aos/dist/aos.css';

// Animation on scroll
AOS.init({
	duration: 800,
});

// Header navigation buttons
const hamburger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');

// Navigation Components
const IntroButton = document.querySelector('.intro__btn');

// Header scroll navigation
navbarMenu.addEventListener('click', function (e) {
	if (e.target.classList.contains('navbar-item')) {
		const scrollTo = document.querySelector(
			`.section-${e.target.dataset.section}`
		);
		scrollTo.scrollIntoView({ behavior: 'smooth' });
	}
});

// CTA scroll navigation
IntroButton.addEventListener('click', function (e) {
	const scrollTo = document.querySelector(
		`.section-${e.target.dataset.section}`
	);
	scrollTo.scrollIntoView({ behavior: 'smooth' });
});

// Hamburger menu button
hamburger.addEventListener('click', function (e) {
	this.classList.toggle('is-active');
	navbarMenu.classList.toggle('is-active');
});

// Sticky navbar
const navbar = document.querySelector('.navbar');

const stickyNav = function (entries) {
	const [entry] = entries;
	if (!entry.isIntersecting) {
		navbar.classList.add('is-fixed-top');
		navbar.classList.remove('m-2');
		navbar.classList.add('p-1');
	} else {
		navbar.classList.remove('is-fixed-top');
		navbar.classList.remove('p-1');
		navbar.classList.add('m-2');
	}
};

// Slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.arrow--left');
const btnRight = document.querySelector('.arrow--right');

let curSlide = 0;
let maxSlide = slides.length - 2;

window.addEventListener('resize', function () {
	if (window.innerWidth < 640) {
		maxSlide = slides.length - 1;
	} else {
		maxSlide = slides.length - 2;
	}
});

const goToSlide = function (slide) {
	slides.forEach(
		(s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
	);
};

goToSlide(0);

// Next slide
const nextSlide = function () {
	if (curSlide === maxSlide) {
		curSlide = 0;
	} else {
		curSlide++;
	}

	goToSlide(curSlide);
};

const prevSlide = function () {
	if (curSlide === 0) {
		curSlide = maxSlide;
	} else {
		curSlide--;
	}
	goToSlide(curSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
	if (e.key === 'ArrowLeft') prevSlide();
	if (e.key === 'ArrowRight') nextSlide();
});
