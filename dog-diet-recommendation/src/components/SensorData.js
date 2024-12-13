import React, { useEffect, useState } from "react";

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [temperatureStatus, setTemperatureStatus] = useState(""); 
  const [humidityStatus, setHumidityStatus] = useState(""); 
  const [heartRateStatus, setHeartRateStatus] = useState(""); 
  const [breedSize, setBreedSize] = useState(""); 

  // Humidity ranges for different breed sizes
  const humidityRanges = {
    small: { min: 40, max: 55, breeds: "Chihuahua, Pomeranian, Yorkshire Terrier" },
    medium: { min: 40, max: 55, breeds: "Labrador Retriever, Golden Retriever, Beagle" },
    large: { min: 30, max: 45, breeds: "German Shepherd, Rottweiler, Great Dane" },
    puppy: { min: 40, max: 55, breeds: "All puppies" },
  };

  const handleBreedSizeChange = (e) => {
    setBreedSize(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sensor-data");
        const data = await response.json();
        setSensorData(data);
        setLoading(false);

        // Temperature check for safety
        if (data.temperature < 35 || data.temperature > 45) {
          setTemperatureStatus("Temperature is not safe for the dog.");
        } else {
          setTemperatureStatus("Temperature is safe for the dog.");
        }

        // Check humidity based on breed size
        if (breedSize) {
          const { min, max } = humidityRanges[breedSize] || {};
          if (data.humidity < min || data.humidity > max) {
            setHumidityStatus(`Humidity is not ideal for ${breedSize} breed.`);
          } else {
            setHumidityStatus(`Humidity is ideal for ${breedSize} breed.`);
          }
        }

        // Check heart rate range for safety
        if (data.heartRate < 60 || data.heartRate > 100) {
          setHeartRateStatus("Heart rate is not within the normal range.");
        } else {
          setHeartRateStatus("Heart rate is within the normal range.");
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchData, 2000);
    fetchData();

    return () => clearInterval(interval);
  }, [breedSize]);

  return (
    <div className="sensor-data">
      {loading ? (
        <p>Loading sensor data...</p>
      ) : sensorData ? (
        <div className="data-display">
          {/* Temperature Section */}
          <div className="temperature-section">
            <h2>Temperature</h2>
            <p><strong>Current Temperature:</strong> {sensorData.temperature} °C</p>
            <p className={temperatureStatus.includes("not safe") ? "not-safe" : "safe"}>
              {temperatureStatus}
            </p>
          </div>

          {/* Humidity Section */}
          <div className="humidity-section">
            <h2>Humidity</h2>

            {/* Breed size input */}
            <div className="breed-size-input">
              <label htmlFor="breedSize">Select Breed Size:</label>
              <select id="breedSize" onChange={handleBreedSizeChange}>
                <option value="">Select a breed size</option>
                <option value="small">Small Breed Dogs</option>
                <option value="medium">Medium Breed Dogs</option>
                <option value="large">Large Breed Dogs</option>
                <option value="puppy">Puppies</option>
              </select>
            </div>

            {/* Display ideal humidity based on breed size */}
            {breedSize && (
              <div className="humidity-info">
                <p>
                  <strong>Ideal Humidity Range for {breedSize.charAt(0).toUpperCase() + breedSize.slice(1)}:</strong>
                  {humidityRanges[breedSize].min} - {humidityRanges[breedSize].max} %
                </p>
                <p className={humidityStatus.includes("not ideal") ? "not-safe" : "safe"}>
                  {humidityStatus}
                </p>
              </div>
            )}

            {/* Current Humidity */}
            <p><strong>Current Humidity:</strong> {sensorData.humidity} %</p>
          </div>

          {/* Heart Rate Section */}
          <div className="heart-rate-section">
            <h2>Heart Rate</h2>
            <p><strong>Current Heart Rate:</strong> {sensorData.heartRate} BPM</p>
            <p className={heartRateStatus.includes("not within") ? "not-safe" : "safe"}>
              {heartRateStatus}
            </p>
          </div>

          {/* GPS Section */}
          <div className="gps-section">
            <h2>GPS Location</h2>
            <p><strong>Latitude:</strong> {sensorData.latitude}</p>
            <p><strong>Longitude:</strong> {sensorData.longitude}</p>
            <p><strong>Altitude:</strong> {sensorData.altitude} meters</p>
          </div>
        </div>
      ) : (
        <p>No sensor data available.</p>
      )}
    </div>
  );
};

export default SensorData;
