#!/usr/bin/env bash
echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━"
yarn rimraf dist
yarn rollup --config scripts/rollup/dev.config.js