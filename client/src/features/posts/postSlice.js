import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading : false,
    error : null,
    posts : []
}


export const getPosts = createAsyncThunk("post/getPosts", async (query) => {
    try {
        const posts = await axios.get(`/api/post/get_posts/${query}`);
        return posts
    } catch (error) {
        console.log(error)
    }
});

const postSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {

    }
});


export default postSlice.reducer;