#!/bin/bash
cd /var/www/nemv/source
git pull
yarn
cd be
yarn
cd ..
cd fe
yarn
yarn build
cd ..
pm2 start
