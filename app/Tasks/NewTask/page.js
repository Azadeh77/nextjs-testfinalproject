// page.js
"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import Navigation from '../../../components/navigation';
import React, { useState } from 'react';

const YourPage = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('/api/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, status }),
      });

      if (!response.ok) {
        console.log (response);
        throw new Error('Failed to create task');
      }

      // Clear the form
      setTitle('');
      setStatus('');
    } catch (err) {
      // Handle the error
      console.error(err);
    }
  };

  return (
    <div className="parent-container">
      <Navigation />
      <div className="right-content">
        <form onSubmit={handleSubmit}>
          <label style={{ marginRight: '10px' }}>
            Title: 
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label style={{ marginRight: '10px' }}>
            Status: 
            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
          </label>
          <button type="submit">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default YourPage;