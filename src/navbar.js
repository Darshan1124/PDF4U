import React from 'react';
import 'bulma/css/bulma.min.css'; // Import Bulma CSS
import './Navbar.css'; // Import custom CSS
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {/* <span className="navbar-item">PDF4U</span> */}
                <NavLink to="/" className="navbar-item"><span color='#333333'>PDF<span style={{fontSize:'35px',color:'white'}}>4</span>U</span></NavLink>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {/* <a href="/" className="navbar-item">Home</a> */}
                    <NavLink to="/" className="navbar-item"><span style={{color:'white'}}>Home</span></NavLink>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">Tools</a>
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
                    {/* You can add more navbar items here if needed */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
