require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");


const routes = require("../routes/index")

app.use(express.urlencoded({extended: false}));
app.use(cors({
    origin: [
        "https://giftstore-client.onrender.com"
    ]
}));
app.use(express.json());

app.use("/", routes);


module.exports = app;


