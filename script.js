// Immediately invoked function expression to avoid global variables
(function () {
    'use strict';

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Elements
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sections = document.querySelectorAll('section');
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    const backToTopButton = document.getElementById('backToTop');
    const animateElements = document.querySelectorAll('.animate-element');
    const fadeInElements = document.querySelectorAll('.fade-in');

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    function toggleMobileMenu() {
        const body = document.body;

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');
        let overlay = document.querySelector('.overlay');

        if (!mobileMenu) {
            mobileMenu = document.createElement('div');
            mobileMenu.className = 'mobile-menu';

            // Clone nav links
            const navMenuClone = document.querySelector('.nav-menu').cloneNode(true);

            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'mobile-menu-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', toggleMobileMenu);

            mobileMenu.appendChild(closeBtn);
            mobileMenu.appendChild(navMenuClone);

            // Create overlay
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.addEventListener('click', toggleMobileMenu);

            // Add to body
            body.appendChild(mobileMenu);
            body.appendChild(overlay);

            // Add event listeners to the cloned links
            const mobileNavLinks = mobileMenu.querySelectorAll('.nav-link');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', () => {
                    toggleMobileMenu();
                    updateActiveNavLink();
                });
            });
        }

        // Toggle mobile menu and overlay
        mobileMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    }

    // Scroll events
    window.addEventListener('scroll', function () {
        handleNavbarScroll();
        updateActiveNavLink();
        handleBackToTopButton();
        animateOnScroll();
    });

    // Initial calls
    handleNavbarScroll();
    updateActiveNavLink();
    animateHeroSection();
    animateOnScroll();
    initiateSkillBars();

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Back to top button click
    if (backToTopButton) {
        backToTopButton.addEventListener('click', scrollToTop);
    }

    // Function to handle back to top button visibility
    function handleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Function to scroll to top
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Function to handle navbar scroll styles
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Function to update active nav link
    function updateActiveNavLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Function to animate elements on scroll
    function animateOnScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Function to animate hero section
    function animateHeroSection() {
        fadeInElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('active');
            }, index * 300);
        });
    }

    // Function to animate skill bars
    function initiateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');

            // Use IntersectionObserver to animate when visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = `${width}%`;
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(bar);
        });
    }

    // Function to handle contact form submission
    function handleContactFormSubmit(e) {
        e.preventDefault();

        // Get form values
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const message = e.target.elements.message.value;

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }

        // Show success message - in a real project, you would send data to a server here
        const formSubmitText = document.createElement('div');
        formSubmitText.className = 'form-submit-success';
        formSubmitText.textContent = 'Thank you for your message! I\'ll get back to you soon.';
        formSubmitText.style.padding = '1rem';
        formSubmitText.style.marginTop = '1rem';
        formSubmitText.style.backgroundColor = 'rgba(var(--primary-rgb), 0.1)';
        formSubmitText.style.color = 'hsl(var(--primary))';
        formSubmitText.style.borderRadius = '0.375rem';
        formSubmitText.style.animation = 'fadeInUp 0.5s forwards';

        // Reset form and show success message
        e.target.reset();
        e.target.appendChild(formSubmitText);

        // Remove message after 5 seconds
        setTimeout(() => {
            if (formSubmitText.parentNode) {
                formSubmitText.remove();
            }
        }, 5000);
    }
})();
