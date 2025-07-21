document.addEventListener('DOMContentLoaded', function() {
    console.log('Document ready - Minimalist design!');
    
    // Add font from Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links with improved animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link on scroll with improved smoothness
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: "-80px 0px 0px 0px"
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Header background change on scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio Filtering with smooth transitions
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Add fade out animation
                if (item.style.display !== 'none') {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                }
                
                setTimeout(() => {
                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
    
    // Contact Form Submission with animation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                showNotification('Por favor, complete todos los campos requeridos.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, ingrese un correo electrónico válido.', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Formulario enviado:', { name, email, subject, message });
            
            // Show success message with animation
            showNotification('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.', 'success');
            
            // Reset form with animation
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length - 1; i++) {
                formElements[i].value = '';
            }
        });
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide the button based on scroll position
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Notification system
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerText = message;
        
        // Add styles to notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.padding = '15px 25px';
        notification.style.borderRadius = '0';
        notification.style.backgroundColor = type === 'success' ? '#2a2a2a' : '#e74c3c';
        notification.style.color = 'white';
        notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        notification.style.transition = 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(100px)';
            notification.style.opacity = '0';
            
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 400);
        }, 4000);
    }
    
    // Animate elements when scrolling into view
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const animationObserver = new IntersectionObserver(animateOnScroll, {
        threshold: 0.15,
    });
    
    // Observe elements to animate
    const elementsToAnimate = [
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.portfolio-filter'),
        ...document.querySelectorAll('.portfolio-item'),
        ...document.querySelectorAll('.process-step'),
        ...document.querySelectorAll('.testimonial-card'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form')
    ];
    
    elementsToAnimate.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Typewriter effect for hero section
    function setupTypewriter(element) {
        const originalText = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 50);
    }
    
    // Apply typewriter effect to hero title
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        setTimeout(() => {
            setupTypewriter(heroTitle);
        }, 1500);
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection) {
            const yPos = scrollPosition * 0.3;
            heroSection.style.backgroundPosition = `50% ${yPos}px`;
        }
    });
    
    // Add counter animation for service cards
    let hasRun = false;
    
    function startCounter() {
        if (hasRun) return;
        
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            
            const updateCounter = () => {
                const increment = target / speed;
                
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
        
        hasRun = true;
    }
    
    // Trigger counter animation when scrolling to the stats section
    const statsSection = document.querySelector('.services');
    if (statsSection) {
        const statsSectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                }
            });
        }, { threshold: 0.5 });
        
        statsSectionObserver.observe(statsSection);
    }
    
    // Interactive hover effects for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const img = item.querySelector('img');
        const info = item.querySelector('.portfolio-info');
        
        item.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            info.style.backgroundColor = 'var(--secondary-color)';
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
            info.style.backgroundColor = 'var(--light-color)';
        });
    });
});