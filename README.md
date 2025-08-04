# DermaScan – Skin Disease Detection Using AI

DermaScan is an AI-powered web application that helps users analyze skin conditions through image uploads. It uses deep learning to classify skin diseases and distinguish skin vs non-skin images. The system consists of a React frontend and a FastAPI backend deployed on Vercel and Render, respectively.

---

## Features

- Detects 6 types of common skin conditions.
- Upload or capture images via camera.
- Shows disease name, confidence score, and class-wise probabilities.
- Fully deployed online:
  - Frontend: [Live Site](https://derma-skin-scan.vercel.app)
  - Backend: [Render Backend](https://derma-skin-scan-backend.onrender.com)

---

## Disease Categories

1. Acne and Rosacea  
2. Fungal Infections (Ringworm, Candidiasis)  
3. Melanoma, Nevi, and Moles  
4. Eczema  
5. Atopic Dermatitis  
6. Seborrheic Keratoses and Benign Tumors

---

## Tech Stack

| Frontend     | Backend       | ML/AI        |
|--------------|---------------|--------------|
| React.js     | FastAPI       | VGG19 (Keras)|
| HTML + CSS   | Uvicorn Server| Scikit-learn |
| Vercel       | Render        | OpenCV       |

---

## How It Works

1. Upload or capture a skin image.  
2. App checks if the image is of skin.  
3. If yes, predicts the disease using a trained deep learning model.  
4. Displays the result and confidence level.

---

## Getting Started (for Local Setup)

### Frontend

cd sdp
npm install
npm start

### Backend

cd server
pip install -r requirements.txt
uvicorn app:app --reload

---

## Model Details

- **Skin vs Non-Skin Classifier:** Classical ML model using SVC with flattened pixel input.  
- **Disease Classifier:** VGG19-based feature extractor + custom dense layers trained on 6 skin disease categories.

---

## CORS Configuration

The FastAPI backend uses CORSMiddleware to allow cross-origin requests from:

- http://localhost:3000  
- https://derma-skin-scan.vercel.app  

---

## Sample Result

| Image    | Prediction | Confidence |
|----------|------------|------------|
| Eczema   | 92.4%      |  

---

## Deployment

| Service   | URL                                      |
|-----------|------------------------------------------|
| Frontend  | https://derma-skin-scan.vercel.app       |
| Backend   | https://derma-skin-scan-backend.onrender.com |

---

## Developed by

Anushtha Singh Kushwah  
Mohan Manjhi
Harshita Bamaniya
Shivani Choudhary
Shreyash Tiwari
