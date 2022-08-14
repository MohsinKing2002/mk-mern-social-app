import React from "react";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { AiOutlineLike, AiOutlineComment, AiOutlineDelete } from "react-icons/ai";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { useState } from "react";

import { addCommentOnPost, deletePost, likePost } from "../Actions/Post";
import { getFollowingPosts, getMyPosts, loadUser} from "../Actions/User";
import { useEffect } from "react";

import User from "../user/User";
import CommentCard from "./CommentCard";

const Post = ({
    postId,
    caption, 
    postImage, 
    like=[], 
    comments=[], 
    ownerImage, 
    ownerName, 
    ownerId, 
    isDelete = false, 
    isAccount = false,
})=>{

    const dispatch = useDispatch();

    let [liked, setLiked] = useState(false);

    let [commentVal, setCommentVal] = useState("");

    const addCommentHandler = async (e)=>{
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentVal));

        if (isAccount) {
            dispatch(getMyPosts());
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    const handleLike = async ()=>{
        setLiked(!liked);

        await dispatch(likePost(postId));

        if(isAccount){
            dispatch(getMyPosts());
        }
        else{
            dispatch(getFollowingPosts());
        }
    }

    const deleteHandler = async()=>{
        await dispatch(deletePost(postId));
        await dispatch(getMyPosts());
         dispatch(loadUser());
    }

    const {user} = useSelector(state => state.user);
    useEffect(()=>{
        like.forEach(item => {
            if (item._id === user._id) {
                setLiked(true);
            }
        })
    }, [like, user._id]);

    return(
        <div className="post">
                <AiOutlineDelete onClick={deleteHandler} className="header_icon" style={{marginLeft: "23rem", color: "black"}} cursor="pointer" size={20}/>

            <div className="img_cap">
                <img src={postImage} alt="" />
            </div>

            <div className="postDetails">
                <img style={{height: "6vh", marginRight: "15px"}} src={ownerImage} alt="owner avatar" />
                <NavLink className="link" to={`/user/${ownerId}`} > {ownerName} </NavLink>

                <h3>{caption}</h3>
            </div>

            <div className="like_comments">
                <span style={{cursor: "pointer"}} onClick={() => { document.querySelector(".pop-up-like").style.display = "block" }}
                >
                    {like.length} Likes
                </span>
                <button onClick={handleLike}>
                    { !liked ? <AiOutlineLike  size={25} color="blue" cursor="pointer" style={{marginRight: "12px"}} /> :
                        <BsFillHandThumbsUpFill  size={25} color="blue" cursor="pointer" style={{marginRight: "12px"}} /> 
                    }
                </button>
                <button onClick={() => { document.querySelector(".pop-up-comment").style.display = "block" }}>
                    <AiOutlineComment size={25} color="blue" cursor="pointer" />
                </button>
            </div>

            <div className="pop-up pop-up-like">
                <span className="pop-btn">
                    <h4>Liked by..  </h4>  <button onClick={() => { document.querySelector(".pop-up-like").style.display = "none" }} className="btn">x</button>
                </span>
                    <br />
                    {
                        like.map((item)=>(
                            <User
                                key={item._id}
                                userId={item._id}
                                avatar={item.avatar.url}
                                name={item.name}
                            />
                        ))
                    }

            </div>

            <div className="pop-up pop-up-comment">
                <span className="pop-btn">
                    <h4>Comm by..  </h4>  <button onClick={() => { document.querySelector(".pop-up-comment").style.display = "none" }} className="btn">x</button>
                </span>
                <br />
                <form className="comment_form" onSubmit={addCommentHandler}>
                    <input type="text" value={commentVal} onChange={(e)=>setCommentVal(e.target.value)} placeholder="write your comment" required />

                    <button className="btn" type="submit">Add</button>
                </form>
                <br />

                {
                    comments.length > 0 ? comments.map((item)=>(
                        <CommentCard
                        key={item.user._id}
                        userId = {item.user._id}
                        name = {item.user.name}
                        avatar = {item.user.avatar.url}
                        comment = {item.comment}
                        commentId={item._id}
                        postId={postId}
                        />
                    ))

                    : <p>No comments yet !!</p>
                }
                
            </div> 

        </div>
    );
}

export default Post;