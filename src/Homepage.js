import React, { Fragment, useEffect, useRef, useState } from 'react';
import TimePicker from './Timepicker';
import AvailabilityTable from './AvailabilityTable';
import Input from './Input';

// functional component (instead of using the  traditional class method)
function Homepage(props) {
  const [bookings, setBookings] = useState([])
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [unitNumber, setUnitNumber] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [purpose, setPurpose] = useState("")

  // refs
  const nameRef = useRef(null);
  const dateRef = useRef(null);
  const unitNumberRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const purposeRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    addBooking(name, date, unitNumber, startTime, endTime, purpose);
  }

  const addBooking = (newName, newDate, newUnitNumber, newStartTime, newEndTime, newPurpose) => {
    let newBooking = {
      id: bookings.length + 1,
      name: newName,
      date: newDate,
      unitNumber: newUnitNumber,
      startTime: newStartTime,
      endTime: newEndTime,
      purpose: newPurpose,
    }

    const newList = bookings.concat(newBooking);

    setBookings(newList);
    setName('');
    setDate('');
    setUnitNumber('');
    setStartTime('');
    setEndTime('');
    setPurpose('');

    nameRef.current.value = "";
    dateRef.current.value = "";
    unitNumberRef.current.value = "";
    startTimeRef.current.value = "";
    endTimeRef.current.value = "";
    purposeRef.current.value = "";
  }

  useEffect(() => {
    console.log("useEffect fired!");
  }, [])

  return (
    <Fragment>
      <h3>Bookings</h3>
      <ul className='list-group'>
        {bookings.map((m) => (
          <li key={m.id} className='list-group-item'>{m.name} {m.date} {m.unitNumber} {m.startTime} {m.endTime} {m.purpose}</li>
        ))}
      </ul>
      <AvailabilityTable></AvailabilityTable>
      <hr />
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

        <input type="submit" value="Submit" className="btn btn-primary"></input>
      </form>
    </Fragment>
  )
}

export default Homepage;