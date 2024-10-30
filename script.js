// Typing effect for the name
const nameElement = document.querySelector('.name');
const fullName = 'Rachel Vincent';
let i = 0;

function typeWriter() {
    if (i < fullName.length) {
        nameElement.innerHTML += fullName.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

typeWriter();

// Intersection Observer for fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project, .contact-item').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Parallax effect for the avatar
const avatar = document.querySelector('.avatar img');
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    avatar.style.transform = `translateY(${scrollPosition * 0.1}px)`;
});

// Smooth hover effect for projects
const projects = document.querySelectorAll('.project');
let activeProject = null;
let animationFrameId = null;

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function animateProjects() {
    projects.forEach(project => {
        const currentFlex = parseFloat(project.style.flex) || 1;
        const targetFlex = project === activeProject ? 2.5 : 0.5;
        const newFlex = lerp(currentFlex, targetFlex, 0.1);
        project.style.flex = newFlex.toString();
    });

    if (activeProject) {
        animationFrameId = requestAnimationFrame(animateProjects);
    }
}

projects.forEach(project => {
    project.addEventListener('mouseenter', () => {
        activeProject = project;
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(animateProjects);
    });

    project.addEventListener('mouseleave', () => {
        activeProject = null;
        project.style.flex = '1';
    });
});

function updateProjects() {
    cancelAnimationFrame(animationFrameId);
    projects.forEach(project => {
        project.style.flex = '1';
    });
}

window.addEventListener('resize', updateProjects); 
