import React from "react";
import SensorData from "./components/SensorData";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="app">
      <div className="content">
        <h1 className="title">Dog Diet Recommendation</h1>
        <div className="container">
          <div className="sensor-data-container">
            <h2>Sensor Data</h2>
            <SensorData />
          </div>
          <div className="form-container">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
