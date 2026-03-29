import { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserPosts } from "../features/posts/postsSlice";
import { motion, AnimatePresence } from "framer-motion";
import { MdPhotoLibrary, MdClose, MdSort, MdShare } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function Gallery() {
  const dispatch = useAppDispatch();
  const { userPosts, loading, error } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const [selectedPost, setSelectedPost] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [currentSharePost, setCurrentSharePost] = useState(null);

  useEffect(() => {
    if (user) dispatch(fetchUserPosts());
  }, [dispatch, user]);

  const sortedPosts = useMemo(() => {
    const sorted = [...userPosts];
    if (sortOrder === "newest") {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    }
    return sorted;
  }, [userPosts, sortOrder]);

  if (loading) return <p className="text-center mt-8 text-lg text-gray-300">Loading your gallery...</p>;
  if (error) return <p className="text-center text-red-400 mt-8">{error}</p>;
  if (!user) return <p className="text-center mt-8 text-gray-300">Please log in to see your gallery.</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2">
          <MdPhotoLibrary className="text-pink-300 text-3xl" />
          <h1 className="text-3xl font-extrabold text-white">My Gallery</h1>
        </div>
        {userPosts.length > 0 && (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-white">
            <MdSort />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="bg-transparent outline-none">
              <option className="text-black" value="newest">Newest First</option>
              <option className="text-black" value="oldest">Oldest First</option>
            </select>
          </div>
        )}
      </motion.div>

      {sortedPosts.length === 0 ? (
        <p className="text-center text-gray-400">No posts yet. Start uploading!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sortedPosts.map((post, idx) => (
            <motion.div key={post.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05, duration: 0.5 }} className="relative aspect-square rounded-xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => setSelectedPost(post)}>
              <img src={`${import.meta.env.VITE_API_BASE_URL}/${post.image_path}`} alt={post.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <motion.div initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-sm p-2 backdrop-blur-md transition" onClick={() => setSelectedPost(post)}>
                <p>{post.caption || "No caption"}</p>
                <div className="flex items-center gap-3 mt-1 text-lg">
                  <div className="flex items-center gap-1 text-pink-300 font-semibold">
                    <FaHeart /> <span>{post.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCurrentSharePost(post); setShowSharePopup(true); }}>
                    <MdShare /> <span>{post.shares_count}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mt-1">{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(post.created_at))}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.3 }} className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-2xl max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedPost(null)} className="absolute top-3 right-3 text-white text-2xl hover:text-pink-400 transition">
                <MdClose />
              </button>
              <img src={`${import.meta.env.VITE_API_BASE_URL}/${selectedPost.image_path}`} alt={selectedPost.caption} className="w-full max-h-[75vh] object-contain rounded-lg" />
              <div className="text-center text-white mt-4">
                {selectedPost.caption && <p>{selectedPost.caption}</p>}
                <div className="flex items-center justify-center gap-4 mt-2 text-lg">
                  <div className="flex items-center gap-1 text-pink-400 font-semibold"><FaHeart /> {selectedPost.likes_count}</div>
                  <div className="flex items-center gap-1 text-blue-400 font-semibold"><MdShare /> {selectedPost.shares_count}</div>
                </div>
                <p className="text-sm text-gray-400 mt-2">Posted on {new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(selectedPost.created_at))}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSharePopup && currentSharePost && (
          <motion.div key="sharePopup" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 relative">
              <button className="absolute top-2 right-2 text-gray-500" onClick={() => setShowSharePopup(false)}><MdClose size={20} /></button>
              <p className="font-semibold mb-3">Share this post</p>
              <input type="text" readOnly value={`${window.location.origin}/post/${currentSharePost.id}`} className="w-full border rounded px-3 py-2 text-sm mb-4" />
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" onClick={async () => {
                try {
                  await API.post(`/posts/share/${currentSharePost.id}`);
                  setCurrentSharePost(prev => ({ ...prev, shares_count: prev.shares_count + 1 }));
                  setShowSharePopup(false);
                  navigator.clipboard.writeText(`${window.location.origin}/post/${currentSharePost.id}`);
                } catch (err) {
                  console.error("Failed to share post", err);
                }
              }}>Copy & Share</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
