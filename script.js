// EZ Locksmith Mobile Navigation Logic
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Toggle Mobile Menu Drawer
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-navigation');
    const servicesDropdown = document.getElementById('services-dropdown');
    const areasDropdown = document.getElementById('areas-dropdown');
    
    if(menuBtn && nav) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nav.classList.toggle('active');
            menuBtn.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
        });
    }

    // 2. Toggle Dropdowns within Mobile Menu
    function setupDropdown(dropdownElement) {
        if(dropdownElement) {
            dropdownElement.addEventListener('click', (e) => {
                const mainTrigger = dropdownElement.querySelector('a');
                // If they clicked the main dropdown category header link (or its child elements)
                if(e.target === mainTrigger || (mainTrigger && mainTrigger.contains(e.target))) {
                    const menuBtn = document.getElementById('mobile-menu-btn');
                    if (menuBtn && window.getComputedStyle(menuBtn).display !== 'none') {
                        e.preventDefault();
                    }
                    dropdownElement.classList.toggle('open');
                }
            });
        }
    }
    
    setupDropdown(servicesDropdown);
    setupDropdown(areasDropdown);

    // 3. Close menu when tapping outside
    document.addEventListener('click', (e) => {
        if (nav && nav.classList.contains('active')) {
            const isClickInsideNav = nav.contains(e.target);
            const isClickOnMenuBtn = menuBtn.contains(e.target);
            
            if (!isClickInsideNav && !isClickOnMenuBtn) {
                nav.classList.remove('active');
                menuBtn.innerHTML = '☰';
                if (servicesDropdown) servicesDropdown.classList.remove('open');
                if (areasDropdown) areasDropdown.classList.remove('open');
            }
        }
    });
});

