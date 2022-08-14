import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteCommentOnPost } from "../Actions/Post";
import { getFollowingPosts, getMyPosts } from "../Actions/User";

const CommentCard = ({
    isAccount,
    userId,
    name,
    avatar,
    comment,
    commentId,
    postId,
})=>{

    const {user} = useSelector(state => state.user);
    const dispatch = useDispatch();

    const deleteCommentHandler = ()=>{
        dispatch(deleteCommentOnPost(postId, commentId));

        if (isAccount) {
            dispatch(getMyPosts());
        }
        else {
            dispatch(getFollowingPosts());
        }
    }

    return(
        <div className="comment_card">
            <NavLink className="link home_user" to={`user/${userId}`} >
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnl1Y376QlahlUSWubHciEiQBe4VM-5V2HcMEgGeDDymQBOWZbo4nrBhq6CgoYitnK3P8&usqp=CAU" alt="" />
                <p>{name}</p>
            </NavLink>
            <p>{comment}</p>
            <button onClick={deleteCommentHandler}>Delete</button>
        </div>
    );
}

export default CommentCard;