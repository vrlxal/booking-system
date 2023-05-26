import React, { useState } from "react";

function Navbar({ loggedIn, handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    // Invoke the handleLogin function passed as a prop
    handleLogin(username, password);
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
          <a className="navbar-brand" style={{ fontSize: '30px', fontWeight: 'bold' }}>Book4U</a>
        </div>
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
          <button className="btn btn-outline-info me-2" type="button" onClick={handleSubmit}>
            Login
          </button>
          <button className="btn btn-outline-info" type="submit">
            Register
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
