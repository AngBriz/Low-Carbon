#!/bin/bash
#
# This script install Hyperledger Explorer prerequisites.
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

# Install mysql-server
echo "# Install mysql-server"
sudo apt-get install mysql-server -y

# Importa database to mysql-server
echo "# Import database to mysql"
cd ~/Low-Carbon/blockchain-explorer
mysql -u root -p < db/fabricexplorer.sql
