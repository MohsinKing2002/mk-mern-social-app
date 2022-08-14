const User = require("../models/userSchema");
const Post = require("../models/postSchema")

const cloudinary = require('cloudinary');

//register route
exports.register = async(req, res, next)=>{
    try {
        
        const {name, email, password, avatar} = req.body;
        
        let user = await User.findOne({email});
        if(user){
            return res.status(404).json({
                success: false,
                message: "User already exists !!!!"
            })
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "users_avatar"
        });

        user = await User.create({name, email, password, avatar:{public_id: myCloud.public_id, url: myCloud.secure_url}})

        const token = await user.genarateToken();
    
        res.status(201).cookie("token", token, {
            expires: new Date(Date.now() + 90*24*60*60*1000),
            httpOnly: true
        }).json({
            success: true,
            token,
            message: "User Registered Successfully !!",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })        
    }
}

//log in route
exports.login = async(req, res, next)=>{
    try{

        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password").populate("posts followers following");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found !!!"
            })
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid log in credentials"
            })
        }

        const token = await user.genarateToken();

        //storing token into cookie and sending while logged in
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 90*24*60*60*1000),
            httpOnly: true
        }).json({
            success: true,
            token,
            user
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

//log out
exports.logout = async(req, res)=>{
    try {

        res.status(200).cookie("token", null, {expires: new Date(Date.now()), httpOnly: true}).json({
            success: true,
            message: "User logged out successfully !!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update profile
exports.updateProfile = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);

        const {name, email} = req.body;

        if(name){
            user.name = name;
        }

        if(email){
            user.email = email;
        }

        // user avatar : todo

        await user.save();

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete user
exports.deleteUser = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);

        const userId = user._id;
        const posts = user.posts;
        const followers = user.followers;
        const following = user.following;

        //remove user's avatar from cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.remove();

        //after delete user logout also
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        //delete all the post of the user so that from the post schema it is deleted too
        for(let i = 0; i<posts.length; i++){
            const post = await Post.findById(posts[i]);
            await cloudinary.v2.uploader.destroy(post.image.public_id);
            await post.remove();
        }

        //remove user from followers's following
        for(let i = 0; i< followers.length; i++){
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);

            await follower.save();
        }

        //remove user from following's follower
        for(let i = 0; i< following.length; i++){
            const follows = await User.findById(following[i]);

            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index, 1);

            await follows.save();
        }

        res.status(200).json({
            success: true,
            message: "User Deleted successfully !!"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//profile details
exports.myProfile = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id).populate("posts");

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get other user profile
exports.getUserProfile = async(req, res)=>{
    try {

        const user = await User.findById(req.params.id).populate("posts");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found !!"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get all users
exports.getallUsers = async(req, res)=>{
    try {

        const users = await User.find({
            name: { $regex: req.query.name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//follow user
exports.followUser = async(req, res)=>{
    try {
        //user which i will follow
        const userToFollow = await User.findById(req.params.id);
        //my self
        const user = await User.findById(req.user._id);

        if(!userToFollow){
            return res.status(404).json({
                success: false,
                message: "User not found !!!"
            })
        }

        if(user.following.includes(req.params.id)){
            //deleting from following of myself
            const indexFollowing = user.following.indexOf(req.params.id);
            user.following.splice(indexFollowing, 1);

            //deleting from followers of him
            const indexFollowed = userToFollow.followers.indexOf(req.user._id);
            userToFollow.followers.splice(indexFollowed, 1);

            await user.save();
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User unfollowed successfully !!"
            })
        }
        else{
            //as i followed so in following push that user's id
            user.following.push(req.params.id);
            await user.save();

            // as i followed him so in his follwers push my id
            userToFollow.followers.push(req.user._id);
            await userToFollow.save();

            res.status(200).json({
                success: true,
                message: "User followed successfully !!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        })       
    }
}

//get my posts
exports.getMyPosts = async(req, res) => {
    try {

        const user = await User.findById(req.user._id);
        const posts=[];

        for(let i = 0; i< user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get my posts
exports.getUserPosts = async(req, res) => {
    try {

        const user = await User.findById(req.params.id);
        const posts=[];

        for(let i = 0; i< user.posts.length; i++){
            const post = await Post.findById(user.posts[i]).populate("likes comments.user owner");
            posts.push(post);
        }

        res.status(200).json({
            success: true,
            posts
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}