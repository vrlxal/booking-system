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
  const [loading, setLoading] = useState(true);

  const handleLogin = (jwtToken) => {
    setJwtToken(jwtToken);
    console.log("JWT TOKEN from login: ", jwtToken)
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
        console.log("Runs every 10 mins");
        const requestOptions = {
          method: "GET",
          credentials: "include",
        }

        fetch('/refresh', requestOptions)
          .then((response) => {
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
      }, 600000); // every 10 mins
      setTickInterval(i);
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
          return response.json();
        })
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            console.log("ACCESS TOKEN ON RE-RENDER:", data.access_token)
            setLoading(false);
            toggleRefresh(true); // start refresh token countdown
          }
        })
        .catch(error => {
          console.log("User is not logged in ", error);
          setLoading(false);
        })
    }
  }, [jwtToken, toggleRefresh])

  return (
    <div>
      <Navbar handleLogin={handleLogin} handleRegister={handleRegister} handleLogout={handleLogout} jwtToken={jwtToken} /> {/* props expect function, can't directly navigate*/}
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage jwtToken={jwtToken} />} />
          <Route
            path="/booking-management"
            element={loading
              ? <div>Loading...</div> // Show a loading screen while fetching the token
              : jwtToken !== ""
                ? <BookingManagement jwtToken={jwtToken} />
                : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={<RegisterPage handleLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;