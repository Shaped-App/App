# Shaped App Backend Server

Clients interact with server's REST API. Endpoints and behavior are described in setup/rest-api-docs.md. Actual endpoints are built using App/config/server-api-list.json, App/config/server-info.json, and the endpoint fragment from the documentation. 

Hostname and port are pulled from server-info

<ip>:<port>

Currently using Firebase Firestore as database

## Server dev setup 
```
$ npm -v
6.14.8
$ node -v
v14.14.0
$ cd App/server
$ npm install
``` 

### Run server locally
Requires the firebase_key.json

Check package.json for other scripts, like start:debug, test
```
$ npm run start
```

### Run server on AWS instance
```
$ ssh -i ~/.ssh/shaped_app_ec2_key.pem ec2-user@ec2-3-16-151-194.us-east-2.compute.amazonaws.com
$ screen -ls    # check if already running
$ screen -r     # reattach
<c-c>           # stop previous
$ npm run start:prod
<c-a> <d>       # detach from screen
``` 