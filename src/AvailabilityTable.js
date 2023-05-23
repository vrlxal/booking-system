import React, { forwardRef } from 'react';
import './AvailabilityTable.css'; // Import your CSS file

const AvailabilityTable = forwardRef((props, ref) => {
  const columns = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const rows = new Array(7).fill().map(() => new Array(24).fill(0)); // Demo data

  return (
    <table className="availability-table">
      <thead>
        <tr>
          <th>Day / Time</th>
          {Array.from(Array(24).keys()).map(hour =>
            <th key={hour}>{hour.toString().padStart(2, '0')}:00</th>
          )}
        </tr>
      </thead>
      <tbody>
        {rows.map((day, i) =>
          <tr key={i}>
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
