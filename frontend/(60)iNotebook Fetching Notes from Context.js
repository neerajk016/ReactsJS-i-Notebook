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


    const noteInitial=
        [
            {
              "_id": "628f97e602759a9e49a1cb25",
              "user": "628f6468f7dc681f24fd61bc",
              "title": "my title",
              "description": "desc1",
              "tag": "personal",
              "date": "2022-05-26T15:08:22.806Z",
              "__v": 0
            },
            {
              "_id": "628fa29b02759a9e49a1cb29",
              "user": "628f6468f7dc681f24fd61bc",
              "title": "my title",
              "description": "desc1",
              "tag": "personal",
              "date": "2022-05-26T15:54:03.240Z",
              "__v": 0
            },
            {
              "_id": "628faa05f5de816777d01e2f",
              "user": "628f6468f7dc681f24fd61bc",
              "title": "my title",
              "description": "desc1",
              "tag": "personal",
              "date": "2022-05-26T16:25:41.973Z",
              "__v": 0
            }
          ]


        const [Notes,setNotes]=useState(noteInitial);

    
    

    return (<noteContext.Provider value={{Notes,setNotes}}>
        {props.children}

    </noteContext.Provider>)

}

export default NoteState;
 



































#App.js

import React from 'react'
import Home from './components/Home'
import About from './components/About'
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import NoteState from './context/notes/NoteState';


const App = () => {
  return (<>
    <NoteState>

    
        <Router>
            <Navbar/>
            
            
            <Routes>
                <Route exact path="/" element={<Home/>}/>


                <Route exact path="/about" element={<About />}/>
                
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
    console.log(location.pathname);
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




import React,{useContext} from "react";


import noteContext from '../context/notes/noteContext'







const Home = () => {


  const context=useContext(noteContext);

  const {Notes,setnotes}=context;

  // console.log(notes);



  return (
    <div className="container my-3">

      <h1>Add a Note</h1>


      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      <div>
      <h1>Your Notes</h1>
      {/* {context.Notes.map((note)=>{ */}
      {Notes.map((note)=>{

        return note.title,note.description;
        })}

      </div>
        
        
      
    </div>
  )
}

export default Home

  







































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













