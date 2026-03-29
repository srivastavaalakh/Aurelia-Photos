import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

const initialState = {
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
};


export const fetchPosts = createAsyncThunk("posts/fetchAll", async (_, thunkAPI) => {
  try {
    const response = await API.get("/posts/all");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch posts.");
  }
});

export const fetchUserPosts = createAsyncThunk("posts/fetchUser", async (_, thunkAPI) => {
  try {
    const response = await API.get("/posts/user");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to fetch user posts.");
  }
});

export const likePost = createAsyncThunk("posts/like", async (postId, thunkAPI) => {
  try {
    const response = await API.post(`/posts/like/${postId}`);
    return { postId, likes_count: response.data.likes_count };
  } catch (error) {
    return thunkAPI.rejectWithValue("Failed to like post.");
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      })

      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, likes_count } = action.payload;
        const updatePost = (arr) => {
          const post = arr.find(p => p.id === postId);
          if (post) {
            post.likes_count = likes_count;
            post.liked = !post.liked;
          }
        };
        updatePost(state.posts);
        updatePost(state.userPosts);
      });
  },
});

export default postsSlice.reducer;
