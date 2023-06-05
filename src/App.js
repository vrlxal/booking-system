import React, { useCallback, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Homepage from './Homepage';
import Navbar from './Navbar';
import BookingManagement from './BookingManagement';
import RegisterPage from './Register';

function App() {
  const [jwtToken, setJwtToken] = useState("");

  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  const handleLogin = (jwtToken) => {
    setJwtToken(jwtToken);
    toggleRefresh(true); // start refresh token countdown
    navigate('/booking-management');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogout = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    }

    fetch('/logout', requestOptions)
      .catch(error => {
        console.log("Error logging out", error);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false); // stop refresh token countdown
      })
    navigate('/');
  };

  const toggleRefresh = useCallback((status) => {
    if (status) {
      let i = setInterval(() => {
        console.log("Runs every second");
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }

        fetch('/refresh', requestOptions)
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            if (data.access_token) {
              setJwtToken(data.access_token);
            }
          })
          .catch(error => {
            console.log("User is not logged in ", error);
          })
      }, 60000);
      setTickInterval(i);
      console.log("Setting tick interval to: ", i);
    } else {
      console.log("Turning off tick interval", tickInterval);
      setTickInterval(null);
      clearInterval(tickInterval);
    }
  }, [tickInterval])

  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      }

      fetch('/refresh', requestOptions)
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true); // start refresh token countdown
          }
        })
        .catch(error => {
          console.log("User is not logged in ", error);
        })
    }
  }, [jwtToken, toggleRefresh])


  return (
    <div>
      <Navbar handleLogin={handleLogin} handleRegister={handleRegister} handleLogout={handleLogout} jwtToken={jwtToken} /> {/* props expect function, can't directly navigate*/}
      <a className="btn btn-outline-secondary" href="#!" onClick={toggleRefresh}>Toggle clicking</a>
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