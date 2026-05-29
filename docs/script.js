/* =========================================================
   AI서퍼 prototype — interactions
   - scroll reveal (IntersectionObserver)
   - GNB hide on scroll down / show on up
   - top scroll-progress bar
   - hero folder deck auto-cycle + controller + progress
   ========================================================= */
(function () {
  "use strict";

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.18 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- GNB hide/show + scroll progress ---- */
  const gnb = document.getElementById("gnb");
  const bar = document.getElementById("scrollbar");
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    // progress
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    // hide on down, show on up
    if (y > lastY && y > 120) gnb.classList.add("gnb--hidden");
    else gnb.classList.remove("gnb--hidden");
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- hero folder deck ---- */
  const folders = Array.from(document.querySelectorAll(".folder"));
  const fill = document.getElementById("fill");
  const n = folders.length;
  let cur = 0;
  let timer = null;
  const DURATION = 4000; // ms per folder

  function render() {
    folders.forEach((f, i) => {
      f.classList.remove("is-active", "is-next", "is-prev");
      const rel = (i - cur + n) % n;
      if (rel === 0) f.classList.add("is-active");
      else if (rel === 1) f.classList.add("is-next");
      else f.classList.add("is-prev");
    });
    // restart progress animation
    fill.style.transition = "none";
    fill.style.width = "0%";
    // force reflow then animate
    void fill.offsetWidth;
    fill.style.transition = `width ${DURATION}ms linear`;
    fill.style.width = "100%";
  }

  function go(dir) {
    cur = (cur + dir + n) % n;
    render();
    restart();
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(() => go(1), DURATION);
  }

  document.getElementById("next").addEventListener("click", () => go(1));
  document.getElementById("prev").addEventListener("click", () => go(-1));

  // pause on hover
  const deck = document.getElementById("deck");
  deck.addEventListener("mouseenter", () => {
    clearInterval(timer);
    fill.style.transition = "none";
  });
  deck.addEventListener("mouseleave", restart);

  render();
  restart();
  onScroll();
})();
