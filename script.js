// DOM helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile Navigation
const menuToggle = $('.menu-toggle');
const navLinks = $('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // Close menu when clicking on links
  $$('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      icon.className = 'fas fa-bars';
    });
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = $('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 100);
  }
});

// Typing animation for hero section
const typedWords = $('.typed-words');
if (typedWords) {
  const words = ['mobile apps', 'web solutions', 'desktop software', 'amazing experiences'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeAnimation() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedWords.textContent = currentWord.substring(0, charIndex--);
    } else {
      typedWords.textContent = currentWord.substring(0, charIndex++);
    }

    let speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentWord.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      speed = 200;
    }
    
    setTimeout(typeAnimation, speed);
  }

  typeAnimation();
}

// Smooth scrolling
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const target = $(targetId);
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlighting
function updateActiveNav() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-links a');
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// About section tabs
const tabButtons = $$('.tab-btn');
const tabContents = $$('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.getAttribute('data-tab');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    button.classList.add('active');
    const targetContent = $(`#${targetTab}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  });
});

// Contact form handling
const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show success message and reset form
    showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    updateFormLabels();
  });
}

// Form label animations
function updateFormLabels() {
  const formInputs = $$('.form-field input, .form-field textarea');
  formInputs.forEach(input => {
    function checkValue() {
      if (input.value.trim() !== '') {
        input.setAttribute('data-has-value', '');
      } else {
        input.removeAttribute('data-has-value');
      }
    }
    
    input.addEventListener('input', checkValue);
    input.addEventListener('blur', checkValue);
    checkValue();
  });
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  const existingNotification = $('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `;
  
  notification.style.cssText = `
    position: fixed; top: 90px; right: 20px;
    background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3b82f6'};
    color: white; padding: 1rem 1.5rem; border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); z-index: 10000;
    transform: translateX(100%); transition: transform 0.3s ease; max-width: 350px;
  `;
  
  const notificationContent = notification.querySelector('.notification-content');
  notificationContent.style.cssText = 'display: flex; align-items: center; justify-content: space-between; gap: 1rem;';
  
  const closeButton = notification.querySelector('.notification-close');
  closeButton.style.cssText = 'background: none; border: none; color: white; font-size: 1.5rem; cursor: pointer; padding: 0; line-height: 1;';
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove
  const autoRemove = setTimeout(() => {
    removeNotification(notification);
  }, 5000);
  
  closeButton.addEventListener('click', () => {
    clearTimeout(autoRemove);
    removeNotification(notification);
  });
}

function removeNotification(notification) {
  notification.style.transform = 'translateX(100%)';
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 300);
}

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.style.cssText = `
  position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px;
  background: #3b82f6; color: white; border: none; border-radius: 50%;
  font-size: 1.2rem; cursor: pointer; display: none; align-items: center;
  justify-content: center; z-index: 1000; transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  scrollToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hover effects for scroll button
scrollToTopBtn.addEventListener('mouseenter', () => {
  scrollToTopBtn.style.transform = 'translateY(-3px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
  scrollToTopBtn.style.transform = 'translateY(0)';
});

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  updateFormLabels();
  
  // Fade-in animation for sections
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe all sections
  $$('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
  
  // Set hero section visible immediately
  const heroSection = $('#home');
  if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.style.transform = 'translateY(0)';
  }
});