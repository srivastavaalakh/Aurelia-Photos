import express from 'express';
import { 
  uploadPost, 
  getUserPosts, 
  getAllPosts, 
  toggleLike, 
  sharePost 
} from '../controllers/postsController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/upload', protect, upload.single('image'), uploadPost);
router.get('/user', protect, getUserPosts);
router.get('/all', protect, getAllPosts); 
router.post('/like/:id', protect, toggleLike);
router.post('/share/:id', protect, sharePost);

export default router;
