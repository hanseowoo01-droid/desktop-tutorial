/* ============================================================
   BECUAI Design System — App (하이브리드)
   · 텍스트(제목·설명·섹션 제목·가이드·카드)는 HTML 코드
   · 데모(미리보기) 박스는 Figma export PNG (img/demo/)
   · Component는 제품 탭으로 데모 PNG를 AISURFER/RDPLINE/WIGOVIEW 스왑
   · 헤더(제목·브레드크럼·설명)는 Figma 원문 그대로(model.js)
   ============================================================ */
(function () {
  "use strict";
  const MODEL = window.PAGE_MODEL || {};

  const NAV = {
    ux: {
      label: "UX 원칙", lnbTitle: "UX 원칙",
      groups: [{ items: [["overview", "Overview"], ["principles", "핵심 원칙"], ["decisive", "결정적 경험"], ["priority", "우선순위 규칙"]] }],
    },
    foundation: {
      label: "Foundation", lnbTitle: "FOUNDATION",
      groups: [{ items: [["overview", "Overview"], ["color", "Color"], ["typography", "Typography"],
        ["spacing", "Spacing"], ["iconography", "Iconography"], ["elevation", "Elevation"], ["radius", "Radius"], ["motion", "Motion"]] }],
    },
    component: {
      label: "Component", lnbTitle: "COMPONENT",
      groups: [
        { items: [["overview", "Overview"]] },
        { title: "액션", items: [["button", "Button"]] },
        { title: "입력", items: [["input", "Input"], ["textarea", "Textarea"], ["search", "Search"], ["select", "Select"],
          ["checkbox", "Checkbox"], ["radio", "Radio"], ["toggle", "Toggle"], ["date-input", "Date input"], ["calendar", "Calendar"]] },
        { title: "탐색", items: [["tab", "Tab"], ["pagination", "Pagination"], ["menu", "Menu"], ["accordion", "Accordion"]] },
        { title: "정보 표시", items: [["table", "Table"], ["list", "List"], ["badge", "Badge"], ["tag", "Tag"], ["chip", "Chip"], ["title", "Title"], ["carousel", "Carousel"]] },
        { title: "피드백", items: [["modal", "Modal"], ["tooltip", "Tooltip"], ["alert", "Alert"]] },
      ],
    },
  };
  const SECTION_LABEL = { ux: "UX 원칙", foundation: "Foundation", component: "Component" };

  /* ---------------- Helpers ---------------- */
  function headRaw(section, crumb, title, desc) {
    return `<div class="bc">홈<span>›</span>${SECTION_LABEL[section]}<span>›</span>${crumb}</div>
      <h1 class="page-title">${title}</h1>
      <p class="page-desc">${desc}</p>`;
  }
  function headFor(key) {
    const h = (MODEL[key] || {}).head || { crumb: "", title: key, desc: "" };
    return headRaw(key.split("/")[0], h.crumb, h.title, h.desc);
  }
  function themed(inner) {
    const tabs = ["aisurfer", "rdpline", "wigoview"].map((p, i) =>
      `<button class="tab ${i === 0 ? "is-active" : ""}" data-p="${p}"><span class="dot"></span>${p.toUpperCase()}</button>`).join("");
    return `<div class="themed" data-theme="aisurfer"><div class="tabs">${tabs}</div><div class="themed-body">${inner}</div></div>`;
  }
  function sec(t, d, body) { return `<div class="sec"><h2 class="sec__title">${t}</h2>${d ? `<p class="sec__desc">${d}</p>` : ""}${body}</div>`; }
  function card(kr, en, desc, link) {
    return `<div class="ocard"${link ? ` data-go="${link}"` : ""}><div class="ic">${en[0]}</div><h3>${kr}<span>${en}</span></h3><p>${desc}</p></div>`;
  }
  function grp(title, items) { return `<h2 class="ov-grp">${title}</h2><div class="grid-cards">${items.map(a => card(a[0], a[1], a[2], a[3])).join("")}</div>`; }
  function guide(dos, donts) {
    return `<div class="sec"><h2 class="sec__title">사용 가이드</h2><div class="guide">
      <div class="guide__col do"><div class="guide__bar">✓ 권장 (Do)</div><div class="guide__body"><ul>${dos.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
      <div class="guide__col dont"><div class="guide__bar">✕ 지양 (Don't)</div><div class="guide__body"><ul>${donts.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
    </div></div>`;
  }
  function demoImgs(imgs, alt) {
    return `<div class="demowrap">${imgs.map(slug => `<img class="demoimg" data-base="${slug}" src="img/demo/${slug}.png" alt="${alt} 미리보기" loading="lazy">`).join("")}</div>`;
  }

  /* ---------------- Pages ---------------- */
  const P = {};

  /* ===== UX (코드) ===== */
  P["ux/overview"] = () => headFor("ux/overview") +
    sec("4대 원칙", "",
      `<div class="ux-grid">${[
        ["01", "본질이 먼저다", "Substance", "시각적 완성도도 중요하지만 사용성을 먼저 해결한다.", "과업 성공률 · 이탈률"],
        ["02", "하나의 BECUAI", "One BECUAI", "모든 제품이 하나의 디자인 언어를 공유한다.", "컴포넌트 재사용률 · 일관성"],
        ["03", "보는 순간 이해된다", "Obvious", "설명 없이도 구조와 의미가 읽혀야 한다.", "기능 인지율 · 학습 시간"],
        ["04", "멈춤 없는 경험", "Effortless", "진입부터 완료까지 흐름이 끊기지 않는다.", "과업 단계 수 · 흐름 이탈률"],
      ].map(([n, kr, en, d, m]) => `<div class="pcard">
        <div class="pcard__t"><span class="pnum">${n}</span><div><b>${kr}</b><span>${en}</span></div></div>
        <p class="pcard__d">${d}</p><div class="pcard__m">측정 ${m}</div></div>`).join("")}</div>`) +
    sec("도출 근거", "두 차례의 PO 인터뷰(AISURFER 5/27 · WIGOVIEW 6/1)와 제품 직접 사용 분석에서 핵심 개선점을 도출하고, 6/5 방향성 Fix를 거쳐 전사 4대 원칙으로 수립했습니다.",
      `<div class="flow">${["PO 인터뷰 (5/27 · 6/1)", "인사이트 합의 (6/5 방향성 Fix)", "핵심 개선점 4", "전사 4대 원칙"]
        .map((t, i, a) => `<div class="fc">${t}</div>${i < a.length - 1 ? `<span class="fc-arr">→</span>` : ""}`).join("")}</div>`);

  P["ux/principles"] = () => headFor("ux/principles") +
    `<div class="plist">${[
      ["01", "본질이 먼저다", "Substance", "시각적 완성도도 중요하지만 사용성을 먼저 해결한다.",
        ["UI보다 UX 결함을 우선 제거", "전 제품 동일한 사용성 기준 적용", "‘쓰기 쉬움’이 합격선", "감이 아닌 데이터로 판단"], "과업 성공률 · 이탈률"],
      ["02", "하나의 BECUAI", "One BECUAI", "모든 제품이 하나의 디자인 언어를 공유한다.",
        ["토큰 기반 통합 디자인 시스템", "브랜드 컬러·타이포 단일 규칙", "공통 아이콘·컴포넌트 세트"], "컴포넌트 재사용률 · 일관성"],
      ["03", "보는 순간 이해된다", "Obvious", "설명 없이도 구조와 의미가 읽혀야 한다.",
        ["시인성을 저하시키는 요소 제거", "핵심 기능 최소 depth 노출", "정보 위계 명확히 설계", "텍스트·아이콘 규칙 통일"], "기능 인지율 · 학습 시간"],
      ["04", "멈춤 없는 경험", "Effortless", "진입부터 완료까지 흐름이 끊기지 않는다.",
        ["진입 직후 다음 행동 안내", "화면 간 연결성 강화", "반복 동작 단계 최소화", "막다른 화면 제거"], "과업 단계 수 · 흐름 이탈률"],
    ].map(([n, kr, en, d, bl, m]) => `<div class="pc">
      <div class="pc__bar"><span class="pnum">${n}</span><div class="pc__tw"><div class="pc__t"><b>${kr}</b><span>${en}</span></div><p>${d}</p></div></div>
      <div class="pc__bd"><div class="pc__bl">${bl.map(x => `<div class="bl-row"><span class="bl-dot"></span>${x}</div>`).join("")}</div>
        <div class="pc__mc"><b>측정 지표</b><span>${m}</span></div></div></div>`).join("")}</div>`;

  P["ux/decisive"] = () => headFor("ux/decisive") +
    `<div class="wlist">${[
      ["오늘의 핵심 큐레이션", "김미정 · 대기업 PR", "보는 순간 판단", "관심뉴스 2,066건이 표로 쏟아져 어디부터 볼지 막막하다", "출근 첫 화면에서 오늘 꼭 봐야 할 핵심 이슈를 바로 판단"],
      ["보고서 초안 자동화", "김미정 · 대기업 PR", "보고 1시간 단축", "스크랩→보고서 본문을 일일이 작성해 1시간이 걸린다", "선택 기사 기반 요약·문구 초안을 자동 생성"],
      ["검색 누락 0건", "박준호 · 공공기관", "누락 0건", "검색이 여러 곳에 흩어지고 조건 저장이 안 돼 누락이 불안하다", "단일 검색창 + 조건 저장·구독으로 신규 보도 자동 알림"],
      ["5분 내 가치 체감", "이용철 · 신규 트라이얼", "5분 내 가치", "온보딩 없이 표로 떨어져 5분 헤매다 이탈한다", "첫 로그인 3스텝 온보딩 + 가치 카드로 즉시 체감"],
      ["하나의 제품 경험", "공통", "하나의 BECUAI", "WIGOMON·RDP·VU가 새 탭으로 흩어져 “같은 회사 맞나” 혼란", "4제품 인앱 통합 + 통일된 디자인 시스템"],
    ].map(([t, u, b, a, w]) => `<div class="wc">
      <div class="wc__tr"><div class="wc__tt"><b>${t}</b><span>${u}</span></div><span class="wc__mc">${b}</span></div>
      <div class="wc__cols"><div class="wc__a"><span class="lab">As-Is</span><p>${a}</p></div>
        <span class="wc__arr">→</span><div class="wc__w"><span class="lab">결정적 경험</span><p>${w}</p></div></div></div>`).join("")}</div>`;

  P["ux/priority"] = () => headFor("ux/priority") +
    sec("판단 기준", "",
      `<div class="rrow">${[
        ["UX", "UI", "UI 완성도보다 UX 결함을 먼저 제거한다"],
        ["본질", "화려함", "감성·화려함보다 사용성의 본질을 우선한다"],
        ["P0", "P2", "통합·일관성을 먼저, 반복 자동화는 나중에"],
      ].map(([a, b, d]) => `<div class="rc"><div class="rc__r"><b>${a}</b><i>&gt;</i><b>${b}</b></div><p>${d}</p></div>`).join("")}</div>`) +
    sec("개선 우선순위", "저니맵 공통 마찰 분석에서 도출한 실행 우선순위입니다. 위에서부터 순차적으로 해결합니다.",
      `<div class="prio">${[
        ["P0", "4제품 인앱 통합 · 디자인시스템 통일", ["WIGOMON·RDP·VU 인앱 통합", "토큰 기반 통합 디자인 시스템", "공통 아이콘·컴포넌트 세트"], "하나의 BECUAI 경험"],
        ["P1", "단일 검색창·RDP 통합 · 첫화면 큐레이션·온보딩", ["검색 이원화 해소", "RDP 인앱 통합", "첫 로그인 온보딩"], "진입·검색 장벽 제거"],
        ["P2", "툴바 라벨링 · 보고서 초안·정기보고 자동화", ["툴바 액션 라벨·툴팁", "보고서 초안 자동 생성", "정기 보고 예약·발송"], "반복 작업 단축"],
      ].map(([lv, t, tags, eff]) => `<div class="pr"><span class="pr__lv">${lv}</span>
        <div class="pr__mid"><b>${t}</b><div class="pr__tags">${tags.map(x => `<span>${x}</span>`).join("")}</div></div>
        <div class="pr__oc"><span>기대 효과</span><b>${eff}</b></div></div>`).join("")}</div>`);

  /* ===== Foundation overview (코드 카드) ===== */
  P["foundation/overview"] = () => headFor("foundation/overview") +
    `<div class="grid-cards">
      ${card("색상", "Color", "브랜드·위계·상태를 전달하는 색상 토큰", "color")}
      ${card("타이포그래피", "Typography", "서체와 8단계 타입 스케일", "typography")}
      ${card("간격", "Spacing", "4px 배수 기반 간격 체계", "spacing")}
      ${card("아이콘", "Iconography", "24px 키라인 라인 아이콘", "iconography")}
      ${card("그림자", "Elevation", "표면 높이를 표현하는 그림자", "elevation")}
      ${card("둥근 모서리", "Radius", "요소별 모서리 곡률", "radius")}
      ${card("모션", "Motion", "전환 지속시간과 이징", "motion")}
    </div>`;

  /* ===== Foundation 상세 (텍스트=코드 / 데모=Figma PNG) ===== */
  function foundationPage(id) {
    const m = MODEL["foundation/" + id];
    if (!m || !m.secs) return "<p>준비 중입니다.</p>";
    const body = m.secs.map(s =>
      `<div class="sec"><h2 class="sec__title">${s.title}</h2>${s.desc ? `<p class="sec__desc">${s.desc}</p>` : ""}${demoImgs(s.imgs, s.title)}</div>`).join("");
    return headFor("foundation/" + id) + body;
  }

  /* ===== Component overview (코드 카드) ===== */
  P["component/overview"] = () => headFor("component/overview") +
    grp("액션", [["버튼", "Button", "사용자 행동을 실행하는 기본 액션", "button"]]) +
    grp("입력", [
      ["입력 필드", "Input", "한 줄 텍스트 입력", "input"], ["텍스트 영역", "Textarea", "여러 줄 텍스트 입력", "textarea"],
      ["검색", "Search", "검색어 입력 필드", "search"], ["셀렉트", "Select", "목록에서 선택하는 드롭다운", "select"],
      ["체크박스", "Checkbox", "다중 선택", "checkbox"], ["라디오", "Radio", "단일 선택", "radio"],
      ["토글 스위치", "Toggle", "켜기/끄기 전환", "toggle"], ["날짜 입력", "Date input", "날짜 입력 필드", "date-input"],
      ["달력", "Calendar", "날짜에서 날짜 선택", "calendar"]]) +
    grp("탐색", [["탭", "Tab", "화면·콘텐츠 전환", "tab"], ["페이지네이션", "Pagination", "목록 페이지 이동", "pagination"],
      ["메뉴", "Menu", "내비게이션 메뉴", "menu"], ["아코디언", "Accordion", "접고 펴는 패널", "accordion"]]) +
    grp("정보 표시", [["테이블", "Table", "데이터를 표로 표시", "table"], ["리스트", "List", "항목 목록", "list"],
      ["배지", "Badge", "상태·수량 표시", "badge"], ["태그", "Tag", "속성·분류 표시", "tag"],
      ["칩", "Chip", "선택·필터 토큰", "chip"], ["타이틀", "Title", "영역 제목", "title"],
      ["캐러셀", "Carousel", "슬라이드 콘텐츠", "carousel"]]) +
    grp("피드백", [["모달", "Modal", "집중이 필요한 다이얼로그", "modal"], ["툴팁", "Tooltip", "보조 설명 말풍선", "tooltip"],
      ["얼럿", "Alert", "광고 알림 메시지", "alert"]]);

  /* ===== Component 상세 (텍스트=코드 / 데모=Figma PNG, 제품 스왑) ===== */
  function componentPage(id) {
    const m = MODEL["component/" + id];
    if (!m || !m.secs) return "<p>준비 중입니다.</p>";
    const body = m.secs.map(s => {
      if (s.guide) return guide(s.guide.do, s.guide.dont);
      return `<div class="sec"><h2 class="sec__title">${s.title}</h2>${s.desc ? `<p class="sec__desc">${s.desc}</p>` : ""}${demoImgs(s.imgs, s.title)}</div>`;
    }).join("");
    return headFor("component/" + id) + themed(body);
  }

  /* 동적 라우트 등록 */
  NAV.foundation.groups[0].items.forEach(([id]) => { if (id !== "overview") P["foundation/" + id] = () => foundationPage(id); });
  NAV.component.groups.forEach(g => g.items.forEach(([id]) => { if (id !== "overview") P["component/" + id] = () => componentPage(id); }));

  /* ---------------- Render / Routing ---------------- */
  const gnbNav = document.getElementById("gnbNav");
  const lnb = document.getElementById("lnb");
  const content = document.getElementById("content");

  gnbNav.innerHTML = Object.keys(NAV).map(k => `<button class="gnb__item" data-section="${k}">${NAV[k].label}</button>`).join("");

  function renderLNB(section, page) {
    const s = NAV[section];
    const head = s.lnbTitle ? `<div class="lnb__title">${s.lnbTitle}</div>` : "";
    lnb.innerHTML = head + s.groups.map(g =>
      (g.title ? `<div class="lnb__group">${g.title}</div>` : "") +
      g.items.map(([id, label]) => `<button class="lnb__item ${id === page ? "is-active" : ""}" data-page="${id}">${label}</button>`).join("")
    ).join("");
  }

  function route() {
    const hash = (location.hash || "#foundation/overview").slice(1);
    let [section, page] = hash.split("/");
    if (!NAV[section]) section = "foundation";
    if (!page || !P[section + "/" + page]) page = "overview";
    Array.from(gnbNav.children).forEach(b => b.classList.toggle("is-active", b.dataset.section === section));
    renderLNB(section, page);
    content.innerHTML = P[section + "/" + page] ? P[section + "/" + page]() : "<p>준비 중입니다.</p>";
    content.scrollTop = 0; window.scrollTo(0, 0);
  }

  gnbNav.addEventListener("click", (e) => { const b = e.target.closest("[data-section]"); if (b) location.hash = b.dataset.section + "/overview"; });
  lnb.addEventListener("click", (e) => {
    const b = e.target.closest("[data-page]"); if (!b) return;
    location.hash = (location.hash.slice(1).split("/")[0] || "foundation") + "/" + b.dataset.page;
  });
  content.addEventListener("click", (e) => {
    const goCard = e.target.closest("[data-go]");
    if (goCard) { location.hash = (location.hash.slice(1).split("/")[0] || "foundation") + "/" + goCard.dataset.go; return; }
    const tab = e.target.closest(".tab");
    if (tab) {
      const wrap = tab.closest(".themed");
      wrap.dataset.theme = tab.dataset.p;
      wrap.querySelectorAll(".tab").forEach(t => t.classList.toggle("is-active", t === tab));
      const suffix = tab.dataset.p === "rdpline" ? "-rdpline" : tab.dataset.p === "wigoview" ? "-wigoview" : "";
      wrap.querySelectorAll(".demoimg").forEach(img => { img.src = "img/demo/" + img.dataset.base + suffix + ".png"; });
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();
