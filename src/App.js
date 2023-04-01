import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

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
const events = [
	{
		title: "",
		startDate: "",
		startTime: "",
		endTime: "",
	},
];

function App() {
	const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
	const [allEvents, setAllEvents] = useState(events);

	function handleAddEvent() {
		for (let i = 0; i < allEvents.length; i++) {
			const d1 = new Date(allEvents[i].start);
			const d2 = new Date(newEvent.start);
			const d3 = new Date(allEvents[i].end);
			const d4 = new Date(newEvent.end);
			/*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

			if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
				alert("CLASH");
				break;
			}
		}

		setAllEvents([...allEvents, newEvent]);
		console.log(events);
		console.log(allEvents);
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
						<Box component="form" noValidate sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="title"
								label="Add title"
								name="title"
								autoFocus
								value={newEvent.title}
								onChange={(e) =>
									setNewEvent({ ...newEvent, title: e.target.value })
								}
							/>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DatePicker"]}>
									<DatePicker
										label="Start Date"
										value={newEvent.startDate}
										defaultValue={dayjs(new Date())}
										onChange={(startDate) =>
											setNewEvent({ ...newEvent, startDate })
										}
									/>
								</DemoContainer>
							</LocalizationProvider>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["TimePicker", "TimePicker"]}>
									<TimePicker
										label="Start Time"
										value={newEvent.startTime}
										defaultValue={dayjs(new Date() + "T15:30")}
										onChange={(startTime) =>
											setNewEvent({ ...newEvent, startTime })
										}
									/>
									<TimePicker
										label="End Time"
										value={newEvent.endTime}
										defaultValue={dayjs(new Date() + "T15:30")}
										onChange={(endTime) =>
											setNewEvent({ ...newEvent, endTime })
										}
									/>
								</DemoContainer>
							</LocalizationProvider>
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
			<h1>Calendar</h1>
			<h2>Add New Event</h2>
			<div>
				<input
					type="text"
					placeholder="Add Title"
					style={{ width: "20%", marginRight: "10px" }}
					value={newEvent.title}
					onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
				/>
				<input
					type="date"
					value={newEvent.start}
					onChange={(start) => setNewEvent({ ...newEvent, start })}
				/>

				<button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
					Add Event
				</button>
			</div>
			<Calendar
				localizer={localizer}
				events={allEvents}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500, margin: "50px" }}
			/>
			<add-to-calendar-button
				style={{ paddingTop: "50%" }}
				name="Event Series"
				dates='[
  {
    "name":"Task 1",
    "description":"This is the first part to check the Add to Calendar Button script at [url]https://add-to-calendar-button.com/[/url]",
    "startDate":"today+3",
    "startTime":"10:15",
    "endTime":"23:30"
  },
  {
    "name":"Task 2",
    "description":"This is the third part to check the Add to Calendar Button script at [url]https://add-to-calendar-button.com/[/url]",
    "startDate":"today+8",
    "startTime":"09:00",
    "endTime":"19:00"
  },
  {
    "name":"Task 3",
    "description":"This is the second part to check the Add to Calendar Button script at [url]https://add-to-calendar-button.com/[/url]",
    "startDate":"today+5",
    "startTime":"11:30",
    "endTime":"20:00"
  }
]'
				timeZone="America/Los_Angeles"
				location="World Wide Web"
				options="Outlook.com"
				lightMode="bodyScheme"
			></add-to-calendar-button>
		</div>
	);
}

export default App;
