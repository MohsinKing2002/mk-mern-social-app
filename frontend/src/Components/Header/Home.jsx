import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import User from "../user/User";
import { getAllUsers, getFollowingPosts } from "../Actions/User"
import Loader from "../Loader/Loader";

const Home = ()=>{

    const dispatch = useDispatch();

    const {loading, posts, error} = useSelector(state=> state.postOfFollowing);

    const { errorLike, message } = useSelector(state => state.like);

   const { users, loading: usersLoading } = useSelector(state => state.allUsers);

    useEffect(()=>{
        dispatch(getFollowingPosts());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if(error){
            window.alert(error);
            dispatch({type: "clearError"})
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

    return(
        loading === true || usersLoading === true ? <Loader /> :
            <div className="home">
                <div className="home_left">

                {
                   posts && posts.length > 0 ? posts.map((post)=>(
                       <Post
                        key={post._id}

                        postId={post._id}
                       caption={post.caption}
                       postImage={post.image.url}
                       ownerImage={post.owner.avatar.url}
                       ownerName={post.owner.name}
                       ownerId={post.owner}
                        like= {post.likes}
                       comments = {post.comments}
                       />
                   )) : <h3>No Posts yet !!</h3>
                }

                </div>
                <div className="home_right">
                    <h1 className="title">You May Know..</h1>
                    <br />

                    {
                        users && users.length > 0 ? users.map((user)=>(
                            <User
                                key={user._id}
                                userId={user._id}
                                avatar={user.avatar.url}
                                name={user.name}
                            />
                        )) : <h3> No users found !!</h3>
                    }

                </div>
            </div>
    );
}

export default Home;