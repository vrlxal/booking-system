import React, { Fragment, useEffect, useState } from 'react';
import AvailabilityTable from './AvailabilityTable';
import BookingForm from './BookingForm';

// functional component (instead of using the  traditional class method)
function Homepage(props) {
  const [bookings, setBookings] = useState([]);

  const handleSubmit = (formValues) => {
    addBooking(formValues.name, formValues.date, formValues.unitNumber, formValues.startTime, formValues.endTime, formValues.purpose);  
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