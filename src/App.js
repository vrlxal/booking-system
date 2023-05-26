import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import BookingManagement from './BookingManagement';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    if (username && password) {
      // Implement your login logic here
      // For simplicity, we'll use a hard-coded username and password
      const adminUsername = 'admin';
      const adminPassword = 'password';

      // Check if the entered username and password match the admin credentials
      // Replace this with your actual login check logic
      if (username === adminUsername && password === adminPassword) {
        setLoggedIn(true);
        navigate('/booking-management');
      } else {
        alert('Invalid username or password');
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} handleLogin={handleLogin} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/booking-management"
            element={loggedIn ? <BookingManagement /> : <Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

