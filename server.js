const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require("dotenv").config()

const app = express();

app.use(morgan("dev"))

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`API is running on Port ${port}`)
})