import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import BookingManagement from './BookingManagement';
import RegisterPage from './Register';

function App() {
  const [jwtToken, setJwtToken] = useState("");
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
        setJwtToken("true");
        navigate('/booking-management');
      } else {
        alert('Invalid username or password');
      }
    } else {
      alert('Please enter both username and password');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
  };


  return (
    <div>
      <Navbar handleLogin={handleLogin} handleRegister={handleRegister} handleLogout={handleLogout} jwtToken={jwtToken} /> {/* props expect function, can't directly navigate*/}
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/booking-management"
            element={jwtToken !== "" ? <BookingManagement /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

