import db from '../db.js';

// Upload a new post
export const uploadPost = async (req, res) => {
  try {
    const userId = req.user.id;
    const caption = req.body.caption || '';

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const imagePath = req.file.path.replace(/\\/g, '/');
    const sql = 'INSERT INTO posts (user_id, image_path, caption) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [userId, imagePath, caption]);

    res.status(201).json({ message: 'Post uploaded successfully', postId: result.insertId });
  } catch (err) {
    console.error('Upload Post Error:', err);
    res.status(500).json({ message: 'Failed to upload post.' });
  }
};

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const sql = `
      SELECT 
        p.*, 
        u.username,
        CASE WHEN pl.user_id IS NULL THEN 0 ELSE 1 END AS is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN post_likes pl ON pl.post_id = p.id AND pl.user_id = ?
      ORDER BY p.created_at DESC
    `;
    const [results] = await db.query(sql, [userId]);
    const mappedResults = results.map(p => ({ ...p, liked: p.is_liked === 1 }));
    res.json(mappedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts.' });
  }
};

// Get user posts
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const sql = `
      SELECT 
        p.*, 
        u.username,
        CASE WHEN pl.user_id IS NULL THEN 0 ELSE 1 END AS is_liked
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN post_likes pl ON pl.post_id = p.id AND pl.user_id = ?
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC
    `;
    const [results] = await db.query(sql, [userId, userId]);
    const mappedResults = results.map(p => ({ ...p, liked: p.is_liked === 1 }));
    res.json(mappedResults);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user posts.' });
  }
};

// Toggle like/unlike
export const toggleLike = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const connection = await db.getConnection();
  try {
    const [existing] = await connection.query(
      "SELECT * FROM post_likes WHERE post_id = ? AND user_id = ?",
      [postId, userId]
    );

    await connection.beginTransaction();

    if (existing.length > 0) {
      // Unlike
      await connection.query("DELETE FROM post_likes WHERE post_id = ? AND user_id = ?", [postId, userId]);
      await connection.query("UPDATE posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = ?", [postId]);
    } else {
      // Like
      await connection.query("INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)", [postId, userId]);
      await connection.query("UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?", [postId]);
    }

    const [countResult] = await connection.query("SELECT likes_count FROM posts WHERE id = ?", [postId]);
    await connection.commit();
    res.json({ postId, likes_count: countResult[0].likes_count });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Failed to toggle like.' });
  } finally {
    connection.release();
  }
};

// Share a post
export const sharePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    await connection.query("INSERT INTO post_shares (post_id, user_id) VALUES (?, ?)", [postId, userId]);
    await connection.query("UPDATE posts SET shares_count = shares_count + 1 WHERE id = ?", [postId]);

    await connection.commit();
    res.json({ postId, message: 'Post shared successfully' });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: 'Failed to share post.' });
  } finally {
    connection.release();
  }
};
