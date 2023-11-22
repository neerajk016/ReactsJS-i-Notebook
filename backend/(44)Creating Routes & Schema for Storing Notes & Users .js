
// #backend=>





// Creating Routes=>(method not prefered)


#index.js


const connectToMongo = require('./db');
const express = require('express')


connectToMongo();
const app = express()
const port = 3001


app.get('/', (req, res) => {
    res.send('Hello neeraj')
})

app.get('/api/v1/login', (req, res) => {
    res.send('Hello login')
})

app.get('/api/v1/signup', (req, res) => {
    res.send('Hello signup')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


// But, this method will lead to the distortion of the file structure of our React Application. As a result, maintaining a large React app will be a nightmare for you. Therefore, we won’t recommend you to use this method for large applications.



// Structure of iNotebook Application========================>



#index.js
   

const x = require('./db');
const express = require('express')



x();
const app = express()
const port = 3001


app.get('/', (req, res) => {
    res.send('Hello neeraj')
})


// creating routes prefered method
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})













#db.js
const mongoose = require('mongoose');
const { userInfo } = require('os');
const mongoURI = "mongodb://localhost:27017" //url link will be there in mongoose compass
const y = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = y;






//run this in cmd using "nodemon ./index.js"















models=>

#User.js//not used

const mongoose = require('mongoose');
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



router.get('/',(req,res)=>{
    // obj={
    //     a:'auth',
    //     number:16
    // }
    // res.json(obj)

    res.json([])

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













