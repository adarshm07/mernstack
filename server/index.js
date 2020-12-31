require("./db");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var employees = require("./controllers/employees");
var assets = require("./controllers/assets");
var assetsStatus = require("./controllers/assetsStatus");
var user = require("./controllers/user");

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

const PORT = 4000;
app.listen(PORT, () => console.log(`Server started at ${PORT}`));

app.use("/employees", employees);
app.use("/assets", assets);
app.use("/assetsStatus", assetsStatus);
app.use("/user", user);
