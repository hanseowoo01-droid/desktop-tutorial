---
name: figma-qa-checklist
description: >
  Run a pre-handoff quality check on a Figma design — alignment, spacing, tokens, naming,
  contrast, responsive, states. Use before delivering a screen, after building a page, or
  when asked to review/polish a Figma design for quality.
---

# Figma QA — 핸드오프 전 점검

화면 넘기기 전 체크. 하나라도 X면 고치고 넘긴다.

## 레이아웃
- [ ] 모든 그룹 = Auto Layout (수동 좌표 0)
- [ ] 간격 = space 토큰값 (4의 배수 등 일관)
- [ ] 정렬 어긋남 0 (요소 픽셀 단위 삐침 없음)
- [ ] 박스가 텍스트 크기에 맞게 HUG/FILL

## 토큰
- [ ] raw hex 0 (전부 Semantic 변수)
- [ ] 폰트 = 등록된 Text Style만
- [ ] radius/shadow = 토큰

## 컴포넌트
- [ ] 반복 요소 = Instance (detach 안 됨)
- [ ] 모든 state 존재 (default/hover/disabled/error)
- [ ] 빈 상태(empty)·로딩·에러 화면 포함

## 네이밍
- [ ] 자동생성 이름(`Frame N`) 0
- [ ] 컴포넌트 = `Category/Name`

## 접근성/품질
- [ ] 텍스트 대비 ≥ 4.5:1 (본문), ≥ 3:1 (대형)
- [ ] 터치 타겟 ≥ 44px (모바일)
- [ ] Vertical trim 적용(타이틀 간격 정확)

## 반응형
- [ ] PC/모바일 분기 화면 (핵심: HOME·거래·입출금)
- [ ] min/max width 동작 확인

## 부속 화면
- [ ] 모달/팝업, 토스트, 404, 점검 페이지
- [ ] 폼 검증 메시지 상태

## 거래소 특화
- [ ] 숫자 정렬 = 우측 정렬 + 등폭(tabular) 숫자
- [ ] 등락 색 (상승/하락) 토큰 분리
- [ ] 차트/주문폼 = 데이터 많을 때 레이아웃 유지
