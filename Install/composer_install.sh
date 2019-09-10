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

# Echo Done
echo ''
echo "Done"

# Print reminder of need to logout in order for these changes to take effect!
echo ''
echo "Please logout then login before continuing."
