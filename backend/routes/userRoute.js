const express = require('express');
const { register, login, followUser, logout, updateProfile, deleteUser, myProfile, getUserProfile, getallUsers, getMyPosts, getUserPosts } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authenticate');

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(isAuthenticated, logout);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteUser);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/users").get(isAuthenticated, getallUsers);

router.route("/me/posts").get(isAuthenticated, getMyPosts);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

module.exports = router;