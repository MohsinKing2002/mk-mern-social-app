import React from "react";
import { NavLink } from "react-router-dom";

const User = ({userId, name, avatar})=>{
    return(
        <NavLink to={`/user/${userId}`} className="home_user link">
            <img src={avatar} alt={name} />
            <p>{name}</p>
        </NavLink>
    );
}

export default User;