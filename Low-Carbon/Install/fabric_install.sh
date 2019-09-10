#!/bin/bash
#
# This script install and download Hyperledger Fabric hlfv12.
#
#

# Exit on any failure
set -e

# Update package lists
echo "# Updating package lists"
sudo apt-get update

# Create new dir fabric-dev-servers
echo "# Create dir fabric-dev-servers"
mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers 

# Download Fabric Dev Servers & Tools
echo "# Downloading Fabric Dev Servers & Tools...."
curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz

# Extracdt downloaded file
echo "# Extracting...."
tar -xvf fabric-dev-servers.tar.gz

# Download Hyperledger Fabric
export FABRIC_VERSION=hlfv12
echo "# Downloading Hyperledger Fabric...."
./downloadFabric.sh

# Echo Done
echo ''
echo "Done"


tar -xvf fabric-dev-servers.tar.gz