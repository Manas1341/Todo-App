const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://manasparatane:tPfUZZidduTrpIcO@cluster0.ouf2xnu.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo =()=>{
    mongoose.connect(mongoURI,{
    }).then(()=>{
        console.log("Connected to Mongo Successfully")
    }).catch((error)=>{
        console.error("Error connecting to  MongoDB",error) 
    })
}
module.exports = connectToMongo;
