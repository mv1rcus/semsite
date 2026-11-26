#!/usr/bin/env bash
# Sobe os blobs cifrados (/tmp/assets-out/*.bin) para a branch orfa `assets`. Uso: PAT_FILE=... MODEL_BLOB_KEY_FILE=... bash scripts/push-assets.sh [standalone/html]
set -euo pipefail
SRC="${1:-standalone/html}"; OUT=/tmp/assets-out; W=/tmp/assets-work
rm -rf "$OUT" "$W"; node scripts/pack-assets.mjs "$SRC" "$OUT"
T=$(cat "$PAT_FILE"); URL="https://mv1rcus:$T@github.com/mv1rcus/semsite.git"
mkdir -p "$W" && cd "$W" && git init -q && git checkout -q -b assets
if git ls-remote --exit-code --heads "$URL" assets >/dev/null 2>&1; then git fetch -q "$URL" assets && git reset -q --hard FETCH_HEAD; fi
cp "$OUT"/*.bin . && git add -A
git -c user.name=mv1rcus -c user.email=68456420+mv1rcus@users.noreply.github.com commit -q -m "Blobs cifrados dos modelos" || echo "nada novo"
git push -q "$URL" assets:assets 2>&1 | sed "s/$T/***/g" | tail -1
