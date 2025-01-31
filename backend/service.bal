import ballerina/http;
import ballerina/io;
import ballerinax/mysql;
import ballerina/sql;

// Define a record for team lead details
public type TeamLead record {
    int id;
    string name;
};

// Define a record for feedback
public type Feedback record {
    int id;
    string ename;
    string teamLead;
    string feedback;
    int rating;
    string submissionDate;
};

// New record for submitting feedback
public type FeedbackSubmission record {
    string teamLead;
    string feedback;
    int rating;
};


// Sample team leads data
TeamLead[] teamLeads = [
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
    { id: 4, name: "John Holland" },
    { id: 5, name: "Peter Mintz" }
];

// Feedback storage (in-memory, can be replaced with a database)
Feedback[] feedbackList = [];

// MySQL configuration
mysql:Client dbClient = check new mysql:Client("localhost", "root", "", "feedback_db", 3306); // Adjust password if necessary

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
    
    // Check if the payload is valid JSON
    if payload is json {
        // Convert the JSON payload to a FeedbackSubmission record
        var result = payload.fromJsonWithType(FeedbackSubmission);
        
        // Check if the conversion was successful
        if result is FeedbackSubmission {
            // Insert feedback into the database
            var insertResult = dbClient->execute(`INSERT INTO feedback (team_lead, feedback, rating) VALUES (${result.teamLead}, ${result.feedback}, ${result.rating})`);
            
            // Check for database insertion errors
            if insertResult is error {
                io:println("Database insertion error: ", insertResult.message()); // Log the error
                check caller->respond({ "error": "Failed to submit feedback to the database" });
                return;
            }

            // Log the received feedback
            io:println("Received Feedback: ", result);

            // Prepare and send the response
            http:Response res = new;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.setJsonPayload({ "message": "Feedback submitted successfully" });
            check caller->respond(res);
        } else {
            // Log invalid feedback data
            io:println("Invalid feedback data: ", payload.toString());
            check caller->respond({ "error": "Invalid feedback data" });
        }
    } else {
        // Log invalid JSON payload
        io:println("Invalid JSON payload: ", payload.toString());
        check caller->respond({ "error": "Invalid JSON payload" });
    }
}

resource function get feedbacks(http:Caller caller, http:Request req) returns error? {
    string? cursor = req.getQueryParamValue("cursor");
    int pageSize = 10; // Set the limit for pagination

    sql:ParameterizedQuery query;

    if cursor is string {
        int cursorValue = check int:fromString(cursor); // Ensure proper conversion
        query = `SELECT feedback_id, employee_name, team_lead, feedback, rating, submission_date FROM feedback WHERE feedback_id > ${cursorValue} ORDER BY feedback_id ASC LIMIT ${pageSize}`;
    } else {
        query = `SELECT feedback_id, employee_name, team_lead, feedback, rating, submission_date FROM feedback ORDER BY feedback_id ASC LIMIT ${pageSize}`;
    }

    // Execute the query
    stream<record {int feedback_id; string employee_name; string team_lead; string feedback; int rating; string submission_date;}, sql:Error?> resultStream =
        dbClient->query(query);

    Feedback[] feedbacks = [];
    int nextCursor = 0;

    // Iterate over the result stream
    error? e = resultStream.forEach(function(record {int feedback_id; string employee_name; string team_lead; string feedback; int rating; string submission_date;} row) {
        nextCursor = row.feedback_id;
        feedbacks.push({
            id: row.feedback_id,
            ename: row.employee_name,
            teamLead: row.team_lead,
            feedback: row.feedback,
            rating: row.rating,
            submissionDate: row.submission_date
        });
    });

    if e is error {
        io:println("Error processing feedback data: ", e.message()); // Log the error
        check caller->respond({ "error": "Failed to process feedback data" });
        return;
    }

    json response = {
        "feedbacks": feedbacks.toJson(),  // Convert array of records to JSON
        "hasMore": feedbacks.length() == pageSize,
        "nextCursor": feedbacks.length() > 0 ? nextCursor.toString() : null
    };

    http:Response res = new;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setJsonPayload(response);
    check caller->respond(res);
}
}