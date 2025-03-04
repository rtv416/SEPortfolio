function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

function animateProjects() {
  projects.forEach((project) => {
    const currentFlex = Number.parseFloat(project.style.flex) || 1
    const targetFlex = project === activeProject ? 2.5 : 0.5
    const newFlex = lerp(currentFlex, targetFlex, 0.1)
    project.style.flex = newFlex.toString()
  })

  if (activeProject) {
    animationFrameId = requestAnimationFrame(animateProjects)
  }
}

const projects = document.querySelectorAll(".project")
let activeProject = null
let animationFrameId = null

projects.forEach((project) => {
  project.addEventListener("mouseenter", () => {
    activeProject = project
    cancelAnimationFrame(animationFrameId)
    animationFrameId = requestAnimationFrame(animateProjects)
  })

  project.addEventListener("mouseleave", () => {
    activeProject = null
    project.style.flex = "1"
  })
})

function updateProjects() {
  cancelAnimationFrame(animationFrameId)
  projects.forEach((project) => {
    project.style.flex = "1"
  })
}

window.addEventListener("resize", updateProjects)

// Vanta.js fog effect for the introduction and contact sections
var VANTA = window.VANTA
VANTA.FOG({
  el: "#introduction",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  highlightColor: 0x5c5c3d,
  midtoneColor: 0x77815c,
  lowlightColor: 0x3e2f2f,
  baseColor: 0x1a1a1a,
  blurFactor: 0.6,
  speed: 1.5,
  zoom: 1.2,
})

// Apply the same effect to the contact section
VANTA.FOG({
  el: "#contact",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  highlightColor: 0x5c5c3d,
  midtoneColor: 0x77815c,
  lowlightColor: 0x3e2f2f,
  baseColor: 0x1a1a1a,
  blurFactor: 0.6,
  speed: 1.5,
  zoom: 1.2,
})

// Typing effect for the name
const nameElement = document.querySelector(".name")
const fullName = "Rachel Vincent"
let i = 0

function typeWriter() {
  if (i < fullName.length) {
    nameElement.innerHTML += fullName.charAt(i)
    i++
    setTimeout(typeWriter, 100)
  }
}

typeWriter()

// Intersection Observer for fade-in effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll(".project, .contact-item").forEach((el) => {
  el.style.opacity = 0
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  observer.observe(el)
})

// Parallax effect for the avatar
const avatar = document.querySelector(".avatar img")
window.addEventListener("scroll", () => {
  const scrollPosition = window.pageYOffset
  avatar.style.transform = `translateY(${scrollPosition * 0.1}px)`
})

// Initialize sliders for all projects
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider("project1")
  initializeSlider("project2")
  initializeSlider("project3")
  initializeSlider("project4")
})

function initializeSlider(projectId) {
  const sliderContainer = document.querySelector(`#${projectId} .slider-container`)
  const slides = document.querySelectorAll(`#${projectId} .slide`)
  const dotsContainer = document.querySelector(`#${projectId} .slider-dots`)
  let currentSlide = 0
  let touchStartX = 0
  let touchEndX = 0

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div")
    dot.classList.add("dot")
    if (index === 0) dot.classList.add("active")
    dot.addEventListener("click", () => goToSlide(index))
    dotsContainer.appendChild(dot)
  })

  // Show first slide
  slides[0].classList.add("active")

  // Navigation functions
  function goToSlide(n) {
    slides[currentSlide].classList.remove("active")
    dotsContainer.children[currentSlide].classList.remove("active")
    currentSlide = (n + slides.length) % slides.length
    slides[currentSlide].classList.add("active")
    dotsContainer.children[currentSlide].classList.add("active")
  }

  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Add touch support
  sliderContainer.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX
  })

  sliderContainer.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    const difference = touchStartX - touchEndX

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }

  // Add event listeners
  document.querySelector(`#${projectId} .next`).addEventListener("click", nextSlide)
  document.querySelector(`#${projectId} .prev`).addEventListener("click", prevSlide)
}

