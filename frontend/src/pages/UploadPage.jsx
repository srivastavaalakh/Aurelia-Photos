import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [cameraOpen, setCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleOpenCamera = async () => {
    setCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (err) {
      console.error("Camera not accessible", err);
      setError("Cannot access camera. Please allow camera permissions.");
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const imageFile = new File([blob], "photo.jpg", { type: "image/jpeg" });
      setFile(imageFile);
      setPreview(URL.createObjectURL(blob));
    });

    video.srcObject.getTracks().forEach(track => track.stop());
    setCameraOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please add a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await API.post("/posts/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Post uploaded successfully!");
      navigate("/gallary");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to upload post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start p-4 bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6">
        <h1 className="text-2xl font-extrabold text-center text-white mb-6">Create a New Post</h1>

        <AnimatePresence>
          {cameraOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-2xl"
              >
                <video ref={videoRef} className="w-full h-64 object-cover rounded-lg mb-4" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleCapture}
                  className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded font-bold transition"
                >
                  Capture Photo
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          {preview && (
            <motion.img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <motion.button
            type="button"
            onClick={handleOpenCamera}
            whileHover={{ scale: 1.03 }}
            className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-800 text-white p-2 rounded transition"
          >
            📸 Open Camera
          </motion.button>

          <p className="text-center text-gray-200">- OR -</p>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Select a file from your device
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                if (selectedFile) {
                  setFile(selectedFile);
                  setPreview(URL.createObjectURL(selectedFile));
                  setError("");
                }
              }}
              className="border w-full p-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full border p-2 rounded h-24"
            required
          ></textarea>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white p-2 rounded font-bold shadow-md hover:shadow-lg transition"
          >
            Upload Post
          </motion.button>
        </form>

        <canvas ref={canvasRef} className="hidden"></canvas>
      </div>
    </div>
  );
}
