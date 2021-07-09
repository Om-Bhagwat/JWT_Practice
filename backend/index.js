const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoute = require("./routes/auth");
const dummyRoute = require("./routes/dummy");

//DB
app.use(cors());
dotenv.config();
console.log(process.env.DB_CONNECT)

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to DB!");
    }
)

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/dummy", dummyRoute);

app.listen(3002, () => {
    console.log("Server Up and Running.");
});