const express = require("express");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Enable CORS for frontend requests
app.use(cors());

// Set up the serial port connection
const serialPort = new SerialPort({
  path: "COM3", // Replace 'COM3' with the port your Arduino is connected to
  baudRate: 9600,
});

// Set up a parser to read lines from the serial port
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\n" }));

// Variable to store sensor data
let sensorData = { temperature: null, humidity: null };

// Read data from the serial port
parser.on("data", (line) => {
  console.log(`Raw data from Arduino: ${line}`);
  try {
    const parsedData = JSON.parse(line.trim()); // Parse JSON data
    sensorData = parsedData;
  } catch (error) {
    console.error("Error parsing data:", error.message);
  }
});

// API to provide sensor data
app.get("/api/sensor-data", (req, res) => {
  res.json(sensorData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
