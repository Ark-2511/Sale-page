/* Way Up – trang giới thiệu: menu thu gọn, giỏ hàng tạm, đổ bóng đầu trang. */
(function () {
  'use strict';

  /* ---- Menu thu gọn (iPad dọc, điện thoại) ---- */
  var burger = document.querySelector('[data-burger]');
  var mobileNav = document.getElementById('menu-gon');

  function setMenu(open) {
    if (!burger || !mobileNav) return;
    mobileNav.hidden = !open;
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
  }
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { setMenu(mobileNav.hidden); });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mobileNav.hidden) { setMenu(false); burger.focus(); }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1080) setMenu(false);
    });
  }

  /* ---- Đổ bóng đầu trang khi cuộn ---- */
  var header = document.querySelector('.header');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Giỏ hàng tạm (chỉ lưu trên trình duyệt này, chưa có trang thanh toán) ---- */
  var KEY = 'wayup-cart';
  var countEl = document.querySelector('[data-cart-count]');
  var cartLink = document.querySelector('.cart');

  function readCart() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function writeCart(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* trình duyệt chặn lưu: bỏ qua */ }
  }
  var cart = readCart();

  function renderCount() {
    if (!countEl) return;
    var n = cart.length;
    countEl.textContent = n > 99 ? '99+' : String(n);
    countEl.hidden = n === 0;
    if (cartLink) cartLink.setAttribute('aria-label', 'Giỏ hàng, ' + n + ' sản phẩm');
  }
  renderCount();

  var toast = document.querySelector('[data-toast]');
  var toastTimer;
  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2200);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-add-cart]');
    if (!btn) return;
    var name = btn.getAttribute('data-add-cart');
    cart.push(name);
    writeCart(cart);
    renderCount();
    showToast('Đã thêm “' + name + '” vào giỏ');
  });

  /* ---- Năm ở chân trang ---- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
