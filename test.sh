#!/usr/bin/env bash
node lib/md.js scaffold -o tpl-vue-portlet-out -t vue-portlet
node lib/md.js server init -f
node lib/md.js server start
