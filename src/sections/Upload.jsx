import React, { useState, useRef } from 'react';
import './css/Upload.css';

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isCamera, setIsCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      setPrediction(null);
    }
  };

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCamera(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
        setImageFile(new File([blob], "captured.jpg", { type: 'image/jpeg' }));

        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }

        setIsCamera(false);
      }, 'image/jpeg');
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCamera(false);
  };

  const handlePredict = async () => {
    if (!image) {
      alert("Please upload or capture an image first");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const res = await fetch(image);
      const blob = await res.blob();
      formData.append("file", blob, "image.jpg");

      const response = await fetch("https://derma-skin-scan-backend.onrender.com", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.disease) {
        setPrediction({
          disease: "No recognizable skin condition detected",
          confidence: 0,
          description: "The uploaded image does not match any known skin conditions.",
        });
      } else {
        setPrediction({
          disease: result.disease,
          confidence: Math.round(result.confidence * 100), // percentage
          description: "Prediction successful",
        });
      }
  
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction({
        disease: "Prediction failed",
        confidence: 0,
        description: "Could not analyze the image. Please try another image or check backend.",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setImage(null);
    setImageFile(null);
    setPrediction(null);
  };

  return (
    <section id="upload" className="upload-section">
      <div className="upload-container">
        <h2>Upload an Image for Analysis</h2>
        <p>Get instant predictions by uploading a skin image or capturing one with your camera</p>

        <div className="upload-options">
          <div className="upload-method">
            <div className="upload-icon"><i className="file-icon"></i></div>
            <label className="upload-btn">
              Choose File
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {image && !isCamera && (
          <div className="preview-container">
            <div className="image-preview">
              <img src={image} alt="Preview" />
              <button className="reset-btn" onClick={resetUpload}>×</button>
            </div>

            {!prediction && !loading && (
              <button className="predict-btn" onClick={handlePredict}>Analyze Image</button>
            )}

            {loading && (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Analyzing image...</p>
              </div>
            )}

            {prediction && (
              <div className="prediction-result">
                <h3>Analysis Results</h3>
                <div className="result-card">
                  <div className="result-header">
                    <h4>{prediction.disease}</h4>
                    <span className="confidence">{prediction.confidence}% confident</span>
                  </div>
                  <p>{prediction.description}</p>
                  <button className="analyze-again" onClick={resetUpload}>
                    Analyze Another Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Upload;
