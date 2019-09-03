#!/bin/bash
#
# This script start Hyperledger Fabric network:
#
#

# start Hyperledger Fabict network
cd ~/fabric-dev-servers/
./startFabric.sh

# Deploy lowcarbon Network
cd ~/Low-Carbon/lowcarbon/
composer network install --card PeerAdmin@hlfv1 --archiveFile lowcarbon@0.0.3.bna
composer network start --networkName lowcarbon --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

# Deploy API-REST
nohup composer-rest-server -c admin@lowcarbon -n never -w true > rest-server.out 2> rest-server.err < /dev/null &

# Deploy ANGULAR APP
yo hyperledger-composer:angular

# Run ANGULAR APP
sleep 10
cd ~/Low-Carbon/lowcarbon-app
nohup npm start > angular-app.out 2> angular-app.err < /dev/null &

# Run Blockchain Explorer
cd ~/Low-Carbon/blockchain-explorer
npm install
./start
