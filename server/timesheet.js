// routes/api/books.js
const express = require("express");
const router = express.Router();

// Load Book model
const Timesheet = require("./timesheetModal");

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
	Timesheet.find()
		.then((slots) => res.json(slots))
		.catch((err) => res.status(404).json({ noslotsfound: "No Slots found" }));
});

// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
	console.log(req.body);
	Timesheet.create(req.body)
		.then((slots) => res.json({ msg: "Timesheet added successfully" }))
		.catch((err) => res.status(400).json({ error: "Unable to add this slot" }));
});

module.exports = router;
