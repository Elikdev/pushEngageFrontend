import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const baseUrl = "https://pushengage.herokuapp.com/api/v1"

export const fetchCommentReplies = createAsyncThunk(
 "comment/fetchCommentReplies",
 async ({postId, commentId}, thunkAPI) => {
  try {
   const {data} =  await axios.get(`${baseUrl}/posts/${postId}/comments/${commentId}?item=replies`)

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
 return thunkAPI.rejectWithValue(message);
  }
 }
)

export const commentSlice = createSlice({
 name: "comment",
 initialState: {loading: false, comment_data: {}, error: {}},
 extraReducers: {
  [fetchCommentReplies.pending]: (state, action) => {
   state.loading = true
  },
  [fetchCommentReplies.fulfilled]: (state, action) => {
   state.loading = false
   state.comment_data = action.payload
  },
  [fetchCommentReplies.rejected]: (state, action) => {
   state.loading = false
   state.error = action.payload
  },
 }
})


export default commentSlice.reducer