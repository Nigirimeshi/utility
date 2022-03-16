#!/bin/bash

# !!! WARNING !!!
# Here is my own configuration, please do not use it.

git config --global user.name ""
git config --global user.email ""
# 提交时转换为 LF，检出时不转换。
git config --global core.autocrlf input
# 拒绝提交包含混合换行符的文件。
git config --global core.safecrlf true
