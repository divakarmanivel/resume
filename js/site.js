(function () {
  "use strict";

  var ROLES = [
    "Front End Developer",
    "Full Stack Engineer",
    "TypeScript Builder",
    "Open Source Contributor",
    "Product Crafter",
  ];

  var SECTIONS = ["about", "work", "contact"];

  var header = document.getElementById("site-header");
  var heroRole = document.getElementById("hero-role");
  var mobileMenuBtn = document.getElementById("mobile-menu-btn");
  var mobileMenuPanel = document.getElementById("mobile-menu-panel");
  var mobileMenuClose = document.getElementById("mobile-menu-close");
  var mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
  var yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Rotating hero role */
  var roleIndex = 0;
  if (heroRole) {
    heroRole.textContent = ROLES[0];
    window.setInterval(function () {
      heroRole.classList.add("is-fading");
      window.setTimeout(function () {
        roleIndex = (roleIndex + 1) % ROLES.length;
        heroRole.textContent = ROLES[roleIndex];
        heroRole.classList.remove("is-fading");
      }, 350);
    }, 4000);
  }

  function scrollToSection(target) {
    if (!target) return;
    var headerH = header ? header.offsetHeight : 68;
    var top = target.getBoundingClientRect().top + window.scrollY - headerH;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  /* Scroll: header state + active nav */
  function onScroll() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    }
    updateActiveNav();
  }

  function updateActiveNav() {
    var current = "";
    var offset = (header ? header.offsetHeight : 68) + 80;

    SECTIONS.forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      var rect = el.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        current = id;
      }
    });

    if (!current && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = "contact";
    }

    document.querySelectorAll("[data-section]").forEach(function (link) {
      var active = link.getAttribute("data-section") === current;
      link.classList.toggle("is-active", active);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  function openMobileMenu() {
    if (!mobileMenuPanel || !mobileMenuBtn) return;
    mobileMenuPanel.classList.add("is-open");
    mobileMenuPanel.setAttribute("aria-hidden", "false");
    mobileMenuBtn.classList.add("is-open");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("mobile-menu-open");
  }

  function closeMobileMenu() {
    if (!mobileMenuPanel || !mobileMenuBtn) return;
    mobileMenuPanel.classList.remove("is-open");
    mobileMenuPanel.setAttribute("aria-hidden", "true");
    mobileMenuBtn.classList.remove("is-open");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("mobile-menu-open");
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener("click", closeMobileMenu);

  document.querySelectorAll(".mobile-nav-link").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileMenu();
  });

  /* Anchor navigation — fixed scroll for contact and all sections */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      var target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      scrollToSection(target);
      closeMobileMenu();

      if (history.replaceState) {
        history.replaceState(null, "", hash);
      }
    });
  });

  /* Scroll reveal */
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -32px 0px", threshold: 0.08 }
    );

    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
