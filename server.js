const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const morgan = require('morgan')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/auth");

require("dotenv").config()

const app = express();

mongoose
    .connect(process.env.DATABASE_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("DB is Connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.use(morgan("dev"))
app.use(bodyParser.json({limit: "5mb", type: "application/json"}));
// app.use(cors({ origin: process.env.CLIENT_URL }))

app.use("/api", authRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`API is running on Port ${port}`)
})