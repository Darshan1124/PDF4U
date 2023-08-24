import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pdf_merge.css'; // Import the CSS file here
import Navbar from './navbar';

const PDFMerger = () => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [mergedFile, setMergedFile] = useState(null);
    const [scrolling, setScrolling] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        // Add scroll event listener to trigger animations on scroll
        window.addEventListener('scroll', handleScroll);

        // Add a class when the component mounts for fade-in effect
        document.querySelector('.converter-container').classList.add('fade-in');

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

    const handleFile1Change = (e) => {
        setFile1(e.target.files[0]);
    };

    const handleFile2Change = (e) => {
        setFile2(e.target.files[0]);
    };

    const handleMergePDF = async () => {
        try {
            const formData = new FormData();
            formData.append('file1', file1);
            formData.append('file2', file2);

            const response = await axios.post('https://flaskend.onrender.com/api/mergePDF', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob', // to receive binary data
            });

            setMergedFile(response.data);
        } catch (error) {
            console.error('Error merging PDFs:', error);
        }
    };

    const handleDownload = () => {
        // Create a blob URL to download the merged PDF
        const url = URL.createObjectURL(new Blob([mergedFile]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'merged.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (file1 === null) {
            setFile1(droppedFile);
        } else if (file2 === null) {
            setFile2(droppedFile);
        }
    };

    return (
        <div>
        <Navbar/>
        <div
            className={`converter-container ${scrolling ? 'scrolling' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <h1 className="title">PDF Merge</h1>
            <div className={`drop-area ${dragging ? 'drag-over' : ''}`}>
                {file1 && file2 ? (
                    <p>Two files selected</p>
                ) : (
                    <p>Drag and drop PDF files here</p>
                )}
            </div>
            <input type="file" onChange={handleFile1Change} />
            <input type="file" onChange={handleFile2Change} />
            <button className="converter-button" onClick={handleMergePDF}>
                Merge PDFs
            </button>
            {mergedFile && (
                <div className="converted-file">
                    <p>Merged file is ready to download!</p>
                    <button className="download-link" onClick={handleDownload}>
                        Download Merged PDF
                    </button>
                </div>
            )}
        </div>
        </div>
    );
};

export default PDFMerger;
