# node-auth-server
Basic Auth server

Basic authentication server using nodejs allows you to register a new user, which will generate a token. 
Login with the username and password created in registration to get a JWT and access a restricted resouce using a JWT token.

This app has been dockerised so the full server and db can be started with the command:

```bash
docker-compose up
```

To use this server you will need to add a config.js file in the root of the project containing the following:

```javascript
module.exports = {
    secret: 'ADD YOUR SECRET HERE'
}
```

Add your own secret (Any string just don't tell anyone) and ensure that you don't commit this file. 
It has been added to the git ignore for this project.

This is based on the Server Setup - Authentication section of the Udemy course https://www.udemy.com/react-redux-tutorial/learn/v4/overview

Anyone coming from that course the following changes have been made to dockerise the project:

* Added [DockerFile](./DockerFile)
* Added [docker-compose.yml](./docker-compose.yml)
* Updated [package.json](./package.json)
* Updated [index.js](./index.js)

index.js
```javascript
mongoose.connect("mongodb://mongodb:27017:auth/auth");
```
Note host has changed from localhost. It should match the service name provided in docker-compose as this docker handles
making this a resolvable name.

package.json
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "nodemon index.js",
    "start": "node index.js"
  }
```
Added a start script to run the service without nodemon.
