#!/usr/bin/env bash
echo "┏━━━ 🎯 TEST: $(pwd) ━━━━━━━━━━━━━━━━━━━"
yarn jest --config scripts/jest/jest.config.js
lerna run test --stream --concurrency 1