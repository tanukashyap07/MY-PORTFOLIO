// script.js
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Typing effect for caption
const roles = ["UI/UX Designer", "Power BI", "Python", "ML", "Frontend Developer"];
let i = 0, j = 0, currentText = '', isDeleting = false;
const typingTextElement = document.getElementById('typing-text');

function type() {
    const fullText = roles[i];
    if(isDeleting) {
        currentText = fullText.substring(0, j--);
    } else {
        currentText = fullText.substring(0, j++);
    }
    typingTextElement.textContent = currentText;

    if(!isDeleting && j === fullText.length+1) {
        isDeleting = true;
        setTimeout(type, 600);
        return;
    }
    if(isDeleting && j === 0) {
        isDeleting = false;
        i = (i+1) % roles.length;
        setTimeout(type, 400);
        return;
    }
    setTimeout(type, isDeleting ? 50 : 80);
}

type();
