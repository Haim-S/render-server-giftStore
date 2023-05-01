const jwt = require("jsonwebtoken");

const jwtConfig = {
    ac_secret: process.env.JWT_AC_TOKEN_SECRET,
    rf_secret: process.env.JWT_RF_TOKEN_SECRET,
};

const createAccessToken = (userId) => {
    try {
        const token = jwt.sign({userId}, jwtConfig.ac_secret, {
            expiresIn: '30m',
        })
        return token;
    } catch (error) {
        console.log(error);
        throw new error.message
        
    }
};

const createRefreshToken = (userId) => {
    try {
        const token = jwt.sign({userId}, jwtConfig.rf_secret, {
            expiresIn: '30d',
        })
        return token;
    } catch (error) {
        console.log(error);
        throw error.message;
    }
}

const verifyAccessToken = (token)=> {
    try {
        const decoded = jwt.verify(token, jwtConfig.ac_secret);
        return decoded;
    } catch (error) {
        console.log(error);
        throw new error.message;
    }
};

module.exports = {createAccessToken, createRefreshToken, verifyAccessToken};