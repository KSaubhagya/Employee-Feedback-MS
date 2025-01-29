import axios from 'axios';

// Base URL for API endpoints 
const API_URL = 'http://localhost:8080'; 

// Fetch list of team leads
export const getTeamLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/feedback/teamLeads`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching team leads:', error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Submit feedback data
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/feedback/submitFeedback`, feedbackData);
    return response.data; // Return dt
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error; 
  }
};

// Fetch feedback list with pagination 
export const getFeedbacks = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/feedbacks?page=${page}`);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error; 
  }
};