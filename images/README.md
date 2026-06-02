# 합성용 이미지

여기에 두 파일을 넣어주세요:

- `monitor.jpg` — 모니터 사진 (포토샵이 열려있는 화면)
- `screen.png` — 모니터 화면에 넣을 스크린샷 (AISURFER 화면)

그 다음 실행:

```bash
python3 composite_screen.py \
  --monitor images/monitor.jpg \
  --screen images/screen.png \
  --corners "TL TR BR BL" \
  --out images/composite.png
```

코너 좌표를 모르면 GUI 환경에서:

```bash
python3 composite_screen.py --monitor images/monitor.jpg --pick
```
