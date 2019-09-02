#!/bin/bash
#
# This script start Hyperledger Fabric network:
#
#

# start Hyperledger Fabict network
cd ~/fabric-dev-servers/
./startFabric.sh
sleep 30

# Deploy lowcarbon Network
cd ~/Low-Carbon/lowcarbon/
composer network install --card PeerAdmin@hlfv1 --archiveFile lowcarbon@0.0.3.bna
composer network start --networkName lowcarbon --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

# Import admin card
composer card import --file networkadmin.card

# Deploy API-REST
nohup composer-rest-server -c admin@lowcarbon -n never -w true > rest-server.out 2> rest-server.err < /dev/null &

# Deploy ANGULAR APP
yo hyperledger-composer:angular

#Yes
#lowcarbon-app
#<press enter>
#Autor
#Email
#<press enter>
#admin@lowcarbon
#connect to an existing rest api
#<press enter>
#<press enter>
#namespaces NOT used
