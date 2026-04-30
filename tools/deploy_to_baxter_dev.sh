#!/usr/bin/env bash
# Deploy this standalone static site to Baxter Apache dev path.
# Run from inside the extracted bcbc-linux-admin-cheatsheet-site-v2-standalone folder.
set -euo pipefail

TARGET="/var/www/html/bcbc-cheatsheets"

sudo mkdir -p "$TARGET"
sudo rsync -a --delete ./ "$TARGET"/
curl -I http://127.0.0.1/bcbc-cheatsheets/ || true

echo
echo "Open locally on Baxter:"
echo "  http://127.0.0.1/bcbc-cheatsheets/"
echo
echo "Open from LAN:"
echo "  http://192.168.0.225/bcbc-cheatsheets/"
