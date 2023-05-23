import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'teal' }}>
      <div className="container-fluid">
        <a className="navbar-brand">Book4U</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Username" aria-label="Username" />
          <input className="form-control me-2" type="search" placeholder="Password" aria-label="Password" />
          <button className="btn btn-outline-info me-2" type="submit">Login</button>
          <button className="btn btn-outline-info" type="submit">Register</button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
