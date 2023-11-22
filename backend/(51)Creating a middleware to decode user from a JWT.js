// create a collection named iNotebook in thunder client in that create a folder Named Autentication inthat create a request called get user data  in that add link "http://localhost:3001/api/auth/getuser"

 
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


#auth.js

const express = require('express');

const router = express.Router();

const User = require('../models/User');

const { body, validationResult } = require('express-validator');


const bcrypt = require('bcryptjs');//for hasshing password

const jwt = require('jsonwebtoken');//for authtoken

const { json } = require('express');

const fetchuser = require('../middleware/fetchuser');

const JWT_SECRETKEY="neeraj is good $boy";//used for authtoken



//router 1=>create a user using POST "/api/auth/createuser" no login required
// router.get('/',[
router.post('/createuser',[
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

    const salt = await bcrypt.genSalt(10);//salt variable
    const secpass=await bcrypt.hash(req.body.password,salt);//changing password to hasspassword



    // collection creation
    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
    });



    const data={
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRETKEY)//changing above data into as hashtext named authtoken
    
    res.json({authtoken}) //sending data in thunderclient
    // res.json(user)
    }
    catch (error) { // if error occur in try catch will run
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }



}),



//router2=>authenticate a user using POST "/api/auth/login" no login required
router.post('/login',[
    body('email','enter valid email').isEmail(),
    body('password','password cannot be blank').exists()
],async(req,res)=>{


    // if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    const{email,password}=req.body;


    try {

        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ errors: "please try to login with correct credentials"});
        }


        const passwordcompare=await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            return res.status(400).json({ errors: "please try to login with correct credentials"});
        }


        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRETKEY)//changing above data into as hashtext named authtoken
        
        res.json({authtoken}) //sending data in thunderclient
        
    } catch (error) { // if error occur in try catch will run
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }




})


//route 3=>get loggedin user details using POST "/api/user/getuser" login required
router.post('/getuser',fetchuser,async(req,res)=>{

    try {
        userid=req.user.id;//getting user id using fetchuser.js file
        const user=await User.findById(userid).select("-password")//selecting whole json except password
        res.send(user)//you have to add new header named auth token in thunder client (copy auth token with out parenthesis)
        //sample output=>
        // {
        //     "_id": "628f6468f7dc681f24fd61bc",
        //     "name": "neerajk",
        //     "email": "neerajk@gmail.com",
        //     "date": "2022-05-26T11:28:40.360Z",
        //     "__v": 0
        //   }
    }catch (error) { // if error occur in try catch will run
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }

}
)





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




















middlewares=>


#fetchuser.js



const JWT_SECRETKEY="neeraj is good $boy";//used for authtoken

const jwt = require('jsonwebtoken');//for authtoken




const fetchuser=(req,res,next)=>{
    //get the user from jwttoken and add id to req object

    const token=req.header('auth-token');//add the anytoken in thunderclient=> header=>with name 'auth-token' for requests using fetchuser
    if(!token){
        return res.status(401).json({ errors: "please autenticate using valid token"});
    }
    try {
        const data=jwt.verify(token,JWT_SECRETKEY);
        req.user=data.user;
        next();

        
    } catch (error) {
        return res.status(401).json({ errors: "please autenticate using valid token"});
        
    }
    

}



module.exports= fetchuser;






































// #frontend=>













