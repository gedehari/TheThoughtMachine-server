#!/bin/bash

npm install
npx tsc
pm2 restart test
