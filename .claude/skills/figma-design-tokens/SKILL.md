---
name: figma-design-tokens
description: >
  Define and apply Figma Variables / styles for color, typography, spacing, radius, and
  effects so a design stays consistent and themeable. Use when starting a design system,
  setting up dark/light themes, or when colors/sizes are hardcoded and inconsistent.
---

# Figma Design Tokens — 변수로 일관성 확보

하드코딩 색·크기 = 유지보수 지옥. **Variables(변수)**로 토큰화 → 한 곳 바꾸면 전체 반영.

## 변수 컬렉션 구조

```
Collection: "Primitives"   (원시값, 직접 안 씀)
  color/blue/500   #0e4dff
  color/navy/900   #20283f
  space/4 = 4 ... space/40 = 40
  radius/sm = 6 ... radius/xl = 42

Collection: "Semantic"     (의미 기반, 실제 사용. Primitive 참조)
  color/primary     → color/blue/500
  color/bg/base     → mode별 (Light/Dark)
  color/text/default
  color/border
```

- **2계층**: Primitive(값) → Semantic(역할). Semantic만 컴포넌트에 바인딩.
- **Mode** = 테마. Semantic 컬렉션에 `Light`/`Dark` 모드 추가 → 다크모드 자동.

## 타이포 스타일

Text Style로 등록 (변수 아님, 스타일):
```
Display/72 Bold   72/1.2  tracking 1.44
H1/42 Bold        42/1.3
H2/36 Regular     36/1.4
Body/16 Regular   16/1.5
Caption/12        12/1.4
```
- 굵기는 별도 스타일(Pretendard는 가변폰트 아니면 weight별 파일 필요).
- Vertical trim = Cap height to baseline (타이틀류).

## 적용 규칙

- 색: 절대 raw hex 박지 말고 Semantic 변수 바인딩.
- 간격: `itemSpacing`/`padding`에 space 변수.
- radius: corner radius에 radius 변수.
- 코드 생성 시 변수명이 그대로 CSS 변수로 떨어짐(`var(--color-primary)`).

## 토큰 → 코드 일치

Figma 변수명 = CSS 변수명 컨벤션 통일:
- Figma `color/primary/50` → CSS `--color-primary-50`.
- 이 레포 `design-system/tokens.css` 형식과 맞춰라.
