#!/usr/bin/env python3
"""Render the favicon set from public/Kyle.png. Requires Pillow.
Run: python3 scripts/generate-icons.py"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BG = (23, 23, 21)  # --bg


def square(source: Image.Image, size: int, *, background: bool) -> Image.Image:
    """Pad to a square, then resize."""
    side = max(source.width, source.height)
    canvas = Image.new("RGBA", (side, side), (*BG, 255) if background else (0, 0, 0, 0))
    canvas.paste(source, ((side - source.width) // 2, (side - source.height) // 2), source)
    return canvas.resize((size, size), Image.LANCZOS)


def main() -> None:
    mascot = Image.open(PUBLIC / "Kyle.png").convert("RGBA")

    square(mascot, 256, background=True).save(
        PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )

    for size, name in ((32, "favicon-32x32.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        square(mascot, size, background=True).save(PUBLIC / name, optimize=True)

    # iOS composites transparent icons on white
    square(mascot, 180, background=True).save(PUBLIC / "apple-touch-icon.png", optimize=True)

    for name in ("favicon.ico", "favicon-32x32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"):
        path = PUBLIC / name
        print(f"wrote public/{name} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
