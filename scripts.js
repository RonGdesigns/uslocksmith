document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("mobile-menu-btn");
    const mainNav = document.getElementById("main-navigation");
    const dropdowns = document.querySelectorAll(".has-dropdown");

    // Toggle Hamburger Open
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mainNav.classList.toggle("open");
            menuToggle.innerHTML = mainNav.classList.contains("open") ? "&#10005;" : "&#9776;"; // X or Hamburger
        });
    }

    // Handle Parent Category Click without Blocking Submenu Links
    dropdowns.forEach(dropdown => {
        const parentLink = dropdown.querySelector("a");
        if (parentLink) {
            parentLink.addEventListener("click", (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault(); // Don't follow link, toggle dropdown drawer instead
                    dropdown.classList.toggle("open");
                }
            });
        }
    });

    // Auto-close menu drawer when selecting page anchors
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && !link.parentElement.classList.contains('has-dropdown')) {
                mainNav.classList.remove('open');
                if (menuToggle) menuToggle.innerHTML = "&#9776;";
            }
        });
    });
});
