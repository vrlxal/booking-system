import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

const BookingManagement = ({ jwtToken }) => {
  const [bookings, setBookings] = useState([]);
  // const { jwtToken } = useOutletContext(); // from App()
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

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`/admin/booking-management`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
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
              <th>Name</th>
              <th>Date of Request</th>
              <th>Unit</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {/* {bookings.map((booking, index) => (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.date}</td>
                <td>{booking.unit}</td>
                <td>{booking.startTime}</td>
                <td>{booking.endTime}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default BookingManagement;
