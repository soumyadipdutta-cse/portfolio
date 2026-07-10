// ================== Theme Toggle ===================
const themeToggleButton = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load theme from localStorage 
// if (localStorage.getItem("theme") === "dark") {
//   document.body.classList.add("dark-mode");
//   if (themeIcon) themeIcon.textContent = "🌞";
// }

// Force dark mode on first load unless user already selected a theme
if (localStorage.getItem("theme") !== "light") {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark"); // remember dark as default
  if (themeIcon) themeIcon.textContent = "🌞";
}

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeIcon.textContent = "🌞";
  } else {
    localStorage.setItem("theme", "light");
    themeIcon.textContent = "🌙";
  }
});

// ================== Hamburger Menu ===================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  // Auto-close any open modals when hamburger is clicked
  closeAllModals();

  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("active") ? "true" : "false"
  );
});

// ================== Modal Handling ===================
const aboutModal = document.getElementById("aboutModal");
const aboutLink = document.getElementById("aboutLink");
const contactModal = document.getElementById("contactModal");
const contactLink = document.getElementById("contactLink");
const closeButtons = document.querySelectorAll(".close");

aboutLink.addEventListener("click", (e) => {
  e.preventDefault();
  closeAllModals(); // close if any already open
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");

  aboutModal.style.display = "flex";
  aboutModal.classList.add("fade-in");
  document.body.style.overflow = "hidden"; // disable scroll
});

contactLink.addEventListener("click", (e) => {
  e.preventDefault();
  closeAllModals();
  navMenu.classList.remove("active");
  hamburger.classList.remove("active");

  contactModal.style.display = "flex";
  contactModal.classList.add("fade-in");
  document.body.style.overflow = "hidden";
});

closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.classList.remove("fade-in");
    modal.classList.add("fade-out");
    setTimeout(() => {
      modal.style.display = "none";
      modal.classList.remove("fade-out");
      document.body.style.overflow = ""; // restore scroll
    }, 400);
  });
});

// Unified window click listener for all modals
window.addEventListener("click", (e) => {
  // Close if clicked on modal overlay (about/contact)
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("fade-in");
    e.target.classList.add("fade-out");
    setTimeout(() => {
      e.target.style.display = "none";
      e.target.classList.remove("fade-out");
      document.body.style.overflow = ""; // restore scroll
    }, 400);
  }

  // Close if clicked outside project modal
  if (e.target === projectModal) {
    projectModal.classList.remove("fade-in");
    projectModal.classList.add("fade-out");
    setTimeout(() => {
      projectModal.style.display = "none";
      projectModal.classList.remove("fade-out");
      document.body.style.overflow = ""; // restore scroll
    }, 400);
  }
});

// ================== Smooth Scrolling ===================
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href").slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth" });

      // Auto-close hamburger on small screen after click
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// ================== Project Modal ===================
const projectModal = document.getElementById("projectModal");
const modalDetails = document.getElementById("modalDetails");
const closeProjectModal = projectModal.querySelector(".close");

function openProjectModal(projectId) {
  closeAllModals(); // close any open modal first
  let content = "";
  const ghProfile = "https://github.com/soumyadipdutta-cse";

  if (projectId === "project1") {
    content = `
      <h3>Portfolio Website</h3>
      <br>
      <p>A responsive personal portfolio built with HTML, CSS, and JavaScript — featuring dark mode, smooth scrolling, reveal-on-scroll animations, and accessible interactive modals.</p>
      <p class="modal-tech"><strong>Tech:</strong> HTML, CSS, JavaScript</p>
      <p class="modal-links"><a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
  } else if (projectId === "project2") {
    content = `
      <h3>AI Phishing Email Detector</h3>
      <br>
      <p>Designing and building an NLP-based phishing email detection system using text classification and threat analysis techniques, with email API integration for real-time tracking.</p>
      <p class="modal-tech"><strong>Tech:</strong> Python, NLP, Flask, FastAPI</p>
      <p class="modal-links"><a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
  } else if (projectId === "project3") {
    content = `
      <h3>Iris Species Predictor</h3>
      <br>
      <p>A real-time Iris flower species classifier built with Logistic Regression, achieving 96%+ accuracy on the test set, hosted as an interactive Streamlit web app.</p>
      <p class="modal-tech"><strong>Tech:</strong> Python, Logistic Regression, Streamlit, Pickle</p>
      <p class="modal-links"><a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
  } else if (projectId === "project4") {
    content = `
      <h3>Real Estate Valuation Prediction</h3>
      <br>
      <p>A regression model that predicts real estate prices from structured dataset features, with a full analysis report covering model evaluation metrics.</p>
      <p class="modal-tech"><strong>Tech:</strong> Python, Regression, scikit-learn</p>
      <p class="modal-links"><a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
  } else if (projectId === "project5") {
    content = `
      <h3>ForestFormer: Above-Ground Forest Biomass Estimation</h3>
      <br>
      <p>Ongoing research on a Vision Transformer-based approach for estimating forest biomass using Sentinel-1 SAR and Sentinel-2 satellite imagery. Currently in the literature survey and methodology stage ahead of publication.</p>
      <p class="modal-tech"><strong>Tech:</strong> PyTorch, Vision Transformers, Remote Sensing</p>`;
  } else if (projectId === "project6") {
    content = `
      <h3>Personal Projects</h3>
      <br>
      <p>A collection of mini-projects including real-time Face Detection (YOLO/OpenCV), a QR Code Generator, and PDF Encryption.</p>
      <p class="modal-tech"><strong>Tech:</strong> Python, OpenCV, YOLO, pikepdf</p>
      <p class="modal-links"><a href="${ghProfile}" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>`;
  }
  modalDetails.innerHTML = content;
  projectModal.style.display = "flex";
  projectModal.classList.add("fade-in");
  document.body.style.overflow = "hidden";
}

closeProjectModal.addEventListener("click", () => {
  projectModal.classList.remove("fade-in");
  projectModal.classList.add("fade-out");
  setTimeout(() => {
    projectModal.style.display = "none";
    projectModal.classList.remove("fade-out");
    document.body.style.overflow = ""; // restore scroll
  }, 400);
});

const closeNav = document.getElementById("closeNav");

if (closeNav) {
  closeNav.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
}

// Close hamburger menu when clicking anywhere outside it
document.addEventListener("click", (event) => {
  const isClickInsideMenu = navMenu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);

  if (!isClickInsideMenu && !isClickOnHamburger) {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");

      // Optional: hide overlay if you're using one
      const overlay = document.getElementById("navOverlay");
      if (overlay) overlay.classList.remove("active");
    }
  }
});

function closeAllModals() {
  const allModals = document.querySelectorAll(".modal");
  allModals.forEach((modal) => {
    modal.style.display = "none";
    modal.classList.remove("fade-in", "fade-out");
  });
  document.body.style.overflow = ""; // re-enable scrolling
}
// ================== Typed.js Role Rotator ===================
if (typeof Typed !== "undefined" && document.getElementById("typed-role")) {
  new Typed("#typed-role", {
    strings: [
      "Machine Learning Enthusiast",
      "Cyber Security Explorer",
      "QA Software Tester",
      "Open-Source Builder",
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 1500,
    loop: true,
    smartBackspace: true,
  });
}

// ================== Scroll Reveal Animations ===================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback: just show everything
  revealElements.forEach((el) => el.classList.add("in-view"));
}

// ================== Keyboard Accessibility for div/span buttons ===================
function addKeyActivation(el, handler) {
  if (!el) return;
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handler(e);
    }
  });
}

addKeyActivation(hamburger, () => hamburger.click());
addKeyActivation(closeNav, () => closeNav.click());
document.querySelectorAll(".close").forEach((btn) => {
  addKeyActivation(btn, () => btn.click());
});

document.querySelectorAll(".hamburger, .close-nav, .close").forEach((el) => {
  el.addEventListener("click", () => {
    el.blur();
  });
});
