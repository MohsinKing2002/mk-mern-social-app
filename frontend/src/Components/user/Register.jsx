import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { registerUser } from "../Actions/User";

const Register = ()=>{

    const dispatch = useDispatch();
    const {loading, error, message} = useSelector(state=>state.user);

    const [user, setUser] = useState({
        name: "", email: "", password: ""
    });

    const [avatar, setAvatar] = useState(null);

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    }
    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setAvatar(Reader.result);
            }
        }
    }

    const handleRegister = async (e)=>{
        e.preventDefault();
        await dispatch(registerUser(user.name, user.email, user.password, avatar));
    }

    useEffect(()=>{
        if (message) {
            window.alert(message);
            dispatch({ type: "clearMessage" })
        }

        if(error){
            window.alert(error);
            dispatch({type: "clearError"});
        }        
    }, [loading, error, message, dispatch]);

    return(
        <div className="center">
            <div className="login">
                <h1 className="title">Sign up</h1>
                <br />

                <form onSubmit={handleRegister}>
                    {avatar ? <img style={{height: "8vh"}} src={avatar} alt="user avatar" /> : null}

                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    <input type="text" name="name" placeholder="Enter Your Name" value={user.name} onChange={handleInputs} required />
                    <input type="email" name="email" placeholder="Enter Your Email" value={user.email} onChange={handleInputs} required />
                    <input type="password" name="password" placeholder="Enter Your Password" value={user.password} onChange={handleInputs} required />


                    <br />
                    <button type="submit" className="btn">Register</button>
                </form>
                <br />

                <NavLink className="link" to="/">
                    Already Registered !!
                </NavLink>
            </div>
        </div>
    );
}

export default Register;