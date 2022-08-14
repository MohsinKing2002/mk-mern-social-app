import axios from "axios"

//register user
export const registerUser = (name, email, password, avatar)=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "RegisterRequest"
        })

        const {data} = await axios.post(`/api/v1/register`, {
            name, email, password, avatar
        },{
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "RegisterSuccess",
            user: data.user,
            message: data.message
        })

    } catch (error) {
        dispatch({
            type: "RegisterFailer",
            payload: error.response.data.message
        })        
    }
}

//log in 
export const loginUser = (email, password)=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "LoginRequest"
        })

        const {data} = await axios.post("/api/v1/login", {email, password}, {
            headers:{
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "LoginSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "LoginFailer",
            payload: error.response.data.message
        })    
    }
}

//update profile
export const updateUser = (name, email)=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "UpdateRequest"
        })

        const {data} = await axios.put(`/api/v1/update/profile`, {
            name, email
        },{
            headers: {
                "Content-Type": "application/json"
            }
        })

        dispatch({
            type: "UpdateSuccess",
            user: data.user
        })

    } catch (error) {
        dispatch({
            type: "UpdateFailer",
            payload: error.response.data.message
        })        
    }
}

//log out 
export const logoutUser = () => async (dispatch) => {
    try {

        dispatch({
            type: "LogoutUserRequest"
        })

        const { data } = await axios.get("/api/v1/logout");

        dispatch({
            type: "LogoutUserSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "LogoutUserFailer",
            payload: error.response.data.message
        })
    }
}

//delete user
export const deleteUser = ()=>async(dispatch)=>{
    try {
        
        dispatch({
            type: "DeleteUserRequest"
        })

        const {data} = await axios.delete(`/api/v1/delete/me`);

        dispatch({
            type: "DeleteUserSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "DeleteUserFailer",
            payload: error.response.data.message
        })        
    }
}

//load user
export const loadUser = ()=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "LoadUserRequest"
        })

        const {data} = await axios.get("/api/v1/me");

        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        })

    } catch (error) {
        dispatch({
            type: "LoadUserFailer",
            payload: error.response.data.message
        })        
    }
}

//register user

//show posts of following user
export const getFollowingPosts = ()=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "postOfFollowingRequest",
        })

        const {data} = await axios.get("/api/v1/posts");

        dispatch({
            type: "postOfFollowingSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "postOfFollowingFailer",
            payload: error.response.data.message
        })        
    }
}

//get all users
export const getAllUsers = (name="")=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "allUsersRequest"
        })

        const {data} = await axios.get(`/api/v1/users?name=${name}`);

        dispatch({
            type: "allUsersSuccess",
            payload: data.users
        })

    } catch (error) {
        dispatch({
            type: "allUsersFailer",
            payload: error.response.data.message
        })        
    }
}

//get my posts
export const getMyPosts = ()=> async(dispatch)=>{
    try {

        dispatch({
            type: "myPostsRequest"
        })

        const { data } = await axios.get(`/api/v1/me/posts`);

        dispatch({
            type: "myPostsSuccess",
            payload: data.posts
        })
        
    } catch (error) {
        dispatch({
            type: "myPostsFailer",
            payload: error.response.data.message
        })        
    }
}

//get user posts
export const getUserPosts = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "UserPostsRequest"
        })

        const { data } = await axios.get(`/api/v1/userposts/${id}`);

        dispatch({
            type: "UserPostsSuccess",
            payload: data.posts
        })

    } catch (error) {
        dispatch({
            type: "UserPostsFailer",
            payload: error.response.data.message
        })
    }
}

//get user posts
export const getUserProfile = (id) => async (dispatch) => {
    try {

        dispatch({
            type: "UserProfileRequest"
        })

        const { data } = await axios.get(`/api/v1/user/${id}`);

        dispatch({
            type: "UserProfileSuccess",
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: "UserProfileFailer",
            payload: error.response.data.message
        })
    }
}

//follow a user
export const followUser = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "FollowUserRequest"
        })

        const {data} = await axios.get(`/api/v1/follow/${id}`);

        dispatch({
            type: "FollowUserSuccess",
            payload: data.message 
        })
        
    } catch (error) {
        dispatch({
            type: "FollowUserFailer",
            payload: error.response.data.message
        })        
    }
}