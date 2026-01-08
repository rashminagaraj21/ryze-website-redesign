// ============================================
// MAIN JAVASCRIPT FILE
// ============================================
// This file handles interactive features like:
// - Smooth scrolling when clicking navigation links
// - Mobile menu toggle
// - Active navigation highlighting

// Wait for the page to fully load before running JavaScript
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    // This allows users to open/close the mobile menu on small screens
    
    // Get references to the mobile menu button and navigation list
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    // Add click event listener to the mobile menu button
    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle the 'active' class on the nav list
            // This shows/hides the menu
            navList.classList.toggle('active');
            // Also toggle 'active' on the button for hamburger animation
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    // When clicking navigation links, smoothly scroll to the target section
    // instead of jumping instantly
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Loop through each navigation link
    navLinks.forEach(function(link) {
        // Add click event listener to each link
        link.addEventListener('click', function(e) {
            // Get the href attribute (e.g., "#features")
            const href = this.getAttribute('href');
            
            // Only do smooth scrolling if it's a hash link (starts with #)
            if (href.startsWith('#')) {
                // Prevent default link behavior (instant jump)
                e.preventDefault();
                
                // Get the target element (the section we want to scroll to)
                const targetId = href.substring(1); // Remove the # symbol
                const targetElement = document.getElementById(targetId);
                
                // If the target element exists, scroll to it smoothly
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',  // Smooth scrolling animation
                        block: 'start'       // Align to top of viewport
                    });
                    
                    // Close mobile menu after clicking a link (if open)
                    if (navList) {
                        navList.classList.remove('active');
                    }
                    // Also remove active class from button
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    // Highlights the current section in the navigation as user scrolls
    
    // Get all sections that have an ID (these are our main sections)
    const sections = document.querySelectorAll('section[id]');
    
    // Function to update active navigation link
    function updateActiveNav() {
        // Get current scroll position
        const scrollPosition = window.scrollY + 100; // Add offset for fixed header
        
        // Loop through each section
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // Check if we're currently viewing this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove 'active' class from all nav links
                navLinks.forEach(function(link) {
                    link.classList.remove('active');
                });
                
                // Add 'active' class to the corresponding nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Call updateActiveNav when user scrolls
    window.addEventListener('scroll', updateActiveNav);
    
    // Also call it once on page load to set initial active state
    updateActiveNav();
    
    // ============================================
    // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    // ============================================
    // If user clicks outside the menu, close it
    
    document.addEventListener('click', function(e) {
        // Check if click is outside both the menu button and nav list
        if (navList && 
            !mobileMenuBtn.contains(e.target) && 
            !navList.contains(e.target) &&
            navList.classList.contains('active')) {
            navList.classList.remove('active');
            // Also remove active class from button
            if (mobileMenuBtn) {
                mobileMenuBtn.classList.remove('active');
            }
        }
    });
    
    // ============================================
    // HEADER SCROLL EFFECT (OPTIONAL ENHANCEMENT)
    // ============================================
    // Adds a subtle shadow effect to header when scrolling down
    
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        // Add shadow when scrolled down, remove when at top
        if (header) {
            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });
    
});

// ============================================
// NOTES FOR BEGINNERS
// ============================================
// 
// 1. document.addEventListener('DOMContentLoaded', ...)
//    - Waits for HTML to load before running JavaScript
//    - Prevents errors from trying to access elements that don't exist yet
//
// 2. querySelector / querySelectorAll
//    - Finds HTML elements using CSS selectors (like .class or #id)
//    - querySelector finds the first match
//    - querySelectorAll finds all matches
//
// 3. addEventListener
//    - Listens for events like clicks, scrolls, etc.
//    - Takes two arguments: event type and function to run
//
// 4. classList.toggle / add / remove
//    - Adds or removes CSS classes from elements
//    - This is how we show/hide the mobile menu
//
// 5. preventDefault()
//    - Stops the default browser behavior
//    - Used here to prevent instant jumping when clicking nav links
//
// 6. scrollIntoView()
//    - Scrolls the page to show a specific element
//    - 'smooth' makes it animated instead of instant
//
// ============================================

