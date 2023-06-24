import React,{useState} from 'react';
import Login from "./Login";
import { HashRouter as Router,Route,Routes } from 'react-router-dom';
import Registration from "./Registration";
import Emailverification from './Emailverification';
import TestfreeExam from './TestfreeExam'
import Exam from './Exam';
import Finish from './Finish';
import Results from './Results';
import Myresults from './Myresults';
import Packagedetails from './Packagedetails';
import Transactions from './Transactions';
import Paymentresponse from './Paymentresponse';

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
            <Route path = "/TestfreeExam" element = {<TestfreeExam id={id} tokenu={tokenu} serverKey={server_key} />} />
            <Route path = "/Exam/:examId" element ={<Exam id ={id} tokenu={tokenu} serverKey={server_key}/>} />
            <Route path= "/Finish" element={<Finish />}/>
            <Route path ="/login" element={<Login />} />
            <Route path = "/results" element = {<Results id ={id} tokenu={tokenu} serverKey={server_key} />} />
            <Route path ="/myresults" element = {<Myresults id ={id} tokenu={tokenu} serverKey={server_key} />} />
            <Route path ="/packagedetails" element = {<Packagedetails id ={id} tokenu={tokenu} serverKey={server_key} />} />
            <Route path="/transactions" element={<Transactions id ={id} tokenu={tokenu} serverKey={server_key}/>}/>
            <Route path="/paymentresponse" element={<Paymentresponse />}/>

            
                        
            
        </Routes>
    </Router>
    </div>
  );
                  
}


export default Header;





