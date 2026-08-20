#!/usr/bin/env bash
# Re-encode public/videos/*.mp4 and extract a WebP poster for each. Requires ffmpeg.
# Run: ./scripts/optimize-media.sh
set -euo pipefail

SRC_DIR="public/videos"
POSTER_DIR="public/media/videos"
CRF="${CRF:-28}"
HEIGHT="${HEIGHT:-720}"
POSTER_AT="${POSTER_AT:-00:00:01}"

command -v ffmpeg >/dev/null || { echo "ffmpeg is required"; exit 1; }
mkdir -p "$POSTER_DIR"

for src in "$SRC_DIR"/*.mp4; do
  [ -e "$src" ] || continue
  base="$(basename "$src" .mp4)"
  case "$base" in *.min) continue ;; esac

  out="$SRC_DIR/$base.min.mp4"
  poster="$POSTER_DIR/$base.webp"

  echo "→ $base"

  # cap the bitrate, CRF alone can produce a larger file than the source
  src_kbps=$(ffprobe -v error -select_streams v:0 -show_entries format=bit_rate \
    -of default=nw=1:nk=1 "$src" 2>/dev/null || echo 0)
  src_kbps=$(( ${src_kbps:-0} / 1000 ))
  maxrate=$(( src_kbps > 0 && src_kbps < 2500 ? src_kbps : 2500 ))

  ffmpeg -nostdin -loglevel error -y -i "$src" \
    -vf "scale=-2:'min($HEIGHT,ih)'" \
    -c:v libx264 -profile:v high -crf "$CRF" -preset slow \
    -maxrate "${maxrate}k" -bufsize "$(( maxrate * 2 ))k" \
    -movflags +faststart \
    -c:a aac -b:a 96k \
    "$out"

  ffmpeg -nostdin -loglevel error -y -ss "$POSTER_AT" -i "$src" \
    -frames:v 1 -vf "scale=-2:'min($HEIGHT,ih)'" -quality 82 \
    "$poster"

  if [ "$(stat -c%s "$out")" -ge "$(stat -c%s "$src")" ]; then
    rm -f "$out"
    printf '   %s → kept original (re-encode was not smaller)   (poster: %s)\n' \
      "$(du -h "$src" | cut -f1)" "$(du -h "$poster" | cut -f1)"
    continue
  fi

  printf '   %s → %s   (poster: %s)\n' \
    "$(du -h "$src"  | cut -f1)" \
    "$(du -h "$out"  | cut -f1)" \
    "$(du -h "$poster" | cut -f1)"
done

cat <<'NEXT'

Done. To adopt the results:

  1. Replace the originals:   for f in public/videos/*.min.mp4; do mv "$f" "${f%.min.mp4}.mp4"; done
  2. Point VIDEOS_META at the posters in src/constants/content.ts, e.g.

       { id: 'retardement', filename: 'A_RETARDEMENT_1.mp4',
         poster: '/media/videos/A_RETARDEMENT_1.webp' },

     The carousel then renders <img> thumbnails instead of a second set of
     <video> elements, and shows the poster before playback.
NEXT
