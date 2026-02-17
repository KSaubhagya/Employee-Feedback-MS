<h1># 📝 Employee Feedback Management System </h1>
<h3 align="left">## 📌 Description </h3>
<h4 align="left">The Employee Feedback Management System is a web application designed to streamline the process of collecting and managing employee feedback about their team leads. Built with Ballerina for the backend and React for the frontend, the system provides an intuitive and efficient user experience for submitting, viewing, and managing feedback on managers.</h4>
<br>
<h3>## ✨ Features </h3>
### Frontend (React) 💻  

- **User Authentication**: Mock login system with predefined credentials
- **Feedback Form**:  
  - Dropdown populated dynamically from the backend in a form for employees to provide detailed feedback with a 5-star rating system.  
  - **Validation**: Ensures all fields are filled before submission.  
- **Feedback List**:  
  - Displays all submitted feedback in a paginated table.  
  - Fields displayed with buttons to navigate through paginated table.

### Backend (WSO2 Ballerina) ⚙️  

- **APIs**:  
  - `GET /teamLeads`: Returns a list of available team leads.  
  - `POST /submitFeedback`: Accepts feedback from employees and stores it in a database.
  - `GET /feedbacks`: Retrieves all feedback with support for pagination.  
- **Database Setup**:  
  - Stores the data in MySQL database.


 
## ⚙️ System Requirements  

- **Frontend**  
  - Node.js (LTS recommended)  
  - npm or yarn (for package management)  
- **Backend**  
  - WSO2 Ballerina (latest stable version)  
  - MySQL (or an alternative lightweight database like SQLite)
 
<h2>📋 Setup Instructions</h2>
  <ol>
    <li><strong>Clone the Repository:</strong>
      <pre><code>git clone <repository-url></code></pre>
      <pre><code>cd <repository-directory></code></pre>
    </li>
    <li><strong>Install Dependencies:</strong>
      <pre><code>npm install</code></pre>
    </li>
     <li><strong>Run the Frontend:</strong>
      <pre><code>npm start</code></pre>
    </li>
    <li><strong>Backend Setup:</strong>
      <pre><code>cd <backend-directory> <repository-url></code></pre>
      <pre><code>ballerina run service.bal</code></pre>
    </li></ol>


<h2>🌐 API Reference</h2>
  <ul>
    <li><strong>Endpoints</a></li>
      <ul>
        <li>Get Team Leads → GET /teamLeads</li>
        <li>Submit Feedback → POST /submitFeedback</li>
         <li>Fetch Feedbacks (Paginated) → GET /feedbacks</li>
      </ul>
    </li>
  </ul>
    
  <h2>📄 Documentation</h2>

API documentation is available in the docs/ folder following OpenAPI specifications.
For detailed usage instructions, refer to the API_Documentation.md file.


