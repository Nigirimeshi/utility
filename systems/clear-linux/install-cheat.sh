#!/bin/bash

if [ ! -d "/usr/local/bin" ]; then
    mkdir /usr/local/bin
fi

curl https://cht.sh/:cht.sh | sudo tee /usr/local/bin/cht.sh
chmod +x /usr/local/bin/cht.sh
