/* ==========================================================================
   London Dental Clinic — script.js
   Handles: mobile menu, sticky navbar, smooth scroll, scroll-reveal
   animations, and appointment form validation (front-end demo only).
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Sticky navbar shadow on scroll ---------------- */
  var navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 12) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------------- Mobile hamburger menu ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navMenu = document.getElementById('navMenu');

  function closeMenu() {
    navToggle.classList.remove('is-open');
    navMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = navMenu.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMenu);

    // Close the mobile menu whenever a nav link is tapped
    var navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---------------- Smooth scrolling for in-page anchors ---------------- */
  // Native CSS `scroll-behavior: smooth` handles most of this already,
  // but we still intercept clicks to close the mobile menu correctly
  // and to account for the sticky navbar height when needed.
  var anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var navHeight = navbar.offsetHeight;
          var targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - (navHeight - 4);
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------------- Scroll reveal animations ---------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: just show everything if IntersectionObserver isn't supported
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Appointment form validation (demo only) ---------------- */
  var form = document.getElementById('appointmentForm');
  var formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;

      var fields = [
        {
          input: document.getElementById('fullName'),
          error: document.getElementById('fullNameError'),
          validate: function (value) { return value.trim().length >= 2; },
          message: 'Please enter your full name.'
        },
        {
          input: document.getElementById('phoneNumber'),
          error: document.getElementById('phoneNumberError'),
          validate: function (value) { return /^[0-9+\s()-]{7,}$/.test(value.trim()); },
          message: 'Please enter a valid phone number.'
        },
        {
          input: document.getElementById('preferredDate'),
          error: document.getElementById('preferredDateError'),
          validate: function (value) { return value.trim().length > 0; },
          message: 'Please choose a preferred date.'
        },
        {
          input: document.getElementById('preferredTime'),
          error: document.getElementById('preferredTimeError'),
          validate: function (value) { return value.trim().length > 0; },
          message: 'Please choose a preferred time.'
        }
      ];

      fields.forEach(function (field) {
        var value = field.input.value || '';
        var fieldWrapper = field.input.closest('.form-field');

        if (!field.validate(value)) {
          isValid = false;
          field.error.textContent = field.message;
          fieldWrapper.classList.add('has-error');
        } else {
          field.error.textContent = '';
          fieldWrapper.classList.remove('has-error');
        }
      });

      if (isValid) {
        formSuccess.textContent = 'Thank you! Your appointment request has been recorded in this demo.';
        formSuccess.classList.add('is-visible');
        form.reset();

        // Hide the success message again after a while so the form feels reusable
        clearTimeout(window.__ldcSuccessTimeout);
        window.__ldcSuccessTimeout = setTimeout(function () {
          formSuccess.classList.remove('is-visible');
        }, 6000);
      } else {
        formSuccess.classList.remove('is-visible');
        formSuccess.textContent = '';
      }
    });
  }

  /* ---------------- Button ripple / press interaction ---------------- */
  var interactiveButtons = document.querySelectorAll('.btn');
  interactiveButtons.forEach(function (btn) {
    btn.addEventListener('mousedown', function () {
      btn.style.transform = 'translateY(0) scale(0.98)';
    });
    btn.addEventListener('mouseup', function () {
      btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.transform = '';
    });
  });

});
