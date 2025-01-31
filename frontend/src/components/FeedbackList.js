import React, { useState, useEffect, useRef } from "react";
import { getFeedbacks } from "../services/api";
import "../styles/FeedbackList.css";

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const isFetchingRef = useRef(false); // Ref to track fetching state

  // Fetch feedback data from the API
  const fetchFeedbacks = async (search = '') => {
    if (loading || isFetchingRef.current) return; // Prevent duplicate calls
    setLoading(true);
    isFetchingRef.current = true; // Set fetching state

    try {
      const data = await getFeedbacks(cursor, search); // Pass search term
      if (data.feedbacks && data.feedbacks.length > 0) {
        setFeedbackData(prev => {
          const existingIds = new Set(prev.map(f => f.id)); // Create a set of existing IDs
          const newFeedbacks = data.feedbacks.filter(f => !existingIds.has(f.id)); // Filter out duplicates
          return [...prev, ...newFeedbacks]; // Append new feedbacks
        });
        setCursor(data.nextCursor); // Update cursor
        setHasMore(data.hasMore); // Update pagination status
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch feedbacks');
    } finally {
      setLoading(false);
      isFetchingRef.current = false; // Reset fetching state
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    setFeedbackData([]); // Clear existing feedback data
    setCursor(null); // Reset cursor for new search
    fetchFeedbacks(searchTerm); // Fetch feedbacks based on search term
  };

  // Initial fetch
  useEffect(() => {
    fetchFeedbacks();
  }, []); // Runs only once

  return (
    <div className="feedback-list-container">
      <div className="header-container">
        <h2 className="feedback-title">Employee Feedback List</h2>
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search feedback..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
          <button type="submit" className="search-button">Next</button>
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Employee Name</th>
            <th>Team Lead</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.id}</td>
              <td>{feedback.ename}</td>
              <td>{feedback.teamLead}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.submissionDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && !loading && (
        <button className="pagination-btn" onClick={() => fetchFeedbacks(searchTerm)}>Load More</button>
      )}
    </div>
  );
};

export default FeedbackList;