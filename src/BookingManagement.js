import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './App';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const { jwtToken, username } = useContext(UserContext);

  const navigate = useNavigate();

  // Hook
  useEffect(() => {
    if (jwtToken === "") {
      console.log("NO JWT TOKEN")
      navigate("/");
      return
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + jwtToken);
    headers.append("Username", username);

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`/admin/booking-management`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);

        console.log("Bookings: ", data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [jwtToken, navigate])

  return (
    <Fragment>
      <div className='bookings-container' style={{ margin: '15px' }}>
        <h3>Bookings</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Unit</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>End Date</th>
              <th>End Time</th>
              <th>Facility</th>
              <th>Purpose</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              bookings ? bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.username}</td>
                  <td>{booking.name}</td>
                  <td>{booking.unit_number}</td>
                  <td>{new Date(booking.start_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</td>
                  <td>{new Date(booking.start_time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</td>
                  <td>{new Date(booking.end_date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}</td>
                  <td>{new Date(booking.end_time).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}</td>
                  <td>{booking.facility}</td>
                  <td>{booking.purpose}</td>
                </tr>
              )) : null
            }
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default BookingManagement;
