# BECUAI Design System — Web

Figma로 만든 **BECUAI 디자인 시스템**을 정적 문서 사이트로 옮긴 구현입니다.
빌드·설치 없이 `web/index.html`을 브라우저로 열면 바로 동작합니다.

## 구성

| 파일 | 설명 |
|------|------|
| `index.html` | GNB·LNB·콘텐츠 셸 |
| `css/tokens.css` | 디자인 토큰 — 색상·타이포·간격·반경·모션, **3제품 테마**(AISURFER/RDPLINE/WIGOVIEW) |
| `css/app.css` | 레이아웃 + 실제 동작 컴포넌트 스타일 |
| `js/app.js` | 내비게이션 데이터·라우팅(해시)·제품 테마 전환 |

## 특징

- **3제품 테마 전환**: 컴포넌트 페이지 상단 탭(AISURFER·RDPLINE·WIGOVIEW)을 누르면 `data-theme`이 바뀌며 `--brand-*` CSS 변수만 교체됩니다. 의미색(success/danger 등)과 중립색은 제품 공통.
- **섹션**: UX 원칙 · Foundation(Color·Typography·Spacing·Radius·Iconography·Elevation·Motion) · Component(Button·Input·Select·Checkbox·Radio·Toggle·Badge·Tag·Chip·Alert)
- **서체**: Pretendard (CDN) + 시스템 폰트 폴백
- 의존성 0 — 순수 HTML/CSS/JS

## 실행

```bash
# 정적 파일이라 그냥 열어도 되지만, 로컬 서버 권장
cd web && python3 -m http.server 8000
# http://localhost:8000 접속
```
