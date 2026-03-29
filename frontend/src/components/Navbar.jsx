import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { logout } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import { MdHome, MdPhotoLibrary, MdUpload, MdLogin, MdPersonAdd, MdLogout } from "react-icons/md";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-white/10 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      
        <Link to="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <img 
            src="/vistagram.png" 
            alt="Vistagram Logo" 
            className="h-8 w-8"
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Vistagram
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-white/90 hover:text-white cursor-pointer">
            <Link to="/feed" className="flex items-center gap-1">
              <MdHome /> Home
            </Link>
          </motion.div>

          {user ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} className="flex items-center gap-1 text-white/90 hover:text-white cursor-pointer">
                <Link to="/gallary" className="flex items-center gap-1">
                  <MdPhotoLibrary /> My Gallery
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/upload"
                  className="flex items-center gap-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 px-3 py-1 rounded-md text-white shadow-md hover:shadow-lg transition"
                >
                  <MdUpload /> Upload
                </Link>
              </motion.div>

              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-white/90 hover:text-white cursor-pointer"
              >
                <MdLogout /> Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 text-white/90 hover:text-white cursor-pointer">
                <Link to="/login" className="flex items-center gap-1">
                  <MdLogin /> Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 text-white/90 hover:text-white cursor-pointer">
                <Link to="/signup" className="flex items-center gap-1">
                  <MdPersonAdd /> Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}