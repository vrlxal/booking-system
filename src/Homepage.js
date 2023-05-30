import React, { Fragment, useEffect, useRef, useState } from 'react';
import AvailabilityTable from './AvailabilityTable';
import Input from './Input';
import BookingForm from './BookingForm';

// functional component (instead of using the  traditional class method)
function Homepage(props) {
  const [bookings, setBookings] = useState([])
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [unitNumber, setUnitNumber] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [purpose, setPurpose] = useState("")


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

  }

  useEffect(() => {
    console.log("useEffect fired!");
  }, [])

  return (
    <Fragment>
      <div style={{ margin: '15px' }}>
        <h3>Bookings</h3>
        <ul className='list-group'>
          {bookings.map((m) => (
            <li key={m.id} className='list-group-item'>{m.name} {m.date} {m.unitNumber} {m.startTime} {m.endTime} {m.purpose}</li>
          ))}
        </ul>
      </div>
      <AvailabilityTable></AvailabilityTable>
      <hr />
      <BookingForm handleSubmit={handleSubmit}></BookingForm>
    </Fragment>
  )
}

export default Homepage;