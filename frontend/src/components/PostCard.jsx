import { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { likePost } from "../features/posts/postsSlice";
import API from "../api/axios";
import { MdFavorite, MdShare, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

export default function PostCard({ post }) {
  const dispatch = useAppDispatch();
  const lastTapRef = useRef(0);

  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [animateHeart, setAnimateHeart] = useState(false);
  const [sharesCount, setSharesCount] = useState(post.shares_count);
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    setLiked(post.liked);
    setLikesCount(post.likes_count);
    setSharesCount(post.shares_count);
  }, [post.liked, post.likes_count, post.shares_count]);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);

    if (!liked) {
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 600);
    }

    dispatch(likePost(post.id));
  };

  const handleImageClick = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) handleLike();
    lastTapRef.current = now;
  };

  const handleShareClick = async () => {
    try {
     
      await API.post(`/posts/share/${post.id}`);
      setSharesCount(prev => prev + 1);
      setShowSharePopup(false);
      alert("Link copied to clipboard!");
      navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    } catch (err) {
      console.error("Failed to share post", err);
    }
  };

  const likeButtonClasses = `flex items-center gap-2 px-3 py-1 rounded-full shadow-md transition-all duration-300 ${
    liked
      ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
  }`;

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden w-full cursor-pointer transition">
      <div className="p-4 border-b border-white/20">
        <p className="font-bold text-white">@{post.username}</p>
        {post.created_at && (
          <p className="text-xs text-gray-400 mt-1">
            {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
          </p>
        )}
      </div>

      <div className="aspect-square w-full overflow-hidden relative" onClick={handleImageClick}>
        <img
          src={`${import.meta.env.VITE_API_BASE_URL}/${post.image_path}`}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />

        <AnimatePresence>
          {animateHeart && (
            <motion.div
              key="heart"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 flex justify-center items-center text-7xl pointer-events-none bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            >
              <MdFavorite className="drop-shadow-xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        {post.caption && <p className="text-gray-200 mb-3">{post.caption}</p>}
        <div className="flex justify-between items-center text-white/80">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleLike} className={likeButtonClasses}>
            <MdFavorite /> {likesCount}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-white/80 shadow-md"
            onClick={() => setShowSharePopup(true)}
          >
            <MdShare /> {sharesCount}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showSharePopup && (
          <motion.div
            key="sharePopup"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex justify-center items-center bg-black/50 z-50"
          >
            <div className="bg-white rounded-lg p-6 w-80 relative">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowSharePopup(false)}>
                <MdClose size={20} />
              </button>
              <p className="font-semibold mb-3">Share this post</p>
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/post/${post.id}`}
                className="w-full border rounded px-3 py-2 text-sm mb-4"
              />
              <button
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                onClick={handleShareClick}
              >
                Copy & Share
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
