# Figma 디자인 스킬

Figma 디자인 **효율·성능·퀄리티**용 스킬 모음. 이전 작업의 막힘(좌표 하드코딩, 정렬 깨짐, Auto Layout 코드화 실패, 5만자 제한)을 직접 겨냥.

## 커스텀 프로젝트 스킬 (이 레포)

| 스킬 | 언제 발동 | 핵심 |
|------|-----------|------|
| `figma-auto-layout` | 프레임 생성 / 정렬 깨짐 | 좌표 금지, appendChild→sizing 순서, FILL/HUG/FIXED, 섹션 분할 |
| `figma-design-tokens` | 디자인시스템·테마 | Variables 2계층(Primitive→Semantic), Mode=다크모드, 코드 변수 일치 |
| `figma-components` | 반복 UI | Variants·Properties·Instance, 템플릿 재사용 |
| `figma-naming` | 파일 정리·핸드오프 | 역할 기반 영문 네이밍, Category/Name |
| `figma-qa-checklist` | 핸드오프 전 검수 | 레이아웃·토큰·컴포넌트·접근성·반응형·거래소 특화 |

자동 발동(description 매칭). 수동: `/figma-auto-layout` 등.

## 기존 Figma MCP 서버 스킬

Figma MCP 연결 시 제공(서버 측). 코드↔디자인 양방향:

| 스킬 | 용도 |
|------|------|
| `/figma-use` | use_figma 호출 전 필수. Figma에 디자인 생성/편집 |
| `/figma-generate-design` | 앱 화면·레이아웃을 Figma로 변환(code→design) |
| `/figma-generate-library` | 코드에서 디자인 시스템/라이브러리 구축 |
| `/figma-code-connect` | Figma 컴포넌트 ↔ 코드 컴포넌트 매핑 |
| `/figma-use-figjam` | FigJam 보드 작업 |
| `/figma-generate-diagram` | generate_diagram 호출 전 필수. 다이어그램 생성 |

MCP 읽기 도구: `get_design_context`(주력), `get_screenshot`, `get_metadata`, `get_variable_defs`.

## 워크플로 권장 순서

1. `figma-design-tokens` — 토큰 먼저 (색·타입·간격)
2. `figma-components` — 공통 컴포넌트
3. `figma-auto-layout` — 페이지 조립 (섹션 단위)
4. `figma-naming` — 정리
5. `figma-qa-checklist` — 핸드오프 전 검수
