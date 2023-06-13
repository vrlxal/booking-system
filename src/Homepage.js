import React, { Fragment, useEffect, useState } from 'react';
import AvailabilityTable from './AvailabilityTable';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';

// functional component (instead of using the  traditional class method)
function Homepage({jwtToken}) {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (newName, newDate, newUnitNumber, newStartTime, newEndTime, newPurpose) => {
    let newBooking = {
      name: newName,
      date: newDate,
      unit_number: newUnitNumber,
      start_time: newStartTime,
      end_time: newEndTime,
      purpose: newPurpose,
      username: "admin",
      facility: "MPSH",
    }
    // validation passed, submit
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);

    // adding movie
    let method = "PUT";

    const requestBody = newBooking;

    let requestOptions = {
      body: JSON.stringify(requestBody),
      method: method,
      headers: headers,
      credentials: "include",
    }

    console.log("BOOKING:", newBooking)
    console.log("JWT token: ", jwtToken)

    fetch(`/admin/addBooking`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          navigate("/")
        }
      })
      .catch(err => {
        alert("Error: " + err);
        console.log(err);
      })
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