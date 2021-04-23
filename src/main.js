import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init({
	duration: 800,
});

const sectionResume = document.querySelector('#section-resume');
const sectionProjects = document.querySelector('.section-projects');
const sectionContact = document.querySelector('.section-contact');

// Header navigation buttons
const hamburger = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');

// Animations Components
const intros = document.querySelectorAll('.intro');
const skillCards = document.querySelectorAll('.skill-card');
const toAnimate = document.querySelectorAll('*[data-anim]');

// Header scroll navigation
navbarMenu.addEventListener('click', function (e) {
	if (e.target.classList.contains('navbar-item')) {
		const scrollTo = document.querySelector(
			`.section-${e.target.dataset.section}`
		);
		scrollTo.scrollIntoView({ behavior: 'smooth' });
	}
});

// Hamburger menu button
hamburger.addEventListener('click', function (e) {
	this.classList.toggle('is-active');
	navbarMenu.classList.toggle('is-active');
});

// Animation
const revealAnimation = function (entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.remove(`animate--${entry.target.dataset.anim}`);
		}
	});
};

const introObserver = new IntersectionObserver(revealAnimation, { root: null });

// intros.forEach(intro => {
//     introObserver.observe(intro);
// });

toAnimate.forEach(skillcard => {
	introObserver.observe(skillcard);
});

// Sticky navbar
const navbar = document.querySelector('.navbar');
const navHeight = navbar.getBoundingClientRect().height;
const sectionMe = document.querySelector('.section-me');

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

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${2 * navHeight}px`,
});

// headerObserver.observe(sectionMe);

// Slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.arrow--left');
const btnRight = document.querySelector('.arrow--right');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
let maxSlide = slides.length - 2;

const createDots = function () {
	slides.forEach((s, i) => {
		dotContainer.insertAdjacentHTML(
			'beforeend',
			`
    <button class="dots__dot" data-slide="${i}"></button>
    `
		);
	});
};

const activateDot = function (slide) {
	document
		.querySelectorAll('.dots__dot')
		.forEach(dot => dot.classList.remove('dots__dot--active'));

	document
		.querySelector(`.dots__dot[data-slide="${slide}"]`)
		.classList.add('dots__dot--active');
};

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
