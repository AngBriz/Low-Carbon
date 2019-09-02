#!/bin/bash
#
# This script stop Hyperledger Fabric network:
#
#

# Stop API-REST process
netstat -putan | grep 3000 | cut -d "/" -f 1 | awk '{ system("kill -9 "$7 ) }'
sleep 5

# Stop Angular app process
netstat -putan | grep 4200 | cut -d "/" -f 1 | awk '{ system("kill -9 "$7 ) }'
sleep 5


# Stop Hyperledger Fabic Network
cd ~/fabric-dev-servers/
./stopFabric.sh

