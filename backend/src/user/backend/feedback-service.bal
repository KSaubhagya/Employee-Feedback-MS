import ballerina/http;

service /feedback on new http:Listener(8080) {

    // GET /teamLeads: Returns a list of team leads
    resource function get teamLeads() returns json {
        // Mock team leads data
        return [
            { "id": 1, "name": "Team Lead 1" },
            { "id": 2, "name": "Team Lead 2" }
        ];
    }

    // POST /submitFeedback: Accepts feedback from the frontend
    resource function post submitFeedback(@http:Payload json feedback) returns json {
        // Process feedback (e.g., store in a database in a real scenario)
        return { message: "Feedback submitted successfully", data: feedback };
    }

    // GET /feedbacks: Retrieves feedback with pagination support
    resource function get feedbacks(int page = 1) returns json {
        // Mock pagination response
        json feedbacks = [
            { "id": 1, "employeeName": "Alice", "teamLead": "John", "feedback": "Great mentor!", "rating": 5, "date": "2023-01-01" },
            { "id": 2, "employeeName": "Bob", "teamLead": "Jane", "feedback": "Very supportive.", "rating": 4, "date": "2023-01-03" },
            { "id": 3, "employeeName": "Charlie", "teamLead": "John", "feedback": "Helpful advice.", "rating": 4, "date": "2023-01-05" }
        ];
        return {
            "feedbacks": feedbacks,
            "page": page,
            "total": 100
        };
    }
}
