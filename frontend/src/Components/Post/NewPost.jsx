import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../Actions/Post";
import { loadUser } from "../Actions/User";

const NewPost = ()=>{

    
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    
    const dispatch = useDispatch();
    const {loading, message, error} = useSelector(state=>state.like);

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        const Reader = new FileReader();

        Reader.onload = ()=>{
            if(Reader.readyState === 2){
                setImage(Reader.result);
            }
        }

        Reader.readAsDataURL(file);
    }

    const submitHandler = async(e)=>{
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
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
    }, [dispatch, message, error]);

    return(
        <div className="center">
            <div className="login">
                <h1 className="title">Create  Post..</h1> <br />
                <form onSubmit={submitHandler}>
                    {image && <img style={{height: "8vh"}} src={image} alt="post" /> }
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                    <input type="text" value={caption} onChange={(e)=>{setCaption(e.target.value)}} placeholder="write your Caption .." />
                    <button disabled={loading} type="submit" className="btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default NewPost;