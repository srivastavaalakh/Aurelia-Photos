import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signup } from "../../features/auth/authSlice";
import { motion } from "framer-motion";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup({ username, email, password })).unwrap();
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (signupError) {
      console.error(signupError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-white text-center mb-6"
        >
          Create Account ✨
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.03 }} className="relative flex items-center">
            <MdPerson className="absolute left-3 text-gray-300 text-xl" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.03 }} className="relative flex items-center">
            <MdEmail className="absolute left-3 text-gray-300 text-xl" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.03 }} className="relative flex items-center">
            <MdLock className="absolute left-3 text-gray-300 text-xl" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white shadow-lg hover:shadow-emerald-500/50 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </motion.button>
        </form>

        <p className="text-center text-gray-200 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:text-pink-300 transition">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
