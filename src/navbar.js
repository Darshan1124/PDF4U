import React, { useState } from 'react';
import 'bulma/css/bulma.min.css';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleNavbar = () => {
        setIsActive(!isActive);
    };

    return (
        <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink to="/" className="navbar-item"><span style={{ color: 'black' }}>PDF<span style={{ fontSize: '35px', color: 'white' }}>4</span>U</span></NavLink>
                <a
                    role="button"
                    className={`navbar-burger burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded="false"
                    onClick={toggleNavbar}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <NavLink to="/" className="navbar-item"><span style={{ color: 'black' }}>Home</span></NavLink>
                    <NavLink to="/about" className="navbar-item"><span style={{ color: 'black' }}>About</span></NavLink>
                    <div className={`navbar-item has-dropdown ${isActive ? 'is-active' : ''}`}>
                        <a className="navbar-link" style={{ color: 'black' }}>Tools</a>
                        <div className="navbar-dropdown">
                            <NavLink to="/p2d" className="navbar-item">PDF to Word</NavLink>
                            <NavLink to="/d2p" className="navbar-item">Word to PDF</NavLink>
                            <NavLink to="/dmerge" className="navbar-item">Merge DOCX</NavLink>
                            <NavLink to="/pmerge" className="navbar-item">Merge PDF</NavLink>
                            <NavLink to="/pdfcompress" className="navbar-item">Compress PDF</NavLink>
                            <NavLink to="/ex2pdf" className="navbar-item">Excel to PDF</NavLink>
                            <NavLink to="/split" className="navbar-item">Split PDF</NavLink>
                        </div>
                    </div>
                </div>
                <div className="navbar-end">
                    
                    {/* Add other navbar items here */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
