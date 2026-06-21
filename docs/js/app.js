/* ============================================================
   BECUAI Design System — Image viewer (Figma 1:1 export)
   각 화면은 Figma 프레임의 Content 영역을 PNG(@2x)로 export 한 것이며,
   GNB/LNB 네비게이션만 코드로 유지한다.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- Navigation model (Figma LNB 그대로) ---------------- */
  const NAV = {
    ux: {
      label: "UX 원칙", lnbTitle: "UX 원칙",
      groups: [{ items: [
        ["overview", "Overview"], ["principles", "핵심 원칙"],
        ["decisive", "결정적 경험"], ["priority", "우선순위 규칙"],
      ] }],
    },
    foundation: {
      label: "Foundation", lnbTitle: "FOUNDATION",
      groups: [{ items: [
        ["overview", "Overview"], ["color", "Color"], ["typography", "Typography"],
        ["spacing", "Spacing"], ["iconography", "Iconography"], ["elevation", "Elevation"],
        ["radius", "Radius"], ["motion", "Motion"],
      ] }],
    },
    component: {
      label: "Component", lnbTitle: "COMPONENT",
      groups: [
        { items: [["overview", "Overview"]] },
        { title: "액션", items: [["button", "Button"]] },
        { title: "입력", items: [
          ["input", "Input"], ["textarea", "Textarea"], ["search", "Search"], ["select", "Select"],
          ["checkbox", "Checkbox"], ["radio", "Radio"], ["toggle", "Toggle"],
          ["date-input", "Date input"], ["calendar", "Calendar"],
        ] },
        { title: "탐색", items: [
          ["tab", "Tab"], ["pagination", "Pagination"], ["menu", "Menu"], ["accordion", "Accordion"],
        ] },
        { title: "정보 표시", items: [
          ["table", "Table"], ["list", "List"], ["badge", "Badge"], ["tag", "Tag"],
          ["chip", "Chip"], ["title", "Title"], ["carousel", "Carousel"],
        ] },
        { title: "피드백", items: [
          ["modal", "Modal"], ["tooltip", "Tooltip"], ["alert", "Alert"],
        ] },
      ],
    },
  };

  // 제품 변형(RDPLINE / WIGOVIEW)이 있는 건 component 섹션의 overview 외 전부.
  // export 이미지 안에 AISURFER/RDPLINE/WIGOVIEW 탭이 이미 그려져 있어,
  // 그 위치(content 좌표 기준)에 투명 클릭 영역만 덧대 이미지 src 를 스왑한다.
  const PRODUCTS = [["", "AISURFER"], ["-rdpline", "RDPLINE"], ["-wigoview", "WIGOVIEW"]];
  const hasProductTabs = (section, page) => section === "component" && page !== "overview";
  // Figma Content(1660px 폭) 안의 "Product Tabs" 프레임 좌표 (모든 컴포넌트 공통)
  const TABS = { x: 72, y: 226, w: 150, h: 50, base: 1660 };

  /* ---------------- DOM ---------------- */
  const gnbNav = document.getElementById("gnbNav");
  const lnb = document.getElementById("lnb");
  const content = document.getElementById("content");

  gnbNav.innerHTML = Object.keys(NAV).map(k =>
    `<button class="gnb__item" data-section="${k}">${NAV[k].label}</button>`).join("");

  function firstPage(section) {
    const s = NAV[section];
    if (!s.groups.length) return null;
    return s.groups[0].items[0][0];
  }

  function renderLNB(section, page) {
    const s = NAV[section];
    const head = s.lnbTitle ? `<div class="lnb__title">${s.lnbTitle}</div>` : "";
    lnb.innerHTML = head + s.groups.map(g =>
      (g.title ? `<div class="lnb__group">${g.title}</div>` : "") +
      g.items.map(([id, label]) =>
        `<button class="lnb__item ${id === page ? "is-active" : ""}" data-page="${id}">${label}</button>`).join("")
    ).join("");
  }

  function screenImg(slug) {
    return `<img class="screen" src="img/${slug}.png" alt="${slug}" loading="lazy">`;
  }

  function renderContent(section, page) {
    const base = section + "-" + page; // ex) foundation-color, component-button

    if (hasProductTabs(section, page)) {
      const hits = PRODUCTS.map(([suffix, name]) =>
        `<button class="hit" data-suffix="${suffix}" title="${name}" aria-label="${name}"></button>`).join("");
      content.innerHTML = `<div class="page is-comp">
        ${screenImg(base)}
        <div class="prodhit">${hits}</div>
      </div>`;
      const page$ = content.querySelector(".page");
      const img = page$.querySelector(".screen");
      img.dataset.base = base;
      if (img.complete) placeHits(page$);
      img.addEventListener("load", () => placeHits(page$));
    } else {
      content.innerHTML = `<div class="page">${screenImg(base)}</div>`;
    }
  }

  // 투명 클릭 영역을 이미지에 그려진 탭 위치에 맞춰 배치 (렌더 폭 기준 스케일)
  function placeHits(page$) {
    const img = page$.querySelector(".screen");
    const hit = page$.querySelector(".prodhit");
    if (!img || !hit || !img.clientWidth) return;
    const s = img.clientWidth / TABS.base;
    hit.style.left = (TABS.x * s) + "px";
    hit.style.top = (TABS.y * s) + "px";
    hit.style.height = (TABS.h * s) + "px";
    hit.querySelectorAll(".hit").forEach(b => { b.style.width = (TABS.w * s) + "px"; });
  }

  /* ---------------- Routing ---------------- */
  function route() {
    const hash = (location.hash || "#foundation/overview").slice(1);
    let [section, page] = hash.split("/");
    if (!NAV[section]) section = "foundation";
    const fp = firstPage(section);
    const valid = NAV[section].groups.some(g => g.items.some(([id]) => id === page));
    if (!valid) page = fp;

    Array.from(gnbNav.children).forEach(b =>
      b.classList.toggle("is-active", b.dataset.section === section));
    renderLNB(section, page);
    renderContent(section, page);
    content.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  /* ---------------- Events ---------------- */
  gnbNav.addEventListener("click", (e) => {
    const b = e.target.closest("[data-section]"); if (!b) return;
    const sec = b.dataset.section;
    const fp = firstPage(sec);
    location.hash = fp ? sec + "/" + fp : sec;
  });

  lnb.addEventListener("click", (e) => {
    const b = e.target.closest("[data-page]"); if (!b) return;
    const section = location.hash.slice(1).split("/")[0] || "foundation";
    location.hash = section + "/" + b.dataset.page;
  });

  // 제품 탭(투명 영역) → 이미지 src 스왑
  content.addEventListener("click", (e) => {
    const hit = e.target.closest(".hit"); if (!hit) return;
    const img = hit.closest(".page").querySelector(".screen");
    img.src = "img/" + img.dataset.base + hit.dataset.suffix + ".png";
  });

  // 창 크기 변경 시 현재 컴포넌트 페이지의 클릭 영역 재배치
  let rAF = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => {
      const page$ = content.querySelector(".page.is-comp");
      if (page$) placeHits(page$);
    });
  });

  window.addEventListener("hashchange", route);
  route();
})();
