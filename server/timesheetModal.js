const mongoose = require("mongoose");

const TimesheetSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	startDate: {
		type: String,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	endTime: {
		type: String,
	},
});

module.exports = Timesheet = mongoose.model("timesheet", TimesheetSchema);
