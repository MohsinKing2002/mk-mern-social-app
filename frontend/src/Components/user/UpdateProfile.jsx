import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, loadUser } from "../Actions/User";
import Loader from "../Loader/Loader";

const UpdateProfile = ()=>{

    const {loading, error, message} = useSelector(state=>state.user);
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        name: "", email: ""
    })

    let name, value;
    const handleInputs = (e)=>{
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]: value});
    }

    const handleUpdate = async(e)=>{
        e.preventDefault();
        await dispatch(updateUser(user.name, user.email));
        dispatch(loadUser());
    }

    useEffect(()=>{
        if(error){
            window.alert(error);
            dispatch({type: "clearError"})
        }
        if(message){
            window.alert(message);
            dispatch({type: "clearMessage"})
        }
    })

    return(
        loading ? <Loader/> : 
            <div className="center">
                <div className="login">
                    <h1 className="title">Update Info</h1>
                    <br />

                    <form onSubmit={handleUpdate}>

                        <input type="text" name="name" placeholder="Enter Your Name" value={user.name} onChange={handleInputs} required />
                        <input type="email" name="email" placeholder="Enter Your Email" value={user.email} onChange={handleInputs} required />

                        <br />
                        <button type="submit" className="btn">Update</button>
                    </form>
                </div>
            </div>
    );
}

export default UpdateProfile;