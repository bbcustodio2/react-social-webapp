const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const postRouter = require("./routes/postRouter");

module.exports = function (app) {
    //middleware
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));

    //homepage
    app.get("/", (req, res) => {
        res.send("Welcome to Homepage!");
    });

    //set up routes
    app.use("/users", userRouter);
    app.use("/auth", authRouter);
    app.use("/posts", postRouter);
};
