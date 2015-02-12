#!/bin/sh

cd "$PWD/src/"
apm install .
grunt build
cd ..
"$PWD/atom_shell/Atom.app/Contents/MacOS/Atom" "$PWD/src/"
