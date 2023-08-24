import React from 'react';
import './App.css'; // Import your custom CSS with the described styles
import Navbar from './navbar';
import Footer from './footer';

const App = () => {
  return (
    <div>
      <Navbar/>
    <div className="compress-container">
      <h1 className="compress-title" style={{fontSize:'80px'}}>Welcome to <span style={{color:'#333333'}}>PDF<span style={{fontSize:'110px',color:'white'}}>4</span>U</span></h1>
      <p style={{fontSize:'25px',color:'whitesmoke'}}>
        Our app allows you to easily perform operations on files while maintaining their quality.
      </p>
      <p style={{fontSize:'25px',color:'whitesmoke'}}>
        Get start by just hovering mouse on Tools Option above
      </p>
      <br/>
      <p style={{fontSize:'19px',color:'whitesmoke'}}>
        "https://flaskend.onrender.com" 
      </p>
      <p style={{fontSize:'19px',color:'whitesmoke'}}>
        Or you can use this features in your app by using above api
      </p>

      
      {/* <button className="compress-button">Get Started</button> */}
    </div>
    <Footer/>
    </div>
  );
};

export default App;
