const mongoose = require("mongoose");

module.exports = () => {
    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        },
        (err) => {
            if (err) return console.error(err);
        }
    );

    //checks if database is connected to backend
    mongoose.connection.on("connected", () => {
        console.log("Database CONNECTED! ");
    });
};
