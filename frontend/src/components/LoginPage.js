import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/LoginPage.css";
import { loginUser } from "../services/api"; // Import the login API function

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!username || !password) {
      setError("All fields are required.");
    } else {
      try {
        // API call to validate login credentials
        const response = await loginUser({ username, password });
        if (response.data.success) { // Assuming the backend sends a `success` key in response
          setError("");
          alert("Login Successful!");
          navigate("/feedback"); // Redirect to FeedbackForm
        } else {
          setError(response.data.message || "Invalid Username or Password");
        }
      } catch (error) {
        console.error("Login error:", error);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
