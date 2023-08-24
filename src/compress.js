import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './compress.css'; // Import the CSS file here
import Navbar from './navbar';

function Compress() {
    const [selectedfile, setSelectedfile] = useState(null);
    const [convertedfile, setConvertedfile] = useState(null);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        // Add scroll event listener to trigger animations on scroll
        window.addEventListener('scroll', handleScroll);

        // Add a class when the component mounts for fade-in effect
        document.querySelector('.compress-container').classList.add('fade-in');

        // Clean up the event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        // Set scrolling state to true when the user scrolls
        setScrolling(true);
    };

    const handlefilechange = (event) => {
        setSelectedfile(event.target.files[0]);
    };

    const converttoword = async () => {
        if (!selectedfile) {
            alert('Please select a file.');
            return;
        }

        const formdata = new FormData();
        formdata.append('file', selectedfile);

        try {
            const response = await axios.post('https://flaskend.onrender.com/compress', formdata, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob', // to receive binary data
            });

            setConvertedfile(response.data);
        } catch (error) {
            alert('An error occurred during converting.');
            console.log(error);
        }
    };

    const handleDownload = () => {
        // Create a blob URL to download the compressed PDF
        const url = URL.createObjectURL(new Blob([convertedfile]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'compressed.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Navbar/>
        <div
            className={`compress-container ${scrolling ? 'scrolling' : ''}`}
        >
            <h2 className="compress-title">PDF Compressor</h2>
            <input type="file" accept=".pdf" onChange={handlefilechange} />
            <button
                className={`compress-button ${scrolling ? 'scrolling' : ''}`}
                onClick={converttoword}
            >
                Compress PDF File
            </button>
            {convertedfile && (
                <div className="compressed-file">
                    <p>PDF file is ready to download!</p>
                    <button
                        className={`download-link ${scrolling ? 'scrolling' : ''}`}
                        onClick={handleDownload}
                    >
                        Download Compressed PDF
                    </button>
                </div>
            )}
        </div>
        </div>
    );
}

export default Compress;
