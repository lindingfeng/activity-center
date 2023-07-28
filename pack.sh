#!/bin/bash
. ~/.nvm/nvm.sh

rm -rf dist/*

nvm use 16

yarn install --registry=https://registry.npm.taobao.org

npm run build

if [[ $? != 0 ]]; then
  echo 'npm build fail .'
  exit 2
fi