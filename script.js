const roles = ["DATA ANALYST", "ML DEVELOPER", "UI/UX EXPLORER", "PROBLEM SOLVER"];
const typingText = document.getElementById("typing-text");
const progressBar = document.getElementById("progress-bar");
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    const role = roles[roleIndex];
    typingText.textContent = role.slice(0, characterIndex);
    if (!deleting && characterIndex < role.length) {
        characterIndex += 1;
        setTimeout(typeRole, 85);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeRole, 1300);
    } else if (characterIndex > 0) {
        characterIndex -= 1;
        setTimeout(typeRole, 45);
    } else {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeRole, 300);
    }
}

function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${scrollable ? (window.scrollY / scrollable) * 100 : 0}%`;
}

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
window.addEventListener("scroll", updateProgress, { passive: true });
typeRole();
updateProgress();
