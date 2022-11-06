#!/bin/bash

rsync -a -H --numeric-ids -v --progress --delete \
    --filter="- node_modules/" \
    . gedehari@squirrel-cloud1:~/node/test/

ssh gedehari@squirrel-cloud1 "~/node/test/restart.sh"
