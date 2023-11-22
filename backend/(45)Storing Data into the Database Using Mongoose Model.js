 
// #backend=>




// Structure of iNotebook Application========================>



#index.js
   

const x = require('./db');
const express = require('express')



x();
const app = express()
const port = 3001


app.use(express.json())




// creating routes prefered method
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})








//run this in cmd using "nodemon ./index.js"




#db.js
const mongoose = require('mongoose');
const { userInfo } = require('os');
const mongoURI = "mongodb://localhost:27017" //url link will be there in mongoose compass
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;






















models=>

#User.js//used

const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('user', UserSchema);









#Notes.js//not used

const mongoose = require('mongoose');
const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);








routes=>



auth.js  
const express = require('express');
const router = express.Router();
const User = require('../models/User');



router.get('/',(req,res)=>{
    // obj={
    //     a:'auth',
    //     number:16
    // }
    // res.json(obj)

    // res.json([])

    console.log(req.body)// gives undefined in cmd when we send this in thunder client

    res.send("hello") //this will give hello in thunderclient when we send this in thunder client

    // add a header in thunder client Content-Type : application/json

    // add a json {"name":"hulk","email":"hulk@email.com","password":"38012380"} in body beside header in thunder client and click send 
    
    console.log(req.body)// it gives undefined in cmd when we send this in thunder client

    // paste a middle ware "app.use(express.json())" in index.js to avoid giving undefined then 

    console.log(req.body)// gives {"name":"hulk","email":"hulk@email.com","password":"38012380"}  in cmd when we send this in thunder client


    res.send(req.body) // this will give {"name":"hulk","email":"hulk@email.com","password":"38012380"} in thunderclient when we send this in thunder client 
    

    // import User in auth.js ;
    //paste const { Schema } = mongoose; in User.js;
    const user=User(req.body)
    user.save()//this will save the {"name":"hulk","email":"hulk@email.com","password":"38012380"} json in mongoose tests.user database




})

module.exports=router



// final auth.js

// const express = require('express');

// const router = express.Router();

// const User = require('../models/User');


// router.get('/',(req,res)=>{
//     console.log(req.body)// gives undefined in cmd when we send this in thunder client
    
//     const user=User(req.body)

//     user.save()

//     res.send(req.body)

// })

// module.exports=router





notes.js 

const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{
    // obj={
    //     a:'notes',
    //     number:16
    // }
    // res.json(obj)

    res.json([])

})

module.exports=router








































// #frontend=>













