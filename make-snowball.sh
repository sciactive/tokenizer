#!/bin/bash

VERSION='3.0.1'

mkdir tempbuild
cd tempbuild

# Download Snowball
curl -OL https://github.com/snowballstem/snowball/archive/refs/tags/v$VERSION.tar.gz
# Extract
tar -xzvf v$VERSION.tar.gz
cd snowball-$VERSION

# Build the JS
# make
make js

# Move the built file.
mkdir -p ../../snowball
mv js_out/* ../../snowball/

# Clean up
cd ../..
rm -r tempbuild

# Rename the files to CJS
for file in snowball/*.js; do
  sed s/\\.js/.cjs/ $file > $(echo $file | sed 's/js$/cjs/')
  rm $file
done

echo "All done."
