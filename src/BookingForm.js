import React, { useRef, useState } from "react";
import Input from "./Input";
import TimePicker from "./Timepicker";

const BookingForm = ({ handleSubmit }) => {
    const nameRef = useRef();
    const dateRef = useRef();
    const unitNumberRef = useRef();
    const startTimeRef = useRef();
    const endTimeRef = useRef();
    const purposeRef = useRef();

    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [unitNumber, setUnitNumber] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [purpose, setPurpose] = useState("");

    return (
        <form autoComplete='off' onSubmit={handleSubmit}>
            <Input
                title="Name"
                type="text"
                id="name"
                autoComplete="name"
                ref={nameRef}
                onChange={(event) => setName(event.target.value)}
            >
            </Input>

            <Input
                title="Date of requested booking"
                type="date"
                id="date"
                autoComplete="date"
                ref={dateRef}
                onChange={(event) => setDate(event.target.value)}
            >
            </Input>

            <Input
                title="Unit Number"
                type="text"
                id="unit-number"
                autoComplete="unit-number"
                ref={unitNumberRef}
                onChange={(event) => setUnitNumber(event.target.value)}
            >
            </Input>

            <TimePicker
                title="Start Time"
                id="start-time"
                ref={startTimeRef}
                onChange={(date) => {
                    console.log("Start time: ", date)
                    setStartTime(date.$H)
                }}
            />

            <TimePicker
                title="End Time"
                id="end-time"
                ref={endTimeRef}
                onChange={(date) => {
                    setEndTime(date.$H)
                }}
            />

            <Input
                title="Purpose"
                type="text"
                id="purpose"
                autoComplete="purpose"
                ref={purposeRef}
                onChange={(event) => setPurpose(event.target.value)}
            >
            </Input>

            <input type="submit" value="Submit" className="btn btn-primary mb-3"></input>
        </form>
    );
};

export default BookingForm;
