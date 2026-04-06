/* ============================================================
   ZINEB CERAMICS — Theme JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Mobile Menu ─────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Sticky header shadow ────────────────────────────────── */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Product Gallery ─────────────────────────────────────── */
  const mainImage = document.getElementById('mainImage');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  thumbs.forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      if (mainImage) {
        mainImage.style.opacity = '0';
        setTimeout(function () {
          mainImage.src = thumb.dataset.src;
          mainImage.alt = thumb.dataset.alt || '';
          mainImage.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* ── Quantity Buttons ────────────────────────────────────── */
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('qty-minus')) {
      const input = e.target.parentElement.querySelector('.qty-number');
      if (input) {
        const val = parseInt(input.value, 10) || 1;
        if (val > 1) input.value = val - 1;
        if (input.classList.contains('cart-qty-number')) updateCartItem(input);
      }
    }
    if (e.target.classList.contains('qty-plus')) {
      const input = e.target.parentElement.querySelector('.qty-number');
      if (input) {
        input.value = (parseInt(input.value, 10) || 0) + 1;
        if (input.classList.contains('cart-qty-number')) updateCartItem(input);
      }
    }
  });

  function updateCartItem(input) {
    const line = input.dataset.line;
    const qty = parseInt(input.value, 10) || 0;
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify({ line: line, quantity: qty })
    })
    .then(r => r.json())
    .then(function (cart) {
      updateCartCount(cart.item_count);
      location.reload();
    })
    .catch(console.error);
  }

  /* ── Quick Add to Cart ───────────────────────────────────── */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.quick-add-btn[data-variant-id]');
    if (!btn) return;
    e.preventDefault();

    const variantId = btn.dataset.variantId;
    const originalText = btn.textContent;
    btn.textContent = 'Adding…';
    btn.style.pointerEvents = 'none';

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity: 1 })
    })
    .then(r => r.json())
    .then(function () {
      return fetch('/cart.js');
    })
    .then(r => r.json())
    .then(function (cart) {
      updateCartCount(cart.item_count);
      btn.textContent = 'Added!';
      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.pointerEvents = '';
      }, 2000);
    })
    .catch(function () {
      btn.textContent = originalText;
      btn.style.pointerEvents = '';
    });
  });

  /* ── Cart Count ──────────────────────────────────────────── */
  function updateCartCount(count) {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = count > 0 ? count : '';
  }

  // Init cart count on load
  fetch('/cart.js', { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
    .then(r => r.json())
    .then(function (cart) { updateCartCount(cart.item_count); })
    .catch(function () {});

  /* ── Product Option Swatches ─────────────────────────────── */
  document.querySelectorAll('.product-option .option-values').forEach(function (group) {
    group.querySelectorAll('.option-swatch').forEach(function (swatch) {
      swatch.addEventListener('change', function () {
        group.querySelectorAll('.option-swatch').forEach(s => s.classList.remove('selected'));
        swatch.classList.add('selected');
        updateVariant();
      });
    });
  });

  function updateVariant() {
    // Collect selected option values
    const form = document.getElementById('ProductForm');
    if (!form) return;

    const selected = [];
    form.querySelectorAll('.option-values input[type="radio"]:checked').forEach(function (input) {
      selected.push(input.value);
    });

    // Shopify handles variant selection via form submission;
    // for a production theme you'd use the Variants API here.
    const hiddenInput = form.querySelector('input[name="id"]');
    if (hiddenInput && window.__zinebVariants) {
      const match = window.__zinebVariants.find(function (v) {
        return v.options.every(function (opt, i) { return opt === selected[i]; });
      });
      if (match) hiddenInput.value = match.id;
    }
  }

  /* ── Smooth Scroll ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Lazy fade-in on scroll ──────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(
      '.product-card, .collection-card, .testimonial-card, .process-step, .timeline-item'
    ).forEach(function (el) {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

})();
