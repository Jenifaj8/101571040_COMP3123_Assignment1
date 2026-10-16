
/*
Purpose:
Log HTTP requests to a local file.
*/

const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

// Location of the logs folder
const logDirectory = path.join(__dirname, "../../logs");

// Create logs folder if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

// Create or open access.log
const logStream = fs.createWriteStream(
    path.join(logDirectory, "access.log"),
    { flags: "a" }
);

// Log HTTP requests to the file
const fileLogger = morgan("combined", {
    stream: logStream
});

module.exports = fileLogger;
