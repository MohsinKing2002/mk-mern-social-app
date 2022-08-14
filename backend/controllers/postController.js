//mainly we will make functions in controller

const Post = require("../models/postSchema");
const User = require("../models/userSchema");

const cloudinary = require('cloudinary');

//create a post
exports.createPost = async(req, res)=>{
    try {
        
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "posts"
        })

        const newPostData = {
            caption: req.body.caption,
            image:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user._id
        }

        const post = await Post.create(newPostData);

        //push the post into userschema's posts array
        const user = await User.findById(req.user._id);
        user.posts.unshift(post._id);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Post created successfully !!",
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
}

//like and unlike a post
exports.likeAndUnlikePost = async(req, res)=>{
    try{

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({message: "post not found !!"})
        }

        //if already liked and clicked then delete like
        if(post.likes.includes(req.user._id)){

            const index = post.likes.indexOf(req.user._id);
            
            post.likes.splice(index, 1);

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Post Unliked !!"
            })

        }
        else{

            //if not liked already then liked it
            post.likes.push(req.user._id);

            await post.save();

            res.status(200).json({
                success: true,
                message: "Post Liked !!!"
            })

        }

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete a post
exports.deletePost = async(req, res)=>{
    try {
        
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found !!!"
            })
        }

        //delete the post if you're the author
        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success: false,
                message: "unathorized !!"
            })
        }

        //delete image from cloudinary too
        await cloudinary.v2.uploader.destroy(post.image.public_id);

        await post.remove();

        // now delete the post from the user's posts array
        const user = await User.findById(req.user._id);

        //find the index of the post 
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Post deleted"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
}

//update post caption
exports.updatePostCaption = async(req, res)=>{
    try {

        const post = await Post.findById(req.params.id);

        const {caption} = req.body;

        if(post.owner.toString() !== req.user._id.toString()){
            return res.status(401).json({
                success: false,
                message: "Unathorized !!"
            })
        }

        if(caption){
            post.caption = caption;
        }

        await post.save();

        res.status(200).json({
            success: true,
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get the post of the following user
exports.getPostsOfFollowing = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);

        const posts = await Post.find({
            owner:{
                $in: user.following
            }
        }).populate("owner likes comments.user")

        res.status(200).json({
            success: true,
            posts: posts.reverse(),
        })        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//add comments in post
exports.addComment = async(req, res)=>{
    try {

        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        let existsIndex = -1;

        //checking if comment already exist then update the comment
        post.comments.forEach((item, index) =>{
            if(item.user.toString() === req.user._id.toString()){
                existsIndex = index;
            }
        })

        if (existsIndex != -1){
            post.comments[existsIndex].comment = req.body.comment;

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Comment updated successfully !"
            })
        }
        else{
            post.comments.push({
                user: req.user._id,
                comment: req.body.comment
            })

            await post.save();

            return res.status(200).json({
                success: true,
                message: "Comment added successfully"
            })
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete comments 
exports.deleteComment = async(req, res)=>{
    try {

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found !!"
            })
        }

        //checking if owner wants to delete
        if(post.owner.toString() === req.user._id.toString()){
            if(req.body.commentId != undefined){    
                post.comments.forEach((item, index)=>{
                    if(item._id.toString() === req.body.commentId.toString()){
                        return post.comments.splice(index, 1);
                    }
                })
            }
            else{
                return res.status(400).json({
                    success: false,
                    message: "Comment id must be provided"
                })
            }

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Selected comment has deleted!!"
            })
        }
        else{
            post.comments.forEach((item, index)=>{
                if(item.user.toString() === req.user._id.toString()){
                    return post.comments.splice(index, 1);
                }
            })

            await post.save();
            return res.status(200).json({
                success: true,
                message: "Your comment has deleted !!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}