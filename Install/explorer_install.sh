#!/bin/bash
#
# This script install Hyperledger Explorer prerequisites.
#
#

# Exit on any failure
set -e

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

# Echo Done
echo ''
echo "Done"
