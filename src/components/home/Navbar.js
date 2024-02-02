import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logoutUpdate } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-main">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">M-Legder</Link>
        <div className="d-flex justify-content-end" id="navbarNav">
          <div className="d-flex">
            {user ? (
              <>
                <Link to="/transaction" className="nav-link me-3"><button className="btn my-buttons">Transactions</button></Link>
                <button className="btn my-buttons" onClick={logoutUpdate}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link me-4"><button className="btn my-buttons">Login</button></Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

};

export default Navbar;