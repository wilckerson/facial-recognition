import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.svg" alt="Facial Recognition Logo" className="nav-logo-img" />
          Facial Recognition
        </Link>
        <div className="nav-menu">
          <Link to="/register" className="nav-link">
            Register Face
          </Link>
          <Link to="/login" className="nav-link">
            Face Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
