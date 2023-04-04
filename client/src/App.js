import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "add-to-calendar-button";
import "./App.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Moment from "moment";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "./dbConnect.js";
import axios from "axios";
const locales = {
	"en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
const theme = createTheme();

function App() {
	const [startDate, setStartDate] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [name, setName] = useState("");
	const [desc, setDesc] = useState("");
	const [slot, setSlot] = useState([]);
	async function handleAddEvent(event) {
		event.preventDefault();
		let events = {
			name: name,
			description: desc,
			startDate: Moment(new Date(startDate["$d"])).format("YYYY-MM-DD"),
			startTime: Moment(new Date(startTime["$d"])).format("HH:mm"),
			endTime: Moment(new Date(endTime["$d"])).format("HH:mm"),
		};
		console.log(events);
		await axios.post("http://localhost:8082/timesheet", events).then((res) => {
			console.log(res.data);
			getSlots();
		});
	}
	useEffect(() => {
		getSlots();
		console.log(slot);
	}, []);

	async function getSlots() {
		await axios.get("http://localhost:8082/timesheet").then((res) => {
			//console.log(res.data);
			setSlot(res.data);
		});
	}

	function formatDate(slots) {
		let timeSlot = {
			title: slots["name"],
			start: slots["startDate"] + "T" + slots["startTime"] + ":00:000Z",
			end: slots["startDate"] + "T" + slots["startTime"] + ":00:000Z",
		};
		console.log(timeSlot);
		return timeSlot;
	}

	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Container component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography component="h1" variant="h5">
							Add New Event
						</Typography>
						<Box
							component="form"
							onSubmit={handleAddEvent}
							noValidate
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="name"
								label="Add name"
								name="name"
								autoFocus
								onChange={(e) => setName(e.target.value)}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										label="Start Date"
										defaultValue={dayjs(new Date())}
										value={startDate}
										onChange={(startDate) => setStartDate(startDate)}
									/>
								</DemoContainer>
							</LocalizationProvider>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["TimePicker", "TimePicker"]}>
									<TimePicker
										label="Start Time"
										defaultValue={dayjs(new Date() + "T15:30")}
										value={startTime}
										onChange={(startTime) => setStartTime(startTime)}
									/>
									<TimePicker
										label="End Time"
										defaultValue={dayjs(new Date() + "T15:30")}
										value={endTime}
										onChange={(endTime) => setEndTime(endTime)}
									/>
								</DemoContainer>
							</LocalizationProvider>
							<TextField
								margin="normal"
								required
								fullWidth
								id="description"
								label="Add Description"
								name="description"
								autoFocus
								onChange={(e) => setDesc(e.target.value)}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
								onClick={handleAddEvent}
							>
								Add Event
							</Button>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>

			{
				<Calendar
					localizer={localizer}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500, margin: "50px" }}
				/>
			}
			<add-to-calendar-button
				style={{ paddingTop: "50%" }}
				name="Event Series"
				dates={JSON.stringify(slot)}
				timeZone="America/Halifax"
				location="World Wide Web"
				options="Outlook.com"
				lightMode="bodyScheme"
			></add-to-calendar-button>
		</div>
	);
}

export default App;
