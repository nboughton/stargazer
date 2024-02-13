#!/bin/bash

if [[ $1 == "-b" ]]; then
  quasar build -m pwa
fi

rsync -aWv --delete dist/pwa/ server:/var/www/nboughton.uk/public/apps/stargazer2/
