const mongoose = require('mongoose');

exports.connectDatabase = ()=>{
    mongoose.connect(process.env.DB)
    .then(res => console.log(`Database connected : ${res.connection.host}`))
    .catch(err => console.log(err))
}