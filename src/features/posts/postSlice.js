import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const baseUrl = "https://pushengage.herokuapp.com/api/v1"

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async ({ limit, page }, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/posts?page=${page}&limit=${limit}`
      )

      return data
    } catch (error) {
      const message = error
        ? error.response
          ? error.response.data
            ? error.response.data.message
              ? error.response.data.message
              : "failed to complete the request"
            : "error in sending request"
          : error.message || "error in sending request"
        : null
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const fetchPostbyId = createAsyncThunk(
  "post/fetchPostById",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await axios.get(`${baseUrl}/posts/${id}`)

      return data
    } catch (error) {
      const message = error
        ? error.response
          ? error.response.data
            ? error.response.data.message
              ? error.response.data.message
              : "failed to complete the request"
            : "error in sending request"
          : error.message || "error in sending request"
        : null
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addPost = createAsyncThunk(
  "post/addPosts",
  async ({ title, content }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/posts`, { title, content })

      return data
    } catch (error) {
      const message = error
        ? error.response
          ? error.response.data
            ? error.response.data.message
              ? error.response.data.message
              : "failed to complete the request"
            : "error in sending request"
          : error.message || "error in sending request"
        : null
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const addCommentToPost = createAsyncThunk(
  "comment/addCommentToPost",
  async ({ comment, postId }, thunkAPI) => {
    try {
      const { data } = await axios.post(`${baseUrl}/posts/${postId}/comments`, {
        comment,
      })
      return data
    } catch (error) {
      const message = error
        ? error.response
          ? error.response.data
            ? error.response.data.message
              ? error.response.data.message
              : "failed to complete the request"
            : "error in sending request"
          : error.message || "error in sending request"
        : null
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const postSlice = createSlice({
  name: "post",
  initialState: {
    loading: false,
    post_data: {},
    post_form_res: {},
    post_form_loading: false,
    post_form_error: {},
    post_data_res: {},
    post_data_loading: false,
    post_data_error: {},
    error: {},
    post_comment_loading: false,
    post_comment_data: {},
    post_comment_error: {}
  },
  //  reducers: {
  //  },

  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.loading = true
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false
      state.post_data = action.payload
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    [addPost.pending]: (state, action) => {
      state.post_form_loading = true
    },
    [addPost.fulfilled]: (state, action) => {
      state.post_form_loading = false
      state.post_form_res = action.payload
      state.post_form_error = {}
    },
    [addPost.rejected]: (state, action) => {
      state.post_form_loading = false
      state.post_form_error = action.payload
      state.post_form_res = {}
    },
    [fetchPostbyId.pending]: (state, action) => {
      state.post_data_loading = true
    },
    [fetchPostbyId.fulfilled]: (state, action) => {
      state.post_data_loading = false
      state.post_data_res = action.payload
      state.post_data_error = {}
    },
    [fetchPostbyId.rejected]: (state, action) => {
      state.post_data_loading = false
      state.post_data_error = action.payload
      state.post_data_res = {}
    },
    [addCommentToPost.pending]: (state, action) => {
      state.post_comment_loading = true
    },
    [addCommentToPost.fulfilled]: (state, action) => {
      state.post_comment_loading = false
      state.post_comment_data = action.payload
      const old_post_data = {...state?.post_data_res}
      const old_comment_data = old_post_data?.data?.comments
      const new_comment_data = [action.payload.data, ...old_comment_data ]
      state.post_data_res.data.comments = new_comment_data
      state.post_comment_error = {}
    },
    [addCommentToPost.rejected]: (state, action) => {
      state.post_comment_loading = false
      state.post_comment_error = action.payload
      state.post_comment_data = {}
    },
  },
})

export default postSlice.reducer
