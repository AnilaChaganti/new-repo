import React,{useContext} from 'react';
import logo from "../img/logo.png";
import "../css/Navbar.css";
import {Link} from "react-router-dom";
import { LoginContext } from '../context/LoginContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar({login}){
    const navigate = useNavigate();
  const{setModalOpen} = useContext(LoginContext)
  const loginStatus = ()=>{
    const token = localStorage.getItem("jwt")
    if(login || token){
        return [
            <>
                <Link to= "/Profile">
                    <li>Profile</li>
                </Link>
                <Link to="/createPost">Create Post</Link>
                <Link to={""}>
                    <button className="primaryBtn" onClick={()=> setModalOpen(true)}>Log Out</button>
                </Link>
            </>,
        ];
    }else{
        return[
            <>
                <Link to= "/SignUp">
                    <li>SignUp</li>
                </Link>
                <Link to= "/SignIn">
                    <li>SignIn</li>
                </Link>
            </>,
        ];
    }
}
    return (
        <div className="navbar">
            <img src={logo} alt="" onClick={()=>{navigate("/")}}/> 
            <ul className='nav-menu'>{loginStatus()}</ul>
        </div>
    )
}