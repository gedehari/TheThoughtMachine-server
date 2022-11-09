#!/bin/bash

rsync -a -H --numeric-ids -v --progress --delete \
    --filter=':- .gitignore' \
    --exclude='/.git' --filter="dir-merge,- .gitignore" \
    . gedehari@squirrel-cloud1:~/node/test/

ssh gedehari@squirrel-cloud1 "~/node/test/restart.sh"
