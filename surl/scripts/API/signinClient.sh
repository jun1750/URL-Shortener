#!/bin/bash
# Read username and password
read -r -p "username (FCS LDAP): " username
read -r -s -p "password: " password

# substitute into the curl command
curl -i -H "Content-Type: application/json" \
   -X POST -d '{"username": "'$username'", "password": "'$password'"}' \
   -c cookie-jar -k https://cs3103.cs.unb.ca:26345/signin
