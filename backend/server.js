const app = require('./app.js');
const { connectDatabase } = require('./config/database.js');
const cloudinary = require('cloudinary');

//connect with the database
connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at http://localhost:${process.env.PORT}`)
})