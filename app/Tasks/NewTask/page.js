// page.js
"use client";
import Image from "next/image";
import styles from "../../page.module.css";
import Navigation from '../../../components/navigation';
import React, { useState } from 'react';

const YourPage = () => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('/api/createTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, category, priority, dueDate, status }),
      });

      if (!response.ok) {
        console.log (response);
        throw new Error('Failed to create task');
      }

      // Clear the form
      setTitle('');
      setStatus('');
      setDescription('');
      setCategory('');
      setPriority('');
      setDueDate('');
    } catch (err) {
      // Handle the error
      console.error(err);
    }
  };

  return (
    <div className="parent-container">
      <Navigation />
      <div className="right-content">
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className="form-label">
          <span className="label-text">Title:</span>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="form-label">
            Description: 
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label className="form-label">
            Category: 
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select...</option>
              <option value="research">Research Project</option>
              <option value="course">Course</option>
              <option value="paper">Paper</option>
              <option value="seminar">Seminar</option>
              <option value="presentation">Presentation</option>
              <option value="workshop">Workshop</option>
            </select>
          </label>
          <label className="form-label">
            Priority: 
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">Select...</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </label>
          <label className="form-label">
            Due Date: 
            <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </label>
          <label className="form-label">
            Status: 
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select...</option>
              <option value="complete">Complete</option>
              <option value="inProgress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </label>
          <button type="submit" className="form-button">Create Task</button>
        </form>
      </div>
    </div>
  );
}

export default YourPage;