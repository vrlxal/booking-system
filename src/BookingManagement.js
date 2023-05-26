import React, { Fragment } from 'react';

function BookingManagement() {
  const bookings = [];

  return (
    <Fragment>
      <div className='bookings-container' style={{ margin: '15px' }}>
        <h3>Bookings</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Request</th>
              <th>Unit</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.unit}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default BookingManagement;
