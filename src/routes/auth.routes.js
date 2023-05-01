const router = require("express").Router();
const authController = require("../controllers/auth.controllers");


router.post("/login", authController.login);
router.post("/register", authController.register);
router.delete("/logout", authController.logout);
router.post("/isLogin", authController.isLogin);


module.exports = router;