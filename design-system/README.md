# AI서퍼 Design System

Figma `AI서퍼-intro-홈페이지` 의 `Design_Guide` 프레임에서 추출한 디자인 시스템.
다크 네이비 + 블루 그라데이션 톤. 폰트 **Pretendard**.

- `tokens.css` — CSS 변수 (단일 진실 소스)
- `tailwind.config.js` — Tailwind 테마 매핑

---

## 1. Color

| 토큰 | 값 | 용도 |
|------|-----|------|
| `primary-50` | `#0e4dff` | 브랜드, CTA, 링크, 진행바 fill |
| `warning-40` | `#fdc944` | 키워드 강조 텍스트 (예: `Decide.`) |
| `warning-50` | `#ffc126` | 강조 언더라인 |
| `gray-0` | `#ffffff` | on-dark 텍스트, 버튼 텍스트 |
| `gray-5` | `#fcfcfc` | on-dark 서브 텍스트 |
| `gray-10` | `#f5f5f5` | 배지 텍스트, 밝은 면 |
| `gray-95` | `#1a1a1a` | 배지 배경, 다크 표면 |
| `gray-100` | `#000000` | 다크 CTA 버튼 배경 |
| `navy-10` | `#eceef3` | Controller 배경 |
| `navy-30` | `#bdc3d4` | 진행바 track |
| `navy-40` | `#98a0b7` | 디바이더, 보조 텍스트 |
| `navy-base` | `#20283f` | 다크 섹션 베이스 |
| `text-default` | `#1f2937` | GNB 네비 텍스트 |

표면: `--surface-glass` rgba(255,255,255,.85), `--border-on-dark` rgba(255,255,255,.6).

---

## 2. Typography

폰트: **Pretendard** (Regular 400 / SemiBold 600 / Bold 700).

| 스타일 | size | weight | line-height | 비고 |
|--------|------|--------|-------------|------|
| Display | 72px | Bold | 1.2 | Hero 영문 +1.44px / 다크 섹션 -1.44px |
| H1 | 42px | Bold | 1.3 | 카드 대형 타이틀 |
| H2 | 36px | Regular | 1.4 | 섹션 서브 헤드라인 |
| H3 | 24px | Bold | 1.4 | 배지 / 카드 라벨 |
| Lead | 18px | Regular | 1.5 | 아이브로(overline) / 리드 |
| Button | 16px | SemiBold | 1.2 | 버튼 라벨 |
| Body | 14px | Regular~Bold | 1.5 | 본문 / 네비 / 로그인 |

자간(letter-spacing): 영문 대형 +1.44px, 다크 섹션 대형 -1.44px, 18px 한글 본문 -0.36px.
모바일: 위 값의 약 0.6~0.7배 권장.

---

## 3. Spacing / Radius / Elevation

- **Spacing**(8pt 기반): 2 · 6 · 10 · 12 · 14 · 20 · 30 · 60 · 90 px
- **Radius**: sm 6(배지) · md 8(버튼) · lg 34(Controller) · xl 42(Hero 카드) · full
- **Shadow**:
  - `gnb` 0 8 12 rgba(0,0,0,.3)
  - `card` 0 14 10 rgba(0,0,0,.3)
  - `button` 0 4 4 rgba(0,0,0,.12)
- **Blur**: glass 15px (GNB 글래스)

---

## 4. Components

### GNB (Global Nav)
- 높이 **72px**, 풀폭(1920) / 1800 variant.
- 배경 `--surface-glass` + `backdrop-blur 15px`, shadow `gnb`.
- 패딩 pl30 pr20 py15. 좌측 로고, 우측 네비(14px) + 디바이더(navy-40) + 로그인(Bold, primary) + `무료 체험` 버튼.

### Button
| 타입 | 배경 | 테두리 | 크기 | 라벨 |
|------|------|--------|------|------|
| Primary (GNB) | `primary-50` | — | px20 py12, r8 | 14px Bold, white |
| Primary (Hero CTA) | primary-50 @85% | — | w180 h60, px37 py16, r8, shadow button | 16px SemiBold, white |
| Secondary (Hero) | navy-base @50% | white @60% | w180 h60, r8 | 16px SemiBold, white |
| Dark (icon CTA) | `gray-100` black | — | w228 h60, px37 py16, r8 | 16px SemiBold + arrow 아이콘 |

### Hero_intro
- 1370×788, radius **42px**, 다크 그라데이션 배경.
- 구성: 아이브로(18px) → Display 타이틀(72px) → 서브(36px) → CTA 2개.
- 내부 gap: 블록 90px, 텍스트군 60/30px.

### Controller (progress pill)
- w400, 배경 `navy-10`, radius **34px**, py14 pl20 pr30.
- chevron 아이콘 + track(h4, `navy-30`, r6) + fill(`primary-50`).
- gauge variant: 100% / 50% / 20%.

### Contents 카드 (Contents_1)
- 513×480, drop-shadow `card`.
- 중앙: 배지(bg `gray-95`, r6, px14 py8, 24px Bold `gray-10`) + 타이틀(42px Bold, center, lh1.3, white).
- status: default / hover.

### Hero_folder
- 400×400. folder1 / folder2 / folder3. status: default / disable.
- 내부: 타이틀 36px Bold white + 설명 18px Regular `gray-10` (lh1.3, 자간 -0.36px). 텍스트군 gap 20.

### Contents1 (full) — 임팩트 섹션
- 900×900 원형 그래픽 베이스(mix-blend overlay).
- 카피: 리드 18px(`gray-10`) → 대형 72px Bold (`Don't Read.` white + `Decide.` `warning-40`, 자간 -1.44px) → 서브 36px(`gray-5`).
- 강조 언더라인: `warning-50`, h6.
- CTA: Dark 버튼(`gray-100`) + arrow. status: full / empty.

---

## 5. 사용

```css
/* tokens.css import 후 */
.cta {
  background: var(--color-primary-50);
  border-radius: var(--radius-md);
  font: var(--fw-semibold) var(--fs-button)/1.2 var(--font-sans);
  color: var(--color-gray-0);
  box-shadow: var(--shadow-button);
}
```

```html
<!-- Tailwind (config 머지 후) -->
<button class="bg-primary-50 text-gray-0 rounded-md text-button shadow-button px-20 py-12">
  무료 체험
</button>
```
