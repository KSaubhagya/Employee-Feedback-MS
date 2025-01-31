import React, { useState, useEffect } from 'react';
import { getTeamLeads, submitFeedback } from '../services/api'; 
import '../styles/FeedbackForm.css';


const FeedbackForm = () => {
  const [teamLeads, setTeamLeads] = useState([]);
  const [selectedTeamLead, setSelectedTeamLead] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  // Fetch team leads 
  useEffect(() => {
    const fetchTeamLeads = async () => {
      try {
        const response = await getTeamLeads(); 
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

      // Submit feedback 
      try {
        await submitFeedback(feedbackData); 
        alert('Feedback submitted successfully!');
        // Reset
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

        
        <div className="input-group">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your feedback here"
          ></textarea>
        </div>

       
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

      
        {error && <div className="error-message">{error}</div>}

       
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default FeedbackForm;