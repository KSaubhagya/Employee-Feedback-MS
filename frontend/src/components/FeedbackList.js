import React, { useState } from "react";
import "../styles/FeedbackList.css"; // Create a CSS file for styling

const FeedbackList = () => {
  // Mock data for feedback submissions
  const feedbackData = [
    { id: 1, employeeName: "Alice", teamLead: "John", feedback: "Great mentor!", rating: 5, date: "2023-01-01" },
    { id: 2, employeeName: "Bob", teamLead: "Jane", feedback: "Very supportive.", rating: 4, date: "2023-01-03" },
    { id: 3, employeeName: "Charlie", teamLead: "John", feedback: "Helpful advice.", rating: 4, date: "2023-01-05" },
    { id: 4, employeeName: "David", teamLead: "Jane", feedback: "Clear guidance.", rating: 5, date: "2023-01-10" },
    { id: 5, employeeName: "Eva", teamLead: "John", feedback: "Great collaboration.", rating: 5, date: "2023-01-15" },
    // Add more mock data here as needed
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Calculate the displayed data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFeedback = feedbackData.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="feedback-list-container">
      <h1>Employee Feedback List</h1>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Team Lead</th>
            <th>Feedback</th>
            <th>Rating</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {currentFeedback.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.employeeName}</td>
              <td>{feedback.teamLead}</td>
              <td>{feedback.feedback}</td>
              <td>{feedback.rating}</td>
              <td>{feedback.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
