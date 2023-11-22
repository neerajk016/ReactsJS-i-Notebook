Bcakend=>

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
    let success=false

//  if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
      return res.status(400).json({success, errors: errors.array() });
    }    


    try{

    // check user if user already exists or not
    let user= await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, errors: "a user with this mail already exists"});
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
    success=true
    res.json({success,authtoken}) //sending data in thunderclient
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

    let success=false


    // if there are errors return bad requests and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    
    const{email,password}=req.body;


    try {

        let user=await User.findOne({email});
        if(!user){
            success=false
            return res.status(400).json({success, errors: "please try to login with correct credentials"});
        }


        const passwordcompare=await bcrypt.compare(password,user.password)
        if(!passwordcompare){
            success=false
            return res.status(400).json({success, errors: "please try to login with correct credentials"});
        }


        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRETKEY)//changing above data into as hashtext named authtoken
        success=true
        
        res.json({success,authtoken}) //sending data in thunderclient
        
    } catch (error) { // if error occur in try catch will run
        console.error(error.message);
        res.status(500).send("Some Error occurred");
    }




})


//route=>get loggedin user details using POST "/api/user/getuser" login required
router.post('/getuser',fetchuser,async(req,res)=>{

    try {
        userid=req.user.id;//getting user id using fetchuser.js file
        const user=await User.findById(userid).select("-password")//selecting whole json except password
        res.send(user)//you have to add new header named auth token in thunder client
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

Frontend=>


#index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    
    <title>iNotebook-Your Notes are Secure in Cloud</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    
  </body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="https://kit.fontawesome.com/60f5a8e6f3.js" crossorigin="anonymous"></script>
  </html>
































#index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





















context==>



notes=>














#noteContext.js

import { createContext } from "react";

const noteContext=createContext();

export default noteContext;
























#NoteState.js

import noteContext from "./noteContext";

import {useState} from "react";

const NoteState=(props)=>{

  const host="http://localhost:3001"


    const noteInitial=[]





        const [Notes,setNotes]=useState(noteInitial);



        //add a note
        const addNote=async(title,description,tag)=>{

          //api call

          const response = await fetch (`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjY0NjhmN2RjNjgxZjI0ZmQ2MWJjIn0sImlhdCI6MTY1MzU3MDE5OX0.WmJXnlau6iCHAZBWGGMjSIH6L2-g4VFjfHBLJbcPfso'
            },
            body:JSON.stringify({title,description,tag})
          });

          const note= await response.json()
          setNotes(Notes.concat(note))




          //logic to add notes
          // console.log("adding a note")
          // const note={
          //   "_id": "628faa05f5de81asda6777d01e2f",
          //   "user": "628f6468f7dc681f24fd61bc",
          //   "title": title,
          //   "description": description,
          //   "tag": tag,
          //   "date": "2022-05-26T16:25:41.973Z",
          //   "__v": 0
          // }
          // setNotes(Notes.concat(note))
          
        }









        //delete a note
        const deleteNote=async(id)=>{
          // api call

          const response = await fetch (`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjY0NjhmN2RjNjgxZjI0ZmQ2MWJjIn0sImlhdCI6MTY1MzU3MDE5OX0.WmJXnlau6iCHAZBWGGMjSIH6L2-g4VFjfHBLJbcPfso'
            },
          });
          const json=response.json();
          // console.log(json);


          //logic to delete
          console.log("deleting a note"+id)
          const newNotes=Notes.filter((note)=>{return note._id!==id})
          setNotes(newNotes)
        }









        //edit a note
        const editNote=async(id,title,description,tag)=>{



          //api call

          const response = await fetch (`${host}/api/notes/updatenote/${id}`,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjY0NjhmN2RjNjgxZjI0ZmQ2MWJjIn0sImlhdCI6MTY1MzU3MDE5OX0.WmJXnlau6iCHAZBWGGMjSIH6L2-g4VFjfHBLJbcPfso'
            },
            body:JSON.stringify({title,description,tag})
          });
          const json= await response.json()
          // console.log(json)
          


          let newNotes=JSON.parse(JSON.stringify(Notes))
          //logic to edit in client
          for(let index=0;index<Notes.length;index++){
            const element=Notes[index]
            if(element._id===id){

              newNotes[index].title=title;
              newNotes[index].description=description;
              newNotes[index].tag=tag;
              break;

            }

          }
          setNotes(newNotes)



        }




        
        const getNotes=async()=>{
          //api call

          const response = await fetch (`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
              'Content-Type':'application/json',
              'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjY0NjhmN2RjNjgxZjI0ZmQ2MWJjIn0sImlhdCI6MTY1MzU3MDE5OX0.WmJXnlau6iCHAZBWGGMjSIH6L2-g4VFjfHBLJbcPfso'
            },
            
          });
          const json=await response.json();
          // console.log(json)
          setNotes(json);

        }


    
    

    return (<noteContext.Provider value={{Notes,addNote,deleteNote,editNote,getNotes}}>
      
        {props.children}

    </noteContext.Provider>)

}

export default NoteState;
         


































#App.js

import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import About from './components/About'
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';


const App = () => {
  return (<>
  <NoteState>
    
    <Router>
      


      <Navbar/>
      <Alert message={"hello neeraj"}/>
    

  
    
    <Routes>
        <Route exact path="/" element={<Home/>}/>


        <Route exact path="/about" element={<About />}/>

        <Route exact path="/login" element={<Login/>}/>

        <Route exact path="/signup" element={<Signup/>}/>

        

        
    </Routes>


    </Router>
    </NoteState>
    </>
  )
}

export default App
















components=>








#Navbar.js



import React,{useEffect} from "react";
import {  Link,useLocation} from "react-router-dom";

const Navbar = () => {
  const location=useLocation();
  useEffect(()=>{
    // console.log(location.pathname);
  },[location])
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${ location.pathname==="/" ? "active" : ""} `} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              
              
              <li className="nav-item">
                <Link className={`nav-link ${ location.pathname==="/about" ? "active" : ""} `} to="/about">About</Link>
              </li>
            </ul>
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;































#Home.js



import React from "react";

import Notes from "./Notes";









const Home = () => {


  

  



  return (
    <>
    

      
    <div className="container">
    
      <Notes/>

    </div>
      
        
      
    
    
   </>
  )
}

export default Home











  






#Notes.js



import React,{useContext, useEffect, useRef, useState} from "react";
import noteContext from '../context/notes/noteContext'
import Noteitem from "./Noteitem"
import Addnote from "./Addnote";


const Notes = () => {
    const context=useContext(noteContext);
    const {Notes,getNotes,editNote}=context;


    useEffect(()=>{
      getNotes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const ref=useRef(null)

    const refclose=useRef(null)


    const [Note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""})


    const handleclick=(e)=>{
      console.log("updating the note..",Note)
      // console.log(Note.id)
      editNote(Note.id,Note.etitle,Note.edescription,Note.etag)
      
      
      refclose.current.click();
    }


    const onchange=(e)=>{
      setNote({...Note,[e.target.name]:e.target.value})
    }


    
    const updateNote=(currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})

    }


  return (
    <>
    <Addnote/>



  <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button>

  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

          <form className="my-3">
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">Title</label>
              <input type="text" value={Note.etitle} minLength={5} required className="form-control" name="etitle" id="etitle" aria-describedby="emailHelp" onChange={onchange}/>
            </div>
            <div className="mb-3">
              <label htmlFor="edescription" className="form-label">Description</label>
              <input type="text" value={Note.edescription} minLength={5} required className="form-control" name="edescription" id="edescription" onChange={onchange}/>
            </div>

            <div className="mb-3">
              <label htmlFor="etag" className="form-label">Tag</label>
              <input type="text" value={Note.etag} className="form-control" name="etag" id="etag" onChange={onchange}/>
            </div>
            
          </form>
          
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose}>Close</button>
          <button type="button"  disabled={Note.etitle.length<5 || Note.edescription.length<5} className="btn btn-primary" onClick={handleclick}>Save changes</button>
        </div>
      </div>
    </div>
  </div>










    
    <div className="row  my-3">
        
      <h2>Your Notes</h2>

      <div className="container">
      {Notes.length===0&&"No Notes to Display"}

      </div>

      
     
      {Notes.map((note)=>{

        return <Noteitem key={note._id} updateNote={updateNote} note={note}/>
        })}

      
      
    </div>
    </>
  )
}

export default Notes











  








          












#AddNote.js

import React,{useContext,useState} from "react";
import noteContext from '../context/notes/noteContext'

const Addnote = () => {

  const context=useContext(noteContext);
  const {addNote}=context;



  const [Note,setNote]=useState({title:"",description:"",tag:"default"})


  const handleclick=(e)=>{
    e.preventDefault();
    addNote(Note.title,Note.description,Note.tag);
    setNote({title:"",description:"",tag:""});

  }


  const onchange=(e)=>{
    setNote({...Note,[e.target.name]:e.target.value})
  }




  return (
    
    <div className="container my-3">

      <h1>Add a Note</h1>


      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" value={Note.title} minLength={5} required className="form-control" name="title" id="title" aria-describedby="emailHelp" onChange={onchange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" value={Note.description} minLength={5} required className="form-control" name="description" id="description" onChange={onchange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Tag</label>
          <input type="text" className="form-control" value={Note.tag} name="tag" id="tag" onChange={onchange}/>
        </div>
        
        <button type="submit" disabled={Note.title.length<5 || Note.description.length<5} className="btn btn-primary" onClick={handleclick}>Submit</button>
      </form>

      
        
        
      
    </div>
  )
}

export default Addnote
















#Noteitem.js

import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const {note,updateNote}=props;
    const context=useContext(noteContext);
    const {deleteNote}=context;
  return (
    <div className='col-md-3'>
        <div className='card my-3'>
            <div className='card-body'>
              <div className='d-flex align-items-center'>

              
                <h5 className='card-title'>{note.title}</h5>
                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)} }></i>
                
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                
              </div>
              <p className='card-text'>{note.description}</p>

            </div>
            {/* {props.note.title}

            {props.note.description} {props.note._id}  */}
        
        
        
        </div>

      
    </div>
  )
}

export default Noteitem









#Login.js  


import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';




const Login = () => {

  const navigate = useNavigate();


  const [Credentials,setCredentials]=useState({email:"",password:""})



  const onchange=(e)=>{
    setCredentials({...Credentials,[e.target.name]:e.target.value})
  }



  const handlesubmit=async(e)=>{
    e.preventDefault();

    const response = await fetch (`http://localhost:3001/api/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:Credentials.email,password:Credentials.password})
    });
    const json=await response.json();
    console.log(json)
    if(json.success){
      //save the auth-token and redirect
      localStorage.setItem("token",json.authtoken)
      navigate('/');

    }else{
      alert("Invalid Credentials");
    }
  }

    





  return (
    <div className='container'>

        <form className="my-3" onSubmit={handlesubmit} >

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" value={Credentials.email} onChange={onchange}  required className="form-control" name="email" id="email" aria-describedby="emailHelp" />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" value={Credentials.password} onChange={onchange}  required className="form-control" name="password" id="password" />
        </div>

        
        
        <button type="submit"  className="btn btn-primary" >Submit</button>
      
      
      </form>
      
    </div>
  )
}

export default Login



#Signup.js 


import React,{useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate();

  


  const [Credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""})

  



  const onchange=(e)=>{
    setCredentials({...Credentials,[e.target.name]:e.target.value})
  }

  

  const handlesubmit=async(e)=>{
    e.preventDefault();
    const {name,email,password}=Credentials;
    const response = await fetch (`http://localhost:3001/api/auth/createuser`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name,email,password})
    });
    const json=await response.json();
    console.log(json)
    
      //save the auth-token and redirect
      localStorage.setItem("token",json.authtoken)
      navigate('/');
  }





  return (
    <div className='container'>

        <form className="my-3" onSubmit={handlesubmit} >

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text"  onChange={onchange}  required className="form-control" name="name" id="name" aria-describedby="emailHelp" />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email"  onChange={onchange}  required className="form-control" name="email" id="email" aria-describedby="emailHelp" />
        </div>


        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password"  onChange={onchange}  required className="form-control" name="password"  minLength={5} id="password"  />
        </div>

        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password"  onChange={onchange}  required className="form-control" name="cpassword" minLength={5} id="cpassword"  />
        </div>

        
        
        <button type="submit"  className="btn btn-primary" >Submit</button>
      
      
      </form>
      
    </div>
  )
}

export default Signup


























#Alert.js 

import React from 'react'

const Alert = (props) => {
  return (
    <div>
        <div className='alert alert-primary' role="primary">
            {props.message}


        </div>
      
    </div>
  )
}

export default Alert
















#About.js

import React from 'react'





const About = () => {
  

  
  return (
    <div>
      <h1>this is about page</h1>
    </div>
  )
}

export default About;























#index.class



body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

i{
  cursor: pointer;
}
