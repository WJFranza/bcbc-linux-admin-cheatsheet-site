#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
xdg-open "$HERE/index.html" >/dev/null 2>&1 &
echo "Opened $HERE/index.html"
