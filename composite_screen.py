#!/usr/bin/env python3
"""
모니터 사진의 화면 영역에 다른 이미지(스크린샷)를 원근에 맞춰 합성한다.

처리 순서:
  1) 모니터 사진(--monitor)에서 화면 네 모서리(좌상/우상/우하/좌하) 좌표를 입력받는다.
  2) 스크린샷(--screen)을 그 4점에 맞춰 원근 변형(homography)한다.
  3) 가장자리를 살짝 페더링(feather)해서 모니터 사진 위에 자연스럽게 합성한다.
  4) 화면 밝기/대비를 모니터의 노출에 맞추고, 약한 화면 광택(glare)을 더해 사실감을 높인다.

코너 좌표를 모를 때:
  python3 composite_screen.py --monitor images/monitor.jpg --pick
  창에서 화면 네 모서리를 [좌상 → 우상 → 우하 → 좌하] 순서로 클릭하면 좌표가 출력된다.
  (GUI가 없는 환경이면 --pick 대신 좌표를 직접 --corners 로 넘긴다.)
"""

import argparse
import sys
import numpy as np
import cv2


def parse_corners(s):
    """'x1,y1 x2,y2 x3,y3 x4,y4' 형식을 4x2 float 배열로 변환."""
    pts = []
    for tok in s.replace(";", " ").split():
        x, y = tok.split(",")
        pts.append([float(x), float(y)])
    if len(pts) != 4:
        raise ValueError("코너는 정확히 4개여야 합니다 (좌상 우상 우하 좌하).")
    return np.array(pts, dtype=np.float32)


def pick_corners(img):
    """클릭으로 4 모서리를 선택 (GUI 필요)."""
    pts = []
    disp = img.copy()
    win = "Click 4 corners: TL -> TR -> BR -> BL  (q to finish)"

    def on_mouse(event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN and len(pts) < 4:
            pts.append([x, y])
            cv2.circle(disp, (x, y), 6, (0, 0, 255), -1)
            cv2.putText(disp, str(len(pts)), (x + 8, y),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

    cv2.namedWindow(win, cv2.WINDOW_NORMAL)
    cv2.setMouseCallback(win, on_mouse)
    while True:
        cv2.imshow(win, disp)
        if cv2.waitKey(20) & 0xFF == ord("q") or len(pts) == 4:
            break
    cv2.destroyAllWindows()
    return np.array(pts, dtype=np.float32)


def feathered_mask(h, w, feather):
    """워프된 스크린샷 영역(흰색 사각형)을 만들고 가장자리를 페더링."""
    m = np.full((h, w), 255, dtype=np.uint8)
    if feather > 0:
        k = feather * 2 + 1
        m = cv2.GaussianBlur(m, (k, k), 0)
        # 가장자리에서만 부드럽게: 안쪽을 살짝 침식 후 블러
    return m


def match_brightness(src, dst_region, mask, strength=0.6):
    """스크린샷(src)의 평균 밝기를 모니터 화면 노출에 살짝 맞춘다."""
    if mask.sum() == 0:
        return src
    src_lab = cv2.cvtColor(src, cv2.COLOR_BGR2LAB).astype(np.float32)
    dst_lab = cv2.cvtColor(dst_region, cv2.COLOR_BGR2LAB).astype(np.float32)
    m = mask > 127
    for c in range(3):
        if c == 0:  # L 채널만 살짝 보정 (색은 보존)
            s_mean = src_lab[..., c][m].mean()
            d_mean = dst_lab[..., c][m].mean()
            shift = (d_mean - s_mean) * strength
            src_lab[..., c] = np.clip(src_lab[..., c] + shift, 0, 255)
    return cv2.cvtColor(src_lab.astype(np.uint8), cv2.COLOR_LAB2BGR)


def add_glare(img, corners, intensity=0.12):
    """화면에 대각선 방향의 약한 광택 그라데이션을 더해 유리 반사 느낌."""
    h, w = img.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    # 좌상->우하 대각선 그라데이션
    g = (xx / w + yy / h) / 2.0
    g = np.clip((g - 0.15) / 0.5, 0, 1)
    glare = (g[..., None] * 255 * intensity).astype(np.float32)
    out = np.clip(img.astype(np.float32) + glare, 0, 255).astype(np.uint8)
    return out


def composite(monitor, screen, corners, feather=8, do_glare=True, do_match=True):
    H, W = monitor.shape[:2]
    sh, sw = screen.shape[:2]

    # 스크린샷 4 모서리 (소스)
    src_pts = np.array([[0, 0], [sw, 0], [sw, sh], [0, sh]], dtype=np.float32)
    Hmat = cv2.getPerspectiveTransform(src_pts, corners)

    warped = cv2.warpPerspective(screen, Hmat, (W, H), flags=cv2.INTER_LANCZOS4)

    # 마스크: 스크린샷 영역
    mask_src = np.full((sh, sw), 255, dtype=np.uint8)
    mask = cv2.warpPerspective(mask_src, Hmat, (W, H), flags=cv2.INTER_LINEAR)

    if do_match:
        warped = match_brightness(warped, monitor, mask)
    if do_glare:
        glared = add_glare(warped, corners)
        warped = np.where(mask[..., None] > 127, glared, warped)

    # 가장자리 페더링
    if feather > 0:
        k = feather * 2 + 1
        mask = cv2.GaussianBlur(mask, (k, k), 0)

    alpha = (mask.astype(np.float32) / 255.0)[..., None]
    out = (warped.astype(np.float32) * alpha +
           monitor.astype(np.float32) * (1 - alpha))
    return np.clip(out, 0, 255).astype(np.uint8)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--monitor", required=True, help="모니터 사진 경로")
    ap.add_argument("--screen", help="화면에 넣을 스크린샷 경로")
    ap.add_argument("--out", default="images/composite.png", help="결과 저장 경로")
    ap.add_argument("--corners", help="'x1,y1 x2,y2 x3,y3 x4,y4' (TL TR BR BL)")
    ap.add_argument("--pick", action="store_true", help="클릭으로 코너 선택 (GUI)")
    ap.add_argument("--feather", type=int, default=8)
    ap.add_argument("--no-glare", action="store_true")
    ap.add_argument("--no-match", action="store_true")
    args = ap.parse_args()

    monitor = cv2.imread(args.monitor, cv2.IMREAD_COLOR)
    if monitor is None:
        sys.exit(f"모니터 이미지를 못 읽음: {args.monitor}")

    if args.pick:
        corners = pick_corners(monitor)
        print("선택된 코너 (TL TR BR BL):")
        print(" ".join(f"{int(x)},{int(y)}" for x, y in corners))
        if args.screen is None:
            return
    elif args.corners:
        corners = parse_corners(args.corners)
    else:
        sys.exit("--corners 또는 --pick 중 하나가 필요합니다.")

    screen = cv2.imread(args.screen, cv2.IMREAD_COLOR)
    if screen is None:
        sys.exit(f"스크린샷을 못 읽음: {args.screen}")

    out = composite(monitor, screen, corners,
                    feather=args.feather,
                    do_glare=not args.no_glare,
                    do_match=not args.no_match)
    cv2.imwrite(args.out, out)
    print(f"저장 완료: {args.out}")


if __name__ == "__main__":
    main()
