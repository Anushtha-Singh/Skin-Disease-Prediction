import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from flask_cors import CORS


# Initialize FastAPI app
app = FastAPI()
#CORS(app)
@app.get("/")
def read_root():
    return {"message": "Skin Disease API is running!"}

# Allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET", "POST"],  
    allow_headers=["*"],  
)

# Load the trained model
try:
    model = load_model("skin_disease_model.keras")
    print("✅ Model loaded successfully")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None  # Prevent further crashes

# Class labels (Update as per your training labels)
class_labels = ["label1", "label2", "label3", "label4","label5","label6","label7", "label8","label9"]

# Prediction function
def predict_skin_disease(img):
    if model is None:
        return "Error: Model not loaded!"
    
    img = img.resize((128, 128))  
    img_array = image.img_to_array(img)  
    img_array = np.expand_dims(img_array, axis=0)  
    img_array = img_array / 255.0  

    predictions = model.predict(img_array)  
    predicted_class = class_labels[np.argmax(predictions)]  

    return predicted_class

# API Endpoint for prediction
@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    print(f"📸 Received file: {file.filename}")  # Debugging
    try:
        img = Image.open(file.file).convert("RGB")
        prediction = predict_skin_disease(img)
        print(f"✅ Prediction: {prediction}")  # Debugging
        return {"prediction": prediction}
    except Exception as e:
        print(f"❌ Error during prediction: {e}")  # Debugging
        return {"error": str(e)}
