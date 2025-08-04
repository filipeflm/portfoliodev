document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    })
  
    // Initialize Lucide icons
    lucide.createIcons()
  
    // Set current year in footer
    document.getElementById("currentYear").textContent = new Date().getFullYear()
  
    // Check for form submission success
    if (window.location.href.includes('?success=true')) {
      alert('Mensagem enviada com sucesso! Obrigado pelo contato.')
      // Remove the success parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash)
    }
  
    // Language switcher functionality
    const languageButtons = document.querySelectorAll('.lang-btn')
    
    languageButtons.forEach(button => {
      button.addEventListener('click', function() {
        const selectedLang = this.getAttribute('data-lang')
        
        // Remove active class from all buttons
        languageButtons.forEach(btn => {
          btn.removeAttribute('data-active')
        })
        
        // Add active class to clicked button
        this.setAttribute('data-active', 'true')
        
        // Redirect to appropriate language version
        if (selectedLang === 'pt') {
          window.location.href = 'index-pt.html'
        } else if (selectedLang === 'en') {
          window.location.href = 'index.html'
        }
      })
    })
  
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mainNav = document.querySelector(".main-nav")
  
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener("click", function () {
        mainNav.classList.toggle("show")
  
        // Change icon based on menu state
        const icon = this.querySelector("i")
        if (mainNav.classList.contains("show")) {
          icon.setAttribute("data-lucide", "x")
        } else {
          icon.setAttribute("data-lucide", "menu")
        }
        lucide.createIcons()
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          // Close mobile menu if open
          if (mainNav && mainNav.classList.contains("show")) {
            mainNav.classList.remove("show")
            const icon = mobileMenuBtn.querySelector("i")
            icon.setAttribute("data-lucide", "menu")
            lucide.createIcons()
          }
  
          // Scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: "smooth",
          })
        }
      })
    })
  
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Add CSS for active nav link
    const style = document.createElement("style")
    style.textContent = `
      .nav-link.active {
        color: var(--color-primary);
      }
      .nav-link.active::after {
        width: 100%;
      }
      .main-nav.show {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        padding: 1rem;
        box-shadow: var(--shadow-md);
        border-bottom: 1px solid var(--color-border);
      }
      .main-nav.show .nav-link {
        margin: 0.5rem 0;
      }
      @media (max-width: 767px) {
        .main-nav {
          display: none;
        }
      }
    `
    document.head.appendChild(style)
  
    // Declare AOS and lucide if they are not already available globally
    if (typeof AOS === "undefined") {
      window.AOS = {
        init: () => {}, // Dummy init function
      }
    }
  
    if (typeof lucide === "undefined") {
      window.lucide = {
        createIcons: () => {}, // Dummy createIcons function
      }
    }
  })
  