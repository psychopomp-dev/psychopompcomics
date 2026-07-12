#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="${IMAGE_NAME:-psychopomp-smoke-test}"
CONTAINER_NAME="${CONTAINER_NAME:-psychopomp-smoke-test}"
PORT="${PORT:-3098}"
PLATFORM="${PLATFORM:-linux/amd64}"

cleanup() {
	docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
}

trap cleanup EXIT

cleanup
docker build --platform "$PLATFORM" -t "$IMAGE_NAME" .

docker run -d --name "$CONTAINER_NAME" -p "${PORT}:3000" "$IMAGE_NAME"

for _ in $(seq 1 90); do
	if curl -sf "http://127.0.0.1:${PORT}/" >/dev/null; then
		break
	fi
	sleep 1
done

if ! curl -sf "http://127.0.0.1:${PORT}/" >/dev/null; then
	echo "Homepage did not become ready" >&2
	exit 1
fi

HOMEPAGE_HTML="$(curl -sf "http://127.0.0.1:${PORT}/")"
IMAGE_PATH="$(
	printf '%s' "$HOMEPAGE_HTML" |
		rg -o 'src="/_next/image[^"]+"' |
		head -1 |
		sed 's/^src="//;s/"$//;s/&amp;/\&/g'
)"

if [ -z "$IMAGE_PATH" ]; then
	echo "Could not find a next/image URL on the homepage" >&2
	exit 1
fi

BODY_FILE="$(mktemp)"
HTTP_CODE="$(curl -sS -o "$BODY_FILE" -w '%{http_code}' "http://127.0.0.1:${PORT}${IMAGE_PATH}")"
BODY_SIZE="$(wc -c < "$BODY_FILE" | tr -d ' ')"
rm -f "$BODY_FILE"

if [ "$HTTP_CODE" != "200" ] || [ -z "$BODY_SIZE" ] || [ "$BODY_SIZE" -eq 0 ]; then
	echo "next/image failed (status=${HTTP_CODE}, bytes=${BODY_SIZE:-0})" >&2
	exit 1
fi

CACHE_FILE_COUNT="$(docker exec "$CONTAINER_NAME" find .next/cache/images -name '*.png' -size +0c 2>/dev/null | wc -l | tr -d ' ')"

if [ "${CACHE_FILE_COUNT:-0}" -eq 0 ]; then
	echo "Image cache warmup did not create non-zero cache files" >&2
	exit 1
fi

echo "Smoke test passed: image bytes=${BODY_SIZE}, cache files=${CACHE_FILE_COUNT}"
