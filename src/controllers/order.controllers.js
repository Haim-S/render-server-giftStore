const Order = require("../models/order.model");
// const SELECT = require("../constant/orderClient");

exports.getAll = async (req, res)=> {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.getAllById = async (req, res)=> {
    try {
    //   console.log(req.body);
            const myOrders = await Order.find({client: req.body.client});
            res.status(200).send(myOrders);
       
       
    } catch (error) {
        
    }
};

exports.createOrder = async (req, res)=> {
console.log(req.body);
    try {
        await Order.create(req.body);
        // res.status(201).json({
        //     success: true,
        //     data: await Order.find()
        // })
        res.status(201).redirect(307, "/order/my-orders");
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.updateOrder = async(req, res) => {
    try {
        await Order.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
        });
        res.status(200).redirect(307, "/order/my-orders");
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.deleteOrder = async (req, res)=>{
    try {
        await Order.deleteOne({_id: req.params.id});
        res.status(200).redirect(307, "/order/my-orders");
    } catch (error) {
        res.status(400).send(error);
    }
}