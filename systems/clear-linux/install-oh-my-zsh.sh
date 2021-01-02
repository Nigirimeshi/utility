#!/bin/bash

# Absolute path to this script, e.g. /home/user/git/bin/foo.sh
readonly SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, e.g.  /home/user/git/bin
readonly SCRIPT_PATH=$(dirname "${SCRIPT}")
echo Script Path: ${SCRIPT_PATH}
# Absolute path this script is in, e.g.  /home/user/git
readonly PROJECT_PATH=$(dirname $(dirname "${SCRIPT_PATH}"))

pushd ${SCRIPT_PATH}

# Install oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Install plugins
source ./install-zsh-plugins.sh

# Overlay configuration
cat ../../configs/oh-my-zsh/.zshrc > ~/.zshrc

popd
