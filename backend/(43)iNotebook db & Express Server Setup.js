// remove "/" in # dependencies /node_modules on gitignore File to not track node modules

// Installing Nodemon
// Nodemon allows us to develop node.js-based apps, by automatically restarting the node application when file changes are detected in the directory. You can install the nodemon package in the application as a dev dependency by using the below command:npm i -D nodemon (or)npm install -g nodemon


// #backend=>


#index.js

const connectToMongo = require('./db');
const express = require('express')



connectToMongo();
const app = express()
const port = 3001
app.get('/', (req, res) => {
    res.send('Hello neeraj')
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)// enter this url in thunderclient to get response(api testing)
})





#db.js
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017" //url link will be there in mongoose compass
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;



//run this in cmd using "nodemon ./index.js"

// #frontend=>













