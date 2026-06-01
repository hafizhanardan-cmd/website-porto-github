// --- JAVASCRIPT APP LOGIC FOR PORTFOLIO ---

// Set dynamic current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// ULTRA-SMOOTH TEXT SLIDING & FADING ANIMATION (Ganti Emerald Menjadi Blue Sesuai Request)
const slidingTitle = document.getElementById('sliding-title');
const titles = [
    'Mahasiswa <span class="text-brand-blue ml-1.5">D4 Teknik Pengolahan Limbah</span>',
    '<span class="text-brand-blue italic">D4 Waste Treatment Engineering Student</span>'
];
let index = 0;

setInterval(() => {
    // Smoothly Fade out & Slide up slightly
    if (slidingTitle) {
        slidingTitle.classList.add('opacity-0', '-translate-y-2');
        
        setTimeout(() => {
            // Change text content
            index = (index + 1) % titles.length;
            slidingTitle.innerHTML = titles[index];
            
            // Instantly move to bottom before sliding back up
            slidingTitle.classList.remove('-translate-y-2');
            slidingTitle.classList.add('translate-y-2');
            
            // Trigger smooth fade in & slide up back to position
            setTimeout(() => {
                slidingTitle.classList.remove('opacity-0', 'translate-y-2');
            }, 50);
        }, 350); // Match transition speed
    }
}, 3500);

// AUTO-SLIDING CAROUSEL IMAGES FOR EXPERIENCE & ACADEMIC CARDS
const carousels = document.querySelectorAll('.carousel');
carousels.forEach(carousel => {
    const inner = carousel.querySelector('.carousel-inner');
    const slides = inner.querySelectorAll('img');
    let currentSlide = 0;
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        inner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000 + Math.random() * 1200); // Randomize interval slightly to make it look organic
});

// DARK MODE TOGGLE FUNCTIONALITY (Saves in Local Storage)
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Cek Local Storage atau default tema sistem
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// MOBILE MENU NAVIGATION
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
    });
});

// SCROLL REVEAL / FLOATING ACTION BACK-TO-TOP BUTTON
const backToTopBtn = document.getElementById('back-to-top');
const mainNav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    // Floating Button Control
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'scale-75');
            backToTopBtn.classList.add('opacity-100', 'scale-100');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'scale-75');
            backToTopBtn.classList.remove('opacity-100', 'scale-100');
        }
    }

    // Navbar Solidification Control
    if (mainNav) {
        if (window.scrollY > 50) {
            mainNav.classList.add('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95');
            mainNav.classList.remove('bg-white/80', 'dark:bg-slate-900/80');
        } else {
            mainNav.classList.remove('shadow-md', 'bg-white/95', 'dark:bg-slate-900/95');
            mainNav.classList.add('bg-white/80', 'dark:bg-slate-900/80');
        }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// INTERACTIVE FILTER SYSTEM FOR EXPERIENCES
const filterButtons = document.querySelectorAll('.filter-btn');
const experienceCards = document.querySelectorAll('.exp-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active Button Style
        filterButtons.forEach(b => b.classList.remove('bg-brand-blue', 'text-white'));
        filterButtons.forEach(b => b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400'));
        
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
        btn.classList.add('bg-brand-blue', 'text-white');

        // Card Visibility Control
        const filterVal = btn.getAttribute('data-filter');
        experienceCards.forEach(card => {
            if (filterVal === 'all' || card.getAttribute('data-category') === filterVal) {
                card.classList.remove('hidden');
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
            }
        });
    });
});

// INTERACTIVE MODAL COMPONENT (WITH DYNAMIC IMAGE)
const modal = document.getElementById('detail-modal');
const modalTitle = document.getElementById('modal-title');
const modalType = document.getElementById('modal-type');
const modalImage = document.getElementById('modal-image');
const modalDesc = document.getElementById('modal-desc');
const closeModal = document.getElementById('close-modal');
const btnModalOk = document.getElementById('btn-modal-ok');

document.querySelectorAll('.btn-detail').forEach(button => {
    button.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.btn-detail');
        if (targetBtn && modalTitle && modalType && modalImage && modalDesc && modal) {
            modalTitle.textContent = targetBtn.getAttribute('data-title');
            modalType.textContent = targetBtn.getAttribute('data-type');
            
            // If targeted component has carousel, extract first image to display inside modal
            const carousel = targetBtn.closest('.exp-card')?.querySelector('.carousel-inner img');
            modalImage.src = carousel ? carousel.src : targetBtn.getAttribute('data-image');
            
            modalDesc.textContent = targetBtn.getAttribute('data-desc');
            
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.firstElementChild.classList.remove('scale-95');
                modal.firstElementChild.classList.add('scale-100');
            }, 50);
        }
    });
});

function hideModal() {
    if (modal) {
        modal.firstElementChild.classList.remove('scale-100');
        modal.firstElementChild.classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 150);
    }
}
if (closeModal) closeModal.addEventListener('click', hideModal);
if (btnModalOk) btnModalOk.addEventListener('click', hideModal);
if (modal) {
    modal.addEventListener('click', (e) => { if(e.target === modal) hideModal(); });
}

// ANIMATED SKILL BARS ON SCROLL (USING INTERSECTION OBSERVER)
const skillsContainer = document.getElementById('skills-container');
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillBars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-target');
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

if (skillsContainer) skillObserver.observe(skillsContainer);

// INTELLIGENT SCROLLSPY TO DETECT ACTIVE SECTION
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-brand-blue', 'dark:text-white', 'font-extrabold', 'border-b-2', 'border-brand-blue');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('text-brand-blue', 'dark:text-white', 'font-extrabold');
        }
    });
});

// FORM TO GMAIL DIRECT CONNECTION FUNCTIONALITY
const contactForm = document.getElementById('gmail-direct-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent standard page reloads
        
        const senderName = document.getElementById('form-name').value;
        const senderContact = document.getElementById('form-contact-back').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        // Build beautifully structured email content
        const emailReceiver = 'hafizhanardan@student.ppns.ac.id';
        const emailSubject = `Pesan Portofolio - ${subject}`;
        const emailBody = `Halo Hafizhan,%0D%0D` +
                          `Ada pesan baru dari pengunjung website portofolio Anda.%0D%0D` +
                          `=====================================%0D` +
                          `Detail Pengirim:%0D` +
                          `=====================================%0D` +
                          `Nama Lengkap   : ${senderName}%0D` +
                          `Kontak Balik   : ${senderContact}%0D%0D` +
                          `=====================================%0D` +
                          `Pesan / Maksud Kolaborasi:%0D` +
                          `=====================================%0D` +
                          `"${message}"%0D%0D` +
                          `Silakan balas ke kontak pengirim di atas jika diperlukan.%0D%0D` +
                          `Salam,%0D` +
                          `Sistem Integrasi Portofolio hafizhan.side`;

        // Open direct Gmail Web Compose link on Desktop
        const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailReceiver}&su=${encodeURIComponent(emailSubject)}&body=${emailBody}`;
        
        // Standard mailto link as fallback for mobile devices
        const mailtoUrl = `mailto:${emailReceiver}?subject=${encodeURIComponent(emailSubject)}&body=${emailBody}`;

        // Smart redirection based on screen size
        if (window.innerWidth > 768) {
            window.open(gmailComposeUrl, '_blank');
        } else {
            window.location.href = mailtoUrl;
        }

        // Clear the form fields after sending
        contactForm.reset();
    });
}