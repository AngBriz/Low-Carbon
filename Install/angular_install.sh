#!/bin/bash
#
# This script install Angular app prequesites.
#
#

# Exit on any failure
set -e

# Array of supported versions
declare -a versions=('trusty' 'xenial' 'yakkety', 'bionic');

# check the version and extract codename of ubuntu if release codename not provided by user
if [ -z "$1" ]; then
    source /etc/lsb-release || \
        (echo "Error: Release information not found, run script passing Ubuntu version codename as a parameter"; exit 1)
    CODENAME=${DISTRIB_CODENAME}
else
    CODENAME=${1}
fi

# check version is supported
if echo ${versions[@]} | grep -q -w ${CODENAME}; then
    echo "Installing Hyperledger Composer for Ubuntu ${CODENAME}"
else
    echo "Error: Ubuntu ${CODENAME} is not supported"
    exit 1
fi

# Update package lists
echo "# Updating package lists"
sudo apt-get update

# Installing net-tools
echo "# Installing net-tools"
sudo apt-get install net-tools

# Installing new version of nodeJs
echo "# Installing new version of nodeJs"
nvm install v12.8.0

# Installing new version of angular
echo "# Installing new version of Angular-cli and Angular-core"
npm install -g @angular/cli @angular/core

# Configure Angular-cli warnings
echo "# Hide Angular-cli warnings"
ng config -g cli.warnings.versionMismatch false

