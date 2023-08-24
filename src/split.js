import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './split.css'; // Import the CSS file here
import Navbar from './navbar';

function Split() {
    const [file, setFile] = useState(null);
    const [splitPage, setSplitPage] = useState('');
    const [error, setError] = useState('');
    const [scrolling, setScrolling] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        // Add scroll event listener to trigger animations on scroll
        window.addEventListener('scroll', handleScroll);

        // Add a class when the component mounts for fade-in effect
        document.querySelector('.split-container').classList.add('fade-in');

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

    const handleSplitPageChange = (event) => {
        setSplitPage(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file || !splitPage) {
            setError('Please select a PDF file and enter a page number.');
            return;
        }

        setError('');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('splitPage', splitPage);

        axios.post('https://flaskend.onrender.com/split', formData, { responseType: 'blob' })
            .then((response) => {
                const zipBlob = new Blob([response.data], { type: 'application/zip' });
                saveAs(zipBlob, 'split_pdf_files.zip');
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
            className={`split-container ${scrolling ? 'scrolling' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h1 className="split-title">PDF Splitter - React</h1>
            {error && <p className="split-error">{error}</p>}
            <form className="split-form" onSubmit={handleSubmit}>
                <div
                    className={`split-drop-area ${dragging ? 'dragging' : ''}`}
                >
                    {file ? (
                        <p>Selected File: {file.name}</p>
                    ) : (
                        <p>
                            Drag and drop a PDF file here, or click to select a file.
                        </p>
                    )}
                </div>
                <input
                    type="file"
                    id="file"
                    onChange={handleChange}
                    required
                />
                <br />
                <label htmlFor="splitPage">Split at page number:</label>
                <input
                    className="split-input"
                    type="number"
                    id="splitPage"
                    min="1"
                    value={splitPage}
                    onChange={handleSplitPageChange}
                    required
                />
                <br />
                <button
                    className={`split-button ${scrolling ? 'scrolling' : ''}`}
                    type="submit"
                >
                    Split PDF
                </button>
            </form>
        </div>
        </div>
    );
}

export default Split;
