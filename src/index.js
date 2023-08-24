import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';
import Mainlogic from './mainlogic';
import FileUploader from './fileuploader';
import DOCXMerger from './docx_merge';
import PDFMerger from './pdf_merge';
import Compress from './compress';
import Ex2pdf from './extopdf';
import Split from './split';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/p2d' element={<Mainlogic/>}/>
      <Route path='/d2p' element={<FileUploader/>}/>
      <Route path='/dmerge' element={<DOCXMerger/>}/>
      <Route path='/pmerge' element={<PDFMerger/>}/>
      <Route path='/pdfcompress' element={<Compress/>}/>
      <Route path='/ex2pdf' element={<Ex2pdf/>}/>
      <Route path='/split' element={<Split/>}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
