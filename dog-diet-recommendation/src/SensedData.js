import React, { useState, useEffect } from "react";

const SensedData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensor-data");
        const data = await response.json();
        setSensorData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Sensed Data</h1>
      {loading ? (
        <p>Loading data...</p>
      ) : sensorData ? (
        <div>
          <p><strong>Temperature:</strong> {sensorData.temperature} °C</p>
          <p><strong>Humidity:</strong> {sensorData.humidity} %</p>
          <p><strong>Heart Rate:</strong> {sensorData.heartRate} BPM</p>
          <p><strong>Latitude:</strong> {sensorData.latitude}</p>
          <p><strong>Longitude:</strong> {sensorData.longitude}</p>
        </div>
      ) : (
        <p>No sensor data available.</p>
      )}
    </div>
  );
};

export default SensedData;
