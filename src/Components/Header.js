import React,{useState} from 'react';
import Login from "./Login";
import {HashRouter as Router,Route,Routes } from 'react-router-dom';
import Registration from "./Registration";
import './Header.css';
import Emailverification from './Emailverification';
import Questions from './Questions'
import Exams from './Exams'
import Finish from './Finish';

const Header = () => {
  const [id,setId] = useState(null);
  const [tokenu,setTokenu] = useState(null);
  const server_key = " 3w99V63pW7tJ7vavGXtCKo8cp";


  return (
    <div>
          <Router>

            <Routes><Route path="/registration" element={<Registration />}/>
            <Route path="/emailverification" element={<Emailverification />}/>
            <Route path="/" element={<Login setId={setId} setTokenu={setTokenu}/>} />
            <Route path = "/exams" element = {<Exams id={id} tokenu={tokenu} serverKey={server_key} />} />
            <Route path = "/questions/:examId" element ={<Questions id ={id} tokenu={tokenu} serverKey={server_key}/>} />
            <Route path= "/Finish" element={<Finish />}/>
            <Route path ="/login" element={<Login />} />
            
            
        </Routes>
    </Router>
    </div>
  );
                  
}


export default Header;





