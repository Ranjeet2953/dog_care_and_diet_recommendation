import React from "react";
import { Link } from "react-router-dom";

const YourDogInfo = () => {
  return (
    <div>
      <h1>Your Dog Info</h1>
      <p>Choose an option:</p>
      <ul>
        <li><Link to="/sensed-data">Sensed Data</Link></li>
        <li><Link to="/diet-plan">Diet Plan</Link></li>
      </ul>
    </div>
  );
};

export default YourDogInfo;
