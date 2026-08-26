#!/usr/bin/env python3
"""
Сборка карты представителей.

1. Правите cities.json (имя, код, x/y в процентах от ширины/высоты карты).
2. Запускаете:  python build.py   или  build.bat
3. Обновятся:  ../russia-cities.png, список на странице, строка на главной.
4. Коммит/пуш репозитория site — и на сайте.
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

# Маркеры в HTML — между ними скрипт подставляет список
MARK_LIST_START = "<!-- MAP_CITIES:START -->"
MARK_LIST_END = "<!-- MAP_CITIES:END -->"
MARK_HOME_START = "<!-- MAP_CITIES_HOME:START -->"
MARK_HOME_END = "<!-- MAP_CITIES_HOME:END -->"


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
        try:
            x = float(c["x"])
            y = float(c["y"])
        except (KeyError, TypeError, ValueError) as e:
            raise SystemExit(f"cities[{i}] ({name}): нужны числовые x, y (%)") from e
        if not name or not code:
            raise SystemExit(f"cities[{i}]: нужны name и code")
        out.append({"name": name, "code": code, "x": x, "y": y})
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


def draw_pin(base: Image.Image, cx: int, cy: int, label: str) -> None:
    """Циановый кружок с маркером + подпись справа — как на текущей карте."""
    r = max(14, base.width // 70)
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
    # Белый «пин» внутри
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

    f = font(max(18, base.width // 55))
    tx = cx + r + max(10, r // 2)
    ty = cy - f.size // 2 - 2
    # лёгкая обводка для читаемости
    for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        draw.text((tx + dx, ty + dy), label, font=f, fill=(255, 255, 255, 220))
    draw.text((tx, ty), label, font=f, fill=(23, 35, 63, 255))


def render_map(cities: list[dict]) -> Image.Image:
    if not BASE_MAP.is_file():
        raise SystemExit(f"Нет базовой карты: {BASE_MAP}")
    img = Image.open(BASE_MAP).convert("RGBA")
    w, h = img.size
    for c in cities:
        cx = int(w * c["x"] / 100.0)
        cy = int(h * c["y"] / 100.0)
        draw_pin(img, cx, cy, c["name"])
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
                    f"            <strong>{c['name']}</strong>",
                    f"            <span>{role}</span>",
                    "          </div>",
                    "        </div>",
                ]
            )
        )
    return "\n".join(blocks)


def replace_between(text: str, start: str, end: str, body: str, *, inline: bool = False) -> str:
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
        rf'\1Представители Tune 🔥: {names}.\3',
        html,
        count=1,
    )
    html = re.sub(
        r'(alt="Карта РФ:)[^"]*(")',
        rf'\1 {names}\2',
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
    line = " · ".join(c["name"] for c in cities)
    if MARK_HOME_START in html and MARK_HOME_END in html:
        html = replace_between(html, MARK_HOME_START, MARK_HOME_END, line, inline=True)
    else:
        # запасной вариант без маркеров
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
