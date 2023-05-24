import React from "react";

function Navbar() {
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
