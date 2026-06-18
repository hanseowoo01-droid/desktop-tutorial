# 고객사 로고 월 (수집 파이프라인)

이 폴더는 고객사 로고를 일괄 수집하고 로고 월(HTML)을 만드는 도구다.

> ⚠️ **네트워크 필요**: 현재 원격 샌드박스는 GitHub/npm/PyPI 외 외부 웹이
> 차단되어 있어 로고를 받아올 수 없다. 환경 네트워크 정책을 넓힌 뒤
> (전체 인터넷 허용) 새 세션에서 아래 절차를 실행한다.
> 참고: https://code.claude.com/docs/en/claude-code-on-the-web

## 파일

| 파일 | 설명 |
|------|------|
| `companies.csv` | 회사명 → 공식 도메인 매핑 (52개, 수정 가능) |
| `fetch_logos.py` | 다중 소스로 로고를 받아 `files/` 에 저장 |
| `build_wall.py` | `files/` 로 `index.html` 로고 월 생성 |
| `manifest.csv` | 수집 결과 로그 (fetch 후 자동 생성) |
| `files/` | 수집된 로고 이미지 |
| `index.html` | 로고 월 결과물 |

## 실행

```bash
# 1) 로고 수집 (Clearbit → 홈페이지 메타 스크랩 → Google favicon 순 폴백)
python3 logos/fetch_logos.py

# 2) 로고 월 생성
python3 logos/build_wall.py
# logos/index.html 을 브라우저로 열면 확인 가능

# 특정 소스만 쓰고 싶을 때
python3 logos/fetch_logos.py --only clearbit,scrape
```

표준 라이브러리만 사용하므로 별도 설치가 필요 없다.

## 도메인 매핑 보정

`companies.csv` 의 `domain` 값이 잘못되면 로고가 안 받아진다. 특히
정부 부처/지자체는 개편으로 도메인이 바뀌므로 `note` 컬럼을 참고해
필요 시 수정한다. 수정 후 `fetch_logos.py` 를 다시 돌리면 된다.

## 저작권 안내

로고는 각 기관의 등록 상표다. 고객사 로고 월(소개/파트너 목록)처럼
출처를 밝히는 명목적 사용은 통상 허용되나, 광고·재배포 등은 각
상표권자의 사용 가이드라인을 확인하는 것이 안전하다.
