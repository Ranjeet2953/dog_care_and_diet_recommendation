import React, { useState } from "react";
import Papa from "papaparse";
import Result from "./Result";

const Form = () => {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activityDuration: "",
    agilityLevel: "",
  });

  const [csvData, setCsvData] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loadCsvData = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setCsvData(results.data);
      },
      error: (err) => {
        console.error("Error parsing CSV: ", err);
        setError("Error loading CSV file. Please try again.");
      },
    });
  };

  const findRecommendation = (data) => {
    if (csvData.length === 0) {
      setError("No CSV data loaded.");
      return null;
    }

    let closestMatch = csvData[0];
    let closestDiff = Infinity;

    csvData.forEach((row) => {
      const diff =
        Math.abs(row.Age - data.age) +
        Math.abs(row.Weight - data.weight) +
        Math.abs(row.Height - data.height) +
        Math.abs(row.Activity_Duration - data.activityDuration) +
        Math.abs(row.Agility_Level - data.agilityLevel);

      if (diff < closestDiff) {
        closestDiff = diff;
        closestMatch = row;
      }
    });

    return closestMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const recommendation = findRecommendation(formData);
      if (recommendation) {
        setResult({
          recommended_food: recommendation.Food,
          additional_recommendations: `Diet Calories: ${recommendation.Diet_Calories}, Protein: ${recommendation.Protein}, Fats: ${recommendation.Fats}, Carbs: ${recommendation.Carbs}`,
        });
      } else {
        setError("No matching data found in CSV.");
      }
    } catch (error) {
      console.error("Error finding recommendation: ", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form">
        <h2 className="form-title">Enter Dog's Details</h2>
        <label>Upload CSV File:</label>
        <input
          type="file"
          id="csvFile"
          accept=".csv"
          onChange={(e) => loadCsvData(e.target.files[0])}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="activityDuration"
            placeholder="Activity Duration (mins)"
            value={formData.activityDuration}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="agilityLevel"
            placeholder="Agility Level (1-10)"
            value={formData.agilityLevel}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">Get Recommendation</button>
        </form>
        {result && <Result result={result} />}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Form;
