// ========== TEXT ROTATION ANIMATION ==========
let words = document.querySelectorAll(".word");
let currentWordIndex = 0;
let maxWordIndex = words.length - 1;

// Initialize the first word
if (words.length > 0) {
    words[currentWordIndex].style.opacity = "1";
}

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    // Fade out and move up the current word
    currentWord.style.opacity = "0";
    currentWord.style.transform = "translateY(-20px)";

    // Prepare next word (hidden below)
    nextWord.style.opacity = "0";
    nextWord.style.transform = "translateY(20px)";
    nextWord.style.visibility = "visible";

    // Small timeout to ensure the transform is applied before fading in
    setTimeout(() => {
        nextWord.style.opacity = "1";
        nextWord.style.transform = "translateY(0)";
        nextWord.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    }, 50);

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

// Initial state for all words except the first
words.forEach((word, index) => {
    if (index !== 0) {
        word.style.opacity = "0";
        word.style.transform = "translateY(20px)";
    }
    word.style.position = "absolute";
    word.style.transition = "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
});

setInterval(changeText, 3000);

// ========== MOBILE MENU TOGGLE ==========
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

if (menuIcon && navlist) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle("bx-x");
        navlist.classList.toggle("open");
    };

    // Close menu when clicking on a nav link
    document.querySelectorAll(".navlist a").forEach(link => {
        link.addEventListener("click", () => {
            menuIcon.classList.remove("bx-x");
            navlist.classList.remove("open");
        });
    });
}

// Close menu on scroll
window.onscroll = () => {
    if (menuIcon && navlist) {
        menuIcon.classList.remove("bx-x");
        navlist.classList.remove("open");
    }
};

// ========== STICKY NAVBAR ==========
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 50);
    }
});

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== SCROLL REVEAL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
const sections = document.querySelectorAll('.services-box, .port-box');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// ========== FORM SUBMISSION HANDLER ==========
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const formButton = this.querySelector('.btn');
        const originalText = formButton.textContent;

        // Show loading state
        formButton.textContent = 'Sending...';
        formButton.style.opacity = '0.7';
        formButton.style.pointerEvents = 'none';

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Reset form
            this.reset();

            // Show success message
            formButton.textContent = 'Message Sent!';
            formButton.style.background = '#00ff00';

            // Reset button after 3 seconds
            setTimeout(() => {
                formButton.textContent = originalText;
                formButton.style.opacity = '1';
                formButton.style.pointerEvents = 'auto';
                formButton.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// ========== DYNAMIC YEAR IN FOOTER ==========
const footerText = document.querySelector('footer p');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = `Copyright &copy; ${currentYear} by Silpa Parida | All Rights Reserved.`;
}

// ========== LOADING ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========
const navLinks = document.querySelectorAll('.navlist a');
const allSections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        link.style.background = '';
        if (link.getAttribute('href').includes(current)) {
            link.style.color = 'var(--hover-color)';
            link.style.background = 'rgba(18, 247, 255, 0.1)';
        }
    });
});

// ========== PERFORMANCE OPTIMIZATION ==========
// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ========== ACCESSIBILITY ENHANCEMENTS ==========
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navlist && navlist.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('open');
    }
});

// Focus trap for mobile menu
if (navlist) {
    const focusableElements = navlist.querySelectorAll('a');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    navlist.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

console.log('🚀 Portfolio website loaded successfully!');

// ========== SERVICE MODAL FUNCTIONALITY ==========
const modal = document.getElementById('service-modal');
const modalContent = modal.querySelector('.service-modal-content');
const modalCloseBtn = modal.querySelector('.modal-close');
const readMoreBtns = document.querySelectorAll('.read-more-btn');

// Modal Elements to Update
const modalIcon = modal.querySelector('.modal-icon i');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');

// Function to open modal
const openModal = (btn) => {
    const serviceBox = btn.closest('.services-box');
    const serviceIconClass = serviceBox.querySelector('.services-icon').className;
    const serviceTitle = serviceBox.querySelector('h3').innerText;
    const detailedContent = serviceBox.querySelector('.service-detail-content').innerHTML;

    // Populate Modal
    modalIcon.className = serviceIconClass; // Use the same icon class
    // Remove specific styling classes from icon if needed to fit modal size
    modalIcon.classList.remove('services-icon');

    modalTitle.innerText = serviceTitle;
    modalBody.innerHTML = detailedContent;

    // Show Modal
    modal.classList.add('active');
    document.body.classList.add('modal-open'); // Prevent background scrolling
};

// Function to close modal
const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
};

// Event Listeners
readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        openModal(btn);
    });
});

modalCloseBtn.addEventListener('click', closeModal);

// Close on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
