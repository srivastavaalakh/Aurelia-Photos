import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { createPost } from "../features/posts/postsSlice";
import { useNavigate } from "react-router-dom";

export default function UploadForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await dispatch(createPost(formData)).unwrap(); 
      setImage(null);
      setCaption("");
      navigate("/gallary"); 
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload the post. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => setImage(e.target.files[0])}
        className="block w-full border p-2"
      />
      <textarea
        placeholder="Enter caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="w-full border p-2"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </form>
  );
}
