import React, { useState, useEffect } from "react";
import { getFeedbacks } from "../services/api"; // Import the API function
import "../styles/FeedbackList.css"; // Ensure this CSS file is created for custom styles

const FeedbackList = () => {
  // State for feedback submissions
  const [feedbackData, setFeedbackData] = useState([]);
  const [cursor, setCursor] = useState(null); // Use cursor instead of currentPage
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true); // To track if there are more pages

  // Fetch feedback data from the API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks(cursor); // Pass cursor
        if (data.feedbacks && data.feedbacks.length > 0) {
          setFeedbackData(prev => [...prev, ...data.feedbacks]); // Append new feedbacks
          setCursor(data.nextCursor); // Update cursor for next call
          setHasMore(data.hasMore); // Update based on API response
        } else {
          setHasMore(false); // No more feedbacks
        }
      } catch (err) {
        setError('Failed to fetch feedbacks');
      }
    };

    fetchFeedbacks();
  }, [cursor]); // Fetch when cursor changes

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
      {hasMore && (
        <button onClick={() => setCursor(feedbackData[feedbackData.length - 1].id)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default FeedbackList;