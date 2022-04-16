import React, {useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {HiOutlineChevronDown} from "react-icons/hi"
import { useParams } from 'react-router-dom'
import AddReply from './AddReply'
import dayjs from 'dayjs'
import axios from "axios"
import { fetchReply } from '../features/comments/commentSlice'

const imagURL = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'
const baseUrl = "https://pushengage.herokuapp.com/api/v1"

function Reply({replyId, parentId}) {
 const [showAddReply, setShowAddReply] = useState(false)
 const [currReply, setCurrReply] = useState({})
 const dispatch = useDispatch()
 const {reply_data} = useSelector((state)=>state.comment)



 useEffect(()=>{
   if (reply_data){
   setCurrReply(reply_data[replyId]?.data)
   }
 }, [reply_data])

 useEffect(() => {
    dispatch(fetchReply({parentId,replyId}))
 }, [])



 const handleShowAddReply = () => setShowAddReply(!showAddReply)
  return (
   <>
    <div className={`reply-container px-3 py-5 rounded-md drop-shadow-xl border mb-10 bg-blue-100`}>
     <div className="header-section flex items-start mb-6">
      <div className="img-thumb relative w-[50px] h-[50px] overflow-hidden rounded-[50%] mr-4">
       <img src={imagURL} alt="" className='w-full h-full' />
      </div>
      <div className="name-sect">
      <p className="name text-cyan-600 font-bold ">{currReply?.name || "Anonymous"}</p>
      <p className="date-time text-[10px] text-neutral-400 font-semibold">{currReply?.createdAt ? dayjs(currReply?.createdAt).format("MMMM DD, YYYY  h:mm A") : ""}</p>
      </div>
     </div>
     <div className="reply-content text-base">
      {currReply?.comment}
     </div>

     <div className="reply-button mt-4" onClick={handleShowAddReply}>
      <button className="reply-btn inline text-cyan-500 font-medium mr-2">Reply</button>
      <small className='inline text-cyan-500 font-medium cursor-pointer'>(<HiOutlineChevronDown className={`inline ml-0 ${showAddReply ? "rotate-180": ""}`}/>{currReply?.children?.length})</small>
     </div>
    </div>

    {currReply?.children?.length >= 1 ? (
     <>
     {showAddReply && <AddReply postId={currReply?.postId} parentId={currReply?._id} />}
    {showAddReply && <main className={`ml-5 border-l border-l-neutral-300 mt-[-40px] mb-2 pt-10 pb-2 pl-4`}>
      {currReply?.children?.map((data) => <Reply key={data} replyId={data} parentId={currReply?._id}  />)}
   </main>}
   </>
   ) : (showAddReply && <AddReply postId={currReply?.postId} parentId={currReply?._id} />)}
    </>
  )
}

export default Reply