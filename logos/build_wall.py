#!/usr/bin/env python3
"""
logos/files/ 에 수집된 로고로 '고객사 로고 월' HTML(index.html)을 생성한다.

    python3 logos/build_wall.py

companies.csv 순서대로 카드를 만들고, 파일이 없는 항목은 회사명 텍스트
플레이스홀더로 표시한다. 결과는 logos/index.html.
"""
from __future__ import annotations

import csv
import glob
import html
import os

HERE = os.path.dirname(os.path.abspath(__file__))


def find_file(slug: str, files_dir: str) -> str | None:
    matches = sorted(glob.glob(os.path.join(files_dir, f"{slug}.*")))
    return matches[0] if matches else None


def main():
    files_dir = os.path.join(HERE, "files")
    with open(os.path.join(HERE, "companies.csv"), encoding="utf-8") as f:
        rows = [r for r in csv.DictReader(f) if r.get("slug")]

    cards = []
    have = 0
    for r in rows:
        slug, name = r["slug"], r["name_kr"]
        path = find_file(slug, files_dir)
        if path:
            have += 1
            rel = os.path.relpath(path, HERE)
            inner = f'<img src="{html.escape(rel)}" alt="{html.escape(name)}" loading="lazy">'
        else:
            inner = f'<span class="ph">{html.escape(name)}</span>'
        cards.append(
            f'<figure class="card"><div class="logo">{inner}</div>'
            f'<figcaption>{html.escape(name)}</figcaption></figure>'
        )

    doc = f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>고객사 로고 월</title>
<style>
  :root {{ color-scheme: light; }}
  body {{ font-family: -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
         margin: 0; padding: 48px 24px; background: #f7f8fa; color: #222; }}
  h1 {{ text-align: center; font-size: 24px; margin: 0 0 4px; }}
  p.sub {{ text-align: center; color: #888; margin: 0 0 36px; font-size: 13px; }}
  .grid {{ display: grid; gap: 16px; max-width: 1200px; margin: 0 auto;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); }}
  .card {{ background: #fff; border: 1px solid #eaecef; border-radius: 12px;
          margin: 0; padding: 20px; display: flex; flex-direction: column; align-items: center;
          gap: 12px; transition: box-shadow .15s; }}
  .card:hover {{ box-shadow: 0 4px 16px rgba(0,0,0,.08); }}
  .logo {{ height: 64px; width: 100%; display: flex; align-items: center; justify-content: center; }}
  .logo img {{ max-height: 64px; max-width: 100%; object-fit: contain; }}
  .ph {{ color: #b0b4bb; font-size: 13px; text-align: center; }}
  figcaption {{ font-size: 12px; color: #555; text-align: center; line-height: 1.4; }}
</style>
</head>
<body>
  <h1>고객사 로고 월</h1>
  <p class="sub">총 {len(rows)}개 · 로고 확보 {have}개</p>
  <div class="grid">
    {os.linesep.join("    " + c for c in cards)}
  </div>
</body>
</html>
"""
    out = os.path.join(HERE, "index.html")
    with open(out, "w", encoding="utf-8") as f:
        f.write(doc)
    print(f"생성: {out}  (로고 {have}/{len(rows)})")


if __name__ == "__main__":
    main()
