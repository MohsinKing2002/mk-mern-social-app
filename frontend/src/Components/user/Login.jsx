import React, { useState } from "react";
import {NavLink} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../Actions/User";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

const Login = ()=>{

    const {loading, error, message} = useSelector(state=>state.user);
    
    const [user, setUser] = useState({
        email: "", password: ""
    })

    const dispatch = useDispatch();

    let name, value;
    const handleInputs = (e)=>{
        e.preventDefault();

        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    }

    const LoginHandler = (e)=>{
        e.preventDefault();

        dispatch(loginUser(user.email, user.password));
    };

    useEffect(()=>{
        if(error){
            window.alert(error);
            dispatch({type: "clearError"})
        }
        if(message){
            window.alert(message);
            dispatch({type: "clearMessage"})
        }
    }, [error, message, dispatch, loading]);

    return(
        loading ? <Loader /> :
            <div className="center">
                <div className="login">
                    <h1 className="title">Sign in</h1>
                    <br />
                    <form onSubmit={LoginHandler}>

                        <input type="email" name="email" placeholder="Enter Your Email" value={user.email} onChange={handleInputs} required />

                        <input type="password" name="password" placeholder="Enter Your Password" value={user.password} onChange={handleInputs} required />


                        <br />
                        <button type="submit" className="btn">Login</button>
                    </form>
                    <br />

                    <NavLink className="link" to="/register">
                        I'm a new User !
                    </NavLink>
                </div>
            </div>
    );
}

export default Login;