import React from "react";

const Result = ({ result }) => {
  return (
    <div className="result-container">
      <h2>Recommendation</h2>
      <p><strong>Recommended Food:</strong> {result.recommended_food}</p>
      <p><strong>Additional Recommendations:</strong> {result.additional_recommendations}</p>
    </div>
  );
};

export default Result;
