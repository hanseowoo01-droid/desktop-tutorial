#!/usr/bin/env python3
"""
고객사 로고 일괄 수집 스크립트.

companies.csv 의 (slug, name_kr, domain) 매핑을 읽어, 여러 소스를 순서대로
시도하며 각 회사의 로고를 logos/files/ 에 저장한다.

소스 우선순위 (앞쪽이 더 깔끔한 브랜드 로고일 확률이 높음):
  1. Clearbit Logo API      https://logo.clearbit.com/<domain>
  2. 홈페이지 메타 스크랩     og:image / apple-touch-icon / <link rel=icon>
  3. Google favicon (고해상)  https://www.google.com/s2/favicons?domain=<domain>&sz=256

네트워크가 허용된 환경에서 실행:
    python3 logos/fetch_logos.py
옵션:
    --only clearbit,scrape,favicon   사용할 소스 제한
    --csv  path/to/companies.csv
    --out  logos/files
표준 라이브러리만 사용하므로 별도 설치가 필요 없다.
"""
from __future__ import annotations

import argparse
import csv
import os
import re
import ssl
import sys
import urllib.parse
import urllib.request
from html.parser import HTMLParser

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

# 일부 사이트는 인증서 체인이 불완전 -> 기본 검증 사용하되 실패 시 관대 모드 폴백
_CTX = ssl.create_default_context()
_LAX = ssl._create_unverified_context()

CONTENT_EXT = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/svg+xml": ".svg",
    "image/x-icon": ".ico",
    "image/vnd.microsoft.icon": ".ico",
    "image/gif": ".gif",
    "image/webp": ".webp",
}


def http_get(url: str, timeout: int = 15) -> tuple[bytes, str] | None:
    """(body, content_type) 반환. 실패하면 None."""
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    for ctx in (_CTX, _LAX):
        try:
            with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
                body = r.read()
                ctype = r.headers.get("Content-Type", "").split(";")[0].strip().lower()
                if not body:
                    return None
                return body, ctype
        except Exception:
            continue
    return None


class _IconParser(HTMLParser):
    """홈페이지 head 에서 로고 후보 URL을 수집."""

    def __init__(self):
        super().__init__()
        self.og_image: str | None = None
        self.apple_icon: str | None = None
        self.icon: str | None = None

    def handle_starttag(self, tag, attrs):
        a = {k.lower(): (v or "") for k, v in attrs}
        if tag == "meta":
            prop = (a.get("property") or a.get("name") or "").lower()
            if prop in ("og:image", "twitter:image") and a.get("content") and not self.og_image:
                self.og_image = a["content"]
        elif tag == "link":
            rel = (a.get("rel") or "").lower()
            href = a.get("href")
            if not href:
                return
            if "apple-touch-icon" in rel and not self.apple_icon:
                self.apple_icon = href
            elif "icon" in rel and not self.icon:
                self.icon = href


def ext_for(content_type: str, fallback_url: str) -> str:
    if content_type in CONTENT_EXT:
        return CONTENT_EXT[content_type]
    # URL 확장자로 추정
    path = urllib.parse.urlparse(fallback_url).path.lower()
    for e in (".svg", ".png", ".jpg", ".jpeg", ".webp", ".ico", ".gif"):
        if path.endswith(e):
            return ".jpg" if e == ".jpeg" else e
    return ".png"


def looks_like_image(body: bytes, content_type: str) -> bool:
    if content_type.startswith("image/"):
        return True
    head = body[:16]
    sigs = (b"\x89PNG", b"\xff\xd8\xff", b"GIF8", b"RIFF", b"<svg", b"<?xml", b"\x00\x00\x01\x00")
    return any(head.startswith(s) or s in head for s in sigs)


# ---- 소스별 후보 생성 -------------------------------------------------------

def src_clearbit(domain: str):
    yield f"https://logo.clearbit.com/{domain}?size=512", None


def src_favicon(domain: str):
    yield f"https://www.google.com/s2/favicons?domain={domain}&sz=256", None


def src_scrape(domain: str):
    """홈페이지를 받아 메타 로고 후보를 yield."""
    for base in (f"https://{domain}", f"https://www.{domain}"):
        got = http_get(base)
        if not got:
            continue
        html, _ = got
        try:
            text = html.decode("utf-8", "ignore")
        except Exception:
            continue
        p = _IconParser()
        try:
            p.feed(text)
        except Exception:
            pass
        for cand in (p.og_image, p.apple_icon, p.icon):
            if cand:
                yield urllib.parse.urljoin(base + "/", cand), None
        return  # 첫 번째로 응답한 base 만 사용


SOURCES = {
    "clearbit": src_clearbit,
    "scrape": src_scrape,
    "favicon": src_favicon,
}


def fetch_one(slug: str, domain: str, out_dir: str, order: list[str]) -> tuple[str, str]:
    """(status, detail) 반환."""
    for src_name in order:
        gen = SOURCES[src_name]
        for url, _ in gen(domain):
            got = http_get(url)
            if not got:
                continue
            body, ctype = got
            if not looks_like_image(body, ctype) or len(body) < 100:
                continue
            ext = ext_for(ctype, url)
            path = os.path.join(out_dir, f"{slug}{ext}")
            with open(path, "wb") as f:
                f.write(body)
            return "ok", f"{src_name} -> {os.path.basename(path)} ({len(body)}B)"
    return "fail", "모든 소스 실패"


def main():
    ap = argparse.ArgumentParser()
    here = os.path.dirname(os.path.abspath(__file__))
    ap.add_argument("--csv", default=os.path.join(here, "companies.csv"))
    ap.add_argument("--out", default=os.path.join(here, "files"))
    ap.add_argument("--only", default="clearbit,scrape,favicon")
    args = ap.parse_args()

    order = [s.strip() for s in args.only.split(",") if s.strip() in SOURCES]
    if not order:
        print("유효한 소스가 없습니다.", file=sys.stderr)
        return 2

    os.makedirs(args.out, exist_ok=True)
    with open(args.csv, encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if r.get("slug")]

    results = []
    for i, r in enumerate(rows, 1):
        slug, name, domain = r["slug"], r["name_kr"], r["domain"]
        status, detail = fetch_one(slug, domain, args.out, order)
        mark = "✅" if status == "ok" else "❌"
        print(f"[{i:>2}/{len(rows)}] {mark} {name} ({domain}) :: {detail}")
        results.append((slug, name, domain, status, detail))

    ok = sum(1 for *_, s, _ in results if s == "ok")
    print(f"\n완료: {ok}/{len(results)} 성공")

    # 결과 매니페스트 저장
    man = os.path.join(here, "manifest.csv")
    with open(man, "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["slug", "name_kr", "domain", "status", "detail"])
        w.writerows(results)
    print(f"매니페스트: {man}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
