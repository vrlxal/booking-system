import React, { Fragment, useContext, useEffect, useState } from 'react';
import AvailabilityTable from './AvailabilityTable';
import BookingForm from './BookingForm';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';

// functional component (instead of using the  traditional class method)
function Homepage() {
  const [bookings, setBookings] = useState([]);
  const { jwtToken } = useContext(UserContext);

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
      {jwtToken !== "" && (<BookingForm></BookingForm>)}
    </Fragment>
  )
}

export default Homepage;