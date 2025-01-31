import axios from 'axios';

// Base URL for endpoints 
const API_URL = 'http://localhost:8080'; 

// Fetch team leads
export const getTeamLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/feedback/teamLeads`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching team leads:', error);
    throw error; 
  }
};

// Submit feedback data
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback/submitFeedback`, feedbackData);
    return response.data; 
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error; 
  }
};

// Fetch feedback list 
export const getFeedbacks = async (cursor = null) => {
  try {
    const response = await axios.get(`${API_URL}/feedback/feedbacks`, {
      params: {
        cursor: cursor 
      }
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error; 
  }
};

