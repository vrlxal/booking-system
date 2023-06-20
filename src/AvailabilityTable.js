import React, { forwardRef, useEffect, useState } from 'react';
import './AvailabilityTable.css'; // Import your CSS file

const AvailabilityTable = forwardRef((props, ref) => {
  const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const [rows, setRows] = useState(new Array(7).fill().map(() => new Array(24).fill(0)));
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysUntilMonday = (currentDayOfWeek + 6) % 7; // Days between current day and next Monday

  useEffect(() => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`http://localhost:8080/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let newRows = JSON.parse(JSON.stringify(rows));
        data.forEach(entry => {
          fillArray(entry.start_time, entry.end_time, newRows);
        });
        console.log("New rows: ", newRows);
        setRows(newRows);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function fillArray(start, end, newRows) {
    let startDate = new Date(start);
    let endDate = new Date(end);

    // Get the starting and ending day and hour
    let startDay = (startDate.getDay() + 6) % 7; // Adjusted to have Mon as 0, Tues as 1 etc
    let startHour = startDate.getHours();

    // Get the difference in hours
    let diffInHours = (endDate - startDate) / (1000 * 60 * 60);
    console.log("Diff in hours: ", diffInHours);
    // Loop through the days and hours, updating the array
    let currentDay = startDay;
    let currentHour = startHour;
    for (let i = 0; i < diffInHours; i++) {
      newRows[currentDay][currentHour] = 1;
      currentHour++;
      if (currentHour === 24) { // If we've reached the end of the day
        currentHour = 0;
        currentDay++;
        if (currentDay === 7) { // If we've reached the end of the week
          currentDay = 0;
        }
      }
    }
  }

  return (
    <table className="availability-table">
      <thead>
        <tr>
          <th>Date</th> {/* Moved Date column to the left */}
          <th>Day / Time</th>
          {Array.from(Array(24).keys()).map(hour =>
            <th key={hour}>{hour.toString().padStart(2, '0')}:00</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((day, i) =>
          <tr key={i}>
            <td>{new Date(currentDate.getTime() + (i - daysUntilMonday) * 24 * 60 * 60 * 1000).toLocaleDateString()}</td> {/* Date column */}
            <td>{columns[i]}</td>
            {day.map((hour, j) =>
              <td key={j} className={hour === 1 ? "booked" : "available"}></td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
});

export default AvailabilityTable;
