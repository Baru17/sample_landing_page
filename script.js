// ===========================================
// Landing Page JavaScript
// ===========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // Modal Functionality
    // ===========================================
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signInModal = document.getElementById('signInModal');
    const signUpModal = document.getElementById('signUpModal');
    const signInClose = document.getElementById('signInClose');
    const signUpClose = document.getElementById('signUpClose');
    const switchToSignUp = document.getElementById('switchToSignUp');
    const switchToSignIn = document.getElementById('switchToSignIn');
    
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(signInModal);
        });
    }
    
    if (signUpBtn) {
        signUpBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(signUpModal);
        });
    }
    
    if (signInClose) {
        signInClose.addEventListener('click', function() {
            closeModal(signInModal);
        });
    }
    
    if (signUpClose) {
        signUpClose.addEventListener('click', function() {
            closeModal(signUpModal);
        });
    }
    
    if (switchToSignUp) {
        switchToSignUp.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signInModal);
            openModal(signUpModal);
        });
    }
    
    if (switchToSignIn) {
        switchToSignIn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signUpModal);
            openModal(signInModal);
        });
    }
    
    // Close modal when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function() {
            closeModal(signInModal);
            closeModal(signUpModal);
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(signInModal);
            closeModal(signUpModal);
        }
    });
    
    // ===========================================
    // Sign In Form Submission
    // ===========================================
    const signInForm = document.getElementById('signInForm');
    if (signInForm) {
        signInForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('signInEmail').value;
            const password = document.getElementById('signInPassword').value;
            
            // Store session (in real app, this would be a server call)
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            alert('Successfully signed in! Welcome back, ' + email);
            closeModal(signInModal);
            signInForm.reset();
            
            // Update UI to show logged in state
            updateAuthUI();
        });
    }
    
    // ===========================================
    // Sign Up Form Submission
    // ===========================================
    const signUpForm = document.getElementById('signUpForm');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('signUpName').value;
            const email = document.getElementById('signUpEmail').value;
            const password = document.getElementById('signUpPassword').value;
            const confirmPassword = document.getElementById('signUpConfirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            // Store user (in real app, this would be a server call)
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            localStorage.setItem('isLoggedIn', 'true');
            
            alert('Account created successfully! Welcome, ' + name);
            closeModal(signUpModal);
            signUpForm.reset();
            
            // Update UI to show logged in state
            updateAuthUI();
        });
    }
    
    // ===========================================
    // Update Auth UI
    // ===========================================
    function updateAuthUI() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const userEmail = localStorage.getItem('userEmail');
        
        if (isLoggedIn && userEmail) {
            // Update nav CTA to show user info
            const navCta = document.querySelector('.nav-cta');
            if (navCta) {
                navCta.innerHTML = `
                    <span class="user-email">${userEmail}</span>
                    <a href="#" class="btn btn-outline" id="signOutBtn">Sign Out</a>
                `;
                
                document.getElementById('signOutBtn').addEventListener('click', function(e) {
                    e.preventDefault();
                    localStorage.clear();
                    location.reload();
                });
            }
        }
    }
    
    updateAuthUI();
    
    // ===========================================
    // Mobile Menu Toggle
    // ===========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navCta = document.querySelector('.nav-cta');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle active class on hamburger
            hamburger.classList.toggle('active');
            
            // Toggle active class on menu and CTA buttons
            navMenu.classList.toggle('active');
            navCta.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                navCta.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // ===========================================
    // Smooth Scrolling for Navigation Links
    // ===========================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's a link that doesn't point to an element
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            
            // Prevent default anchor click behavior
            e.preventDefault();
            
            // Get the target element
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===========================================
    // Active Nav Link Highlighting on Scroll
    // ===========================================
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navItems.forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
        
        // Handle home section (when at top of page)
        if (scrollPosition < 100) {
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            const homeLink = document.querySelector('.nav-link[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    
    // Run on scroll and on page load
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
    
    // ===========================================
    // Testimonial Slider with Swipe Support
    // ===========================================
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    if (testimonialSlider && prevBtn && nextBtn) {
        let currentIndex = 0;
        const cards = testimonialSlider.querySelectorAll('.testimonial-card');
        const totalCards = cards.length;
        let startX = 0;
        let isDragging = false;
        
        // Create dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'testimonials-dots';
        for (let i = 0; i < totalCards; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        testimonialSlider.parentElement.appendChild(dotsContainer);
        
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, totalCards - 1));
            const cardWidth = cards[0].offsetWidth + 32; // card + gap
            testimonialSlider.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
            updateDots();
        }
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            goToSlide(currentIndex - 1);
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            goToSlide(currentIndex + 1);
        });
        
        // Touch/Swipe support
        testimonialSlider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });
        
        testimonialSlider.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
                isDragging = false;
            }
        }, { passive: true });
        
        testimonialSlider.addEventListener('touchend', function() {
            isDragging = false;
        });
        
        // Scroll detection for dot updates
        testimonialSlider.addEventListener('scroll', function() {
            const cardWidth = cards[0].offsetWidth + 32;
            const newIndex = Math.round(testimonialSlider.scrollLeft / cardWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots();
            }
        }, { passive: true });
        
        // Auto-advance slider every 5 seconds
        let autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
        
        // Pause auto-slide on hover/touch
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 5000);
        });
    }
    
    // ===========================================
    // Contact Form Validation & Real Submission
    // ===========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        // Error elements
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        
        // Validation functions
        function validateName() {
            const name = nameInput.value.trim();
            if (name === '') {
                nameError.textContent = 'Name is required';
                return false;
            } else if (name.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                return false;
            } else {
                nameError.textContent = '';
                return true;
            }
        }
        
        function validateEmail() {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                emailError.textContent = 'Email is required';
                return false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address';
                return false;
            } else {
                emailError.textContent = '';
                return true;
            }
        }
        
        function validateMessage() {
            const message = messageInput.value.trim();
            if (message === '') {
                messageError.textContent = 'Message is required';
                return false;
            } else if (message.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                return false;
            } else {
                messageError.textContent = '';
                return true;
            }
        }
        
        // Real-time validation
        nameInput.addEventListener('input', validateName);
        emailInput.addEventListener('input', validateEmail);
        messageInput.addEventListener('input', validateMessage);
        
        // Form submission with Formspree
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate all fields
            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isMessageValid = validateMessage();
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.querySelector('.btn-text').style.display = 'none';
                submitBtn.querySelector('.btn-loading').style.display = 'inline-block';
                
                try {
                    // Submit to Formspree
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        // Show success message
                        formMessage.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.';
                        formMessage.className = 'form-message success';
                        formMessage.style.display = 'block';
                        
                        // Reset form
                        contactForm.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                } catch (error) {
                    // Show error message
                    formMessage.textContent = 'There was a problem sending your message. Please try again.';
                    formMessage.className = 'form-message error';
                    formMessage.style.display = 'block';
                } finally {
                    // Hide loading state
                    submitBtn.disabled = false;
                    submitBtn.querySelector('.btn-text').style.display = 'inline-block';
                    submitBtn.querySelector('.btn-loading').style.display = 'none';
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            } else {
                // Show error message
                formMessage.textContent = 'Please fix the errors above before submitting.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
    
    // ===========================================
    // Set Current Year in Footer
    // ===========================================
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // ===========================================
    // Add CSS class for reduced motion preference
    // ===========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.classList.add('reduced-motion');
    }
    
    // Listen for changes in preference
    prefersReducedMotion.addEventListener('change', function() {
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    });
});
