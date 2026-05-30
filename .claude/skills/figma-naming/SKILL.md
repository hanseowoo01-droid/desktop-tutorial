---
name: figma-naming
description: >
  Apply consistent layer, frame, component, and page naming conventions in Figma so files
  stay navigable and code generation produces clean names. Use when layers are named
  "Frame 69 / Rectangle 11", before handoff, or when organizing a messy file.
---

# Figma Naming — 이름 규칙

"Frame 69", "Rectangle 11" = 코드 생성 시 쓰레기 이름. 이름 = 구조.

## 레이어/프레임
- 역할 기반: `header`, `hero`, `market-table`, `order-form`, `nav-item`.
- 컨테이너 = 명사, 단수: `card`, `row`, `cell`.
- 반복 = 부모만 의미있게, 자식은 컴포넌트가 처리.

## 컴포넌트
- `Category/Name`: `Button/Primary`, `Form/Input`, `Table/Row`.
- Variant property = `state=hover`, `size=lg` (소문자, key=value).

## 페이지(파일 내)
```
🎨 Tokens
🧩 Components
📐 Templates
🖼 01 HOME
🖼 02 선물거래
...
```

## 아이콘/에셋
- `icon/arrow-right`, `icon/chevron-left`, `img/hero-bg`.

## 코드 친화
- 영문 kebab/PascalCase. 한글 레이어명 → 코드 변수로 깨짐.
- 텍스트 *내용*은 한글 OK, 레이어 *이름*은 영문 역할명.

## 빠른 정리
- 자동 생성 이름(`Frame N`, `Rectangle N`) 남아있으면 = 정리 안 된 신호. 전부 역할명으로 교체.
