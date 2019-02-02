#!/bin/bash
#
# This script is meant to be used by developers before installing npm packages
# and also for the first time they clone the repo.

NODE_VERSION=10.15.1

if [[ ${CI+x} ]]
then
  echo "CI build detected. Skipping pre-install."
  exit 0
fi



n -V >/dev/null 2 >& 1 || {
  echo "[Pre-Install] n is not found... Installing now"
  yarn global add n
}
echo "[Pre-Install] Setting Node version to ${NODE_VERSION}"
n ${NODE_VERSION}
