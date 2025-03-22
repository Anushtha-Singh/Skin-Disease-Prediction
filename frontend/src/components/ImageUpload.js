import React, { useState } from "react";
import { uploadImage } from "../api";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    const result = await uploadImage(selectedFile);
    setPrediction(result.prediction || "Error in prediction");
  };

  return (
    <div>
      <h2>Skin Disease Detection</h2>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload & Predict</button>
      {prediction && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default ImageUpload;
