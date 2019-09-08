#!/bin/bash
#
# This script start Hyperledger Fabric network:
#
#

#setup nvm environment
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# start Hyperledger Fabict network
cd ~/fabric-dev-servers/
./startFabric.sh

# Deploy lowcarbon Network
cd ~/Low-Carbon/lowcarbon/
composer network install --card PeerAdmin@hlfv1 --archiveFile lowcarbon@0.0.3.bna
composer network start --networkName lowcarbon --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

# Deploy API-REST
nohup composer-rest-server -c admin@lowcarbon -n never -w true > rest-server.out 2> rest-server.err < /dev/null &

# Run Blockchain Explorer
cd ~/Low-Carbon/blockchain-explorer
npm install > "/dev/null" 2>&1
sleep 5
./start.sh

#use nvm version 12
cd ~/Low-Carbon/lowcarbon-web/
nvm use v12.8.0

echo ''
echo ''
echo "### Please wait, this action take up 1 minute ###"
echo ''
echo ''

# Deploy and run ANGULAR APP
cd ~/Low-Carbon/lowcarbon-web/
nohup ng serve --host $IP --port 4200 --disable-host-check > angular-app.out 2> angular-app.err < /dev/null &

# Go to Project path
cd ~/Low-Carbon/
sleep 60
