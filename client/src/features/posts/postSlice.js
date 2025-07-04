import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: null,
  posts: [],
  postIdeas: [],
};

export const getPosts = createAsyncThunk("post/getPosts", async (query) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/post/get_posts/${query}`, {withCredentials : true}
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const generatePostIdeas = createAsyncThunk(
  "post/generatePostIdeas",
  async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/generate_post_ideas`,
        {
          topics: "React.js, Next.js, Travel, Programming, Health",
        }, {withCredentials : true}
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generatePostIdeas.pending, (state, action) => {
        state.postIdeas = null;
      })
      .addCase(generatePostIdeas.fulfilled, (state, action) => {
        state.postIdeas = action.payload;
      });
  },
});

export default postSlice.reducer;
