import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { deleteUser, getMyPosts, logoutUser } from "../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";

const Account = ()=>{

    const dispatch = useDispatch();
    const { user, loading: userLoading } = useSelector((state) => state.user);
    const { errorLike, message } = useSelector(state => state.like);
    const { loading, error, posts } = useSelector(state => state.myPosts);

    
    const handleDelete = async (e)=>{
        await dispatch(deleteUser());
        dispatch({type: "clearError"});
    }

    const logoutHandler = async()=>{
        dispatch(logoutUser());
        await window.alert("User Logged out successfully !!!");
    }

    useEffect(()=>{
        dispatch(getMyPosts());
    }, [dispatch]);


    useEffect(() => {
        if (error) {
            window.alert(error);
            dispatch({ type: "clearError" })
        }
        if (errorLike) {
            window.alert(errorLike);
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" });
        }
    }, [error, errorLike, message, dispatch]);


    return loading === true || userLoading === true ? <Loader/> : ( 
        <div className="account">
            <div className="account_left">
                {
                    posts && posts.length > 0 ? posts.map((post) => (
                        <Post
                            key={post._id}
                            postId={post._id}
                            caption={post.caption}
                            postImage={post.image.url}
                            ownerImage={post.owner.avatar.url}
                            ownerName={post.owner.name}
                            ownerId={post.owner}
                            like={post.likes}
                            comments={post.comments}
                            isAccount={true}
                            isDelete={true}
                        />
                    )) : <h3>No Posts yet !!</h3>
                }
            </div>

            <div className="account_right">
                <div className="home_user">
                    <img style={{height: "10vh"}} src={user.avatar.url} alt={user.name} />
                    <p>{user.name}</p>
                </div>
                <button className="btn"> <h3> Followers : {user.followers.length} </h3> </button> <br />
                <button className="btn"> <h3> Following : {user.following.length} </h3> </button>
                <h3>Posts : {user.posts.length}</h3>
                <button className="btn" onClick={logoutHandler}> Logout </button> <br />
                <NavLink className="link" to="/update/profile">Edit Profile</NavLink> <br />
                <button onClick={handleDelete} className="btn">Delete Profile</button>
            </div>

        </div>
    );
}

export default Account;