const User = require("../models/user.model");
const JwtTokenService = require("../services/jwt.service");


exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user) return res.status(404).send({ok: false, message: "Not found"});
        await user.comparePassword(password);

        const accessToken = JwtTokenService.createAccessToken(user._id);
        const refreshToken = JwtTokenService.createRefreshToken(user._id);

        user.setJwtTokens(accessToken, refreshToken);
        const userWithoutPassword = {...user._doc};
        delete userWithoutPassword.password;
        res.send(userWithoutPassword);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.register = async (req, res) => {
    console.log(req.body);
    try {
        await User.create(req.body);
        return res.redirect(307, "/auth/login");
    } catch (error) {
        res.send(error.message);
    }
}

exports.logout = async (req, res) => {
    try {
        const {token} = req.body;
        const user = await User.findOne({jwt_ac_token: token});
        if(!user) return res.status(404).send("not found your key");
        await User.updateOne(user, {jwt_ac_token: ""});
       
        res.send({ok: true, message: "You have been logged out"}); 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

exports.isLogin = async (req, res) => {
    try {
        const token = req.query.ac_token || req.body.ac_token;
        if(!token) return res.status(403).send({ok: false, message: "Token is required"});
        const decoded = JwtTokenService.verifyAccessToken(token);
        const {userId} = decoded;
        const user = await User.findById(userId);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}