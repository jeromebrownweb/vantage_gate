/* ==========================================================================
   Vantage Gate — landing page behaviour

   Two widgets, both progressive enhancements over markup that already works:

     Carousel — without JS the viewport is a horizontally scrollable strip
                with snap points, so every slide stays reachable. This script
                takes over, hides the scrollbar and drives the track with a
                transform instead.

     Lightbox — without JS a slide is an inert button that does nothing. This
                script gives it a full-size overlay with a focus trap.

   Motion is handled entirely in CSS, inside a prefers-reduced-motion query,
   so there is nothing to check for here.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */

  /**
   * Delays a function until it has stopped being called for `wait` ms.
   * Used on resize, which fires continuously while a window is dragged.
   */
  function debounce(fn, wait) {
    var timer;
    return function () {
      var args = arguments;
      window.clearTimeout(timer);
      timer = window.setTimeout(function () {
        fn.apply(null, args);
      }, wait);
    };
  }

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  /* ------------------------------------------------------------------------
     Carousel
     ------------------------------------------------------------------------ */

  function initCarousel(root) {
    var viewport = root.querySelector("[data-carousel-viewport]");
    var track = root.querySelector("[data-carousel-track]");
    var prevButton = root.querySelector("[data-carousel-prev]");
    var nextButton = root.querySelector("[data-carousel-next]");
    var status = root.querySelector("[data-carousel-status]");
    var slides = Array.prototype.slice.call(
      track.querySelectorAll(".carousel__slide")
    );

    if (!slides.length) {
      return;
    }

    var index = 0;

    /**
     * How many slides are visible. Read from the CSS custom property rather
     * than duplicated here, so the stylesheet stays the single source of
     * truth and the two can never disagree at a breakpoint.
     */
    function slidesPerView() {
      var value = window
        .getComputedStyle(document.documentElement)
        .getPropertyValue("--vg-carousel-slides");

      var parsed = parseInt(value, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : parsed;
    }

    /** Highest index that still fills the viewport — the track clamps here. */
    function maxIndex() {
      return Math.max(0, slides.length - slidesPerView());
    }

    function update() {
      var limit = maxIndex();

      if (index > limit) {
        index = limit;
      }

      /* Measuring the slide's own offset means the gap is accounted for
         automatically, whatever the breakpoint sets it to. */
      var offset = slides[index].offsetLeft - slides[0].offsetLeft;
      track.style.transform = "translateX(" + -offset + "px)";

      /* Clamped rather than looping: at either end the arrow is disabled,
         which tells you where you are instead of silently wrapping. */
      prevButton.disabled = index === 0;
      nextButton.disabled = index >= limit;

      var last = Math.min(index + slidesPerView(), slides.length);
      status.textContent =
        "Showing " +
        (index + 1) +
        " to " +
        last +
        " of " +
        slides.length +
        " screenshots";
    }

    function go(to) {
      index = Math.min(Math.max(to, 0), maxIndex());
      update();
    }

    prevButton.addEventListener("click", function () {
      go(index - 1);
    });

    nextButton.addEventListener("click", function () {
      go(index + 1);
    });

    /* Arrow keys work whenever focus is anywhere inside the carousel */
    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        go(index + 1);
      }
    });

    /* Slides-per-view changes at breakpoints, so the offset must be remeasured */
    window.addEventListener(
      "resize",
      debounce(function () {
        update();
      }, 150)
    );

    /* Switches the viewport from native scrolling to transform-driven */
    viewport.setAttribute("data-enhanced", "");

    update();
  }

  /* ------------------------------------------------------------------------
     Lightbox
     ------------------------------------------------------------------------ */

  function initLightbox() {
    var lightbox = document.querySelector("[data-lightbox]");

    if (!lightbox) {
      return;
    }

    var dialog = lightbox.querySelector("[data-lightbox-dialog]");
    var backdrop = lightbox.querySelector("[data-lightbox-backdrop]");
    var closeButton = lightbox.querySelector("[data-lightbox-close]");
    var image = lightbox.querySelector("[data-lightbox-image]");
    var pageInner = document.querySelector(".page__inner");

    /* The element that opened the lightbox, so focus can be handed back */
    var lastTrigger = null;

    function open(trigger) {
      var source = trigger.querySelector("img");

      if (!source) {
        return;
      }

      lastTrigger = trigger;

      image.src = source.src;
      image.alt = source.alt;

      lightbox.hidden = false;

      /* Hide the rest of the page from assistive tech and from Tab, so the
         focus trap below only has to police the dialog itself. */
      if (pageInner) {
        pageInner.setAttribute("inert", "");
        pageInner.setAttribute("aria-hidden", "true");
      }

      /* Stops the page behind scrolling while the overlay is up */
      document.body.style.overflow = "hidden";

      closeButton.focus();
    }

    function close() {
      lightbox.hidden = true;
      image.src = "";
      image.alt = "";

      if (pageInner) {
        pageInner.removeAttribute("inert");
        pageInner.removeAttribute("aria-hidden");
      }

      document.body.style.overflow = "";

      /* Return focus to the slide that opened it, so keyboard users are not
         dropped back at the top of the document. */
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    }

    /* One listener on the document rather than one per slide */
    document.addEventListener("click", function (event) {
      if (!event.target || typeof event.target.closest !== "function") {
        return;
      }

      var trigger = event.target.closest("[data-lightbox-open]");

      if (trigger) {
        open(trigger);
      }
    });

    closeButton.addEventListener("click", close);
    backdrop.addEventListener("click", close);

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) {
        return;
      }

      if (event.key === "Escape") {
        close();
        return;
      }

      /* Focus trap. The dialog holds a single focusable element, so Tab and
         Shift+Tab both simply keep focus where it is. */
      if (event.key === "Tab") {
        var focusable = dialog.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length <= 1) {
          event.preventDefault();
          closeButton.focus();
          return;
        }

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ------------------------------------------------------------------------
     Waitlist buttons

     Both "Join Waitlist" buttons scroll to the inline MailerLite form in the
     CTA and drop focus into the email field. Wired here rather than with an
     inline handler so the markup stays free of behaviour, per the project's
     best-practices rules. As plain <a href="#waitlist"> would also work, this
     stays a progressive enhancement — the section is reachable without it.
     ------------------------------------------------------------------------ */

  function initWaitlist() {
    var buttons = document.querySelectorAll("[data-waitlist]");
    var target = document.getElementById("waitlist");

    if (!buttons.length || !target) {
      return;
    }

    var email = target.querySelector('input[name="fields[email]"]');

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? "auto" : "smooth",
          block: "center"
        });

        /* preventScroll so focusing does not fight the smooth scroll above */
        if (email) {
          email.focus({ preventScroll: true });
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     Boot
     ------------------------------------------------------------------------ */

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);
  initLightbox();
  initWaitlist();
})();
