#!/bin/bash

git push --no-verify --force . head:staging
git push --no-verify --force origin staging

echo Build started. Build log will apprear here in 20 sec...
sleep 20
heroku builds:output -a ching-staging-branch
