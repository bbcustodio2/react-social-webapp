const router = require("express").Router();
const UserModel = require("../models/userSchema");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.send("Welcome to Auth!");
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    //user exists
    try {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create user
        const user = await new UserModel({
            username: username,
            email: email,
            password: hashedPassword,
        });

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    //check if JSOn is in right format
    if (!email || !password)
        return res.status(400).json({
            errMessage: "Please enter All required fields. ",
        });
    try {
        const existingUser = await UserModel.findOne({ email });
        //check if user exists in db
        if (existingUser) {
            //decrypt hashed password
            const validPassword = await bcrypt.compare(
                password,
                existingUser.password
            );
            if (validPassword) res.status(200).json(existingUser);
            else {
                res.status(400).json({ errorMessage: "Wrong Password" });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
