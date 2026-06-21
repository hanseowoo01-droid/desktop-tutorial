# BECUAI Design System — Web

Figma의 **BECUAI 디자인 시스템(V1.0)**을 정적 웹사이트로 구현한 결과물입니다.
**텍스트는 모두 실제 HTML로 코딩**하고, **UI(색상칩·버튼·입력·표 등)는 디자인 토큰 기반 CSS로 재현**하며,
**아이콘·로고 같은 그래픽은 벡터(SVG)** 로 둡니다. 빌드·설치 없이 `docs/index.html`을 열면 동작합니다.

## 구성

| 파일 | 설명 |
|------|------|
| `index.html` | GNB·LNB·콘텐츠 셸 |
| `css/tokens.css` | 디자인 토큰 — 색상·타이포·간격·반경·모션, **3제품 테마**(AISURFER/RDPLINE/WIGOVIEW) |
| `css/app.css` | 레이아웃(Figma 스펙) + 컴포넌트 스타일 |
| `js/app.js` | 내비게이션 데이터 · 해시 라우팅 · 페이지 렌더 · 제품 테마 전환 · 인라인 SVG 아이콘 |
| `img/logo.svg` | Figma의 BECUAI 로고 마크(벡터) |

## 동작 방식

- **텍스트 = 코드**: 제목·본문·표·라벨 등 모든 글자는 HTML 텍스트라 선택·검색·접근성 모두 지원.
- **UI = CSS 재현**: 색상 램프, 버튼, 입력/셀렉트, 체크/라디오/토글, 배지/태그/칩, 표·리스트·탭·페이지네이션·
  메뉴·아코디언·캘린더·캐러셀·모달·툴팁 등을 Foundation 토큰으로 그대로 구현.
- **3제품 테마 전환**: 컴포넌트 페이지 상단 탭(AISURFER·RDPLINE·WIGOVIEW)을 누르면 `data-theme`가 바뀌며
  `--brand-*` 토큰만 교체됩니다. 의미색(success/danger 등)·중립색은 제품 공통.
- **그래픽 = 벡터**: 아이콘은 인라인 SVG, 로고는 `img/logo.svg`. 별도 래스터 이미지는 사용하지 않습니다.

## 섹션

- **UX 원칙**: Overview · 핵심 원칙 · 결정적 경험 · 우선순위 규칙
- **Foundation**: Overview · Color · Typography · Spacing · Iconography · Elevation · Radius · Motion
- **Component**: Overview / 액션(Button) / 입력(Input·Textarea·Search·Select·Checkbox·Radio·Toggle·Date input·Calendar) /
  탐색(Tab·Pagination·Menu·Accordion) / 정보 표시(Table·List·Badge·Tag·Chip·Title·Carousel) /
  피드백(Modal·Tooltip·Alert)

## 실행

```bash
cd docs && python3 -m http.server 8000
# http://localhost:8000 접속
```
