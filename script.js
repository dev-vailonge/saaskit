// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
const mobileMenu = document.querySelector('[data-mobile-menu]');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Pricing toggle
const pricingToggle = document.querySelector('[data-pricing-toggle]');
const pricingMonthly = document.querySelector('[data-pricing-monthly]');
const pricingYearly = document.querySelector('[data-pricing-yearly]');

if (pricingToggle && pricingMonthly && pricingYearly) {
    pricingToggle.addEventListener('change', () => {
        pricingMonthly.classList.toggle('hidden');
        pricingYearly.classList.toggle('hidden');
    });
}

// FAQ Toggle
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.flex');
    const answer = item.querySelector('.mt-4');
    const arrow = item.querySelector('.fas.fa-chevron-down');

    question.addEventListener('click', () => {
        // Toggle answer visibility
        answer.classList.toggle('hidden');
        
        // Rotate arrow
        arrow.style.transform = answer.classList.contains('hidden') 
            ? 'rotate(0deg)' 
            : 'rotate(180deg)';
        
        // Add transition
        arrow.style.transition = 'transform 0.3s ease';
    });
});

// Form validation
const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const email = contactForm.querySelector('[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (!email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to your backend
        console.log('Form submitted:', { email, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-primary-color transition-all duration-300 z-50';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = `${progress}%`;
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-dark-color text-white px-3 py-1 rounded text-sm z-50';
        tooltip.textContent = element.getAttribute('data-tooltip');
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - 30}px`;
        tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
        
        document.body.appendChild(tooltip);
        
        element.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});

// Image Modal Functions
function openImageModal() {
    document.getElementById('imageModal').classList.remove('hidden');
    document.getElementById('imageModal').classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeImageModal(event) {
    if (event) {
        event.stopPropagation();
    }
    document.getElementById('imageModal').classList.remove('flex');
    document.getElementById('imageModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeImageModal();
    }
});

// Close modal when pressing ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && !document.getElementById('imageModal').classList.contains('hidden')) {
        closeImageModal();
    }
});

// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;

function updateCarousel() {
    const carousel = document.getElementById('carousel');
    if (!carousel) return;
    
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('bg-[#FFD700]', index === currentSlide);
        dot.classList.toggle('bg-gray-400', index !== currentSlide);
    });
}

function moveCarousel(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
    moveCarousel(1);
}, 5000); 