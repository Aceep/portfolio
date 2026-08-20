#!/usr/bin/env python3
"""
Render the favicon set from the Kyle mascot.

    python3 scripts/generate-icons.py

The site previously pointed <link rel="icon"> straight at public/Kyle.png — a
455x548 project asset, 144 KB, served at 16px. This produces the sizes browsers
actually ask for, on the site's own background so the transparent mascot does
not disappear against a dark tab strip.

Requires Pillow.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BG = (23, 23, 21)  # --bg


def square(source: Image.Image, size: int, *, background: bool) -> Image.Image:
    """Fit the mascot into a square canvas, padded rather than stretched."""
    side = max(source.width, source.height)
    canvas = Image.new("RGBA", (side, side), (*BG, 255) if background else (0, 0, 0, 0))
    canvas.paste(source, ((side - source.width) // 2, (side - source.height) // 2), source)
    return canvas.resize((size, size), Image.LANCZOS)


def main() -> None:
    mascot = Image.open(PUBLIC / "Kyle.png").convert("RGBA")

    # .ico carries its own multi-resolution set; browsers pick per context.
    square(mascot, 256, background=True).save(
        PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )

    for size, name in ((32, "favicon-32x32.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        square(mascot, size, background=True).save(PUBLIC / name, optimize=True)

    # iOS composites on white if the icon is transparent, so bake the background.
    square(mascot, 180, background=True).save(PUBLIC / "apple-touch-icon.png", optimize=True)

    for name in ("favicon.ico", "favicon-32x32.png", "apple-touch-icon.png", "icon-192.png", "icon-512.png"):
        path = PUBLIC / name
        print(f"wrote public/{name} ({path.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
