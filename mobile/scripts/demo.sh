#!/usr/bin/env bash
# Lance l'environnement complet (DB + backend + Metro + app) et l'affiche
# sur un simulateur/émulateur, en une seule commande.
#
# Usage: npm run demo        -> Android (par défaut)
#        npm run demo:ios    -> iOS
set -euo pipefail

PLATFORM="${1:-android}"
MOBILE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$(cd "$MOBILE_DIR/../backend" && pwd)"
CONTAINER_NAME="havefun-mariadb"
AVD_NAME="${AVD_NAME:-Pixel_9_API_37}"

log() { echo "==> $1"; }

if command -v podman >/dev/null 2>&1; then
  CTR=podman
elif command -v docker >/dev/null 2>&1; then
  CTR=docker
else
  echo "podman ou docker requis pour lancer la base de données." >&2
  exit 1
fi

log "Base de données ($CTR)"
FIRST_RUN=false
if $CTR ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  $CTR ps --format '{{.Names}}' | grep -qx "$CONTAINER_NAME" || $CTR start "$CONTAINER_NAME" >/dev/null
else
  $CTR run -d --name "$CONTAINER_NAME" \
    -e MARIADB_DATABASE=havefun_courses \
    -e MARIADB_USER=havefun \
    -e MARIADB_PASSWORD=changeme \
    -e MARIADB_ROOT_PASSWORD=changeme \
    -p 3306:3306 \
    mariadb:10.11 >/dev/null
  FIRST_RUN=true
fi

log "Attente MariaDB"
for _ in $(seq 1 30); do
  nc -z localhost 3306 2>/dev/null && break
  sleep 1
done
if [ "$FIRST_RUN" = true ]; then
  sleep 5
fi

cd "$BACKEND_DIR"
log "Migrations"
npm run migration:run

# Le seed est idempotent : on le rejoue à chaque lancement pour que le
# catalogue reflète toujours les missions définies dans le code.
log "Seed (idempotent)"
npm run seed

log "Backend API"
if ! curl -s -o /dev/null http://localhost:3000; then
  nohup npm run start:dev > /tmp/havefun-backend.log 2>&1 &
  for _ in $(seq 1 30); do
    curl -s -o /dev/null http://localhost:3000 && break
    sleep 1
  done
fi

cd "$MOBILE_DIR"

if [ "$PLATFORM" = "ios" ]; then
  log "Simulateur iOS"
  open -a Simulator
  log "Build & lancement iOS"
  npx react-native run-ios
  exit 0
fi

log "Émulateur Android"
if ! adb devices | grep -q "device$"; then
  nohup emulator -avd "$AVD_NAME" -no-snapshot -no-boot-anim > /tmp/havefun-emulator.log 2>&1 &
  adb wait-for-device
  until [ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
    sleep 2
  done
fi

log "Metro"
if ! curl -s -o /dev/null http://localhost:8081/status; then
  nohup npx react-native start > /tmp/havefun-metro.log 2>&1 &
  for _ in $(seq 1 30); do
    curl -s -o /dev/null http://localhost:8081/status && break
    sleep 1
  done
fi

log "Build & lancement Android"
npx react-native run-android
