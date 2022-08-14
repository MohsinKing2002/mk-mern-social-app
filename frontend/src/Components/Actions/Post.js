import axios from "axios";

export const likePost = (id) => async(dispatch)=>{
    try {
        
        dispatch({
            type: "likeRequest"
        })

        const {data} = await axios.get(`/api/v1/post/${id}`);

        dispatch({
            type: "likeSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "likeFailer",
            payload: error.response.data.message
        })        
    }
}

export const addCommentOnPost = (id, comment)=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "addCommentRequest",
        })
        
        const { data } = await axios.put(`/api/v1/post/comment/${id}`, {
            comment},
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )

        dispatch({
            type: "addCommentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "addCommentFailer",
            payload: error.response.data.message
        })        
    }
}

export const deleteCommentOnPost = (id, commentId)=> async(dispatch)=>{
    try {
        
        dispatch({
            type: "deleteCommentRequest",
        })
        
        const { data } = await axios.delete(`/api/v1/post/comment/${id}`,{
            data: {commentId}
        })

        dispatch({
            type: "deleteCommentSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteCommentFailer",
            payload: error.response.data.message
        })        
    }
}

export const createNewPost = (caption, image)=>async(dispatch)=>{
    try {

        dispatch({
            type: "newPostRequest"
        })

        const { data } = await axios.post(`/api/v1/post/upload`, {
            caption, image,
        },{
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: "newPostSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "newPostFailer",
            payload: error.response.data.message
        })        
    }
}

export const updatePost = (caption, id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "updateCaptionRequest"
        })

        const { data } = await axios.put(`/api/v1/post/${id}`, {
            caption,
        },{
            headers: {
                "Content-Type": "application/json"
            }
        });

        dispatch({
            type: "updateCaptionSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "updateCaptionFailer",
            payload: error.response.data.message
        })        
    }
}

export const deletePost = (id)=>async(dispatch)=>{
    try {

        dispatch({
            type: "deltePostRequest"
        })

        const { data } = await axios.delete(`/api/v1/post/${id}`);

        dispatch({
            type: "deletePostSuccess",
            payload: data.message
        })
        
    } catch (error) {
        dispatch({
            type: "deletePostFailer",
            payload: error.response.data.message
        })        
    }
}

