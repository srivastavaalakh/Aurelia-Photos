// import mysql from 'mysql2/promise';


//   // Insert dummy users
//   const users = [
//     { username: 'alice', email: 'alice@example.com', password: '123456' },
//     { username: 'bob', email: 'bob@example.com', password: '123456' },
//     { username: 'charlie', email: 'charlie@example.com', password: '123456' },
//     { username: 'diana', email: 'diana@example.com', password: '123456' },
//     { username: 'eve', email: 'eve@example.com', password: '123456' },
//   ];

//   const userIds = [];
//   for (let u of users) {
//     const [result] = await connection.query(
//       'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
//       [u.username, u.email, u.password]
//     );
//     userIds.push(result.insertId);
//   }

//   const captions = [
//     'Beautiful day!',
//     'Loving this view.',
//     'Sunset vibes.',
//     'Coffee time ☕',
//     'Weekend mood.',
//     'Nature at its best.',
//     'Exploring the city.',
//     'Feeling blessed.',
//     'Chilling with friends.',
//     'Adventure time!',
//     'Travel diaries.',
//     'Good vibes only.',
//     'Life is beautiful.',
//     'Happy moments.',
//     'Stay positive!',
//   ];

//   // Local images folder (must exist in public/images/)
//   const localImages = Array.from({ length: 10 }, (_, i) => `images/img${i + 1}.jpg`);

//   const postIds = [];
//   for (let i = 0; i < 30; i++) {
//     const user_id = userIds[Math.floor(Math.random() * userIds.length)];
//     const caption = captions[Math.floor(Math.random() * captions.length)];

//     // Randomly decide: 50% chance local image, 50% Unsplash
//     const image_path = Math.random() < 0.5
//       ? localImages[Math.floor(Math.random() * localImages.length)]
//       : `https://source.unsplash.com/random/800x600?sig=${i}`;

//     const [result] = await connection.query(
//       'INSERT INTO posts (user_id, image_path, caption) VALUES (?, ?, ?)',
//       [user_id, image_path, caption]
//     );
//     postIds.push(result.insertId);
//   }

//   // Insert random likes
//   for (let postId of postIds) {
//     const likedUsers = [];
//     const likeCount = Math.floor(Math.random() * users.length); // 0 to 4 likes
//     while (likedUsers.length < likeCount) {
//       const randUser = userIds[Math.floor(Math.random() * userIds.length)];
//       if (!likedUsers.includes(randUser)) likedUsers.push(randUser);
//     }
//     for (let userId of likedUsers) {
//       await connection.query('INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)', [
//         postId,
//         userId,
//       ]);
//       await connection.query('UPDATE posts SET likes_count = likes_count + 1 WHERE id = ?', [postId]);
//     }
//   }

//   console.log('Database seeded successfully with 30 posts (local + external images)!');
//   await connection.end();
// }

// seed().catch((err) => console.error(err));
