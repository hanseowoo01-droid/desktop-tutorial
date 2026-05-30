---
name: figma-auto-layout
description: >
  Build and fix Figma layouts using Auto Layout instead of hardcoded x/y coordinates.
  Use whenever creating frames/sections via the Figma plugin API or use_figma, or when
  alignment/spacing is broken, elements overlap, or boxes don't resize to text.
  Encodes the correct node-creation order and FILL/HUG/FIXED sizing rules.
---

# Figma Auto Layout — 정렬·간격을 자동으로

좌표 하드코딩(x/y 숫자 박기) = 정렬 깨짐의 근본 원인. **항상 Auto Layout** 사용.
Auto Layout = 웹의 flexbox. 한 번 잡으면 텍스트 길이 바뀌어도 간격 유지.

## 절대 규칙

1. **수동 좌표 금지**. `node.x = 120` 식 배치 금지. Auto Layout frame에 `appendChild`로 쌓는다.
2. **순서 엄수** (이전 실패의 주원인 = `layoutSizingHorizontal` 오류):
   ```js
   // 1) 부모 frame 생성 + layoutMode 설정
   const frame = figma.createFrame();
   frame.layoutMode = "VERTICAL";          // or HORIZONTAL
   frame.primaryAxisSizingMode = "AUTO";   // HUG content
   frame.counterAxisSizingMode = "FIXED";  // fixed width
   frame.itemSpacing = 24;
   frame.paddingTop = frame.paddingBottom = 40;
   frame.paddingLeft = frame.paddingRight = 40;

   // 2) 자식 생성 후 *반드시* appendChild 먼저
   const child = figma.createText();
   await figma.loadFontAsync({ family: "Pretendard", style: "Regular" });
   child.characters = "...";
   frame.appendChild(child);               // append FIRST

   // 3) append 후에 sizing 설정 (그 전엔 에러)
   child.layoutSizingHorizontal = "FILL";  // stretch to parent width
   child.layoutSizingVertical = "HUG";
   ```

## Sizing 정책 (FILL / HUG / FIXED)

| 의도 | 설정 |
|------|------|
| 부모 폭 꽉 채우기 | `layoutSizingHorizontal = "FILL"` |
| 내용만큼만 | `"HUG"` |
| 고정 px | `"FIXED"` + `resize(w,h)` |

- 텍스트 박스 = 보통 가로 `FILL`(컬럼 안) 또는 `HUG`(버튼 라벨), 세로 `HUG`.
- 컨테이너 = 가로 `FILL` 또는 `FIXED`(페이지 폭), 세로 `HUG`(내용 따라 늘어남).

## 중첩 Auto Layout 충돌 피하기

- 부모가 `HUG`인데 자식이 `FILL` = **충돌**(0px 붕괴). 부모 한 축은 FIXED/FILL로 기준 잡아라.
- 페이지 루트 = `width FIXED`(1440 등), `height HUG`. 그 안 섹션 = `width FILL`, `height HUG`.

## 정렬·분배

- 균등 간격: `itemSpacing` 또는 `primaryAxisAlignItems = "SPACE_BETWEEN"`.
- 가운데 정렬: `counterAxisAlignItems = "CENTER"`.
- 수동 Align 패널 대신 위 속성으로.

## 코드 5만자 제한 대응

- 14개 섹션 한 번에 X. **섹션 단위로 분할 실행**. 페이지 frame 먼저 만들고, 섹션마다 별도 호출로 append.
- 공통 요소(버튼·카드)는 **Component 1개** 만들고 `createInstance()` 재사용 → 코드량·중복 급감.

## 깨진 기존 프레임 고치기

1. 요소 다중 선택 → Auto Layout 적용(`Shift+A` 상응 = frame 감싸고 layoutMode 설정).
2. 텍스트 = Auto Resize(`textAutoResize = "WIDTH_AND_HEIGHT"` 또는 `"HEIGHT"`).
3. 좌표 잔재 제거: Auto Layout 들어가면 x/y는 무시됨.
