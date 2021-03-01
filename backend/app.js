const express = require("express");
const app = express();

/**importing routes */
const chat = require("./routes/chat"); // Import Chat Routes

const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Middleware
// express-session must be used before passport
app.use("/api/dialogflow", chat);

//Start Server: Listen on port 8080
let server = app.listen(port, () => {
  console.log("Listening on port 8080");
});
