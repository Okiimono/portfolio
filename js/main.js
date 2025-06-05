// Curseur personnalisé
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
});

// Effet hover sur les liens
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Animation des compétences
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 100}ms`;
    observer.observe(item);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animation des projets
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 200}ms`;
    observer.observe(card);
});

// Effet de parallaxe sur la section hero
const hero = document.querySelector('#accueil');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    error.style.color = '#e74c3c';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '0.5rem';
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.style.borderColor = '#e74c3c';
};

const removeError = (input) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.style.borderColor = '#ddd';
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validation du nom
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Le nom est requis');
        isValid = false;
    } else {
        removeError(nameInput);
    }

    // Validation de l'email
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'L\'email est requis');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Veuillez entrer un email valide');
        isValid = false;
    } else {
        removeError(emailInput);
    }

    // Validation du message
    if (messageInput.value.trim() === '') {
        showError(messageInput, 'Le message est requis');
        isValid = false;
    } else {
        removeError(messageInput);
    }

    if (isValid) {
        // Simulation d'envoi du formulaire
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        // Simuler une requête API
        // contactForm may not be defined on all pages, so check for its existence
        if (contactForm) {
            setTimeout(() => {
            submitButton.textContent = 'Message envoyé !';
            submitButton.style.backgroundColor = '#2ecc71';
            contactForm.reset();

            // Réinitialiser le bouton après 3 secondes
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }, 1500);
    }
}
});

// Project Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('projectModal');
    const closeModalButton = document.querySelector('.modal .close-button');
    const clickableProjects = document.querySelectorAll('.clickable-project');

    if (!projectModal || !closeModalButton) {
        // Modal elements not found on this page, so do nothing.
        return;
    }

    const modalProjectImage = document.getElementById('modalProjectImage');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectTagsContainer = document.getElementById('modalProjectTags');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectLinksContainer = document.getElementById('modalProjectLinks');

    clickableProjects.forEach(projectCard => {
        projectCard.addEventListener('click', () => {
            const image = projectCard.dataset.projectImage;
            const title = projectCard.dataset.projectTitle;
            const tags = JSON.parse(projectCard.dataset.projectTags || '[]');
            const description = projectCard.dataset.projectDescription;
            const links = JSON.parse(projectCard.dataset.projectLinks || '[]');

            modalProjectImage.src = image;
            modalProjectImage.alt = title; // Set alt text for accessibility
            modalProjectTitle.textContent = title;
            modalProjectDescription.textContent = description;

            // Populate tags
            modalProjectTagsContainer.innerHTML = ''; // Clear previous tags
            tags.forEach(tagText => {
                const tagSpan = document.createElement('span');
                tagSpan.textContent = tagText;
                modalProjectTagsContainer.appendChild(tagSpan);
            });

            // Populate links
            modalProjectLinksContainer.innerHTML = ''; // Clear previous links
            links.forEach(linkInfo => {
                const linkAnchor = document.createElement('a');
                linkAnchor.href = linkInfo.href;
                linkAnchor.classList.add('btn');
                linkAnchor.target = '_blank'; // Open links in new tab
                linkAnchor.rel = 'noopener noreferrer';

                const icon = document.createElement('i');
                icon.className = linkInfo.iconClass; // Use className for multiple classes
                linkAnchor.appendChild(icon);
                linkAnchor.appendChild(document.createTextNode(linkInfo.text));
                modalProjectLinksContainer.appendChild(linkAnchor);
            });

            projectModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when close button is clicked
    closeModalButton.addEventListener('click', () => {
        projectModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.style.display === 'block') {
            projectModal.style.display = 'none';
            document.body.style.overflow = ''; // Restore background scrolling
        }
    });
});
