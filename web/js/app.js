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
    "24px 그리드·2px 스트로크 기준의 라인 아이콘입니다. AISURFER 아이콘 세트(376종)를 사용합니다.") +
    sec("샘플 Sample", "",
      `<div class="demo">${["home", "search", "bell", "user", "settings", "heart", "star", "mail", "calendar", "trash"]
        .map(n => `<div class="cell">${ICON[n] || ICON.home}<span class="cell__cap">${n}</span></div>`).join("")}</div>`);

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

  /* ---------------- Icons ---------------- */
  const I = (p) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-default)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICON = {
    home: I(`<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>`),
    search: I(`<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>`),
    bell: I(`<path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z"/><path d="M10 20a2 2 0 0 0 4 0"/>`),
    user: I(`<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>`),
    settings: I(`<circle cx="12" cy="12" r="3.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M18.4 5.6l-2 2M7.6 16.4l-2 2"/>`),
    heart: I(`<path d="M12 20s-8-5-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 6-8 11-8 11Z"/>`),
    star: I(`<path d="M12 3l2.6 5.3 5.9.9-4.3 4.2 1 5.9L12 16.8 6.8 19.3l1-5.9L3.5 9.2l5.9-.9Z"/>`),
    mail: I(`<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M4 7l8 6 8-6"/>`),
    calendar: I(`<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>`),
    trash: I(`<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13h10l1-13"/>`),
  };

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
