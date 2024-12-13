from flask import Flask, request, jsonify
import pandas as pd
import joblib  # Assuming you're using a trained model

app = Flask(__name__)

# Load your trained model
model = joblib.load("diet_model.joblib")  # Update with your actual model path

# Load dataset (if used in logic)
data = pd.read_csv("dog.csv")  # Replace with your dataset file

@app.route("/predict", methods=["POST"])
def predict():
    try:
        # Parse input JSON
        user_input = request.json
        age = user_input["age"]
        weight = user_input["weight"]
        height = user_input["height"]
        activity_duration = user_input["activityDuration"]
        agility_level = user_input["agilityLevel"]
        activity_type = user_input["activityType"]
        diet_calories = user_input["dietCalories"]
        protein = user_input["protein"]
        fats = user_input["fats"]
        carbs = user_input["carbs"]
        meal_frequency = user_input["mealFrequency"]

        # Preprocess input as per your model requirements
        input_features = [[age, weight, height, activity_duration, agility_level,
                           activity_type, diet_calories, protein, fats, carbs, meal_frequency]]
        
        # Make predictions
        prediction = model.predict(input_features)  # Example: predicting index or category
        
        # Map prediction to dataset (if applicable)
        # Assuming `prediction` is an index or key to fetch the row
        recommended_row = data.iloc[prediction[0]]
        recommended_food = recommended_row["Food"]

        response = {
            "recommended_food": recommended_food,
            "additional_recommendations": "Ensure a balanced diet.",
        }

        return jsonify(response)
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

if __name__ == "__main__":
    app.run(debug=True)
