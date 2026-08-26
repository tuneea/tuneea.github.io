#!/usr/bin/env python3
"""
Сборка карты представителей.

1. Правите cities.json (имя, код, x/y в процентах от ширины/высоты карты).
2. Запускаете:  python build.py   или  build.bat
3. Обновятся:  ../russia-cities.png, список на странице, строка на главной.
4. Коммит/пуш репозитория site — и на сайте.

Подписи на карте ставятся автоматически (лево/право/верх/низ),
чтобы названия не наезжали друг на друга. Опционально в JSON:
  "side": "right" | "left" | "top" | "bottom" | "auto"
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent
SITE_PRED = ROOT.parent
SITE_ROOT = SITE_PRED.parent
CITIES_FILE = ROOT / "cities.json"
BASE_MAP = ROOT / "base-map.png"
OUT_MAP = SITE_PRED / "russia-cities.png"
PRED_HTML = SITE_PRED / "index.html"
HOME_HTML = SITE_ROOT / "index.html"

MARK_LIST_START = "<!-- MAP_CITIES:START -->"
MARK_LIST_END = "<!-- MAP_CITIES:END -->"
MARK_HOME_START = "<!-- MAP_CITIES_HOME:START -->"
MARK_HOME_END = "<!-- MAP_CITIES_HOME:END -->"

Rect = tuple[float, float, float, float]
VALID_SIDES = {"auto", "right", "left", "top", "bottom"}


def load_cities() -> tuple[str, list[dict]]:
    data = json.loads(CITIES_FILE.read_text(encoding="utf-8"))
    role = str(data.get("role") or "Представитель").strip()
    cities = data.get("cities") or []
    if not isinstance(cities, list) or not cities:
        raise SystemExit("cities.json: нужен непустой массив cities")
    out: list[dict] = []
    for i, c in enumerate(cities):
        if not isinstance(c, dict):
            raise SystemExit(f"cities[{i}]: ожидается объект")
        name = str(c.get("name", "")).strip()
        code = str(c.get("code", "")).strip()
        side = str(c.get("side", "auto")).strip().lower() or "auto"
        if side not in VALID_SIDES:
            raise SystemExit(
                f"cities[{i}] ({name}): side должен быть {sorted(VALID_SIDES)}"
            )
        try:
            x = float(c["x"])
            y = float(c["y"])
        except (KeyError, TypeError, ValueError) as e:
            raise SystemExit(f"cities[{i}] ({name}): нужны числовые x, y (%)") from e
        if not name or not code:
            raise SystemExit(f"cities[{i}]: нужны name и code")
        cid = str(c.get("id", "")).strip().lower()
        if not cid:
            # fallback from Russian name
            slug_map = {
                "москва": "moscow",
                "санкт-петербург": "spb",
                "пермь": "perm",
                "тула": "tula",
                "казань": "kazan",
                "краснодар": "krasnodar",
                "нальчик": "nalchik",
                "ярославль": "yaroslavl",
            }
            cid = slug_map.get(name.lower(), re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or f"city{i}")
        out.append(
            {"id": cid, "name": name, "code": code, "x": x, "y": y, "side": side}
        )
    return role, out


def font(size: int) -> ImageFont.FreeTypeFont:
    for path in (
        r"C:\Windows\Fonts\segoeuib.ttf",
        r"C:\Windows\Fonts\seguisb.ttf",
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ):
        p = Path(path)
        if p.is_file():
            return ImageFont.truetype(str(p), size)
    return ImageFont.load_default()


def overlap_area(a: Rect, b: Rect, pad: float = 0) -> float:
    x0 = max(a[0] - pad, b[0] - pad)
    y0 = max(a[1] - pad, b[1] - pad)
    x1 = min(a[2] + pad, b[2] + pad)
    y1 = min(a[3] + pad, b[3] + pad)
    if x1 <= x0 or y1 <= y0:
        return 0.0
    return float(x1 - x0) * float(y1 - y0)


def inflate(r: Rect, pad: float) -> Rect:
    return (r[0] - pad, r[1] - pad, r[2] + pad, r[3] + pad)


def draw_pin_only(base: Image.Image, cx: int, cy: int, r: int) -> None:
    glow = Image.new("RGBA", base.size, (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for rad, alpha in ((r + 18, 40), (r + 10, 70), (r + 4, 110)):
        gdraw.ellipse(
            (cx - rad, cy - rad, cx + rad, cy + rad),
            fill=(16, 189, 245, alpha),
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=6))
    base.alpha_composite(glow)

    draw = ImageDraw.Draw(base)
    draw.ellipse(
        (cx - r, cy - r, cx + r, cy + r),
        fill=(17, 197, 250, 255),
        outline=(7, 143, 213, 255),
        width=max(2, r // 8),
    )
    pin_h = int(r * 0.95)
    pin_w = int(r * 0.55)
    tip_y = cy + int(r * 0.35)
    top_y = cy - int(r * 0.45)
    draw.polygon(
        [
            (cx, tip_y),
            (cx - pin_w // 2, top_y + pin_h // 3),
            (cx - pin_w // 3, top_y),
            (cx + pin_w // 3, top_y),
            (cx + pin_w // 2, top_y + pin_h // 3),
        ],
        fill=(255, 255, 255, 255),
    )
    hole = max(2, r // 6)
    draw.ellipse(
        (cx - hole, top_y + hole // 2, cx + hole, top_y + hole // 2 + 2 * hole),
        fill=(17, 197, 250, 255),
    )


def draw_label(
    base: Image.Image, f: ImageFont.ImageFont, tx: float, ty: float, text: str
) -> None:
    draw = ImageDraw.Draw(base)
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1), (-1, -1), (1, 1)):
        draw.text(
            (tx + dx, ty + dy), text, font=f, fill=(255, 255, 255, 230), anchor="lt"
        )
    draw.text((tx, ty), text, font=f, fill=(23, 35, 63, 255), anchor="lt")


def label_candidates(
    cx: float,
    cy: float,
    r: float,
    tw: float,
    th: float,
    gap: float,
    forced: str | None = None,
) -> list[tuple[str, float, float, float]]:
    """(side, text_x, text_y, preference_penalty) — меньше penalty лучше."""
    base = {
        "right": (cx + r + gap, cy - th / 2, 0),
        "left": (cx - r - gap - tw, cy - th / 2, 3),
        "top": (cx - tw / 2, cy - r - gap - th, 4),
        "bottom": (cx - tw / 2, cy + r + gap, 4),
        "top-right": (cx + r * 0.25 + gap * 0.35, cy - r - gap - th, 7),
        "top-left": (cx - r * 0.25 - gap * 0.35 - tw, cy - r - gap - th, 9),
        "bottom-right": (cx + r * 0.25 + gap * 0.35, cy + r + gap, 7),
        "bottom-left": (cx - r * 0.25 - gap * 0.35 - tw, cy + r + gap, 9),
    }
    extras: list[tuple[str, float, float, float]] = []
    for name, (x, y, pen) in list(base.items()):
        if name in ("right", "left"):
            extras.append((f"{name}+", x, y - th * 0.95, pen + 12))
            extras.append((f"{name}-", x, y + th * 0.95, pen + 12))
            extras.append((f"{name}++", x, y - th * 1.85, pen + 22))
            extras.append((f"{name}--", x, y + th * 1.85, pen + 22))
        if name in ("top", "bottom"):
            extras.append((f"{name}>", x + tw * 0.28, y, pen + 10))
            extras.append((f"{name}<", x - tw * 0.28, y, pen + 10))
    for name, (x, y, pen) in list(base.items()):
        if name == "right":
            extras.append((f"{name}far", x + gap * 1.8, y, pen + 35))
        elif name == "left":
            extras.append((f"{name}far", x - gap * 1.8, y, pen + 38))
        elif name == "top":
            extras.append((f"{name}far", x, y - gap * 1.5, pen + 35))
        elif name == "bottom":
            extras.append((f"{name}far", x, y + gap * 1.5, pen + 35))

    order = [
        "right",
        "left",
        "top",
        "bottom",
        "top-right",
        "bottom-right",
        "top-left",
        "bottom-left",
        "right+",
        "right-",
        "left+",
        "left-",
        "top>",
        "top<",
        "bottom>",
        "bottom<",
        "right++",
        "right--",
        "left++",
        "left--",
        "rightfar",
        "leftfar",
        "topfar",
        "bottomfar",
    ]
    all_pos = {**base, **{e[0]: (e[1], e[2], e[3]) for e in extras}}
    if forced in ("right", "left", "top", "bottom"):
        preferred = [k for k in order if k == forced or k.startswith(forced)]
        order = preferred + [k for k in order if k not in preferred]

    out: list[tuple[str, float, float, float]] = []
    for key in order:
        if key in all_pos:
            x, y, pen = all_pos[key]
            out.append((key, x, y, pen))
    return out


def score_placement(
    box: Rect,
    obstacles: list[Rect],
    canvas_w: int,
    canvas_h: int,
    side_penalty: float,
) -> float:
    score = float(side_penalty)
    margin = 12.0
    if box[0] < margin:
        score += (margin - box[0]) * 55
    if box[1] < margin:
        score += (margin - box[1]) * 55
    if box[2] > canvas_w - margin:
        score += (box[2] - (canvas_w - margin)) * 55
    if box[3] > canvas_h - margin:
        score += (box[3] - (canvas_h - margin)) * 55

    for obs in obstacles:
        area = overlap_area(box, obs, pad=3.0)
        if area > 0:
            score += area * 5.0 + 150
    return score


def place_labels(
    cities: list[dict],
    pins: list[tuple[float, float, float]],
    f: ImageFont.ImageFont,
    canvas_w: int,
    canvas_h: int,
) -> list[tuple[float, float, str]]:
    measure = ImageDraw.Draw(Image.new("RGB", (16, 16)))
    gap = max(12, int(pins[0][2] * 0.7)) if pins else 12

    def neighbor_count(i: int) -> int:
        cx, cy, _ = pins[i]
        n = 0
        for j, (ox, oy, _) in enumerate(pins):
            if i == j:
                continue
            if (cx - ox) ** 2 + (cy - oy) ** 2 < (canvas_w * 0.14) ** 2:
                n += 1
        return n

    order = sorted(
        range(len(cities)),
        key=lambda i: (
            -neighbor_count(i),
            -len(cities[i]["name"]),
            cities[i]["name"],
        ),
    )

    obstacles: list[Rect] = []
    for cx, cy, r in pins:
        obstacles.append((cx - r - 1, cy - r - 1, cx + r + 1, cy + r + 1))

    placed: dict[int, tuple[float, float, str, Rect]] = {}

    for i in order:
        name = cities[i]["name"]
        cx, cy, r = pins[i]
        bbox = measure.textbbox((0, 0), name, font=f, anchor="lt")
        tw = float(bbox[2] - bbox[0])
        th = float(bbox[3] - bbox[1])
        forced = cities[i].get("side")
        if forced == "auto":
            forced = None

        best = None
        best_score = float("inf")
        for side, tx, ty, pen in label_candidates(cx, cy, r, tw, th, gap, forced):
            box: Rect = (tx, ty, tx + tw, ty + th)
            sc = score_placement(box, obstacles, canvas_w, canvas_h, pen)
            if sc < best_score:
                best_score = sc
                best = (tx, ty, name, box, side)

        if best is None:
            tx = cx + r + gap
            ty = cy - th / 2
            box = (tx, ty, tx + tw, ty + th)
            best = (tx, ty, name, box, "right")

        tx, ty, name, box, side = best
        placed[i] = (tx, ty, name, box)
        obstacles.append(inflate(box, 5))
        print(f"    подпись {name}: {side} (score={best_score:.0f})")

    return [(placed[i][0], placed[i][1], placed[i][2]) for i in range(len(cities))]


def render_map(cities: list[dict]) -> Image.Image:
    if not BASE_MAP.is_file():
        raise SystemExit(f"Нет базовой карты: {BASE_MAP}")
    img = Image.open(BASE_MAP).convert("RGBA")
    w, h = img.size
    r = max(14, w // 70)
    f = font(max(18, w // 55))

    pins: list[tuple[float, float, float]] = []
    for c in cities:
        cx = w * c["x"] / 100.0
        cy = h * c["y"] / 100.0
        pins.append((cx, cy, float(r)))
        draw_pin_only(img, int(cx), int(cy), r)

    print("  автоподписи:")
    labels = place_labels(cities, pins, f, w, h)
    for tx, ty, name in labels:
        draw_label(img, f, tx, ty, name)

    return img.convert("RGB")


def city_list_html(role: str, cities: list[dict]) -> str:
    blocks = []
    for c in cities:
        blocks.append(
            "\n".join(
                [
                    '        <div class="city">',
                    f'          <div class="city-mark">{c["code"]}</div>',
                    "          <div>",
                    f'            <strong data-i18n="city.{c["id"]}">{c["name"]}</strong>',
                    f'            <span data-i18n="rep.role">{role}</span>',
                    "          </div>",
                    "        </div>",
                ]
            )
        )
    return "\n".join(blocks)


def replace_between(
    text: str, start: str, end: str, body: str, *, inline: bool = False
) -> str:
    if start not in text or end not in text:
        raise SystemExit(f"В HTML нет маркеров {start!r} … {end!r}")
    pattern = re.compile(
        re.escape(start) + r".*?" + re.escape(end),
        re.DOTALL,
    )
    if inline:
        repl = f"{start}{body}{end}"
    else:
        repl = f"{start}\n{body}\n      {end}"
    return pattern.sub(repl, text, count=1)


def update_pred_html(role: str, cities: list[dict]) -> None:
    html = PRED_HTML.read_text(encoding="utf-8")
    names = ", ".join(c["name"] for c in cities)
    html = re.sub(
        r'(<meta name="description" content=")([^"]*)(" />)',
        rf"\1Представители Tune 🔥: {names}.\3",
        html,
        count=1,
    )
    html = re.sub(
        r'(alt="Карта РФ:)[^"]*(")',
        rf"\1 {names}\2",
        html,
        count=1,
    )
    html = replace_between(
        html, MARK_LIST_START, MARK_LIST_END, city_list_html(role, cities)
    )
    PRED_HTML.write_text(html, encoding="utf-8", newline="\n")


def update_home_html(cities: list[dict]) -> None:
    if not HOME_HTML.is_file():
        print(f"пропуск главной: нет {HOME_HTML}")
        return
    html = HOME_HTML.read_text(encoding="utf-8")
    line = " · ".join(
        f'<span data-i18n="city.{c["id"]}">{c["name"]}</span>' for c in cities
    )
    if MARK_HOME_START in html and MARK_HOME_END in html:
        html = replace_between(html, MARK_HOME_START, MARK_HOME_END, line, inline=True)
    else:
        html = re.sub(
            r"(<strong>Города</strong>\s*<span>)[^<]*(</span>)",
            rf"\1{line}\2",
            html,
            count=1,
        )
    HOME_HTML.write_text(html, encoding="utf-8", newline="\n")


def main() -> int:
    role, cities = load_cities()
    print(f"городов: {len(cities)}")
    for c in cities:
        print(f"  · {c['code']} {c['name']}  ({c['x']}%, {c['y']}%)")

    rendered = render_map(cities)
    rendered.save(OUT_MAP, "PNG", optimize=True)
    print(f"карта → {OUT_MAP.relative_to(SITE_ROOT)}")

    update_pred_html(role, cities)
    print(f"список → {PRED_HTML.relative_to(SITE_ROOT)}")

    update_home_html(cities)
    print(f"главная → {HOME_HTML.relative_to(SITE_ROOT)}")
    print("готово. Закоммитьте site и запушьте.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
