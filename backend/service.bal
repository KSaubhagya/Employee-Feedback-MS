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
    
    // Handle preflight requests for CORS
    resource function options submitFeedback(http:Caller caller, http:Request req) returns error? {
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        checkpanic caller->respond(res);
    }

    // Fetch team leads
    resource function get teamLeads(http:Caller caller, http:Request req) returns error? {
        json response = teamLeads.toJson();
        http:Response res = new;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");
        res.setJsonPayload(response);
        checkpanic caller->respond(res);
    }
    
    // Submit feedback
    resource function post submitFeedback(http:Caller caller, http:Request req) returns error? {
        var payload = req.getJsonPayload();
        if payload is json {
            var result = payload.fromJsonWithType(Feedback);
            if result is Feedback {
                feedbackList.push(result);
                io:println("Received Feedback:", result);
                http:Response res = new;
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", "GET, POST");
                res.setHeader("Access-Control-Allow-Headers", "Content-Type");
                res.setJsonPayload({ "message": "Feedback submitted successfully" });
                checkpanic caller->respond(res);
            } else {
                checkpanic caller->respond({ "error": "Invalid feedback data" });
            }
        } else {
            checkpanic caller->respond({ "error": "Invalid JSON payload" });
        }
    }
}