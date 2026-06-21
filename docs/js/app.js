/* ============================================================
   BECUAI Design System — App (nav + routing + theming)
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- Navigation model ---------------- */
  const NAV = {
    ux: {
      label: "UX 원칙",
      groups: [{ items: [["overview", "Overview"], ["principles", "핵심 원칙"]] }],
    },
    foundation: {
      label: "Foundation",
      groups: [{
        items: [
          ["overview", "Overview"], ["color", "Color"], ["typography", "Typography"],
          ["spacing", "Spacing"], ["radius", "Radius"], ["iconography", "Iconography"],
          ["elevation", "Elevation"], ["motion", "Motion"],
        ],
      }],
    },
    component: {
      label: "Component",
      groups: [
        { title: "액션", items: [["overview", "Overview"], ["button", "Button"]] },
        { title: "입력", items: [["input", "Input"], ["select", "Select"], ["checkbox", "Checkbox"], ["radio", "Radio"], ["toggle", "Toggle"]] },
        { title: "표시·피드백", items: [["badge", "Badge"], ["tag", "Tag"], ["chip", "Chip"], ["alert", "Alert"]] },
      ],
    },
  };
  const SECTION_LABEL = { ux: "UX 원칙", foundation: "Foundation", component: "Component" };

  /* ---------------- Small helpers ---------------- */
  const h = (s) => s;
  function header(section, kr, en, desc) {
    return `<div class="bc">홈<span>›</span>${SECTION_LABEL[section]}<span>›</span>${en}</div>
      <h1 class="page-title">${kr} ${en}</h1>
      <p class="page-desc">${desc}</p>`;
  }
  function themed(inner) {
    const tabs = ["aisurfer", "rdpline", "wigoview"].map((p, i) =>
      `<button class="tab ${i === 0 ? "is-active" : ""}" data-p="${p}"><span class="dot"></span>${p.toUpperCase()}</button>`).join("");
    return `<div class="themed" data-theme="aisurfer">
      <div class="tabs">${tabs}</div>
      <div class="themed-body">${inner}</div></div>`;
  }
  const check = `<svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 8.5l3 3 6-6.5"/></svg>`;
  const eye = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9aa2b1" stroke-width="1.6"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>`;

  /* ---------------- Pages ---------------- */
  const P = {};

  /* ----- UX ----- */
  P["ux/overview"] = () => header("ux", "UX 원칙", "UX Principles",
    "BECUAI 디자인 시스템이 지향하는 사용자 경험의 기준입니다. 모든 화면과 컴포넌트는 이 원칙 위에서 일관되게 설계됩니다.") +
    `<div class="grid-cards">
      ${card("결정적 경험", "Decisive Moments", "사용자가 목표를 달성하는 핵심 순간을 매끄럽게 설계합니다.")}
      ${card("우선순위 규칙", "Priority Rules", "상충하는 요구가 있을 때 무엇을 우선할지 명확히 합니다.")}
      ${card("일관성", "Consistency", "동일한 의미는 동일한 형태로, 예측 가능하게 제공합니다.")}
    </div>`;
  P["ux/principles"] = () => header("ux", "핵심 원칙", "Core Principles",
    "제품 전반에 적용되는 4가지 핵심 UX 원칙입니다.") +
    [["명확함 Clarity", "사용자가 다음 행동을 고민 없이 알 수 있게 한다."],
     ["효율 Efficiency", "최소한의 단계로 목표에 도달하게 한다."],
     ["피드백 Feedback", "모든 상호작용에 즉각적이고 의미 있는 반응을 준다."],
     ["접근성 Accessibility", "누구나 동등하게 사용할 수 있도록 한다."]]
      .map(([t, d], i) => `<div class="sec"><h2 class="sec__title">${i + 1}. ${t}</h2><p class="sec__desc">${d}</p></div>`).join("");

  /* ----- Foundation ----- */
  P["foundation/overview"] = () => header("foundation", "Foundation", "Foundation",
    "디자인 시스템의 토대가 되는 시각 원칙과 디자인 토큰입니다.") +
    `<div class="grid-cards">
      ${card("색상", "Color", "브랜드·의미·중립 색상 토큰", "color")}
      ${card("타이포그래피", "Typography", "Pretendard 기반 타입 스케일", "typography")}
      ${card("간격", "Spacing", "4px 배수 간격 체계", "spacing")}
      ${card("둥근 모서리", "Radius", "요소별 모서리 곡률", "radius")}
      ${card("아이콘", "Iconography", "24px 그리드 라인 아이콘", "iconography")}
      ${card("그림자", "Elevation", "표면 높이 그림자", "elevation")}
      ${card("모션", "Motion", "전환 지속시간·이징", "motion")}
    </div>`;

  P["foundation/color"] = () => header("foundation", "색상", "Color",
    "브랜드 컬러는 3개 제품(AISURFER·RDPLINE·WIGOVIEW)별 램프로 제공되며, 의미색과 중립색은 제품 공통입니다.") +
    sec("브랜드 램프 Brand Ramps", "각 제품의 주조색 단계입니다.",
      ramp("AISURFER", "aisurfer") + ramp("RDPLINE", "rdpline") + ramp("WIGOVIEW", "wigoview")) +
    sec("의미색 Semantic", "상태·피드백을 전달하는 고정 색상입니다 (제품 무관).",
      `<div class="ramp">
        ${sw("success", "Success", "#15a04b")}${sw("warning", "Warning", "#f5a623")}
        ${sw("danger", "Danger", "#eb0000")}${sw("info", "Info", "#0e4dff")}
      </div>`) +
    sec("중립 Neutral", "텍스트·배경·보더에 사용하는 회색 계열입니다.",
      `<div class="ramp">
        ${sw("g50", "Gray 50", "#f7f8fa", 1)}${sw("g100", "Gray 100", "#eef1f6", 1)}
        ${sw("g300", "Gray 300", "#c7cdd8", 1)}${sw("g500", "Gray 500", "#717b8c")}
        ${sw("g600", "Gray 600", "#50596b")}${sw("g900", "Gray 900", "#141a24")}
      </div>`);

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

  P["foundation/iconography"] = () => header("foundation", "아이콘", "Iconography",
    "AISURFER 디자인 시스템 기반의 아이콘입니다. 24px 기준 그리드 위에서 stroke icon(원본)을 제작하고, 디자인 구성에는 outline stroke로 면 처리한 fill icon을 사용합니다. 사용 크기는 16·20·24·32·40·48px입니다.") +
    sec("키라인 그리드 Keyline Grid", "24px 프레임 안 20px 키셰이프를 기준으로 제작하며, 상하좌우 2px를 여백(trim)으로 둡니다.",
      `<div class="demo">
        <div class="keyframe"><span class="keyshape sq"></span></div>
        <div class="keyleg">
          ${kl("정사각형 키셰이프", "20 × 20 — 기본 형태 (홈·설정 등)")}
          ${kl("원형 키셰이프", "지름 20 — 둥근 형태 (알림·사용자 등)")}
          ${kl("세로 직사각형", "16 × 20 — 세로형 (문서·책 등)")}
          ${kl("가로 직사각형", "20 × 16 — 가로형 (이미지·카드 등)")}
          <p class="keynote">• 24px 프레임 기준 상하좌우 2px를 여백으로 둡니다.</p>
        </div>
      </div>`) +
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
    sec("Stroke icon vs Fill icon", "stroke icon은 디자인 원본이고, fill icon은 이를 outline stroke해 면으로 변형한 아이콘입니다. 디자인 구성에는 fill icon을 사용합니다.",
      `<div class="demo" style="gap:24px">
        <div class="sfcard"><div class="sfico">${ic("bell", 40)}</div><b>Stroke icon</b><span>선으로 구성된 원본. 형태 수정 시 사용</span></div>
        <div class="sfcard"><div class="sfico">${ic("bell", 40, true)}</div><b>Fill icon <em>권장</em></b><span>면으로 변형한 아이콘. 실제 구성에 사용</span></div>
      </div>`) +
    `<div class="sec"><h2 class="sec__title">카테고리별 아이콘 세트</h2>
      ${ICON_CATS.map(([title, names]) => `<div class="ico-cat"><h4>${title} <span>${names.length}</span></h4>
        <div class="ico-grid">${names.map(n => `<div class="ico-tile">${ic(n, 24)}<span>${n}</span></div>`).join("")}</div></div>`).join("")}
    </div>` +
    guide(["24px 키라인 그리드 위에서 제작", "2px 스트로크 · 둥근 끝점 유지", "무게 중심을 프레임 중앙에"],
          ["임의로 선 굵기 변경 (예: 4px)", "각진 끝점 · 꼭짓점 혼용", "비율을 늘리거나 찌그러뜨리기"]);

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

  /* ----- Component ----- */
  P["component/overview"] = () => header("component", "Component", "Component",
    "BECUAI 제품군이 공통으로 사용하는 UI 컴포넌트입니다. 모든 컴포넌트는 Foundation 토큰을 사용하며, 제품 탭으로 브랜드 색상을 전환할 수 있습니다.") +
    `<div class="grid-cards">
      ${card("버튼", "Button", "행동을 실행하는 기본 컴포넌트", "button")}
      ${card("입력 필드", "Input", "텍스트를 입력받는 필드", "input")}
      ${card("셀렉트", "Select", "목록에서 선택하는 드롭다운", "select")}
      ${card("체크박스", "Checkbox", "다중 선택", "checkbox")}
      ${card("라디오", "Radio", "단일 선택", "radio")}
      ${card("토글", "Toggle", "on/off 전환", "toggle")}
      ${card("배지", "Badge", "수량·상태 표시", "badge")}
      ${card("태그", "Tag", "속성·분류 라벨", "tag")}
      ${card("칩", "Chip", "필터·다중 선택", "chip")}
      ${card("얼럿", "Alert", "상태·결과 알림", "alert")}
    </div>`;

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
              ["Primary 버튼 여러 개 나열", "'확인/취소' 모두 Primary 사용", "버튼 안에 긴 문장 넣기"]);

  P["component/input"] = () => header("component", "입력 필드", "Input",
    "사용자가 한 줄 텍스트를 입력하는 기본 폼 요소입니다.") +
    themed(block("상태 State",
      field("기본 (default)") + field("포커스 (focused)", "focus") +
      field("오류 (error)", "error") + field("비활성 (disabled)", "disabled")));

  P["component/select"] = () => header("component", "셀렉트", "Select",
    "정해진 목록에서 하나를 선택하는 드롭다운입니다.") +
    themed(block("상태 State",
      selectField("기본 (default)") + selectField("포커스 (focused)", "focus") +
      selectField("오류 (error)", "error") + selectField("비활성 (disabled)", "disabled")));

  P["component/checkbox"] = () => header("component", "체크박스", "Checkbox",
    "여러 항목 중 0개 이상을 선택할 때 사용합니다.") +
    themed(block("상태 State",
      cell(cbox(false), "미선택") + cell(cbox(true), "선택됨") +
      cell(cbox(true, true), "부분 선택") + cell(cbox(false, false, true), "비활성")));

  P["component/radio"] = () => header("component", "라디오", "Radio",
    "여러 항목 중 하나만 선택할 때 사용합니다.") +
    themed(block("상태 State",
      cell(rbox(false), "미선택") + cell(rbox(true), "선택됨") + cell(rbox(false, true), "비활성")));

  P["component/toggle"] = () => header("component", "토글 스위치", "Toggle",
    "설정을 즉시 켜고 끄는 스위치입니다.") +
    themed(block("상태 State",
      cell(tog(false), "꺼짐 (Off)") + cell(tog(true), "켜짐 (On)") + cell(tog(false, true), "비활성")));

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
        cell(`<span class="badge c-info">Info</span>`, "info")));

  P["component/tag"] = () => header("component", "태그", "Tag",
    "콘텐츠의 속성·분류를 표시하는 라벨입니다.") +
    themed(block("유형 Type",
      cell(`<span class="tag tag--line">라인</span>`, "line") +
      cell(`<span class="tag tag--fill">채움</span>`, "fill")));

  P["component/chip"] = () => header("component", "칩", "Chip",
    "필터·다중 선택을 토글 형태로 보여주는 컴포넌트입니다.") +
    themed(block("상태 State",
      cell(`<span class="chip">칩</span>`, "미선택") +
      cell(`<span class="chip is-checked">칩</span>`, "선택됨") +
      cell(`<span class="chip is-disabled">칩</span>`, "비활성")));

  P["component/alert"] = () => header("component", "얼럿", "Alert",
    "상태·결과를 강조해 알리는 메시지 컴포넌트입니다.") +
    themed(block("상태 State",
      `<div style="display:flex;flex-direction:column;gap:12px;width:100%">
        <div class="alert success"><span class="ico">✓</span>저장이 완료되었습니다.</div>
        <div class="alert info"><span class="ico">ℹ</span>새로운 업데이트가 있습니다.</div>
        <div class="alert danger"><span class="ico">✕</span>입력값을 확인해 주세요.</div>
        <div class="alert warning"><span class="ico">!</span>저장하지 않은 변경이 있습니다.</div>
        <div class="alert default">기본 알림 메시지입니다.</div>
      </div>`));

  /* ---------------- Content builders ---------------- */
  function card(kr, en, desc, link) {
    const go = link ? ` data-go="${link}"` : "";
    return `<div class="ocard"${go}><div class="ic">${en[0]}</div><h3>${kr}<span>${en}</span></h3><p>${desc}</p></div>`;
  }
  function sec(t, d, body) { return `<div class="sec"><h2 class="sec__title">${t}</h2>${d ? `<p class="sec__desc">${d}</p>` : ""}${body}</div>`; }
  function block(t, body) { return `<div class="sec"><h2 class="sec__title">${t}</h2><div class="demo">${body}</div></div>`; }
  function cell(inner, cap) { return `<div class="cell">${inner}${cap ? `<span class="cell__cap">${cap}</span>` : ""}</div>`; }
  function ramp(name, key) {
    const steps = [5, 10, 30, 40, 50, 60, 70, 80];
    return `<div style="font-weight:600;color:var(--text-strong);font-size:14px;margin:14px 0 6px">${name}</div>
      <div class="ramp">${steps.map(s => {
        const light = s <= 30;
        return `<div class="swatch ${light ? "dark" : ""}" style="background:var(--${key}-${s})"><b>${s}</b></div>`;
      }).join("")}</div>`;
  }
  function sw(id, name, hex, light) { return `<div class="swatch ${light ? "dark" : ""}" style="background:${hex}"><b>${name}</b>${hex}</div>`; }
  function field(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const ph = state === "disabled" ? "" : "내용을 입력하세요";
    const focusStyle = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    const msg = state === "focus" ? `<div class="field__msg info">ℹ 메시지를 입력해 주세요</div>`
      : state === "error" ? `<div class="field__msg error">✕ 메시지를 입력해 주세요</div>` : "";
    return `<div class="cell"><div class="field${cls}"><span class="field__label">레이블</span>
      <span class="field__hint">입력시 필요한 정보를 입력해 주세요</span>
      <div style="position:relative"><input class="input" placeholder="${ph}" ${state === "disabled" ? "disabled" : ""}${focusStyle}>
      <span style="position:absolute;right:12px;top:50%;transform:translateY(-50%)">${eye}</span></div>${msg}</div>
      <span class="cell__cap">${cap}</span></div>`;
  }
  function selectField(cap, state) {
    const cls = state === "error" ? " is-error" : state === "disabled" ? " is-disabled" : "";
    const focusStyle = state === "focus" ? ` style="border-color:var(--brand-solid);box-shadow:0 0 0 3px var(--brand-bg)"` : "";
    const msg = state === "focus" ? `<div class="field__msg info">ℹ 메시지를 입력해 주세요</div>`
      : state === "error" ? `<div class="field__msg error">✕ 메시지를 입력해 주세요</div>` : "";
    return `<div class="cell"><div class="field${cls}"><span class="field__label">레이블</span>
      <select class="select" ${state === "disabled" ? "disabled" : ""}${focusStyle}><option>선택해 주세요</option></select>${msg}</div>
      <span class="cell__cap">${cap}</span></div>`;
  }
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
  function guide(dos, donts) {
    return `<div class="sec"><h2 class="sec__title">사용 가이드</h2><div class="guide">
      <div class="guide__col do"><div class="guide__bar">✓ 권장 (Do)</div><div class="guide__body"><ul>${dos.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
      <div class="guide__col dont"><div class="guide__bar">✕ 지양 (Don't)</div><div class="guide__body"><ul>${donts.map(x => `<li>• ${x}</li>`).join("")}</ul></div></div>
    </div></div>`;
  }

  function kl(t, d) { return `<div class="kl-row"><span class="kl-dot"></span><div><b>${t}</b><span>${d}</span></div></div>`; }
  function stCard(big, t, d) { return `<div class="st-card"><div class="st-big">${big}</div><b>${t}</b><span>${d}</span></div>`; }

  /* ---------------- Icons (AISURFER-style line icons, 24px grid / 2px stroke) ---------------- */
  const IP = {
    /* 화살표 · 방향 */
    "arrow-right": `<path d="M5 12h14M13 6l6 6-6 6"/>`, "arrow-left": `<path d="M19 12H5M11 6l-6 6 6 6"/>`,
    "arrow-up": `<path d="M12 19V5M6 11l6-6 6 6"/>`, "arrow-down": `<path d="M12 5v14M6 13l6 6 6-6"/>`,
    "chevron-right": `<path d="M9 6l6 6-6 6"/>`, "chevron-left": `<path d="M15 6l-6 6 6 6"/>`,
    "chevron-up": `<path d="M6 15l6-6 6 6"/>`, "chevron-down": `<path d="M6 9l6 6 6-6"/>`,
    refresh: `<path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v5h-5"/>`, "external-link": `<path d="M14 4h6v6M20 4l-9 9M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>`,
    /* 내비게이션 */
    home: `<path d="M3 11l9-8 9 8M5 10v10h14V10"/>`, search: `<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>`,
    menu: `<path d="M4 7h16M4 12h16M4 17h16"/>`, close: `<path d="M6 6l12 12M18 6L6 18"/>`,
    "more-vertical": `<circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/>`,
    grid: `<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>`,
    /* 액션 */
    plus: `<path d="M12 5v14M5 12h14"/>`, minus: `<path d="M5 12h14"/>`,
    edit: `<path d="M4 20h4L18.5 9.5a2.1 2.1 0 0 0-3-3L5 17v3zM14.5 6.5l3 3"/>`,
    copy: `<path d="M8 8h11v11H8zM4 16V4h11"/>`, trash: `<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>`,
    download: `<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>`, upload: `<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>`,
    share: `<circle cx="5" cy="12" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/><path d="M7 11l9-4M7 13l9 4"/>`,
    filter: `<path d="M3 5h18l-7 8v6l-4-2v-4z"/>`, settings: `<circle cx="12" cy="12" r="3.3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>`,
    save: `<path d="M5 4h11l3 3v13H5zM8 4v5h7M8 13h8v7H8z"/>`,
    /* 상태 · 알림 */
    bell: `<path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 5.5 2 6.5H4c.5-1 2-2 2-6.5ZM10 20a2 2 0 0 0 4 0"/>`,
    info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="8" r=".6" fill="currentColor"/>`,
    warning: `<path d="M12 4l9 16H3z"/><path d="M12 10v4"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>`,
    "check-circle": `<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>`,
    "close-circle": `<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>`,
    "help-circle": `<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 1 1 3 2.4c-.8.4-1 .8-1 1.6"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>`,
    heart: `<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z"/>`,
    star: `<path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8 6.8 19.3l1-5.9L3.5 9.2l5.9-.9Z"/>`,
    bookmark: `<path d="M6 4h12v17l-6-4-6 4z"/>`,
    /* 미디어 */
    play: `<path d="M7 5l12 7-12 7z"/>`, pause: `<path d="M8 5v14M16 5v14"/>`,
    image: `<rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="M5 18l5-5 4 4 3-3 3 3"/>`,
    video: `<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>`,
    volume: `<path d="M4 9v6h4l5 4V5L8 9zM16 9a3 3 0 0 1 0 6M18.5 7a6 6 0 0 1 0 10"/>`,
    mic: `<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M6 11a6 6 0 0 0 12 0M12 17v3"/>`,
    camera: `<path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3"/>`,
    /* 커뮤니케이션 */
    mail: `<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>`,
    chat: `<path d="M4 5h16v11H9l-4 4v-4H4z"/>`,
    phone: `<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>`,
    user: `<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>`,
    users: `<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-5.5 6-5.5s6 2 6 5.5M16 5a3.5 3.5 0 0 1 0 7M21 20c0-2.6-1.2-4.3-3.5-5"/>`,
    /* 파일 · 폴더 */
    file: `<path d="M6 3h8l5 5v13H6zM14 3v5h5"/>`,
    folder: `<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
    "folder-open": `<path d="M4 6a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v1H4zM3 9h19l-2.2 9a1 1 0 0 1-1 1H4.2a1 1 0 0 1-1-1z"/>`,
    clipboard: `<path d="M9 4h6v3H9zM7 5H6v15h12V5h-1"/>`,
    link: `<path d="M9 15l6-6M8 12l-2 2a3 3 0 0 0 4 4l2-2M16 12l2-2a3 3 0 0 0-4-4l-2 2"/>`,
    /* 커머스 */
    cart: `<path d="M3 4h2l2 12h11l2-8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="17" cy="20" r="1.3"/>`,
    tag: `<path d="M3 4h8l9 9-7 7-9-9z"/><circle cx="7.5" cy="8.5" r="1.2"/>`,
    "credit-card": `<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/>`,
    gift: `<path d="M4 11h16v9H4zM3 8h18v3H3zM12 8v12M12 8C9 8 8 4 10.5 4S12 8 12 8M12 8c3 0 4-4 1.5-4S12 8 12 8"/>`,
    /* 디바이스 · 시간 */
    monitor: `<rect x="3" y="5" width="18" height="11" rx="1.5"/><path d="M9 20h6M12 16v4"/>`,
    smartphone: `<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>`,
    clock: `<circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 2"/>`,
    calendar: `<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>`,
    lock: `<rect x="5" y="11" width="14" height="9" rx="1.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>`,
    eye: `<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>`,
    "map-pin": `<path d="M12 21s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>`,
  };
  const IPF = { /* fill 버전 */
    bell: `<path d="M12 2a6 6 0 0 0-6 6c0 4.5-1.5 5.5-2 6.5h16c-.5-1-2-2-2-6.5a6 6 0 0 0-6-6ZM9.5 18a2.5 2.5 0 0 0 5 0Z" fill-rule="evenodd"/>`,
  };
  function ic(name, size, fill) {
    size = size || 24;
    if (fill && IPF[name]) return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor">${IPF[name]}</svg>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${IP[name] || IP.home}</svg>`;
  }
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
    lnb.innerHTML = s.groups.map(g =>
      (g.title ? `<div class="lnb__group">${g.title}</div>` : "") +
      g.items.map(([id, label]) =>
        `<button class="lnb__item ${id === page ? "is-active" : ""}" data-page="${id}">${label}</button>`).join("")
    ).join("");
  }

  function route() {
    const hash = (location.hash || "#foundation/overview").slice(1);
    let [section, page] = hash.split("/");
    if (!NAV[section]) section = "foundation";
    if (!page) page = "overview";
    if (!P[section + "/" + page]) page = "overview";

    Array.from(gnbNav.children).forEach(b => b.classList.toggle("is-active", b.dataset.section === section));
    renderLNB(section, page);
    content.innerHTML = P[section + "/" + page] ? P[section + "/" + page]() : "<p>준비 중입니다.</p>";
    content.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  // navigation events
  gnbNav.addEventListener("click", (e) => {
    const b = e.target.closest("[data-section]"); if (!b) return;
    location.hash = b.dataset.section + "/overview";
  });
  lnb.addEventListener("click", (e) => {
    const b = e.target.closest("[data-page]"); if (!b) return;
    const section = location.hash.slice(1).split("/")[0] || "foundation";
    location.hash = section + "/" + b.dataset.page;
  });
  // overview card -> navigate
  content.addEventListener("click", (e) => {
    const card = e.target.closest("[data-go]");
    if (card) { const section = location.hash.slice(1).split("/")[0] || "foundation"; location.hash = section + "/" + card.dataset.go; return; }
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
