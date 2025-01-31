import React, { useState, useEffect, useRef } from "react";
import { getFeedbacks } from "../services/api";
import "../styles/FeedbackList.css";

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false); // Ref to track fetching state

  // Fetch feedback data from the API
  const fetchFeedbacks = async () => {
    if (loading || isFetchingRef.current) return; // Prevent duplicate calls
    setLoading(true);
    isFetchingRef.current = true; // Set fetching state

    try {
      const data = await getFeedbacks(cursor);
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

  // Initial fetch
  useEffect(() => {
    fetchFeedbacks();
  }, []); // Runs only once

  return (
    <div className="feedback-list-container">
      <h1>Employee Feedback List</h1>
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
        <button className="pagination-btn" onClick={fetchFeedbacks}>Load More</button>
      )}
    </div>
  );
};

export default FeedbackList;