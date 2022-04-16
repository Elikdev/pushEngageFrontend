import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const baseUrl = "https://pushengage.herokuapp.com/api/v1"

export const fetchReply = createAsyncThunk(
 "comment/fetchReply",
 async ({parentId, replyId}, thunkAPI) => {
  try {
   const {data} =  await axios.get(`${baseUrl}/posts/${parentId}/comments/${replyId}`)
   const returnData = {}
   returnData[replyId] = data
   return returnData
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

export const addReplyToComment = createAsyncThunk(
  "comment/addReplyToComment",
  async ({parentId, comment, postId, parentType}, thunkAPI) => {
   try {
    const {data} =  await axios.post(`${baseUrl}/posts/${postId}/comments`, {parentId, comment})
    return {data, parentType}
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
 initialState: {loading: false, reply_data: {}, comment_res_loading: false, comment_res_data:{}, comment_res_error: {}, error: {}},
 extraReducers: {
  [fetchReply.pending]: (state, action) => {
   state.loading = true
  },
  [fetchReply.fulfilled]: (state, action) => {
   state.loading = false
   state.reply_data = {...state.reply_data, ...action.payload}
  },
  [fetchReply.rejected]: (state, action) => {
   state.loading = false
   state.error = action.payload
  },
  [addReplyToComment.pending]: (state, action) => {
    state.loading = true
   },
   [addReplyToComment.fulfilled]: (state, action) => {
    state.comment_res_loading = false
    const res_data = action.payload.data?.data || {}
    const reply_id = res_data.parentId
    const parentType= action.payload.parentType;
    if (reply_id){
      const old_reply_data = {...(state.reply_data[reply_id])};
      old_reply_data.data.children.push(res_data._id)
      const new_state_data = {...state.reply_data}
      new_state_data[reply_id] = old_reply_data
      state.reply_data = new_state_data;
    }
    state.comment_res_error = {}
   },
   [addReplyToComment.rejected]: (state, action) => {
    state.comment_res_loading = false
    state.comment_res_error = action.payload
    state.comment_res_data = {}
   },
 }
})


export default commentSlice.reducer