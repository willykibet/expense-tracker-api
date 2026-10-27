const express = require("express");
const molrgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(molrgan("dev"));


app.get("/", (req, res) => {
    res.status(200).json({
        message: " API is Running"
    })
}
)

const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log (`Server is running on port ${PORT}`);
})