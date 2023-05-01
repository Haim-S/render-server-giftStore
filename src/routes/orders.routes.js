const router = require("express").Router();
const ordersController = require("../controllers/order.controllers");


router.get("/all", ordersController.getAll);
router.post("/my-orders", ordersController.getAllById);
router.post("/create", ordersController.createOrder);
router.put("/update/:id", ordersController.updateOrder);
router.post("/delete/:id", ordersController.deleteOrder);

module.exports = router;