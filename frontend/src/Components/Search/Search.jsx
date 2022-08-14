import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../Actions/User";
import Loader from "../Loader/Loader";
import User from "../user/User";

const Search = ()=>{

    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.allUsers);

    let [name, setName] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();

        dispatch(getAllUsers(name));
    }

    return loading ? <Loader/> : (
        <div className="center">
            <div className="login">
                <h1 className="title">Search..</h1>
                <br />

                <form onSubmit={handleSubmit}>

                    <input type="text" name="name" placeholder="User Name.." value={name} onChange={(e)=>setName(e.target.value)} required />
                    <br />
                    <button type="submit" className="btn">Search</button>
                </form>
            <br />
                <div className="result">
                   {
                    users && users.map((user)=>(
                        <User 
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    ))
                   }
                </div>
            </div>            
        </div>
    );
}

export default Search;