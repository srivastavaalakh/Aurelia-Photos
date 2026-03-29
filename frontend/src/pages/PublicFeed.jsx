import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
import PostCard from "../components/PostCard";
import { motion } from "framer-motion";
import { MdPublic, MdSort } from "react-icons/md";

export default function PublicFeed() {
  const dispatch = useDispatch();
  const realPosts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedUser, setSelectedUser] = useState("all");

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  const uniqueUsers = useMemo(
    () => ["all", ...new Set(realPosts.map((p) => p.username))],
    [realPosts]
  );

  const filteredPosts = useMemo(() => {
    let result = [...realPosts];
    if (selectedUser !== "all") {
      result = result.filter((p) => p.username === selectedUser);
    }
    if (sortOrder === "newest") {
      result.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else {
      result.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
    }
    return result;
  }, [realPosts, sortOrder, selectedUser]);

  if (loading)
    return (
      <p className="text-center mt-12 text-lg text-gray-200 animate-pulse">
        Loading feed...
      </p>
    );

  if (error)
    return (
      <p className="text-center mt-12 text-red-400">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
      >
        <div className="flex items-center gap-2">
          <MdPublic className="text-yellow-300 text-3xl" />
          <h1 className="text-3xl font-extrabold text-white">Public Feed</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-white">
            <MdSort />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent outline-none"
            >
              <option className="text-black" value="newest">Newest</option>
              <option className="text-black" value="oldest">Oldest</option>
            </select>
          </div>

          <div className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-lg text-white">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="bg-transparent outline-none"
            >
              {uniqueUsers.map((u) => (
                <option key={u} value={u}>
                  {u === "all" ? "All Users" : u}
                </option>
              ))}
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id || post.temp_id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && !loading && (
        <p className="text-center text-gray-200 mt-12">
          No posts found.
        </p>
      )}
    </div>
  );
}