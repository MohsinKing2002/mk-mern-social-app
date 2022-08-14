import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import {followUser, getUserPosts, getUserProfile } from "../Actions/User";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";

const Profile = () => {

    const params = useParams();

    const [follow, setFollow] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const dispatch = useDispatch();
    const { user, loading: userLoading } = useSelector((state) => state.userProfile);
    const { user: me } = useSelector((state) => state.user);
    const { errorLike, message } = useSelector(state => state.like);
    const { posts, loading, error } = useSelector((state) => state.userPosts);
    const { message: followMessage } = useSelector(state => state.userFollow);

    const handleFollow = async()=>{
        setFollow(!follow);

        await dispatch(followUser(params.id));
    }

    useEffect(() => {
        dispatch(getUserProfile(params.id));
        dispatch(getUserPosts(params.id));

    }, [dispatch, params.id]);

    useEffect(()=>{
        if (me._id === params.id) {
            setMyProfile(true);
        }

        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollow(true);
                }
                else{
                    setFollow(false);
                }
            })
        }
    }, [user, params.id, me._id]);

    useEffect(() => {
        if(followMessage){
            window.alert(followMessage);
            dispatch({ type: "clearError"})
        }
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
    }, [followMessage, error, errorLike, message, dispatch]);


    return loading === true || userLoading === true ? <Loader /> : (
        <div className="account">
            <div className="account_left">
                {
                    posts && posts.length > 0 ? posts.map((item) => (
                        <Post
                            key={item._id}
                            postId={item._id}
                            caption={item.caption}
                            postImage={item.image.url}
                            ownerImage={item.owner.avatar.url}
                            ownerName={item.owner.name}
                            ownerId={item.owner}
                            like={item.likes}
                            comments={item.comments}
                        />
                    )) : <h3>User doesn't have any Posts !!</h3>
                }
            </div>

            <div className="account_right">
                <div className="home_user">
                    <img style={{ height: "10vh" }} src={user && user.avatar.url} alt={user && user.name} />
                    <p>{user && user.name}</p>
                </div>
                {
                    myProfile ? null : <button onClick={handleFollow} className="btn">
                        { follow ? "Unfollow": "Follow" } User
                    </button>
                } <br />
                <button className="btn"> <h3> Followers : {user && user.followers.length} </h3> </button> <br />
                <button className="btn"> <h3> Following : {user && user.following.length} </h3> </button>
                <h3>Posts : {user && user.posts.length}</h3>
            </div>

        </div>
    );
}

export default Profile;