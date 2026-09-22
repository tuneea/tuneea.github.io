#!/usr/bin/env python3
"""Verify a review inbox token cannot write site code or licenses."""
from __future__ import annotations

import json
import sys
import urllib.error
import urllib.request

API = "https://api.github.com"
SITE = "tuneea/tuneea.github.io"
INBOX = "tuneea/reviews"
LICENSE = "api/go/latest.json"


def req(token: str, method: str, path: str, body: dict | None = None) -> tuple[int, str]:
    data = None if body is None else json.dumps(body).encode("utf-8")
    r = urllib.request.Request(
        API + path,
        data=data,
        method=method,
        headers={
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + token,
            "X-GitHub-Api-Version": "2022-11-28",
            "User-Agent": "tuneea-review-key-check",
        },
    )
    try:
        with urllib.request.urlopen(r, timeout=20) as res:
            return res.status, res.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def main() -> int:
    token = (sys.argv[1] if len(sys.argv) > 1 else "").strip()
    if not token:
        print("Usage: check_review_key.py github_pat_...")
        return 2

    ok = True
    code, text = req(token, "PUT", f"/repos/{SITE}/contents/{LICENSE}", {"message": "x", "content": "e30="})
    print(f"write licenses ({LICENSE}): HTTP {code}  — must FAIL")
    if code in (200, 201):
        print("UNSAFE: token can change licenses")
        ok = False
    else:
        print("ok, blocked")

    code, text = req(
        token,
        "PUT",
        f"/repos/{SITE}/contents/index.html",
        {"message": "x", "content": "e30=", "sha": "0" * 40},
    )
    print(f"write site code (index.html): HTTP {code}  — must FAIL")
    if code in (200, 201):
        print("UNSAFE: token can change site code")
        ok = False
    else:
        print("ok, blocked")

    code, text = req(token, "POST", f"/repos/{INBOX}/issues", {"title": "[review-check] probe", "body": "key-check"})
    print(f"create review issue: HTTP {code}  — must WORK")
    if code not in (200, 201):
        print("FAIL: token cannot create a review issue")
        print(text[:400])
        ok = False
    else:
        print("ok, review inbox works")
        try:
            n = json.loads(text).get("number")
            if n:
                req(token, "PATCH", f"/repos/{INBOX}/issues/{n}", {"state": "closed"})
        except Exception:
            pass

    print("SAFE" if ok else "NOT SAFE")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
