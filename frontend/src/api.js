import axios from "axios";

//const API_URL = "http://127.0.0.1:8000/predict/";  // FastAPI backend URL
const API_URL = "https://skin-disease-prediction-lfhq.onrender.com/predict";
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;  // Response from FastAPI
  } catch (error) {
    console.error("Error uploading image:", error);
    return { error: "Failed to upload image" };
  }
};
