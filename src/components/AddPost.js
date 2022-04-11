import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {HiX } from "react-icons/hi"
import { addPost } from '../features/posts/postSlice'

function AddPost({ setformActive, showForm}) {
 const [title, setTitle] = useState("")
 const [content, setContent] = useState("")
 const dispatch = useDispatch()

 const handleSubmit = (e) => {
  e.preventDefault()
  if(title && content) {
   dispatch(addPost({title, content}))
   setContent("")
   setTitle("")
  }
 }

  return (
   <div
   className={`add-new-post ${
     !showForm ? "hidden" : ""
   } absolute top-8 left-0 sm:right-0 z-10 mt-[40px] w-full sm:w-[50%] mx-auto bg-slate-900 flex justify-center items-center py-6`}
 >
   <form className="w-[80%] mx-auto relative" onSubmit={handleSubmit}>
     <HiX
       className="border-2 border-cyan-500 rounded w-5 hidden sm:block absolute right-[-50px] top-[-24px] cursor-pointer"
       onClick={setformActive}
     />
     <div className="input-group mb-4">
       <label className="block mb-1 font-semibold">Title</label>
       <input
         className="inline-block text-black px-2 py-2 rounded-md w-full"
         type="text"
         onChange={(e) => setTitle(e.target.value)}
         value={title}
       />
     </div>

     <div className="input-group mb-4">
       <label className="block mb-1 font-semibold">Content</label>
       <textarea
         name=""
         id=""
         cols="25"
         rows="5"
         className="text-black w-full px-2"
         onChange={(e) => setContent(e.target.value)}
       ></textarea>
     </div>

     <div className="my-2 text-center">
       <button className="border-2 border-cyan-500 rounded-md p-2 font-bold text-zinc-300">
         Add new post
       </button>
     </div>
   </form>
 </div>
  )
}

export default AddPost