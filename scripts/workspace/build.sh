#!/usr/bin/env bash
echo "┏━━━ 📦 Building Workspace ━━━━━━━━━━━━━━━━━━━"
yarn rimraf dist
yarn rollup --config scripts/rollup/react.config.js --bundleConfigAsCjs