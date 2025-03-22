import axios from "axios";

const API_URL = "https://skin-disease-prediction-4pfl.onrender.com";  // FastAPI backend URL

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
