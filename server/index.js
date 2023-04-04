const express = require("express");
const connectDB = require("./config/db");
const app = express();
var cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello world!"));

// Connect Database
connectDB();

const timesheetRoutes = require("./timesheet");
app.use("/timesheet", timesheetRoutes);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
