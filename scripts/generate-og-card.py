#!/usr/bin/env python3
"""Render public/og-card.png and og-card-cyber.png (1200x630). Requires Pillow, uses scripts/fonts/ or DejaVu.
Run: python3 scripts/generate-og-card.py"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = Path(__file__).resolve().parent / "fonts"
DEJAVU = Path("/usr/share/fonts/truetype/dejavu")

W, H = 1200, 630
BG, SURFACE = (23, 23, 21), (32, 32, 30)
YELLOW, TEXT, MUTED, BORDER = (224, 177, 77), (248, 244, 234), (184, 180, 170), (76, 75, 70)
GHOST = (70, 69, 64)

FIRST, LAST = "ALYCIA", "GAUTIER"

# keep in sync with PORTFOLIO.<profile>.fr in src/constants/content.ts
CARDS = {
    "og-card.png": {
        "kicker": "// DÉVELOPPEUSE FRONT-END",
        "value": ["Deux ans d’interfaces React & Vue", "livrées en production."],
        "chips": ["REACT", "TYPESCRIPT", "VUE", "TAILWIND"],
        "availability": "CDI · SEPTEMBRE 2026 · PARIS / REMOTE",
    },
    "og-card-cyber.png": {
        "kicker": "// DÉVELOPPEUSE → CYBERSÉCURITÉ",
        "value": ["Développeuse front-end,", "en spécialisation cybersécurité."],
        "chips": ["LINUX", "RÉSEAU", "REVERSE", "GDB"],
        "availability": "ALTERNANCE · SEPTEMBRE 2026",
    },
}


def font(preferred: str, fallback: str, size: int) -> ImageFont.FreeTypeFont:
    path = FONT_DIR / preferred
    if not path.exists():
        path = DEJAVU / fallback
    return ImageFont.truetype(str(path), size)


def render(filename: str, card: dict) -> None:
    display_b = lambda s: font("Syne-Bold.ttf", "DejaVuSans-Bold.ttf", s)
    mono = lambda s: font("SpaceMono-Regular.ttf", "DejaVuSansMono.ttf", s)
    mono_b = lambda s: font("SpaceMono-Bold.ttf", "DejaVuSansMono-Bold.ttf", s)

    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img, "RGBA")

    for x in range(0, W, 60):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
    for y in range(0, H, 60):
        d.line([(0, y), (W, y)], fill=(255, 255, 255, 8))

    for r in range(320, 0, -8):
        alpha = int(26 * (1 - r / 320))
        d.ellipse([980 - r, 300 - r, 980 + r, 300 + r], fill=(*YELLOW, alpha))

    x = 80
    d.text((x, 92), card["kicker"], font=mono_b(24), fill=YELLOW)
    d.text((x, 148), FIRST, font=display_b(96), fill=TEXT)
    d.text((x, 248), LAST, font=display_b(96), fill=GHOST)
    d.line([(x, 380), (x + 110, 380)], fill=YELLOW, width=4)

    for i, line in enumerate(card["value"]):
        d.text((x, 412 + i * 44), line, font=display_b(32), fill=TEXT)

    chip_font = mono_b(18)
    cx = x
    for chip in card["chips"]:
        w = d.textlength(chip, font=chip_font)
        d.rounded_rectangle([cx, 522, cx + w + 32, 562], radius=20,
                            outline=BORDER, width=2, fill=SURFACE)
        d.text((cx + 16, 533), chip, font=chip_font, fill=MUTED)
        cx += w + 44

    avail_font = mono(19)
    availability = card["availability"]
    d.text((W - 80 - d.textlength(availability, font=avail_font), 537),
           availability, font=avail_font, fill=MUTED)

    mascot = Image.open(ROOT / "public" / "Kyle.png").convert("RGBA")
    height = 400
    mascot = mascot.resize((int(mascot.width * height / mascot.height), height), Image.LANCZOS)
    img.paste(mascot, (980 - mascot.width // 2, 300 - height // 2), mascot)

    d.rectangle([0, 0, 9, H], fill=YELLOW)

    out = ROOT / "public" / filename
    img.save(out, optimize=True)
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


def main() -> None:
    for filename, card in CARDS.items():
        render(filename, card)


if __name__ == "__main__":
    main()
