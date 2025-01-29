import ballerina/http;
import ballerina/io;

// Define a record for team lead details
public type TeamLead record {
    int id;
    string name;
};

// Define a record for feedback
public type Feedback record {
    string teamLead;
    string feedback;
    int rating;
};

// Sample team leads data
TeamLead[] teamLeads = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" }
];

// Feedback storage
Feedback[] feedbackList = [];

// Define the FeedbackService
service /feedback on new http:Listener(8080) {
    
    // Fetch team leads
    resource function get teamLeads(http:Caller caller, http:Request req) {
        TeamLead[] response = teamLeads;
        checkpanic caller->respond(response);
    }
    
    // Submit feedback
    resource function post submitFeedback(http:Caller caller, http:Request req) {
        var payload = req.getJsonPayload();
        if payload is json {
            var result = payload.fromJsonWithType(Feedback);
            if result is Feedback {
                feedbackList.push(result);
                io:println("Received Feedback:", result);
                checkpanic caller->respond({ "message": "Feedback submitted successfully" });
            } else {
                checkpanic caller->respond({ "error": "Invalid feedback data" });
            }
        } else {
            checkpanic caller->respond({ "error": "Invalid JSON payload" });
        }
    }
}
