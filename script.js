const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");
const backToTop = document.getElementById("back-to-top");

// Toggle mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after selecting a link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
    });
});

// Automatically update the footer year
document.getElementById("current-year").textContent =
    new Date().getFullYear();

// Show back-to-top button when scrolling
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 300);
});

// Scroll back to the top
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Highlight navigation based on the visible section
const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => observer.observe(section));