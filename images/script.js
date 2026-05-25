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

    // =========================================
    // LIGHTBOX FUNCTIONALITY
    // =========================================
    
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';
    
    const lightboxClose = document.createElement('div');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '×';
    
    lightboxOverlay.appendChild(lightboxImg);
    lightboxOverlay.appendChild(lightboxClose);
    document.body.appendChild(lightboxOverlay);

    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent immediate closing
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling behind
        });
    });

    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        document.body.style.overflow = 'auto'; // restore scrolling
        // clear src after animation finishes to prevent flash
        setTimeout(() => {
            if (!lightboxOverlay.classList.contains('active')) {
                lightboxImg.src = '';
            }
        }, 300);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on click outside image
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            closeLightbox();
        }
    });

});
