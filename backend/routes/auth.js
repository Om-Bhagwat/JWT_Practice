const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
    console.log(req.body);

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res
            .status(400)
            .send({ error: "Email already exists" });

    //hash
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
    });
    try {
        const savedUser = await user.save();
        const token = jwt.sign({
            _id: savedUser._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
        }, process.env.TOKEN_SECRET);
        return res
            .status(200)
            .header("auth-token", token)
            .send({ error: null, token: token });
    } catch (err) {
        console.log(err);
        return res
            .status(400)
            .send({ error: "Not available at the moment", success: "false" });
    }
});

router.post("/login", async (req, res) => {
    console.log(req.body);


    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res
            .status(400)
            .send({ error: "Email or Password is incorrect." });

    //hash
    const ValidPass = await bcrypt.compare(req.body.password, user.password);
    if (!ValidPass)
        return res
            .status(400)
            .send({ error: "Email or Password is incorrect." });

    // token
    const token = jwt.sign({
        _id: user._id,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, process.env.TOKEN_SECRET);
    return res
        .status(200)
        .header("auth-token", token)
        .send({ error: null, token: token });
});

module.exports = router;