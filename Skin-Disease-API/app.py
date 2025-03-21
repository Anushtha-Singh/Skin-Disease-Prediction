import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Initialize FastAPI app
app = FastAPI()

# Allow cross-origin requests from the frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can restrict this later for security)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the trained model
#model = load_model("skin_disease_model.keras")
model_path = os.getenv("MODEL_PATH", "Skin-Disease-API/skin_disease_model.keras")

if os.path.exists(model_path):
    print(f"✅ Model file found at: {model_path}")
else:
    print(f"❌ Model file missing: {model_path}")

model = load_model(model_path)

# Define class labels (Make sure these match your training labels)
class_labels = ["label1", "label2", "label3", "..."]  # Replace with actual labels

# Prediction function
def predict_skin_disease(img):
    img = img.resize((128, 128))  # Resize image to match model input size
    img_array = image.img_to_array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    img_array = img_array / 255.0  # Normalize pixel values

    predictions = model.predict(img_array)  # Get predictions
    predicted_class = class_labels[np.argmax(predictions)]  # Get highest probability class

    return predicted_class

# API Endpoint for image upload and prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        img = Image.open(file.file)  # Open uploaded image
        prediction = predict_skin_disease(img)  # Make prediction
        return {"prediction": prediction}  # Return prediction
    except Exception as e:
        return {"error": str(e)}  # Return error message
