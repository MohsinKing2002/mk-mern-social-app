//mainly we will make routers of controller

const express = require('express');
const { createPost, likeAndUnlikePost, deletePost, getPostsOfFollowing, updatePostCaption, addComment, deleteComment, getMyPosts } = require('../controllers/postController');
const {isAuthenticated} = require("../middleware/authenticate");

const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);

router
   .route("/post/:id")
    .get(isAuthenticated, likeAndUnlikePost)
    .put(isAuthenticated, updatePostCaption)
    .delete(isAuthenticated, deletePost)

router.route("/posts").get(isAuthenticated, getPostsOfFollowing);

router.route("/post/comment/:id").put(isAuthenticated, addComment).delete(isAuthenticated, deleteComment);

module.exports = router;