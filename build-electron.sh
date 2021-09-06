#!/bin/bash

version=$(grep '"version"' package.json | sed -re 's/[^0-9.]+//g')
echo "Building and packaging v$version in 5 seconds"
sleep 5

quasar b -m electron

cd dist/electron

echo "Zipping Win32 build in 3s"
sleep 3
zip -r Stargazer-win-$version.zip 'Stargazer-win32-x64'

echo "Tarring Linux build in 3s"
sleep 3
tar czvf Stargazer-linux-$version.tar.gz 'Stargazer-linux-x64'

echo "Tarring Mac build in 3s"
sleep 3
tar czvf Stargazer-darwin-$version.tar.gz 'Stargazer-darwin-x64'

