const router = require("express").Router();
const authRoutes = require("./auth.routes");
const orderRoutes = require("./orders.routes");


router.use("/auth", authRoutes);
router.use("/order", orderRoutes);

router.all("*", (req, res)=> {
    res.status(404).send({error: "not found"});
});

module.exports = router;