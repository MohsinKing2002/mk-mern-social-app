import {configureStore} from "@reduxjs/toolkit"
import { allUsersReducer, postOfFollowingReducer, userFollowReducer, userPostReducer, userProfileReducer, userReducer } from "./Components/Reducers/User";
import { likeReducer, myPostsReducer } from "./Components/Reducers/Post";

const store = configureStore({
    reducer:{
        user: userReducer,
        postOfFollowing: postOfFollowingReducer,
        allUsers: allUsersReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostReducer,
        userFollow: userFollowReducer
    }
});

export default store;