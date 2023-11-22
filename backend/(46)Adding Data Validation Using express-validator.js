// Installing express-validator=====>npm install --save express-validator


 
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
const mongoURI = "mongodb://localhost:27017/iNotebook" //url link will be there in mongoose compass and iNotebook is databse name
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
const User=mongoose.model('user', UserSchema);
User.createIndexes();
module.exports = User;// this will restrict duplicate entry. we have to remove this if we want to enter same data

// module.exports=mongoose.model('user', UserSchema);(we have to enter this code if we want to enter same data)









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

const { body, validationResult } = require('express-validator');




router.get('/',[
    body('name','enter valid name').isLength({ min: 3 }),
    body('email','enter valid email').isEmail(),
    body('password','enter password more than 5 characters').isLength({ min: 5 })
],(req,res)=>{


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    
    //when we enter(send) json in body in thunderclient if error occurs like entering json different rules it will give this when we click send in thunderclient {
    // ouput=>
    //     "errors": [
    //       {
    //         "value": "hu",
    //         "msg": "enter valid name",
    //         "param": "name",
    //         "location": "body"
    //       },
    //       {
    //         "value": "hkal.om",
    //         "msg": "enter valid email",
    //         "param": "email",
    //         "location": "body"
    //       },
    //       {
    //         "value": "82",
    //         "msg": "enter password more than 5 characters",
    //         "param": "password",
    //         "location": "body"
    //       }
    //     ]
    //   } 

    User.create({  //User is colletion
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
    // when we enter send valid json in body of thunder client it will give json output as
    // {
    // "name": "hufdksf",
    // "email": "hulk@hksdjksdj.com",
    // "password": "fsdfdf82",
    // "_id": "628cd70eb4eef496f793044a",
    // "date": "2022-05-24T13:01:02.320Z",
    // "__v": 0
    // }
    // this automatically store data in mongodbcompass


    .catch(err=>{console.log(err); 
        res.json({error:'please enter a unique value for email',message:err.message})})



    // when we enter send valid json in body of thunder client if error ocuurs it will give ouput as:


    // {
    //     "error": "please enter a unique value for email",
    //     "message": "E11000 duplicate key error collection: iNotebook.users index: email_1 dup key: { email: \"hulkks@djksdj.com\" }"
    //   }






    // note:if app crashes when we enter same data please remove email as uniqueid in indexes in mongodbcompass(we have to do this if we want to enter same data)(we have to do this every time if we restart app)



    
    

})


module.exports=router





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













