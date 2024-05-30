#!/usr/bin/env bash
echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━"
rm -rf dist
yarn rollup --config scripts/rollup/dev.config.js