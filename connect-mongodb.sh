#!/bin/bash

# MongoDB Atlas Connection Script
echo "Connecting to MongoDB Atlas..."
echo "Cluster: Cluster23706"
echo "Username: eveama00@gmail.com"
echo ""

# Connection string for your MongoDB Atlas cluster
CONNECTION_STRING="mongodb+srv://eveama00@gmail.com:Amevery9119@cluster23706.ockqq.mongodb.net/"

echo "Attempting to connect..."
mongosh "$CONNECTION_STRING"

# Alternative connection methods:
# 1. Connect and specify database:
# mongosh "$CONNECTION_STRING" --eval "use myDatabase"

# 2. Connect with authentication database:
# mongosh "$CONNECTION_STRING" --authenticationDatabase admin

# 3. Connect with specific database:
# mongosh "$CONNECTION_STRING/myDatabase" 