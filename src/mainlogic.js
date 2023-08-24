// mainlogic.jsx

import React, { useState, useEffect } from 'react';
import './mainlogic.css';
import Navbar from './navbar';
import Footer from './footer';

function Mainlogic() {
    const [selectedfile, setSelectedfile] = useState(null);
    const [convertedfile, setConvertedfile] = useState(null);
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        // Add scroll event listener to trigger animations on scroll
        window.addEventListener('scroll', handleScroll);

        // Add a class when the component mounts for fade-in effect
        document.querySelector('.converter-container').classList.add('fade-in');

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

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedfile(file);
    };

    const converttoword = async () => {
        if (!selectedfile) {
            alert('Please select a file.');
            return;
        }

        const formdata = new FormData();
        formdata.append('file', selectedfile);

        try {
            const response = await fetch('https://flaskend.onrender.com/convert', {
                method: 'POST',
                body: formdata,
            });

            if (response.ok) {
                const convertedfileBlob = await response.blob();
                const convertedfileUrl = URL.createObjectURL(convertedfileBlob);
                setConvertedfile(convertedfileUrl);
            } else {
                alert('Failed to convert.');
            }
        } catch (error) {
            alert('An error occurred during converting.');
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar/>
        <div
            className={`converter-container ${scrolling ? 'scrolling' : ''}`}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
        >
            <h2 className='title'
            // className={`converter-title ${scrolling ? 'scrolling' : ''}`}
            >PDF to WORD converter</h2>
            <div className="drop-area">
                {selectedfile ? (
                    <p>Selected File: {selectedfile.name}</p>
                ) : (
                    <p>Drag and drop a PDF file here, or click to select a file.</p>
                )}
            </div>
            {/* <input type="file" accept=".pdf" onChange={handlefilechange} className='file-input'/> */}
            <button className="converter-button" onClick={() => document.querySelector('input[type=file]').click()}>
                Select File
            </button>
            {selectedfile && (
                <div>
                    <button className="converter-button" onClick={converttoword}>
                        Convert to Word
                    </button>
                </div>
            )}
            {convertedfile && (
                <div className="converted-file">
                    <h3>Converted Word file</h3>
                    <a className="download-link" href={convertedfile} download="convertedfile.docx">
                        Download
                    </a>
                </div>
            )}
        </div>
        <Footer/>
        </div>
    );
}

export default Mainlogic;
