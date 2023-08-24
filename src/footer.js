import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Import custom CSS for the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>
                    Connect with us on social media:
                    <a href="#" className="footer-icon"><FaFacebookF /></a>
                    <a href="#" className="footer-icon"><FaTwitter /></a>
                    <a href="#" className="footer-icon"><FaInstagram /></a>
                </p>
                <p>
                    &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
