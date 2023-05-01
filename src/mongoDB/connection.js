const mongoose = require("mongoose");

const uri = "mongodb+srv://sabahfamily1111:82wV1ZgosPqVtnL0@cluster0.gggzngf.mongodb.net/GiftShop";


const initialMongoConnection = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(uri).then(()=>{
        console.log("Mongo DB Atlas database connection");
    }).catch((error)=>{
        console.log(error);
    })
};

module.exports = initialMongoConnection;