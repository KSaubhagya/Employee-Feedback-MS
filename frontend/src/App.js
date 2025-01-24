import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/feedback-list" element={<FeedbackList />} />
      </Routes>
    </Router>
  );
}

export default App;
