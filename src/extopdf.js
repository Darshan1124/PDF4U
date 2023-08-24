import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ex2pdf.css'; // Import the CSS file here
import Navbar from './navbar';

function Ex2pdf() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        // Add scroll event listener to trigger animations on scroll
        window.addEventListener('scroll', handleScroll);

        // Add a class when the component mounts for fade-in effect
        document.querySelector('.ex2pdf-container').classList.add('fade-in');

        // Clean up the event listeners when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', handleDrop);
        };
    }, []);

    const handleScroll = () => {
        // Set scrolling state to true when the user scrolls
        setScrolling(true);
    };

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            setError('Please select an Excel file.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://flaskend.onrender.com/excel2pdf', formData, { responseType: 'blob' })
            .then((response) => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = 'translated.pdf';
                link.click();
                URL.revokeObjectURL(pdfUrl);
            })
            .catch((error) => {
                setError('An error occurred. Please try again.');
                console.log(error);
            });
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        setFile(event.dataTransfer.files[0]);
    };

    return (
        <div>
        <Navbar/>
        <div
            className={`ex2pdf-container ${scrolling ? 'scrolling' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h1 className="ex2pdf-title">Excel to PDF Converter - React</h1>
            {error && <p className="ex2pdf-error">{error}</p>}
            <form className="ex2pdf-form" onSubmit={handleSubmit}>
                <div
                    className={`ex2pdf-drop-area ${dragging ? 'ex2pdf-dragging' : ''}`}
                >
                    {file ? (
                        <p>Selected File: {file.name}</p>
                    ) : (
                        <p>
                            Drag and drop an Excel file here, or click to select a file.
                        </p>
                    )}
                </div>
                <input
                    className="ex2pdf-file-input"
                    type="file"
                    id="file"
                    accept=".xlsx"
                    onChange={handleChange}
                    required
                />
                <br />
                <button
                    className={`ex2pdf-button ${scrolling ? 'scrolling' : ''}`}
                    type="submit"
                >
                    Convert to PDF
                </button>
            </form>
        </div>
        </div>
    );
}

export default Ex2pdf;
