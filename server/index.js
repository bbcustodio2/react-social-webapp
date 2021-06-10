//starting file of the backend
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;
const app = express();
//connect db
require("./db")();
//routes and middleware
require("./routes")(app);

//starts listening in PORT 5000
app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`);
});
