// Site-wide behavior (loaded with defer, so the DOM is parsed by the time this runs).

// Mobile nav toggle
function toggleMenu() {
    const nav = document.getElementById("navLinks");
    const btn = document.querySelector(".mobile-menu-btn");
    if (!nav || !btn) return;
    nav.classList.toggle("show");
    btn.classList.toggle("active");
}

const menuBtn = document.querySelector(".mobile-menu-btn");
if (menuBtn) menuBtn.addEventListener("click", toggleMenu);

// Close the menu when clicking outside it
document.addEventListener("click", function (event) {
    const nav = document.getElementById("navLinks");
    const btn = document.querySelector(".mobile-menu-btn");
    if (
        nav &&
        btn &&
        !nav.contains(event.target) &&
        !btn.contains(event.target) &&
        nav.classList.contains("show")
    ) {
        nav.classList.remove("show");
        btn.classList.remove("active");
    }
});
