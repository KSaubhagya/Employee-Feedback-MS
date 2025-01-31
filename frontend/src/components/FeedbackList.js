import React, { useState, useEffect, useRef } from "react";
import { getFeedbacks } from "../services/api";
import "../styles/FeedbackList.css";

const FeedbackList = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); 
  const isFetchingRef = useRef(false); // Ref to track fetching state

  // Fetch feedback data from the API
  const fetchFeedbacks = async (search = '') => {
    if (loading || isFetchingRef.current) return; 
    setLoading(true);
    isFetchingRef.current = true; 

    try {
      const data = await getFeedbacks(cursor, search); 
      if (data.feedbacks && data.feedbacks.length > 0) {
        setFeedbackData(prev => {
          const existingIds = new Set(prev.map(f => f.id)); 
          const newFeedbacks = data.feedbacks.filter(f => !existingIds.has(f.id)); 
          return [...prev, ...newFeedbacks]; 
        });
        setCursor(data.nextCursor); 
        setHasMore(data.hasMore); 
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch feedbacks');
    } finally {
      setLoading(false);
      isFetchingRef.current = false; 
    }
  };

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  
  const handleSearchSubmit = (e) => {
    e.preventDefault(); 
    setFeedbackData([]); 
    setCursor(null); 
    fetchFeedbacks(searchTerm); 
  };

  // Initial fetch
  useEffect(() => {
    fetchFeedbacks();
  }, []); 

  return (
    <div className="feedback-list-container">
      <div className="header-container">
        <h2 className="feedback-title">Employee Feedback List</h2>
        <form onSubmit={handleSearchSubmit} className="search-form">
        
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