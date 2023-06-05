import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Navbar({ handleLogin, handleRegister, handleLogout, jwtToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    if (username === "" || password === "") {
      alert('Please enter both username and password');
    }

    // build request payload
    let payload = {
      username: username,
      password: password,
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }


    fetch("/authenticate", requestOptions)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.error) {
          alert('Invalid username or password');
        } else {
          handleLogin(data.access_token);
        }
      })
      .catch(error => {
        alert(error);
      })
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'teal' }}>
      <div className="container-fluid">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={`${process.env.PUBLIC_URL}/orca.png`}
            alt="Orca logo"
            style={{ marginRight: '25px', width: '50px', height: '50px' }}
          />
          <div className="navbar-brand"
            onClick={() => navigate('/')}
            style={{ fontSize: '30px', fontWeight: 'bold', cursor: 'pointer' }}>
            Book4U
          </div>
        </div>
        {jwtToken === "" ? (
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="text"
              placeholder="Username"
              aria-label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="form-control me-2"
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="btn btn-outline-info me-2" type="submit">
              Login
            </button>
            <button className="btn btn-outline-info" type="button" onClick={handleRegister}>
              Register
            </button>
          </form>
        ) : (
          <button className="btn btn-outline-info" type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}


export default Navbar;