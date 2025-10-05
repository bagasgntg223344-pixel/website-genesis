/* ===============================
   GENESIS Website Script
   =============================== */

/* ======== NAVBAR TOGGLE (Mobile) ======== */
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
    const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
    navToggle.setAttribute("aria-expanded", !expanded);
  });
}

/* ======== HERO SLIDESHOW ======== */
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
const nextSlideBtn = document.getElementById("nextSlide");
const prevSlideBtn = document.getElementById("prevSlide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto Slide every 5s
setInterval(nextSlide, 5000);

// Manual Controls
if (nextSlideBtn && prevSlideBtn) {
  nextSlideBtn.addEventListener("click", nextSlide);
  prevSlideBtn.addEventListener("click", prevSlide);
}

/* ======== DIVISION MATERIALS MODAL ======== */
const modal = document.getElementById("modal-materials");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");

const divisionMaterials = {
  writing: `
    <ul>
      <li>How to write objective news articles</li>
      <li>Basic feature writing techniques</li>
      <li>Ethics of journalism & fact-checking</li>
      <li>Writing workshop documents (PDF)</li>
    </ul>`,
  photography: `
    <ul>
      <li>Basic camera composition and lighting</li>
      <li>Photojournalism principles</li>
      <li>Editing tips for news photography</li>
      <li>Event documentation guides</li>
    </ul>`,
  design: `
    <ul>
      <li>Magazine layout & typography</li>
      <li>Poster and infographic design</li>
      <li>Using Canva / Figma for journalism design</li>
      <li>Design ethics and visual consistency</li>
    </ul>`,
  sosmed: `
    <ul>
      <li>Managing social media posts responsibly</li>
      <li>Creating engaging captions</li>
      <li>Scheduling tools for publication</li>
      <li>Digital branding for GENESIS</li>
    </ul>`,
  editorial: `
    <ul>
      <li>Editing and proofreading basics</li>
      <li>Fact verification and plagiarism check</li>
      <li>Publication management system</li>
      <li>Redaction ethics and confidentiality</li>
    </ul>`,
};

document.querySelectorAll("[data-modal='modal-materials']").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const division = e.target.getAttribute("data-division");
    modalTitle.textContent = `${division
      .charAt(0)
      .toUpperCase()}${division.slice(1)} Division Materials`;
    modalBody.innerHTML = divisionMaterials[division] || "<p>No materials available yet.</p>";
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

/* ======== GALLERY LIGHTBOX ======== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.dataset.full || img.src;
    lightboxCaption.textContent = img.nextElementSibling.textContent;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  });
}

window.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

/* ======== JOIN FORM (Simulated Submission) ======== */
const joinForm = document.getElementById("joinForm");
const formNote = document.getElementById("formNote");

if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    formNote.textContent = "Submitting...";
    formNote.style.color = "#666";

    setTimeout(() => {
      formNote.textContent = "Thank you! Your application has been received 🎉";
      formNote.style.color = "#1a237e";
      joinForm.reset();
    }, 1500);
  });
}

/* ======== SCROLL ANIMATION (Fade-in) ======== */
const sections = document.querySelectorAll(".section, .card, .gallery-item");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.9;
  sections.forEach((el) => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.6s ease-out";
    } else {
      el.style.opacity = 0;
      el.style.transform = "translateY(30px)";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

