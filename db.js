
const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@cluster0.3ofpc.mongodb.net/HLI' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successful')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose