import axios from 'axios';

// Base URL for API endpoints (adjust this to match your WSO2 Ballerina server URL)
const API_URL = 'http://localhost:3000'; // Example: Change the port if necessary

// Fetch list of team leads
export const getTeamLeads = async () => {
  try {
    const response = await axios.get(`${API_URL}/teamLeads`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team leads:', error);
    throw error;
  }
};

// Submit feedback data
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await axios.post(`${API_URL}/submitFeedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};

// Fetch feedback list with pagination
export const getFeedbacks = async (page = 1) => {
  try {
    const response = await axios.get(`${API_URL}/feedbacks?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
};

// **New Function**: User login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Expecting backend to return login status and user data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
