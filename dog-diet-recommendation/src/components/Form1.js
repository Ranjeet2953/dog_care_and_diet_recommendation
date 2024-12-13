import React, { useState } from "react";

const Form1 = () => { // Changed from Form to Form1
  const [petData, setPetData] = useState({
    petName: "",
    petGender: "",
    petDOB: "",
    breed: "",
    weight: "",
    height: "",
    vaccinationStatus: "",
    medicalHistory: "",
    ownerName: "",
    ownerGender: "",
    contactNumber: "",
    email: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/save-pet-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        alert("Pet and owner data saved successfully!");
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving pet and owner data:", error);
      alert("Failed to save data.");
    }
  };

  return (
    <div>
      <h2>Pet and Owner Information</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Pet Name:</label>
        <input type="text" name="petName" value={petData.petName} onChange={handleInputChange} required />
        {/* Add the rest of the fields here */}
        <button type="submit">Save Data</button>
      </form>
    </div>
  );
};

export default Form1; // Updated to export Form1
