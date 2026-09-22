#!/usr/bin/env python3
"""Append a sanitized review to api/reviews.json."""
from __future__ import annotations

import json
import os
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "api" / "reviews.json"


def ok_label(s: str) -> bool:
    if not (2 <= len(s) <= 40):
        return False
    if re.search(r"[<>]|https?://|www\.", s, re.I):
        return False
    return True


def clean(s: str, n: int) -> str:
    return " ".join((s or "").split())[:n].strip()


def parse_issue(title: str, body: str) -> tuple[str, str, str] | None:
    title = (title or "").strip()
    body = (body or "").strip()
    if not title.lower().startswith("[review]"):
        return None
    rest = title[8:].strip(" -·|")
    if "·" in rest:
        name, city = [x.strip() for x in rest.split("·", 1)]
    elif "|" in rest:
        name, city = [x.strip() for x in rest.split("|", 1)]
    else:
        parts = rest.split(",", 1)
        if len(parts) < 2:
            return None
        name, city = parts[0].strip(), parts[1].strip()
    return name, city, body


def main() -> int:
    name = clean(os.environ.get("NAME", ""), 40)
    city = clean(os.environ.get("CITY", ""), 40)
    text = clean(os.environ.get("TEXT", ""), 500)
    if not (name and city and text):
        parsed = parse_issue(os.environ.get("ISSUE_TITLE", ""), os.environ.get("ISSUE_BODY", ""))
        if parsed:
            name, city, text = clean(parsed[0], 40), clean(parsed[1], 40), clean(parsed[2], 500)
    if not ok_label(name) or not ok_label(city):
        print("skip: bad name/city", file=sys.stderr)
        return 0
    if len(text) < 15:
        print("skip: short text", file=sys.stderr)
        return 0
    if re.search(r"[<>]|https?://|www\.", text, re.I):
        print("skip: links/html", file=sys.stderr)
        return 0

    items = []
    if PATH.is_file():
        try:
            raw = json.loads(PATH.read_text(encoding="utf-8"))
            if isinstance(raw, list):
                items = raw
        except json.JSONDecodeError:
            items = []
    item = {"name": name, "city": city, "text": text, "at": date.today().isoformat()}
    if any(x.get("name") == name and x.get("text") == text for x in items):
        print("skip: duplicate")
        return 0
    items.insert(0, item)
    PATH.write_text(json.dumps(items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("added", name, city)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
