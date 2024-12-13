import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load data
data = pd.read_csv('dog.csv')

# Preprocess data
X = data[['Age', 'Weight', 'Height', 'Activity_Duration', 'Agility_Level',
          'Activity_Type', 'Diet_Calories', 'Protein', 'Fats', 'Carbs', 'Meal_Frequency']]
y = data['Food']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model using joblib
joblib.dump(model, 'diet_model.joblib')
