const {Schema, model} = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
// const {emailRegex} = require("../constants/regex.constants");
// const PicRandomProfiel = require("../pic/picRandom_profiel");


const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "Email already exist."],
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    country: {
        type: String
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: "Order"
    }],
      jwt_ac_token: {type: String},
      jwt_rf_token: {type: String},
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
};

userSchema.methods.setJwtTokens = function (accessToken, refreshToken) {
    this.jwt_ac_token = accessToken;
    this.jwt_rf_token = refreshToken;
    this.save();
};

userSchema.methods.setAccessToken = function (accessToken) {
    this.jwt_ac_token = accessToken;
    this.save();
};

const User = model("User", userSchema);

module.exports = User;