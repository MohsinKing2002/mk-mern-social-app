const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"]
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: [true, "Email already exists !!"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    posts:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    ],
    followers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]

})

//hash the password before save
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

//compare hashed and user enterd password
userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

// genarate auth token
userSchema.methods.genarateToken = function(){
    return jwt.sign({_id: this._id}, process.env.SECRET_KEY);
}


module.exports = mongoose.model("User", userSchema);