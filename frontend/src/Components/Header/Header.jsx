import React from "react";

import { AiOutlineFolderAdd, AiOutlineFileSearch, AiOutlineUser} from "react-icons/ai";
import {NavLink} from 'react-router-dom';

const Header = ()=>{
    return(
        <div className="header">
            <NavLink to="/">
                <img className="logo" src="https://png.pngitem.com/pimgs/s/583-5839564_instagram-face-book-socialmedia-web-enter-logo-social.png" alt="" />
            </NavLink>

            <NavLink to="/newpost">
                <AiOutlineFolderAdd className="header_icon"/>
            </NavLink>

            <NavLink to="/search">
                <AiOutlineFileSearch className="header_icon" />
            </NavLink>

            <NavLink to="/account">
                <AiOutlineUser className="header_icon" />
            </NavLink>
        </div>
    )
}

export default Header;