// Create web server to handle comment submission
// URL: http://localhost:8080/comment
// POST data: { name: "name", comment: "comment" }
// Returns: { status: "OK" }
//          { status: "ERROR", error: error }

// Load express module
var express = require("express");
var app = express();

// Load body parser module
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Load mysql module
var mysql = require("mysql");

// Configure connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
});

// Connect to database
connection.connect(function(error) {
    if (error) {
        console.log("Problem connecting to database");
    } else {
        console.log("Connected to database");
    }
});

// Configure route
app.post("/comment", function(request, response) {
    // Get name and comment from request
    var name = request.body.name;
    var comment = request.body.comment;

    // Create query
    var query = "INSERT INTO comments (name, comment) VALUES (?, ?)";
    var values = [name, comment];

    // Execute query
    connection.query(query, values, function(error, result) {
        if (error) {
            console.log("Problem inserting into database");
            response.json({ status: "ERROR", error: error });
        } else {
            console.log("Inserted into database");
            response.json({ status: "OK" });
        }
    });
});

// Start server
app.listen(8080);
console.log("Server is running on port 8080");
