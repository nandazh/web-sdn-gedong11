// ==========================================
// 1. SCROLL UP BUTTON
// ==========================================
const scrollUp = document.querySelector(".scroll-up");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        scrollUp.classList.add("scroll-active");
    } else {
        scrollUp.classList.remove("scroll-active");
    }
});

// ==========================================
// 2. MOBILE MENU TOGGLE
// ==========================================
const menuToggle = document.getElementById("mobileMenu"); 
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  // Klik hamburger untuk buka/tutup menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Tutup menu saat link diklik
  document.querySelectorAll(".menu li a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// ==========================================
// 3. ACTIVE LINK ON SCROLL (SCROLL SPY)
// ==========================================
const sections = document.querySelectorAll("section[id], footer[id]");
const navLi = document.querySelectorAll(".menu li a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 120) { // Toleransi offset navbar
      current = section.getAttribute("id");
    }
  });

  navLi.forEach((a) => {
    a.classList.remove("active");
    if (current && a.getAttribute("href").includes(current)) {
      a.classList.add("active");
    }
  });
});

// ==========================================
// 4. DARK MODE LOGIC (Universal)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById('darkModeToggle');
    if (!toggleButton) return; 

    const toggleIcon = toggleButton.querySelector('i');
    
    // Cek preferensi tema saat halaman dimuat
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleIcon) toggleIcon.classList.replace('fa-moon', 'fa-sun');
    }

    // Event saat tombol diklik
    toggleButton.addEventListener('click', () => {
      let theme = 'light';
      if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (toggleIcon) toggleIcon.classList.replace('fa-moon', 'fa-sun');
        theme = 'dark';
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (toggleIcon) toggleIcon.classList.replace('fa-sun', 'fa-moon');
      }
      localStorage.setItem('theme', theme);
    });
});