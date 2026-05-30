---
name: figma-components
description: >
  Componentize repeated UI in Figma with variants, properties, and instances to cut
  duplication and keep edits in sync. Use when the same element repeats (buttons, cards,
  inputs, table rows, nav), or when building a reusable component library.
---

# Figma Components — 재사용으로 중복 제거

같은 요소 반복 = Component 1개 + Instance 다수. 원본 고치면 전부 반영.

## 컴포넌트화 대상

버튼, 인풋, 카드, 배지, 탭, 테이블 행, GNB, 페이지네이션, 모달, 토스트, 아바타, 아이콘.
→ 거래소 사이트: 주문폼 행, 자산 리스트 행, 내역 테이블 행, 알림 아이템 = 전부 컴포넌트.

## Variants (상태/종류 묶기)

한 컴포넌트의 변형을 properties로:
```
Button
  variant = primary | secondary | ghost | dark
  size    = sm | md | lg
  state   = default | hover | disabled
```
- 코드 생성 시 props로 깔끔히 떨어짐 (`<Button variant="primary" size="lg">`).

## Component Properties

- **Boolean**: 아이콘 표시 on/off.
- **Text**: 라벨 텍스트 노출.
- **Instance swap**: 아이콘 교체.
- **Variant**: 위 상태 전환.

## Slot 패턴 (FILL 자식)

카드/리스트 행 = Auto Layout + 자식 `FILL`. 내용 길이 달라도 정렬 유지.

## 라이브러리화

- 컴포넌트 모아 **Publish** → 팀 공유.
- 페이지: `🧩 Components`, `🎨 Tokens`, `📐 Templates`, `🖼 Pages` 분리.

## 거래소 사이트 적용

공통 템플릿 1개로 재사용 (이전 분석 기준):
- 게시판 목록/상세 = 1 템플릿
- 보안 설정 폼 = 1 템플릿 (비번/출금PW/OTP)
- 내역 리스트 = 1 템플릿 (선물내역·포인트·보너스·일별·월별)
- 수당·실적 리스트 = 1 템플릿
→ 순수 디자인 26화면으로 압축.
