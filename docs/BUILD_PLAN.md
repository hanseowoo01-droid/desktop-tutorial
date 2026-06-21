# BUILD PLAN — Figma를 픽셀 동일 이미지 사이트로 전환

> 이 문서는 **새 세션(네트워크 전체 허용 적용됨)**에서 작업을 이어가기 위한 메모다.
> 목표: 현재 `docs/`의 손코드 문서 사이트를, **실제 Figma 화면을 PNG로 export해서 그대로 보여주는** 이미지 사이트로 교체한다. (사용자 요구: "Figma랑 픽셀까지 똑같이")

## 전제 / 왜 새 세션인가
- 이전 세션에서는 샌드박스 네트워크가 `figma.com`을 차단(HTTP 403)해서 Figma 렌더 이미지를 다운로드할 수 없었다.
- 사용자가 네트워크 정책을 **전체 허용**으로 바꿨고, 이는 **새 세션부터** 적용된다.
- 따라서 새 세션에서 먼저 접속을 확인한 뒤 진행한다:
  ```bash
  curl -sS -m 15 -w "\nHTTP %{http_code}\n" -o /dev/null https://www.figma.com/
  # HTTP 200/30x 가 나오면 OK. 403이면 아직 적용 안 된 것.
  ```

## Figma 소스
- 파일 키: `puqXgaVd91e98kgv89jRDq` (BECUAI Design System V1.0)
- 페이지(노드):
  - UX 원칙 = `0:1`
  - Foundation = `16:2`
  - Component = `48:2`  (이 안에 "Component - <이름>" 프레임들 + 제품 변형 "· RDPLINE / · WIGOVIEW")
- 주요 Foundation 프레임 ID: Overview `38:124`, Color `31:2`, Typography `32:2`, Spacing `33:2`,
  Iconography `35:2`, Elevation `36:2`, Radius `36:117`, Motion `38:2`
- Component 베이스(AISURFER) 프레임은 페이지 `48:2`의 자식 중 이름이 `Component - <이름>` (예: `Component - Button`),
  제품 변형은 `Component - Button · RDPLINE`, `Component - Button · WIGOVIEW` 형태.

## 실행 순서
1. **접속 확인** (위 curl).
2. **프레임 목록 수집**: `mcp__Figma__get_metadata` 로 각 페이지(`16:2`, `48:2`, `0:1`)의 top-level 프레임 id/이름을 모은다.
   - 또는 `use_figma`로 `figma.getNodeById(pageId).children` 를 순회해 `{name,id}` 추출.
3. **이미지 export**: 프레임마다 `mcp__Figma__download_assets({fileKey, nodeId, defaultFormat:"png", defaultScale:2})` 호출 → 응답의 `export.url` 을
   `curl` 로 받아 `docs/img/<slug>.png` 로 저장. (slug 예: `foundation-color`, `component-button`, `component-button-rdpline`)
   - URL은 임시이므로 받자마자 저장.
4. **뷰어로 교체**: `docs/js/app.js` 의 페이지 렌더를, 손코드 대신 **해당 이미지를 `<img>`로 표시**하도록 바꾼다.
   - GNB/LNB 네비 구조(`docs/css/app.css`, `index.html`)는 유지.
   - 컴포넌트 페이지의 제품 탭(AISURFER/RDPLINE/WIGOVIEW)은 이미지 src를 제품별 PNG로 스왑.
   - 이미지 최대폭은 콘텐츠 영역에 맞춰 `max-width:100%` (Figma 프레임은 1920px 폭).
5. **검증**: `node --check`, 몇몇 라우트 렌더 확인. 정적 파일이라 빌드 불필요.
6. **커밋·푸시**: 브랜치 `claude/exciting-fermat-lvj4d9` 로 push.

## 네비게이션 → 이미지 매핑(초안)
| 경로 | 이미지 |
|------|--------|
| ux/overview | ux-overview.png |
| ux/principles | ux-principles.png |
| foundation/overview…motion | foundation-<item>.png |
| component/<item> | component-<item>.png (+ -rdpline / -wigoview) |

## 참고
- 현재 사이트는 동작하는 손코드 버전이며, 이미지로 교체하면 "Figma 그대로" 보이지만 인터랙션(폼 입력 등)은 사라진다(사용자 동의됨).
- 손코드 버전을 남기고 싶으면 `docs/code/` 로 백업 후 교체할 것.
