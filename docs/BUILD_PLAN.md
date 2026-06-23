# BUILD PLAN — 웹을 Figma와 픽셀 동일하게 (전수 재추출)

> 목표: `docs/` 사이트의 컴포넌트/Foundation 데모를 **현재 Figma 프레임을 그대로 export한 PNG**로 교체해
> 웹과 Figma의 디자인·구성을 100% 일치시킨다. (사용자 요구: "피그마랑 똑같이")

## ⚠️ 선행 조건 — 네트워크
- 이 환경의 기본 정책은 **github.com 계열만 허용**이라 `figma.com`이 403으로 차단된다.
  (확인: `curl -m15 -o /dev/null -w "%{http_code}" https://www.figma.com/` → 403이면 차단)
- **반드시 figma.com 접근이 허용된 세션에서 실행**한다. 네트워크 정책 변경은 **새 세션부터** 적용됨.
- 시작 시 확인:
  ```bash
  curl -sS -m 15 -o /dev/null -w "HTTP %{http_code}\n" https://www.figma.com/   # 200/30x 면 OK
  ```

## 소스 / 매니페스트
- 파일 키: `puqXgaVd91e98kgv89jRDq`
- 전체 프레임 목록(노드 ID·슬러그·라우트): **`docs/img/full-manifest.json`** (총 **70** 프레임)
  - Foundation 8 · UX 4 · Component Overview 1 · 컴포넌트 19종 × 3브랜드(57)

## 실행 순서
1. **figma.com 접근 확인** (위 curl).
2. **이미지 전수 export** → `docs/img/full/<file>.png`
   - 매 프레임: `mcp__Figma__download_assets({ fileKey, nodeId:<node>, defaultFormat:"png", defaultScale:2 })`
     → 응답의 export URL을 `curl -o docs/img/full/<file>` 로 저장 (URL은 임시이므로 즉시 저장).
   - 파일명 규칙:
     - Foundation/UX/Overview: 매니페스트의 `file` 그대로 (`foundation-radius.png`, `ux-overview.png`, `component-overview.png` …)
     - 컴포넌트: AISURFER=`component-<slug>.png`, RDPLINE=`component-<slug>-rdpline.png`, WIGOVIEW=`component-<slug>-wigoview.png`
   - download_assets가 막히면 `get_screenshot`(URL 반환)로 대체. base64는 컨텍스트 과다라 지양.
3. **뷰어 교체** (`docs/js/app.js`)
   - 각 라우트 콘텐츠를 **해당 풀프레임 이미지 1장**(`<img class="frame" src="img/full/…">`, `max-width:100%`)으로 렌더.
   - 컴포넌트 라우트는 **브랜드 탭(AISURFER/RDPLINE/WIGOVIEW)** 에 따라 `-rdpline`/`-wigoview` 접미사로 src 스왑.
   - 풀프레임에는 GNB/LNB가 이미 포함되므로, 해당 페이지에서는 사이트 HTML GNB/LNB를 숨기거나(권장)
     슬림 내비만 유지. (대안: 각 프레임의 `Content` 하위 노드만 export해 기존 HTML 셸에 끼워넣기 — 더 정교하나 노드 추가 수집 필요.)
4. **정리**: 기존 `docs/img/demo/*` (구버전 섹션 크롭)는 교체 완료 후 제거. `model.js`의 `imgs`는 더 이상 불필요 → 라우트→풀프레임 매핑으로 단순화.
5. **검증**: `node --check js/app.js`, 몇 개 라우트 렌더 확인.
6. **커밋·푸시**: 브랜치 `claude/exciting-fermat-lvj4d9`. Pages 워크플로(`.github/workflows/deploy-pages.yml`)가 자동 배포.

## 현재까지 동기화된 것(코드/구성)
- 유령 카테고리(Accordion·Table·List·Title) 제거: 내비·오버뷰·model.js·데모이미지 — 완료.
- Pages 자동배포 워크플로 추가 — 완료(라이브: https://hanseowoo01-droid.github.io/desktop-tutorial/).
- 남은 일: **이미지 전수 재추출(위 2~4)** — figma.com 허용 세션 필요.
