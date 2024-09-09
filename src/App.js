import React from 'react';

import './App.css'; // Import the CSS file for styling
import Example from './customer/components/navigation/navigation';
import HomePage from './customer/pages/HomePage/HomePage';


function App() {
  return (
    <div className="App">
      <div>
      <Example />

        <HomePage/>

      </div>
      {/* Other components and content */}
    </div>
  );
}

export default App;
