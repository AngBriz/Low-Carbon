#!/bin/bash
#
# This script installs:
# - composer-cli v0.20
# - composer-rest-server v0.20
# - generator-hyperledger-composer v0.20
# - yo 
# - composer-playground v0.20
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

# Install composer-cli
echo "# Installting composer-cli"
npm install -g composer-cli@0.20 

# Install composer-rest-server
echo "# Installing composer-rest-server"
npm install -g composer-rest-server@0.20 

# Install generator-hyperledger-composer
echo "# Installing generator-hyperledger-composer"
npm install -g generator-hyperledger-composer@0.20 

# Install yo
echo "# Installing yo"
npm install -g yo 

# Install composer-playground
echo "# Installing composer-playground"
npm install -g composer-playground@0.20 

# Update package lists
sudo apt-get update

# Print installation details for user
echo ''
echo 'Installation completed, versions installed are:'
echo ''
echo -n 'composer: '
composer --version
echo -n 'composer-rest-server: '
composer-rest-server --version
echo -n 'yo: '
yo --version
echo -n 'Composer Playground: '
composer-playground --version


# Print reminder of need to logout in order for these changes to take effect!
echo ''
echo "Please logout then login before continuing."
