[![Build Status](https://travis-ci.org/irbekrm/Chat.svg?branch=master)](https://travis-ci.org/irbekrm/Chat)

### Description
Realtime chat app. Users can sign up, join a chat room, see who else is there and post and view messages in real time.

### Use
Clone the repo https://github.com/irbekrm/Chat.git

*npm install* (install dependencies)

*mongod* start mongo server

*npm start* (start the server)

##### Test

*mongod*

*npm test*

### User stories
1. A user can sign up / log in

2. A user can enter a chatroom and:

- post a message
  
- see dynamically updated list of users in chatroom
 
- see all messages posted in real time
  
### Learning Objectives
1. Understand the basics of websockets
2. Learn more about different connection models/patterns
3. Use GH Wiki and GH issues to improve workflow

### Technologies
Node with Express and MongoDB for backend, plain JavaScript for frontend, Socket.io for the chat itself.
API is tested using Mocha, Chai and Chai HTTP libraries, Travis CI is used for continuous integration.

##### Server- client connection
A mix of standard AJAX calls/ HTTP requests and Websockets connections. Messages related to user signup/login are sent using AJAX. Once a user enters a chat room a new socket connection is opened. State of a chat room- messages posted, users currently online - is then updated using the socket connection. When a user leaves a room, the connection is closed.

##### Users
User data is stored in a MongoDB database. Passwords are encrypted using bcrypt. JSON Web Tokens are used for user authorisation. When a user signs up/logs in they are issued a token that will be verified when they attempt to access a chat room.
