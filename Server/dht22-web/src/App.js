import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/sensor-data");
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const interval = setInterval(fetchData, 2000); // Fetch data every 2 seconds
    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DHT22 Sensor Data</h1>
        <p>Temperature: {sensorData.temperature !== null ? `${sensorData.temperature} °C` : "Loading..."}</p>
        <p>Humidity: {sensorData.humidity !== null ? `${sensorData.humidity} %` : "Loading..."}</p>
      </header>
    </div>
  );
}

export default App;
