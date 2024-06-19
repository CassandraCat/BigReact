#!/usr/bin/env bash
echo "┏━━━ 🎯 TEST: $(pwd) ━━━━━━━━━━━━━━━━━━━"
# Check if a demo name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <test-name>"
  exit 1
fi

TEST_NAME=$1

# Run the Vite serve command with the provided demo name
vite serve demos/$TEST_NAME --config scripts/vite/vite.config.js --force