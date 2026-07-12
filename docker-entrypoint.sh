#!/bin/sh
set -e

rm -rf /app/.next/cache/images

warm_parallax_images() {
	node <<'EOF'
const http = require('http');
const { readdirSync } = require('fs');

const mediaDir = '/app/.next/static/media';
const layers = ['super-near', 'near', 'mid', 'far', 'logo'];
const files = readdirSync(mediaDir);

const warm = (imagePath) =>
	new Promise((resolve) => {
		const url = `http://127.0.0.1:3000/_next/image?url=${encodeURIComponent(imagePath)}&w=640&q=75`;
		http
			.get(url, (res) => {
				res.resume();
				res.on('end', resolve);
			})
			.on('error', resolve);
	});

(async () => {
	for (const layer of layers) {
		const file = files.find((name) => name.startsWith(`${layer}.`));
		if (!file) continue;
		await warm(`/_next/static/media/${file}`);
	}
})()
	.then(() => process.exit(0))
	.catch(() => process.exit(0));
EOF
}

if [ "${SKIP_IMAGE_CACHE_WARMUP:-}" != "1" ]; then
	./node_modules/.bin/next start &
	NEXT_PID=$!

	for _ in $(seq 1 60); do
		if node -e "require('http').get('http://127.0.0.1:3000/', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))" 2>/dev/null; then
			break
		fi
		sleep 0.5
	done

	warm_parallax_images

	kill "$NEXT_PID" 2>/dev/null || true
	wait "$NEXT_PID" 2>/dev/null || true
fi

exec ./node_modules/.bin/next start
