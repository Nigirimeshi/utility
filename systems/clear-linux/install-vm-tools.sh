#!/bin/bash

sudo swupd bundle-add os-cloudguest-vmware
sudo swupd bundle-add os-cloudguest-vmware-gui
sudo systemctl enable --now open-vm-tools
