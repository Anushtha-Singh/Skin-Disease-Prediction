import os
import numpy as np
import cv2
import joblib
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from tensorflow.keras.models import load_model
from keras.applications.vgg19 import VGG19, preprocess_input
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # React dev server URL (change if yours is different)
    "http://localhost",
    "http://127.0.0.1",
    "https://your-vercel-domain.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Load models at startup ---
skin_non_skin_model = joblib.load("models/skin_non_skin_classifier.pkl")
disease_model = load_model("models/6claass.h5")

vgg_model = VGG19(weights='imagenet', include_top=False, input_shape=(180, 180, 3))
for layer in vgg_model.layers:
    layer.trainable = False

# --- Disease class labels ---
CLASS_LABELS = [
    'Acne and Rosacea Photos',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Melanoma Skin Cancer Nevi and Moles',
    'Eczema Photos',
    'Atopic Dermatitis Photos',
    'Seborrheic Keratoses and other Benign Tumors'
]

# --- Preprocess image for both models ---
def prepare_for_skin_detection(image):
    image = cv2.resize(image, (64, 64))
    flat = image.flatten().reshape(1, -1)
    if flat.shape[1] < 12800:
        padding = np.zeros((1, 12800 - flat.shape[1]))
        flat = np.hstack((flat, padding))
    return flat

def prepare_for_disease_classification(image):
    image = cv2.resize(image, (180, 180))
    image = image / 255.0
    image = np.expand_dims(image, axis=0)
    features = vgg_model.predict(image)
    features = features.reshape(1, -1)
    return features

# --- Endpoint ---
@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        np_arr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if image is None:
            return JSONResponse(status_code=400, content={"error": "Invalid image format."})

        # Step 1: Skin vs Non-Skin
        flat_img = prepare_for_skin_detection(image)
        skin_pred = skin_non_skin_model.predict(flat_img)[0]

        if skin_pred == 0:
            return {"result": "Not a skin image."}

        # Step 2: If skin → Predict disease class
        disease_input = prepare_for_disease_classification(image)
        probs = disease_model.predict(disease_input)[0]
        predicted_index = int(np.argmax(probs))
        confidence = float(probs[predicted_index])

        return {
            "result": "Skin Detected",
            "disease": CLASS_LABELS[predicted_index],
            "confidence": round(confidence, 3),
            "probabilities": {
                CLASS_LABELS[i]: round(float(prob), 3)
                for i, prob in enumerate(probs)
            }
        }

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
