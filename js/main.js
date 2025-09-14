// Main JavaScript for Ankur Digital Services Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeContactForm();
    initializeMobileMenu();
    initializeBackToTop();
    initializeCounterAnimation();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('bg-white', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
        } else {
            navbar.classList.remove('bg-white', 'shadow-lg');
            navbar.classList.add('bg-transparent');
        }
        
        // Update active navigation link
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu .nav-link');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just '#' or empty
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                
                // Special handling for different elements
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = '0.1s';
                }
                if (entry.target.classList.contains('testimonial-card')) {
                    entry.target.style.animationDelay = '0.2s';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .industry-card, .feature-card');
    animateElements.forEach(element => observer.observe(element));
}

// Initialize animations
function initializeAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
        card.classList.add('hover-card');
    });
    
    // Add service icon animations
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.classList.add('service-icon');
    });
}

// Counter animation for statistics
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };
    
    // Use Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateContactForm(formObject)) {
                submitContactForm(formObject);
            }
        });
    }
}

// Form validation
function validateContactForm(data) {
    const errors = [];
    
    if (!data.firstName || data.firstName.trim().length < 2) {
        errors.push('First name is required and must be at least 2 characters');
    }
    
    if (!data.lastName || data.lastName.trim().length < 2) {
        errors.push('Last name is required and must be at least 2 characters');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('A valid email address is required');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message is required and must be at least 10 characters');
    }
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form errors
function showFormErrors(errors) {
    let errorMessage = 'Please correct the following errors:\n\n';
    errors.forEach(error => {
        errorMessage += '• ' + error + '\n';
    });
    alert(errorMessage);
}

// Submit contact form
function submitContactForm(data) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Show success message
        showSuccessMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Log form data (for development - remove in production)
        console.log('Contact form submitted:', data);
        
    }, 2000);
}

// Show success message
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-3"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Back to top functionality
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Newsletter subscription (if needed)
function subscribeToNewsletter(email) {
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate API call
    console.log('Newsletter subscription:', email);
    showSuccessMessage('Successfully subscribed to our newsletter!');
}

// Social media sharing functions
function shareOnSocialMedia(platform, url, text) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// Performance optimization
function optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    optimizeImages();
    initializeLazyLoading();
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}