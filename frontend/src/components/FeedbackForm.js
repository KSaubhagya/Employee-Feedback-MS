import React, { useState, useEffect } from 'react';
import { getTeamLeads, submitFeedback } from '../services/api'; // Import func from api.js
import '../styles/FeedbackForm.css';


const FeedbackForm = () => {
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  // Fetch team leads from the backend
  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await getTeamLeads(); // Use the imported function
        setTeamLeads(response);
      } catch (error) {
        console.error("Error fetching team leads:", error);
        alert('Failed to load team leads. Please try again later.');
      }
    };
    fetchTeamLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!selectedTeamLead || !feedback || rating === 0) {
      setError('Please fill out all fields before submitting.');
    } else {
      setError('');
      // Feedback payload
      const feedbackData = {
        teamLead: selectedTeamLead,
        feedback,
        rating,
      };

      // Submit feedback to the backend
      try {
        await submitFeedback(feedbackData); // Use the imported function
        alert('Feedback submitted successfully!');
        // Reset the form
        setSelectedTeamLead('');
        setFeedback('');
        setRating(0);
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('An error occurred while submitting feedback. Please try again.');
      }
    }
  };

  return (
    <div className="feedback-form-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        {/* Team Lead Dropdown */}
        <div className="input-group">
          <label htmlFor="teamLead">Team Lead Name</label>
          <select
            id="teamLead"
            value={selectedTeamLead}
            onChange={(e) => setSelectedTeamLead(e.target.value)}
          >
            <option value="" disabled>Select Team Lead</option>
            {teamLeads.map((lead) => (
              <option key={lead.id} value={lead.name}>
                {lead.name}
              </option>
            ))}
          </select>
        </div>

        {/* Feedback Textarea */}
        <div className="input-group">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          ></textarea>
        </div>

        {/* Star Rating */}
        <div className="input-group">
          <label>Rating</label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;