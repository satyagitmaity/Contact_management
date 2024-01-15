const express = require("express");
const errorHandler = require("./Middleware/errorHandler");
const dotenv = require("dotenv").config()
const dbConnect = require("./Config/dbConnection")
const port = process.env.PORT || 5000;

const app = express();
dbConnect();
app.use(express.json())
app.use("/api/contacts", require("./Routes/contactRoutes"));
app.use("/api/users", require("./Routes/userRoutes"))
app.use(errorHandler)
module.exports = app.listen(port, () => {
    console.log(`server is running on ${port}`);
})
