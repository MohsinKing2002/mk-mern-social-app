import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const likeReducer = createReducer(initialState, {
    likeRequest: (state, action)=>{
        state.loading = true;
    },

    likeSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },

    likeFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },

    addCommentRequest: (state, action)=>{
        state.loading = true;
    },
    addCommentSuccess: (state, action)=>{
        state.loading = false;
        state.message = action.payload;
    },
    addCommentFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload
    },

    deleteCommentRequest: (state, action) => {
        state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCommentFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },    

    newPostRequest: (state, action) => {
        state.loading = true;
    },
    newPostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    newPostFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    updateCaptionRequest: (state, action) => {
        state.loading = true;
    },
    updateCaptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateCaptionFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    deletePostRequest: (state, action) => {
        state.loading = true;
    },
    deletePostSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deletePostFailer: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },

    clearError: (state) => {
        state.error = null;
    },

    clearMessage: (state) => {
        state.message = null;
    },
})

export const myPostsReducer = createReducer(initialState, {
    myPostsRequest: (state)=>{
        state.loading = true;
    },
    myPostsSuccess: (state, action)=>{
        state.loading = false;
        state.posts = action.payload;
    },
    myPostsFailer: (state, action)=>{
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state)=>{
        state.error = null;
    }
})

