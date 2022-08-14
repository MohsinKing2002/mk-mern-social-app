const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

//requiring the env files
if(process.env.NODE_ENV !== "production"){
    const dotenv = require('dotenv');
    dotenv.config({ path: 'backend/config/config.env' });
}

// Using middlewares (must)
app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.urlencoded({limit: '50mb', extended: true})); // or body-parser

// Importint Routes
const user = require("./routes/userRoute");
const post = require("./routes/postRoute");

// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

//production purpose
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});


module.exports = app;