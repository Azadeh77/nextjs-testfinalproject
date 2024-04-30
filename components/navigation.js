// Navigation.js

import React from 'react';
import './navigation.css'; // Import CSS file for styling

const Navigation = () => {
  
  return (
    
    <div className="navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/Tasks">Tasks</a></li>
        <li><a href="/Analytics">Analytics</a></li>
        <li><a href="/Notes">Notes</a></li>
      </ul>
    </div>
  );
}

export default Navigation;
