const dialogflow = require("dialogflow");
const uuid = require("uuid");
const path = require("path");

// A unique identifier for the given session
const sessionId = uuid.v4();
const projectId = "triny-new-task";

// Create a new session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.join("__dirname", "triny-new-task-dc106fc2ada2.json"),
});

exports.sessionClient = new dialogflow.SessionsClient({
  keyFilename: path.join(__dirname, "triny-new-task-dc106fc2ada2.json"),
});
exports.sessionPath = sessionClient.sessionPath(projectId, sessionId);
