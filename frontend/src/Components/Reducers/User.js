import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    isAuthenticated: false,
}

export const userReducer = createReducer(initialState, {
    LoginRequest: (state, action)=>{
        state.loading = true
    },
    LoginSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoginFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },

    LogoutUserRequest: (state)=>{
        state.loading = true;
    },
    LogoutUserSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutUserFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },


    RegisterRequest: (state)=>{
        state.loading = true
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    RegisterFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },

    DeleteUserRequest: (state)=>{
        state.loading = true
    },
    DeleteUserSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
    },
    DeleteUserFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = true;
    },

    UpdateRequest: (state)=>{
        state.loading = true
    },
    UpdateSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    UpdateFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },


    LoadUserRequest: (state, action)=>{
        state.loading = true
    },
    LoadUserSuccess: (state, action)=>{
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    LoadUserFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },

    clearErrors: (state, action) => {
        state.error = null;
    },
});

export const postOfFollowingReducer = createReducer(initialState, {
    postOfFollowingRequest: (state, action)=>{
        state.loading = true;
    },

    postOfFollowingSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },

    postOfFollowingFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state, action)=>{
        state.error = null;
    },
})

export const allUsersReducer = createReducer(initialState, {
    allUsersRequest: (state, action)=>{
        state.loading = true
    },

    allUsersSuccess: (state, action)=>{
        state.loading = false;
        state.users = action.payload
    },

    allUsersFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
    },

    clearErrors: (state, action)=>{
        state.error = null
    }
})

export const userProfileReducer = createReducer(initialState, {
    UserProfileRequest: (state) => {
        state.loading = true
    },
    UserProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
    },
    UserProfileFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },
    clearErrors: (state, action) => {
        state.error = null;
    },
})

export const userPostReducer = createReducer(initialState, {
    UserPostsRequest: (state) => {
        state.loading = true
    },
    UserPostsSuccess: (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.isAuthenticated = false;
    },
    UserPostsFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
        state.isAuthenticated = false;
    },
    clearErrors: (state, action) => {
        state.error = null;
    },
})

export const userFollowReducer = createReducer(initialState, {
    FollowUserRequest: (state)=>{
        state.loading = true;
    },
    FollowUserSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    FollowUserFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearErrors: (state)=>{
        state.error = null;
    }
})