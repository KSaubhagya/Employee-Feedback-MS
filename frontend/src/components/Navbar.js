import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Employee Feedback System
                </Link>
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <Link to="/" className="navbar-links">Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/feedback" className="navbar-links">Feedback</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/feedback-list" className="navbar-links">Feedback List</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;