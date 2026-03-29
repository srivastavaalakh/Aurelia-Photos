import { motion } from "framer-motion";
// Your image imports remain the same...
import img1 from '/img1.jfif';
import img2 from '/img2.jfif';
import img3 from '/img3.jfif';
import img4 from '/img4.jfif';
import img5 from '/img5.jfif';
import img6 from '/img6.jfif';
import img7 from '/img7.jfif';
import img8 from '/img8.jfif';
import img9 from '/img9.jfif';

const dummyPhotos = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

// ✨ 1. Define the unique styles for each photo
const photoStyles = [
  { top: '5%', left: '10%', rotate: -10, zIndex: 1, scale: 0.9 },
  { top: '15%', left: '65%', rotate: 5, zIndex: 2, scale: 1 },
  { top: '60%', left: '5%', rotate: 8, zIndex: 3, scale: 0.8 },
  { top: '30%', left: '30%', rotate: -5, zIndex: 4, scale: 1.1 },
  { top: '55%', left: '50%', rotate: 15, zIndex: 1, scale: 0.9 },
  { top: '0%', left: '40%', rotate: 2, zIndex: 2, scale: 1 },
  { top: '50%', left: '20%', rotate: -8, zIndex: 3, scale: 1 },
  { top: '35%', left: '0%', rotate: 12, zIndex: 2, scale: 0.85 },
  { top: '40%', left: '80%', rotate: 5, zIndex: 4, scale: 1.05 },
];


export default function IntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-pink-600 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-12 items-center">
        
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 text-white text-center lg:text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-6">
            Vistagram
          </h1>
          <p className="text-sm sm:text-lg mb-4 sm:mb-6">
            Explore, capture, and share your favorite moments with Vistagram.
            Create your gallery, browse the public feed, and connect with
            people through photos. Your memories, beautifully organized.
          </p>
          <a
            href="/signup"
            className="inline-block bg-white text-purple-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Get Started
          </a>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center items-center"
        >
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
            {dummyPhotos.map((photo, index) => {
              const style = photoStyles[index];
              return (
                <motion.div
                  key={photo} 
                  className="absolute overflow-hidden rounded-lg shadow-lg w-1/3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: 1, 
                    scale: style.scale,
                    rotate: style.rotate,
                    top: style.top,
                    left: style.left,
                    zIndex: style.zIndex,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: style.scale * 1.15, zIndex: 10, rotate: style.rotate * 0.5 }}
                >
                  <img
                    src={photo}
                    alt={`Collage photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}