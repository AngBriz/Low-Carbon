#!/bin/bash
#
# This script install Angular app prequesites.
#
#

# Exit on any failure
set -e

# Update package lists
echo "# Updating package lists"
sudo apt-get update

# Installing net-tools
echo "# Installing net-tools"
sudo apt-get install net-tools

# Set up nvm environment without restarting the shell
export NVM_DIR="${HOME}/.nvm"
[ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
[ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"

# Installing new version of nodeJs
echo "# Installing new version of nodeJs"
nvm install v12.8.0

# Installing new version of angular
echo "# Installing new version of Angular-cli and Angular-core"
npm install -g @angular/cli @angular/core ngx-gauge

# Configure Angular-cli warnings
echo "# Hide Angular-cli warnings"
ng config -g cli.warnings.versionMismatch false

# Echo Done
echo ''
echo "Done"
