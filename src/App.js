import React from 'react';
import './App.css'; // Import the CSS file for styling
import logo from './assets/logo.png'; // Import the logo image

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>Coming Soon</h1>
        <p>We are working hard to bring you something amazing. Stay tuned!</p>
      </header>
    </div>
  );
}

export default App;
