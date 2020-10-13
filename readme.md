# MyBay
Sample project for a web store app

## Setup the project
Current version of the project is in **features/backend-objects** branch. To setup it follow steps:
 - **npm install** in **server** folder
 - create **.env** in **server** folder containing variables
 ```
 SECRET=some random string
 DB_STRING=mongodb://localhost:27017/myBay
 CLIENT_ID=some client id
 CLIENT_SECRET=some client secret
 ```
 - add **public** folder containig sub folders: **css**, **js** and move there the **ico** and **img** from App folder
 - run in consol **npm run dev** to build and watch the js files
 - run in separate console **npm run scss** to build and watch scss files
 - start mongo DB using in separte console **mongod**
 - start the app server in a console with **npm run nodemon**
 - to incert initial items in the database use the route '\setitems'

## Project specifics
### App folder
Contains initial SPA version of the projec which uses sammy.js to route from the client side.

### Server folder (selver branch)
Contains the latest developments of the MVP app. It is currently under develpment. It contains:
 - express as the node based server
 - handlebars as a template engine
 - passport for authentication (local and google)
 - mongoDB as an app database
 - mongoose as DB middleware

### UnitTest folder
Contains the SPA part unit tests