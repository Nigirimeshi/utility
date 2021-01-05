#!/bin/bash

# Absolute path to this script, e.g. /home/user/git/bin/foo.sh
readonly SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, e.g.  /home/user/git/bin
readonly SCRIPT_PATH=$(dirname "${SCRIPT}")
echo Script Path: ${SCRIPT_PATH}
# Absolute path this script is in, e.g.  /home/user/git
readonly PROJECT_PATH=$(dirname $(dirname "${SCRIPT_PATH}"))

pushd ${SCRIPT_PATH}

# Init dir
mkdir ~/.vim
mkdir ~/.vim/.backup
mkdir ~/.vim/.swp
mkdir ~/.vim/.undo

# Overfile ~/.vimrc
cat ../../configs/vim/.vimrc > ~/.vimrc

popd
