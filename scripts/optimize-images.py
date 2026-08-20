#!/usr/bin/env python3
"""
Re-encode the preview screenshots and video posters as WebP.

    python3 scripts/optimize-images.py

The screenshots were stored as PNG — a lossless format for photographic UI
captures, which is why 3d-pong-preview.png was 396 KB for a 1280x720 image.
WebP at q82 is visually indistinguishable here and roughly a fifth of the size.

Originals are left in place; they are the sources ffmpeg and the screenshots
came from. Only the WebP files are referenced by the site.

Requires Pillow.
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MEDIA = ROOT / "public" / "media"
QUALITY = 82


def main() -> None:
    sources = sorted(
        path
        for path in MEDIA.rglob("*")
        if path.suffix.lower() in {".png", ".jpg", ".jpeg"}
    )

    if not sources:
        print("no source images found under public/media")
        return

    saved = 0
    for source in sources:
        target = source.with_suffix(".webp")
        image = Image.open(source)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")
        image.save(target, "WEBP", quality=QUALITY, method=6)

        before, after = source.stat().st_size, target.stat().st_size
        saved += before - after
        print(
            f"{source.relative_to(ROOT)} -> {target.name}  "
            f"{before // 1024} KB -> {after // 1024} KB "
            f"({100 - after * 100 // before}% smaller)"
        )

    print(f"\nsaved {saved // 1024} KB across {len(sources)} images")


if __name__ == "__main__":
    main()
