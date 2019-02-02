#!/bin/bash

echo "[Post-Install] Updating flow typedefs..."
yarn flow-typed install >/dev/null
