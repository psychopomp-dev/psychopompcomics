#!/bin/sh
set -e

rm -rf /app/.next/cache/images

exec "$@"
