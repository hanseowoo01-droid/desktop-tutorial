/* ============================================================
   BECUAI Design System — App (coded pages, Figma 기준)
   텍스트·UI는 HTML/CSS로 코딩, 아이콘은 인라인 SVG.
   제품 변형(AISURFER/RDPLINE/WIGOVIEW)은 data-theme로 brand 토큰 교체.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- Navigation (Figma LNB 구조) ---------------- */
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
  const SECTION_LABEL = { ux: "UX 원칙", foundation: "Foundation", component: "Component" };

  /* ---------------- Helpers ---------------- */
  function header(section, kr, en, desc) {
    return `<div class="bc">홈<span>›</span>${SECTION_LABEL[section]}<span>›</span>${en}</div>
      <h1 class="page-title">${kr} <em>${en}</em></h1>
      <p class="page-desc">${desc}</p>`;
  }
  function themed(inner) {
    const tabs = ["aisurfer", "rdpline", "wigoview"].map((p, i) =>
      `<button class="tab ${i === 0 ? "is-active" : ""}" data-p="${p}"><span class="dot"></span>${p.toUpperCase()}</button>`).join("");
    return `<div class="themed" data-theme="aisurfer">
      <div class="tabs">${tabs}</div>
      <div class="themed-body">${inner}</div></div>`;
  }
  function sec(t, d, body) { return `<div class="sec"><h2 class="sec__title">${t}</h2>${d ? `<p class="sec__desc">${d}</p>` : ""}${body}</div>`; }
  function block(t, body) { return `<div class="sec"><h2 class="sec__title">${t}</h2><div class="demo">${body}</div></div>`; }
  function cell(inner, cap) { return `<div class="cell">${inner}${cap ? `<span class="cell__cap">${cap}</span>` : ""}</div>`; }
  function card(kr, en, desc, link) {
    const go = link ? ` data-go="${link}"` : "";
    return `<div class="ocard"${go}><div class="ic">${en[0]}</div><h3>${kr}<span>${en}</span></h3><p>${desc}</p></div>`;
  }
  function guide(dos, donts) {
    return `<div class="sec"><h2 class="sec__title">사용 가이드</h2><div class="guide">
      <div class="guide__col do"><div class="guide__bar">✓ 권장 (Do)</div><div class="guide__body"><ul>${dos.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
      <div class="guide__col dont"><div class="guide__bar">✕ 지양 (Don't)</div><div class="guide__body"><ul>${donts.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
    </div></div>`;
  }
  // Figma의 컴포넌트 가이드 공통 문구(파일에 동일 텍스트가 들어 있음)
  const G_DO = ["필터·다중 선택 토큰으로 사용", "선택 상태를 명확히 강조", "자주 쓰는 옵션을 앞에 배치"];
  const G_DONT = ["읽기 전용 분류에 사용 (태그 권장)", "선택 상태가 모호한 스타일", "칩을 주요 액션 버튼으로 사용"];
  const eye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa2b1" stroke-width="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;
  const check = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-6.5"/></svg>`;

  /* ---------------- Pages ---------------- */
  const P = {};

  /* ===== UX ===== */
  P["ux/overview"] = () => header("ux", "UX 원칙", "Overview",
    "BECUAI 제품군(AISURFER · RDPLINE · WIGOVIEW)의 UI/UX를 글로벌 서비스 수준으로 재정의하기 위한 전사 공통 디자인 원칙입니다. PO 인터뷰와 제품 직접 사용 분석에서 도출한 4대 원칙을 기준으로, 모든 제품이 하나의 일관된 경험을 지향합니다.") +
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

  P["ux/principles"] = () => header("ux", "핵심 원칙", "Core Principles",
    "전 제품에 공통으로 적용되는 4대 UX/UI 원칙입니다. 각 원칙은 구체적인 실행 기준과 측정 지표를 함께 정의해, ‘좋은 디자인’을 감이 아닌 합의된 기준으로 판단합니다.") +
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

  P["ux/decisive"] = () => header("ux", "결정적 경험", "Decisive Moments",
    "결정적 경험은 사용자가 가치를 체감하고 감동하는 결정적 순간입니다. 3개 사용자군(김미정·박준호·이용철)의 저니맵 분석에서 도출한 As-Is 마찰을 해소하는 목표 경험(To-Be)을 정의합니다.") +
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

  P["ux/priority"] = () => header("ux", "우선순위 규칙", "Priority Rules",
    "자원과 일정이 한정된 상황에서 무엇을 먼저 할지 판단하는 기준입니다. 원칙이 서로 충돌할 때 아래 우선순위를 따릅니다.") +
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
      ].map(([lv, t, tags, eff]) => `<div class="pr">
        <span class="pr__lv">${lv}</span>
        <div class="pr__mid"><b>${t}</b><div class="pr__tags">${tags.map(x => `<span>${x}</span>`).join("")}</div></div>
        <div class="pr__oc"><span>기대 효과</span><b>${eff}</b></div></div>`).join("")}</div>`);

  /* ===== Foundation ===== */
  P["foundation/overview"] = () => header("foundation", "Foundation", "Foundation",
    "Foundation은 BECUAI 디자인 시스템의 토대가 되는 시각 원칙과 디자인 토큰의 모음입니다. 모든 컴포넌트와 화면은 이 기초 위에서 일관되게 만들어집니다. 아래 항목을 통해 각 토큰을 살펴보세요.") +
    `<div class="grid-cards">
      ${card("색상", "Color", "브랜드·위계·상태를 전달하는 색상 토큰", "color")}
      ${card("타이포그래피", "Typography", "서체와 8단계 타입 스케일", "typography")}
      ${card("간격", "Spacing", "4px 배수 기반 간격 체계", "spacing")}
      ${card("아이콘", "Iconography", "24px 키라인 라인 아이콘", "iconography")}
      ${card("그림자", "Elevation", "표면 높이를 표현하는 그림자", "elevation")}
      ${card("둥근 모서리", "Radius", "요소별 모서리 곡률", "radius")}
      ${card("모션", "Motion", "전환 지속시간과 이징", "motion")}
    </div>`;

  P["foundation/color"] = () => header("foundation", "색상", "Color",
    "BECUAI는 3개 제품(AISURFER · RDPLINE · WIGOVIEW)을 위한 통합 색상 시스템입니다. 동일한 스케일 구조 위에서 제품별 Primary(브랜드) 색상만 다르게 사용하며, Neutral·Semantic은 공통으로 공유합니다.") +
    sec("Primary · 제품별 브랜드", "제품을 식별하고 핵심 액션을 강조하는 주조색입니다. 제품별로 색상만 다르고 스케일(5~95)과 사용 규칙은 동일합니다. 기본값은 primary/50입니다.",
      ramp("AISURFER", "aisurfer") + ramp("RDPLINE", "rdpline") + ramp("WIGOVIEW", "wigoview")) +
    sec("Neutral · 공통", "텍스트·배경·보더 등 화면 대부분을 구성하는 무채색입니다. 3제품 공통으로 사용합니다.",
      `<div class="ramp">${[["g0", "Gray 0", "#ffffff", 1], ["g50", "Gray 50", "#f7f8fa", 1], ["g100", "Gray 100", "#eef1f6", 1],
        ["g200", "Gray 200", "#d8dce3", 1], ["g300", "Gray 300", "#c7cdd8", 1], ["g500", "Gray 500", "#717b8c"],
        ["g600", "Gray 600", "#50596b"], ["g900", "Gray 900", "#141a24"]]
        .map(([id, n, hex, light]) => sw(n, hex, light)).join("")}</div>`) +
    sec("Semantic · 공통", "상태와 피드백을 전달하는 의미 색상입니다. 3제품 공통입니다.",
      `<div class="ramp">${[["Success", "#15a04b"], ["Warning", "#f5a623"], ["Error", "#eb0000"], ["Info", "#0e4dff"]]
        .map(([n, hex]) => sw(n, hex)).join("")}</div>`);

  P["foundation/typography"] = () => header("foundation", "타이포그래피", "Typography",
    "본문 서체는 Pretendard를 사용합니다. 화면 위계에 따라 타입 스케일을 적용합니다.") +
    sec("타입 스케일 Type Scale", "",
      [["Display", 40, 700], ["Headline", 28, 700], ["Title", 20, 600], ["Body", 16, 400], ["Caption", 12, 400]]
        .map(([n, s, w]) => `<div class="type-row"><div class="tlabel">${n} · ${s}px / ${w}</div>
          <div class="type-sample" style="font-size:${s}px;font-weight:${w}">다람쥐 헌 쳇바퀴에 타고파 Aa 123</div></div>`).join(""));

  P["foundation/spacing"] = () => header("foundation", "간격", "Spacing",
    "모든 간격은 4px의 배수로 정의합니다.") +
    sec("간격 스케일 Spacing Scale", "",
      `<div class="demo" style="align-items:flex-end">${[4, 8, 12, 16, 20, 24, 32, 48].map(v =>
        `<div class="box-demo"><div class="b" style="width:${v}px;height:${v}px;border-radius:4px"></div><span class="cell__cap">${v}</span></div>`).join("")}</div>`);

  P["foundation/radius"] = () => header("foundation", "둥근 모서리", "Radius",
    "요소 크기·중요도에 따라 모서리 곡률을 적용합니다.") +
    sec("반경 스케일 Radius Scale", "",
      `<div class="demo">${[["xs", 4], ["sm", 6], ["md", 8], ["lg", 12], ["xl", 16], ["full", 999]].map(([n, v]) =>
        `<div class="box-demo"><div class="b" style="width:72px;height:72px;border-radius:${v}px"></div><span class="cell__cap">${n} · ${v === 999 ? "full" : v + "px"}</span></div>`).join("")}</div>`);

  P["foundation/elevation"] = () => header("foundation", "그림자", "Elevation",
    "표면의 높이를 그림자로 표현합니다.") +
    sec("그림자 단계 Shadow", "",
      `<div class="demo">${[["sm", "var(--shadow-sm)"], ["md", "var(--shadow-md)"], ["lg", "var(--shadow-lg)"]].map(([n, s]) =>
        `<div class="box-demo"><div style="width:120px;height:80px;border-radius:12px;background:#fff;box-shadow:${s}"></div><span class="cell__cap">${n}</span></div>`).join("")}</div>`);

  P["foundation/motion"] = () => header("foundation", "모션", "Motion",
    "상태 변화를 자연스럽게 연결하기 위해 지속시간과 이징을 정의합니다.") +
    sec("지속시간 Duration", "",
      `<table class="dtable"><thead><tr><th>토큰</th><th>값</th><th>용도</th></tr></thead><tbody>
      <tr><td><code>fast</code></td><td>100ms</td><td>호버·포커스 등 즉각 반응</td></tr>
      <tr><td><code>base</code></td><td>200ms</td><td>기본 전환(버튼·토글)</td></tr>
      <tr><td><code>slow</code></td><td>300ms</td><td>드롭다운·시트 펼침</td></tr></tbody></table>`) +
    sec("이징 Easing", "",
      `<table class="dtable"><thead><tr><th>토큰</th><th>cubic-bezier</th><th>용도</th></tr></thead><tbody>
      <tr><td><code>standard</code></td><td>(.4, 0, .2, 1)</td><td>대부분의 전환</td></tr>
      <tr><td><code>decelerate</code></td><td>(0, 0, .2, 1)</td><td>진입</td></tr>
      <tr><td><code>accelerate</code></td><td>(.4, 0, 1, 1)</td><td>이탈</td></tr></tbody></table>`);

  P["foundation/iconography"] = () => header("foundation", "아이콘", "Iconography",
    "AISURFER 디자인 시스템 기반의 아이콘입니다. 24px 기준 그리드 위에서 stroke icon을 제작하고, 사용 크기는 16·20·24·32·40·48px입니다.") +
    sec("스트로크 & 스타일 Stroke & Style", "",
      `<div class="demo">
        ${stCard("2px", "선 두께", "모든 아이콘 2px 통일")}
        ${stCard("Round", "끝점 · 꼭짓점", "둥근 캡 · 조인 사용")}
        ${stCard("2px", "모서리 반경", "꺾임은 2px radius")}
        ${stCard("24px", "기본 사이즈", "24px 그리드 1:1 제작")}
      </div>`) +
    sec("아이콘 크기 Icon Size", "시스템 아이콘의 기준 사이즈는 24px이며, 16·20·24·32·40·48px를 사용합니다.",
      `<div class="demo demo--center" style="gap:32px">
        ${[16, 20, 24, 32, 40, 48].map(s => `<div class="cell"><div class="szbox" style="width:${s}px;height:${s}px">${ic("star", s)}</div><span class="cell__cap">${s}px</span></div>`).join("")}
      </div>`) +
    `<div class="sec"><h2 class="sec__title">카테고리별 아이콘 세트</h2>
      ${ICON_CATS.map(([title, names]) => `<div class="ico-cat"><h4>${title} <span>${names.length}</span></h4>
        <div class="ico-grid">${names.map(n => `<div class="ico-tile">${ic(n, 24)}<span>${n}</span></div>`).join("")}</div></div>`).join("")}
    </div>`;

  /* ===== Component ===== */
  P["component/overview"] = () => header("component", "Component", "Component",
    "BECUAI 제품군에서 공통으로 사용하는 UI 컴포넌트 모음입니다. AISURFER 디자인 시스템을 기준으로 정리했으며, 모든 컴포넌트는 Foundation 토큰(색상·타이포·간격·아이콘)을 사용합니다.") +
    grp("액션", [["버튼", "Button", "사용자 행동을 실행하는 기본 액션", "button"]]) +
    grp("입력", [
      ["입력 필드", "Input", "한 줄 텍스트 입력", "input"], ["텍스트 영역", "Textarea", "여러 줄 텍스트 입력", "textarea"],
      ["검색", "Search", "검색어 입력 필드", "search"], ["셀렉트", "Select", "목록에서 선택하는 드롭다운", "select"],
      ["체크박스", "Checkbox", "다중 선택", "checkbox"], ["라디오", "Radio", "단일 선택", "radio"],
      ["토글 스위치", "Toggle", "켜기/끄기 전환", "toggle"], ["날짜 입력", "Date input", "날짜 입력 필드", "date-input"],
      ["달력", "Calendar", "날짜에서 날짜 선택", "calendar"]]) +
    grp("탐색", [
      ["탭", "Tab", "화면·콘텐츠 전환", "tab"], ["페이지네이션", "Pagination", "목록 페이지 이동", "pagination"],
      ["메뉴", "Menu", "내비게이션 메뉴", "menu"], ["아코디언", "Accordion", "접고 펴는 패널", "accordion"]]) +
    grp("정보 표시", [
      ["테이블", "Table", "데이터를 표로 표시", "table"], ["리스트", "List", "항목 목록", "list"],
      ["배지", "Badge", "상태·수량 표시", "badge"], ["태그", "Tag", "속성·분류 표시", "tag"],
      ["칩", "Chip", "선택·필터 토큰", "chip"], ["타이틀", "Title", "영역 제목", "title"],
      ["캐러셀", "Carousel", "슬라이드 콘텐츠", "carousel"]]) +
    grp("피드백", [
      ["모달", "Modal", "집중이 필요한 다이얼로그", "modal"], ["툴팁", "Tooltip", "보조 설명 말풍선", "tooltip"],
      ["얼럿", "Alert", "광고 알림 메시지", "alert"]]);

  P["component/button"] = () => header("component", "버튼", "Button",
    "사용자가 행동을 실행하는 가장 기본적인 컴포넌트입니다. 한 화면에서 가장 중요한 행동 하나에 Primary를 사용합니다.") +
    themed(
      block("종류 Variant",
        cell(`<button class="btn btn--primary">버튼</button>`, "Primary") +
        cell(`<button class="btn btn--secondary">버튼</button>`, "Secondary") +
        cell(`<button class="btn btn--tertiary">버튼</button>`, "Tertiary") +
        cell(`<button class="btn btn--black">버튼</button>`, "Black")) +
      block("크기 Size",
        cell(`<button class="btn btn--primary">버튼</button>`, "Medium") +
        cell(`<button class="btn btn--primary btn--sm">버튼</button>`, "Small") +
        cell(`<button class="btn btn--primary btn--xs">버튼</button>`, "XSmall")) +
      block("상태 State",
        cell(`<button class="btn btn--primary">버튼</button>`, "Default") +
        cell(`<button class="btn btn--primary" style="background:var(--brand-hover)">버튼</button>`, "Hover") +
        cell(`<button class="btn btn--primary" style="background:var(--brand-pressed)">버튼</button>`, "Pressed") +
        cell(`<button class="btn is-disabled" disabled>버튼</button>`, "Disabled"))
    ) + guide(["한 화면에 Primary는 하나만", "버튼 라벨은 동사로 명확하게", "중요도 순서에 맞게 종류 선택"],
              ["Primary 버튼 여러 개 나열", "‘확인/취소’ 모두 Primary 사용", "버튼 안에 긴 문장 넣기"]);

  P["component/input"] = () => header("component", "입력 필드", "Input",
    "사용자가 한 줄 텍스트를 입력하는 기본 폼 요소입니다.") +
    themed(block("상태 State",
      field("기본 (default)") + field("포커스 (focused)", "focus") +
      field("오류 (error)", "error") + field("비활성 (disabled)", "disabled"))) +
    guide(G_DO, G_DONT);

  P["component/textarea"] = () => header("component", "텍스트영역", "Textarea",
    "여러 줄의 텍스트를 입력받는 입력 필드입니다. 입력량이 많은 경우 사용합니다.") +
    themed(block("상태 State",
      ta("기본 (default)") + ta("포커스 (focused)", "focus") +
      ta("오류 (error)", "error") + ta("비활성 (disabled)", "disabled"))) +
    guide(G_DO, G_DONT);

  P["component/search"] = () => header("component", "검색", "Search",
    "키워드로 콘텐츠를 검색하는 입력 필드입니다.") +
    themed(block("상태 State",
      searchField("기본 (default)") + searchField("포커스 (focused)", "focus") + searchField("오류 (error)", "error"))) +
    guide(G_DO, G_DONT);

  P["component/select"] = () => header("component", "셀렉트", "Select",
    "정해진 목록에서 하나를 선택하는 드롭다운입니다.") +
    themed(block("상태 State",
      selectField("기본 (default)") + selectField("포커스 (focused)", "focus") +
      selectField("오류 (error)", "error") + selectField("비활성 (disabled)", "disabled"))) +
    guide(G_DO, G_DONT);

  P["component/date-input"] = () => header("component", "날짜 입력", "Date Input",
    "날짜를 직접 입력하거나 선택하는 입력 필드입니다.") +
    themed(block("상태 State",
      dateField("기본 (default)") + dateField("포커스 (focused)", "focus") +
      dateField("오류 (error)", "error") + dateField("비활성 (disabled)", "disabled"))) +
    guide(G_DO, G_DONT);

  P["component/calendar"] = () => header("component", "캘린더", "Calendar",
    "날짜를 선택하는 달력 컴포넌트입니다.") +
    themed(block("유형 Type",
      cell(calendarEl("day"), "일자 (day)") + cell(calendarEl("period"), "기간 (period)"))) +
    guide(G_DO, G_DONT);

  P["component/checkbox"] = () => header("component", "체크박스", "Checkbox",
    "여러 항목 중 0개 이상을 선택할 때 사용합니다.") +
    themed(block("상태 State",
      cell(cbox(false), "미선택") + cell(cbox(true), "선택됨") +
      cell(cbox(true, true), "부분 선택") + cell(cbox(false, false, true), "비활성"))) +
    guide(G_DO, G_DONT);

  P["component/radio"] = () => header("component", "라디오", "Radio",
    "여러 항목 중 하나만 선택할 때 사용합니다.") +
    themed(block("상태 State",
      cell(rbox(false), "미선택") + cell(rbox(true), "선택됨") + cell(rbox(false, true), "비활성"))) +
    guide(G_DO, G_DONT);

  P["component/toggle"] = () => header("component", "토글 스위치", "Toggle",
    "설정을 즉시 켜고 끄는 스위치입니다.") +
    themed(block("상태 State",
      cell(tog(false), "꺼짐 (Off)") + cell(tog(true), "켜짐 (On)") + cell(tog(false, true), "비활성"))) +
    guide(G_DO, G_DONT);

  P["component/tab"] = () => header("component", "탭", "Tab",
    "콘텐츠를 분류해 전환하는 내비게이션 컴포넌트입니다.") +
    themed(block("유형 Type",
      cell(`<div class="tabset line"><span class="t is-on">탭 1</span><span class="t">탭 2</span><span class="t">탭 3</span></div>`, "라인 (line)") +
      cell(`<div class="tabset fill"><span class="t is-on">탭 1</span><span class="t">탭 2</span><span class="t">탭 3</span></div>`, "채움 (fill)"))) +
    guide(G_DO, G_DONT);

  P["component/pagination"] = () => header("component", "페이지네이션", "Pagination",
    "여러 페이지를 이동하는 컴포넌트입니다.") +
    themed(block("유형 Type",
      `<div class="pgn">
        <span class="pg pg-arr">‹</span>
        <span class="pg is-on">1</span><span class="pg">2</span><span class="pg">3</span>
        <span class="pg pg-dots">…</span><span class="pg">10</span>
        <span class="pg pg-arr">›</span>
      </div>`)) +
    guide(G_DO, G_DONT);

  P["component/menu"] = () => header("component", "메뉴", "Menu",
    "목록형 선택 항목을 제공하는 드롭다운 메뉴입니다.") +
    themed(block("유형 Type",
      cell(menuEl(["내 프로필", "설정", "로그아웃"]), "3개 항목") +
      cell(menuEl(["대시보드", "프로젝트", "멤버", "알림", "결제", "통계", "설정", "로그아웃"]), "8개 항목"))) +
    guide(G_DO, G_DONT);

  P["component/accordion"] = () => header("component", "아코디언", "Accordion",
    "영역을 접고 펴서 정보를 정리하는 컴포넌트입니다.") +
    themed(block("상태 State",
      cell(acc(false), "닫힘 (Default)") + cell(acc(true), "펼침 (select)"))) +
    guide(G_DO, G_DONT);

  P["component/table"] = () => header("component", "테이블", "Table",
    "데이터를 행과 열로 정리해 표시하는 컴포넌트입니다.") +
    themed(block("유형 Type",
      cell(tableEl(false), "기본 (basic)") + cell(tableEl(true), "체크박스 (checkbox)"))) +
    guide(G_DO, G_DONT);

  P["component/list"] = () => header("component", "리스트", "List",
    "항목을 나열해 표시하는 목록 컴포넌트입니다.") +
    themed(block("유형 Type",
      cell(listEl(1), "1depth") + cell(listEl(2), "2depth") + cell(listEl(3), "3depth"))) +
    guide(G_DO, G_DONT);

  P["component/title"] = () => header("component", "타이틀", "Title",
    "영역의 제목을 표시하는 컴포넌트입니다.") +
    themed(block("유형 Type",
      cell(`<div class="ttl ttl-1"><span class="bar"></span><b>1depth 타이틀</b></div>`, "1depth") +
      cell(`<div class="ttl ttl-2"><b>2depth 타이틀</b><span>보조 설명 텍스트</span></div>`, "2depth"))) +
    guide(G_DO, G_DONT);

  P["component/carousel"] = () => header("component", "캐러셀", "Carousel",
    "여러 콘텐츠를 좌우로 넘겨 보여주는 컴포넌트입니다.") +
    themed(block("유형 Type",
      `<div class="crsl">
        <span class="crsl-arr">‹</span>
        <div class="crsl-stage"><div class="crsl-slide">Slide</div></div>
        <span class="crsl-arr">›</span>
      </div>
      <div class="crsl-dots"><i class="is-on"></i><i></i><i></i><i></i></div>`)) +
    guide(G_DO, G_DONT);

  P["component/modal"] = () => header("component", "모달", "Modal",
    "현재 화면 위에 띄워 중요한 정보나 작업을 처리하는 대화 상자입니다.") +
    themed(block("크기 Size",
      cell(modalEl(), "기본 (medium)"))) +
    guide(G_DO, G_DONT);

  P["component/tooltip"] = () => header("component", "툴팁", "Tooltip",
    "요소에 대한 보조 설명을 짧게 제공하는 컴포넌트입니다.") +
    themed(block("방향 Direction",
      cell(tip("top"), "top") + cell(tip("bottom"), "bottom") + cell(tip("left"), "left") + cell(tip("right"), "right"))) +
    guide(G_DO, G_DONT);

  P["component/badge"] = () => header("component", "배지", "Badge",
    "수량이나 상태를 작게 표시하는 표식입니다.") +
    themed(
      block("유형 Type",
        cell(`<span class="badge badge--solid">Badge</span>`, "solid") +
        cell(`<span class="badge badge--outline">Badge</span>`, "outline") +
        cell(`<span class="badge badge--pastel">Badge</span>`, "pastel")) +
      block("컬러 Color",
        cell(`<span class="badge badge--solid">Primary</span>`, "primary") +
        cell(`<span class="badge c-success">Success</span>`, "success") +
        cell(`<span class="badge c-warning">Warning</span>`, "warning") +
        cell(`<span class="badge c-danger">Danger</span>`, "danger") +
        cell(`<span class="badge c-info">Info</span>`, "info"))) +
    guide(G_DO, G_DONT);

  P["component/tag"] = () => header("component", "태그", "Tag",
    "콘텐츠의 속성·분류를 표시하는 라벨입니다.") +
    themed(block("유형 Type",
      cell(`<span class="tag tag--line">라인</span>`, "line") +
      cell(`<span class="tag tag--fill">채움</span>`, "fill"))) +
    guide(G_DO, G_DONT);

  P["component/chip"] = () => header("component", "칩", "Chip",
    "필터·다중 선택을 토글 형태로 보여주는 컴포넌트입니다.") +
    themed(block("상태 State",
      cell(`<span class="chip">칩</span>`, "미선택") +
      cell(`<span class="chip is-checked">칩</span>`, "선택됨") +
      cell(`<span class="chip is-disabled">칩</span>`, "비활성"))) +
    guide(G_DO, G_DONT);

  P["component/alert"] = () => header("component", "얼럿", "Alert",
    "상태·결과를 강조해 알리는 메시지 컴포넌트입니다.") +
    themed(block("상태 State",
      `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
        <div class="alert success"><span class="ico">✓</span>저장이 완료되었습니다.</div>
        <div class="alert info"><span class="ico">ℹ</span>새로운 업데이트가 있습니다.</div>
        <div class="alert danger"><span class="ico">✕</span>입력값을 확인해 주세요.</div>
        <div class="alert warning"><span class="ico">!</span>저장하지 않은 변경이 있습니다.</div>
        <div class="alert default">기본 알림 메시지입니다.</div>
      </div>`)) +
    guide(G_DO, G_DONT);

  /* ---------------- Content builders ---------------- */
  function grp(title, items) {
    return `<h2 class="ov-grp">${title}</h2><div class="grid-cards">${items.map(a => card(a[0], a[1], a[2], a[3])).join("")}</div>`;
  }
  function ramp(name, key) {
    const steps = [5, 10, 30, 40, 50, 60, 70, 80];
    return `<div class="ramp-name">${name} <em>primary</em></div>
      <div class="ramp">${steps.map(s => {
        const light = s <= 30;
        return `<div class="swatch ${light ? "dark" : ""}" style="background:var(--${key}-${s})"><b>primary/${s}${s === 50 ? " · Base" : ""}</b></div>`;
      }).join("")}</div>`;
  }
  function sw(name, hex, light) { return `<div class="swatch ${light ? "dark" : ""}" style="background:${hex}"><b>${name}</b>${hex}</div>`; }
  function stCard(big, t, d) { return `<div class="st-card"><div class="st-big">${big}</div><b>${t}</b><span>${d}</span></div>`; }

  function field(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const ph = state === "disabled" ? "" : "내용을 입력하세요";
    const fs = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    const msg = state === "focus" ? `<div class="field__msg info">ℹ 메시지를 입력해 주세요</div>`
      : state === "error" ? `<div class="field__msg error">✕ 메시지를 입력해 주세요</div>` : "";
    return `<div class="cell"><div class="field${cls}"><span class="field__label">레이블</span>
      <span class="field__hint">입력시 필요한 정보를 입력해 주세요</span>
      <div style="position:relative"><input class="input" placeholder="${ph}" ${state === "disabled" ? "disabled" : ""}${fs}>
      <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%)">${eye}</span></div>${msg}</div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function ta(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const fs = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    const msg = state === "error" ? `<div class="field__msg error">✕ 메시지를 입력해 주세요</div>` : "";
    return `<div class="cell"><div class="field${cls}"><span class="field__label">레이블</span>
      <textarea class="textarea" placeholder="${state === "disabled" ? "" : "내용을 입력하세요"}" ${state === "disabled" ? "disabled" : ""}${fs}></textarea>${msg}</div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function searchField(cap, state) {
    const cls = state === "error" ? " is-error" : "";
    const st = "padding-left:38px;" + (state === "focus" ? "border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg);" : "");
    return `<div class="cell"><div class="field${cls}">
      <div style="position:relative">
        <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%)">${icRaw("search", 18, "#9aa2b1")}</span>
        <input class="input" style="${st}" placeholder="검색어를 입력하세요"></div></div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function selectField(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const fs = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    return `<div class="cell"><div class="field${cls}"><span class="field__label">레이블</span>
      <select class="select" ${state === "disabled" ? "disabled" : ""}${fs}><option>선택해 주세요</option></select></div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function dateField(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const fs = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    return `<div class="cell"><div class="field${cls}">
      <div style="position:relative"><input class="input" value="${state === "disabled" ? "" : "2026-06-21"}" ${state === "disabled" ? "disabled" : ""}${fs}>
      <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%)">${icRaw("calendar", 18, "#9aa2b1")}</span></div></div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function calendarEl(mode) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    let cells = "";
    for (let d = 1; d <= 30; d++) {
      let cls = "cd";
      if (mode === "day" && d === 14) cls += " is-sel";
      if (mode === "period" && d >= 12 && d <= 18) cls += d === 12 || d === 18 ? " is-sel" : " is-range";
      cells += `<span class="${cls}">${d}</span>`;
    }
    return `<div class="cal"><div class="cal-h"><span>‹</span><b>2026.06</b><span>›</span></div>
      <div class="cal-w">${days.map(x => `<span>${x}</span>`).join("")}</div>
      <div class="cal-g"><span class="cd off"></span><span class="cd off"></span>${cells}</div></div>`;
  }
  function menuEl(items) {
    return `<div class="menu">${items.map((x, i) => `<div class="menu-i ${i === 0 ? "is-on" : ""}">${x}</div>`).join("")}</div>`;
  }
  function acc(open) {
    return `<div class="acc">
      <div class="acc-h">아코디언 제목<span>${open ? "▴" : "▾"}</span></div>
      ${open ? `<div class="acc-b">펼쳐진 내용 영역입니다. 항목에 대한 상세 설명이 여기에 표시됩니다.</div>` : ""}
    </div>`;
  }
  function tableEl(checkbox) {
    const head = `<tr>${checkbox ? `<th style="width:40px">${cbox(false)}</th>` : ""}<th>이름</th><th>상태</th><th>날짜</th></tr>`;
    const rows = [["김미정", "활성", "06.21"], ["박준호", "대기", "06.20"], ["이용철", "활성", "06.19"]]
      .map(r => `<tr>${checkbox ? `<td>${cbox(false)}</td>` : ""}<td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("");
    return `<table class="dtable" style="min-width:360px"><thead>${head}</thead><tbody>${rows}</tbody></table>`;
  }
  function listEl(depth) {
    if (depth === 1) return `<div class="lst">${["첫 번째 항목", "두 번째 항목", "세 번째 항목"].map(x => `<div class="lst-i">${x}</div>`).join("")}</div>`;
    if (depth === 2) return `<div class="lst">${["상위 항목 A", "상위 항목 B"].map(x => `<div class="lst-i">${x}<div class="lst-sub"><div class="lst-i">하위 항목 1</div><div class="lst-i">하위 항목 2</div></div></div>`).join("")}</div>`;
    return `<div class="lst"><div class="lst-i">상위 항목<div class="lst-sub"><div class="lst-i">중간 항목<div class="lst-sub"><div class="lst-i">하위 항목</div></div></div></div></div></div>`;
  }
  function modalEl() {
    return `<div class="mdl">
      <div class="mdl-h"><b>모달 제목</b><span>✕</span></div>
      <div class="mdl-b">모달 본문 영역입니다. 사용자에게 중요한 정보를 전달하거나 확인을 요청합니다.</div>
      <div class="mdl-f"><button class="btn btn--tertiary btn--sm">취소</button><button class="btn btn--primary btn--sm">확인</button></div>
    </div>`;
  }
  function tip(dir) { return `<div class="tipwrap tip-${dir}"><span class="tip-target">${icRaw("info", 18, "#50596b")}</span><span class="tip-bubble">툴팁 메시지</span></div>`; }

  function cbox(checked, ind, dis) {
    return `<label class="check ${ind ? "is-indeterminate" : ""} ${dis ? "is-disabled" : ""}">
      <input type="checkbox" ${checked ? "checked" : ""} ${dis ? "disabled" : ""}>
      <span class="box">${ind ? `<svg width="12" height="12"><rect x="2" y="5" width="8" height="2" rx="1" fill="#fff"/></svg>` : check}</span></label>`;
  }
  function rbox(checked, dis) {
    return `<label class="radio ${dis ? "is-disabled" : ""}"><input type="radio" ${checked ? "checked" : ""} ${dis ? "disabled" : ""}><span class="box"></span></label>`;
  }
  function tog(on, dis) {
    return `<label class="toggle ${dis ? "is-disabled" : ""}"><input type="checkbox" ${on ? "checked" : ""} ${dis ? "disabled" : ""}><span class="track"></span></label>`;
  }

  /* ---------------- Icons (24px grid / 2px stroke) ---------------- */
  const IP = {
    "arrow-right": `<path d="M5 12h14M13 6l6 6-6 6"/>`, "arrow-left": `<path d="M19 12H5M11 6l-6 6 6 6"/>`,
    "arrow-up": `<path d="M12 19V5M6 11l6-6 6 6"/>`, "arrow-down": `<path d="M12 5v14M6 13l6 6 6-6"/>`,
    "chevron-right": `<path d="M9 6l6 6-6 6"/>`, "chevron-left": `<path d="M15 6l-6 6 6 6"/>`,
    "chevron-up": `<path d="M6 15l6-6 6 6"/>`, "chevron-down": `<path d="M6 9l6 6 6-6"/>`,
    refresh: `<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v5h-5"/>`, "external-link": `<path d="M14 4h6v6M20 4l-9 9M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`,
    home: `<path d="M3 11l9-8 9 8M5 10v10h14V10"/>`, search: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>`,
    menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`, close: `<path d="M6 6l12 12M18 6L6 18"/>`,
    "more-vertical": `<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>`,
    grid: `<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>`,
    plus: `<path d="M12 5v14M5 12h14"/>`, minus: `<path d="M5 12h14"/>`,
    edit: `<path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM14.5 6.5l3 3"/>`,
    copy: `<path d="M8 8h11v11H8zM4 16V4h11"/>`, trash: `<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>`,
    download: `<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>`, upload: `<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>`,
    share: `<circle cx="5" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M7 11l9-4M7 13l9 4"/>`,
    filter: `<path d="M3 5h18l-7 8v6l-4-2v-4z"/>`, settings: `<circle cx="12" cy="12" r="3.3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>`,
    save: `<path d="M5 4h11l3 3v13H5zM8 4v5h7M8 13h8v7H8z"/>`,
    bell: `<path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 5.5 2 6.5H4c.5-1 2-2 2-6.5ZM10 20a2 2 0 0 0 4 0"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6" fill="currentColor"/>`,
    warning: `<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>`,
    "check-circle": `<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>`,
    "close-circle": `<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>`,
    "help-circle": `<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 1 1 3 2.4c-.8.4-1 .8-1 1.6"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>`,
    heart: `<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z"/>`,
    star: `<path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8 6.8 19.3l1-5.9L3.5 9.2l5.9-.9Z"/>`,
    bookmark: `<path d="M6 4h12v17l-6-4-6 4z"/>`,
    play: `<path d="M7 5l12 7-12 7z"/>`, pause: `<path d="M8 5v14M16 5v14"/>`,
    image: `<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M5 18l5-5 4 4 3-3 3 3"/>`,
    video: `<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>`,
    volume: `<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6M18.5 7a6 6 0 0 1 0 10"/>`,
    mic: `<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3"/>`,
    camera: `<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3"/>`,
    mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>`,
    chat: `<path d="M4 5h16v11H9l-4 4v-4H4z"/>`,
    phone: `<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>`,
    user: `<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>`,
    users: `<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5M16 5a3.5 3.5 0 0 1 0 7M21 20c0-2.6-1.2-4.3-3.5-5"/>`,
    file: `<path d="M6 3h8l5 5v13H6zM14 3v5h5"/>`,
    folder: `<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
    "folder-open": `<path d="M4 6a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v1H4zM3 9h19l-2.2 9a1 1 0 0 1-1 1H4.2a1 1 0 0 1-1-1z"/>`,
    clipboard: `<path d="M9 4h6v3H9zM7 5H6v15h12V5h-1"/>`,
    link: `<path d="M9 15l6-6M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2"/>`,
    cart: `<path d="M3 4h2l2 12h11l2-8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>`,
    tag: `<path d="M3 4h8l9 9-7 7-9-9z"/><circle cx="7.5" cy="8.5" r="1.2"/>`,
    "credit-card": `<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>`,
    gift: `<path d="M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8C9 8 8 4 10.5 4S12 8 12 8M12 8c3 0 4-4 1.5-4S12 8 12 8"/>`,
    monitor: `<rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/>`,
    smartphone: `<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`,
    calendar: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>`,
    lock: `<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
    eye: `<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,
    "map-pin": `<path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>`,
  };
  function icRaw(name, size, color) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color || "currentColor"}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IP[name] || IP.home}</svg>`;
  }
  function ic(name, size) { return icRaw(name, size || 24); }
  const ICON_CATS = [
    ["화살표 · 방향", ["arrow-right", "arrow-left", "arrow-up", "arrow-down", "chevron-right", "chevron-left", "chevron-up", "chevron-down", "refresh", "external-link"]],
    ["내비게이션", ["home", "search", "menu", "close", "more-vertical", "grid"]],
    ["액션", ["plus", "minus", "edit", "copy", "trash", "download", "upload", "share", "filter", "settings", "save"]],
    ["상태 · 알림", ["bell", "info", "warning", "check-circle", "close-circle", "help-circle", "heart", "star", "bookmark"]],
    ["미디어", ["play", "pause", "image", "video", "volume", "mic", "camera"]],
    ["커뮤니케이션", ["mail", "chat", "phone", "user", "users"]],
    ["파일 · 폴더", ["file", "folder", "folder-open", "clipboard", "link"]],
    ["커머스", ["cart", "tag", "credit-card", "gift"]],
    ["디바이스 · 시간", ["monitor", "smartphone", "clock", "calendar", "lock", "eye", "map-pin"]],
  ];

  /* ---------------- Render / Routing ---------------- */
  const gnbNav = document.getElementById("gnbNav");
  const lnb = document.getElementById("lnb");
  const content = document.getElementById("content");

  gnbNav.innerHTML = Object.keys(NAV).map(k =>
    `<button class="gnb__item" data-section="${k}">${NAV[k].label}</button>`).join("");

  function renderLNB(section, page) {
    const s = NAV[section];
    const head = s.lnbTitle ? `<div class="lnb__title">${s.lnbTitle}</div>` : "";
    lnb.innerHTML = head + s.groups.map(g =>
      (g.title ? `<div class="lnb__group">${g.title}</div>` : "") +
      g.items.map(([id, label]) =>
        `<button class="lnb__item ${id === page ? "is-active" : ""}" data-page="${id}">${label}</button>`).join("")
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

  gnbNav.addEventListener("click", (e) => {
    const b = e.target.closest("[data-section]"); if (!b) return;
    location.hash = b.dataset.section + "/overview";
  });
  lnb.addEventListener("click", (e) => {
    const b = e.target.closest("[data-page]"); if (!b) return;
    const section = location.hash.slice(1).split("/")[0] || "foundation";
    location.hash = section + "/" + b.dataset.page;
  });
  content.addEventListener("click", (e) => {
    const goCard = e.target.closest("[data-go]");
    if (goCard) { const section = location.hash.slice(1).split("/")[0] || "foundation"; location.hash = section + "/" + goCard.dataset.go; return; }
    const tab = e.target.closest(".tab");
    if (tab) {
      const wrap = tab.closest(".themed");
      wrap.dataset.theme = tab.dataset.p;
      wrap.querySelectorAll(".tab").forEach(t => t.classList.toggle("is-active", t === tab));
    }
  });

  window.addEventListener("hashchange", route);
  route();
})();
