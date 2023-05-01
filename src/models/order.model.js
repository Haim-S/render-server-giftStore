const {Schema, model} = require("mongoose");
// const bcrypt = require("bcrypt");


const orderSchema = new Schema({
    client: { 
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    creatAt: {type: Date, default: Date.now()},
    products: [{
        name: {type: String},
        price: {type: Number},
        quantity: {type: Number},
    }],
    total: {type: Number}

});

const Order = model("Order", orderSchema);

module.exports = Order;