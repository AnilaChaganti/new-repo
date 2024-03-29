import React,{useEffect, useState} from 'react';
import logo from "../img/logo.png";
import "../css/SignUp.css";
import {Link, useNavigate} from "react-router-dom";

import { toast } from 'react-toastify';


export default function SignUp() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //Toast functions
    const notifyA = (msg) => toast.error(msg)
    const notifyB = (msg) => toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const postData = ()=>{
        //email validation
        if(!emailRegex.test(email)){
            notifyA("Invalid email")
            return
        }else if (!passRegex.test(password)){
            notifyA("Password must contain at least 8 characters including 1 special character for example #,$,%,!, 1 lowercase alphabetical character,1 uppercase alphabetical character and at least 1 numeric character")
            return
        }



        //sending data to server

        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate("/signin")
            }
            console.log(data)
        })
    }

    return (
    <div className="signUp">
        <div className="form-container">
            <div className="form">
                <img className="signUpLogo" src={logo} alt="" />
                <p className="loginPara">
                    SignUp to connect <br/> with your friends & family!
                </p>
                <div>
                    <input type='email' name='email' id='email' value={email} placeholder= "Email" onChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div>
                    <input type='text' name='name' id='name' value={name} placeholder= "Full Name" onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div>
                    <input type='text' name='username' id='username' value={userName} placeholder= "Username" onChange={(e)=>{setUserName(e.target.value)}}/>
                </div>
                <div>
                    <input type='password' name='password' id='password' value={password} placeholder= "Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>
                <p className='loginPara' style={{fontSize:"12px", margin:"3px 0px"}}>
                    By signing up, you agree to our Terms,<br/> Privacy & Cookies policy.
                </p>
                <input type="submit" id="submit-btn" value="Sign Up" onClick={()=>{postData()}}/>
            </div>
            <div className="form2">
                Already have an account?
                <Link to="/signin">
                <span style={{color:"brown", cursor:"pointer"}}>Sign In</span>
                </Link>
            </div>
        </div>
    </div>
    );
}