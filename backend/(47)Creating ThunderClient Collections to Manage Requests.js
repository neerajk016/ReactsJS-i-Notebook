// create a collection named iNotebook in thunder client in that create a folder Named Autentication inthat create a request called create a user in that add link "http://localhost:3001/api/auth/createuser"


 
// #backend=>




// Structure of iNotebook Application========================>



#index.js
   

const connectToMongo = require('./db');
const express = require('express')



connectToMongo();
const app = express()
const port = 3001

app.use(express.json())





// creating routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})








//run this in cmd using "nodemon ./index.js"




#db.js
const mongoose = require('mongoose');
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
        unique:true
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
// User.createIndexes(); this function use is inbuilt in mongocompass it is optional to use 
module.exports = User;


















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
],async(req,res)=>{

//  if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }    


    try{

    // check user if user already exists or not
    let user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({ errors: "a user with this mail already exists"});
    }


    // collection creation(creates a new user)
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    res.json(user)
    }
    catch (error) { // if error occur in try catch will run
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }




    

    

})


module.exports=router


// in Thunderclient=> iNotebook=> Autentication=>  create a new user =>{
//     in body {
//         {
//             "name":"nesfsdsf",
//             "email":"hdkshdsj1gmdail.com",
//             "password":"87908y23hoiw"
//         } 
//     }click send to get response from databse
// }










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













