# BECUAI Design System — Web

Figma의 **BECUAI 디자인 시스템(V1.0)**을 **실제 화면을 그대로 export 한 이미지**로 보여주는
정적 사이트입니다. 각 페이지는 Figma 프레임의 Content 영역을 PNG(@2x)로 받아 그대로 표시하므로
Figma와 픽셀 단위로 동일합니다. 빌드·설치 없이 `docs/index.html`을 열면 동작합니다.

## 구성

| 파일 | 설명 |
|------|------|
| `index.html` | GNB·LNB·콘텐츠 셸 |
| `css/tokens.css` | 디자인 토큰(GNB/LNB 등 셸 스타일에 사용) |
| `css/app.css` | 레이아웃 + 화면 이미지/제품 탭 오버레이 스타일 |
| `js/app.js` | 내비게이션 데이터 · 해시 라우팅 · 화면 이미지 렌더 · 제품 변형 스왑 |
| `img/*.png` | Figma에서 export 한 화면 이미지(@2x, 총 85장) |

## 동작 방식

- **이미지 = Figma 1:1**: 화면별 `<img>` 한 장이 곧 Figma 프레임 Content 영역입니다.
  GNB/LNB만 코드로 유지해 페이지를 전환합니다.
- **제품 변형(AISURFER · RDPLINE · WIGOVIEW)**: 컴포넌트 화면 이미지에 그려진 제품 탭 위에
  투명 클릭 영역을 얹어, 누르면 해당 제품의 이미지(`*-rdpline.png` / `*-wigoview.png`)로 스왑합니다.
- 인터랙션(폼 입력 등)은 없습니다 — "Figma 그대로 보기"가 목적입니다.

## 섹션

- **UX 원칙**: Overview · 핵심 원칙 · 결정적 경험 · 우선순위 규칙
- **Foundation**: Overview · Color · Typography · Spacing · Iconography · Elevation · Radius · Motion
- **Component**: Overview / 액션(Button) / 입력(Input·Textarea·Search·Select·Checkbox·Radio·Toggle·Date input·Calendar) /
  탐색(Tab·Pagination·Menu·Accordion) / 정보 표시(Table·List·Badge·Tag·Chip·Title·Carousel) /
  피드백(Modal·Tooltip·Alert) — 각 컴포넌트는 3제품 변형 제공
- **Pattern · Resource**: GNB에 노출되어 있으나 화면 준비 중

## 이미지 다시 받기

Figma MCP `download_assets({fileKey, nodeId, defaultFormat:"png", defaultScale:2})`로 각 프레임의
Content 노드를 export 한 뒤 `docs/img/<slug>.png`로 저장합니다. 매핑은 `docs/BUILD_PLAN.md` 참고.

## 실행

```bash
cd docs && python3 -m http.server 8000
# http://localhost:8000 접속
```
