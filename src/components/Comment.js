import React, {useState, useEffect} from 'react'
import {HiOutlineChevronDown} from "react-icons/hi"
import AddReply from './AddReply'
import Reply from './Reply'

const imagURL = 'https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png'

function Comment({replies}) {
 const [showAddReply, setShowAddReply] = useState(false)

 const handleShowAddReply = () => setShowAddReply(!showAddReply)

  return (
   <>
   <div className={`reply-container px-3 py-5 rounded-md drop-shadow-xl border mb-10`}>
   <div className="header-section flex items-start mb-6">
    <div className="img-thumb relative w-[50px] h-[50px] overflow-hidden rounded-[50%] mr-4">
     <img src={imagURL} alt="" className='w-full h-full' />
    </div>
    <div className="name-sect">
    <p className="name text-cyan-600 font-bold ">Bob</p>
    <p className="date-time text-[10px] text-neutral-400 font-semibold">June 25, 2021 AT 5:46 AM</p>
    </div>
   </div>
   <div className="reply-content text-base">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam voluptas exercitationem sed optio voluptatibus quo hic rerum libero consectetur!
   </div>

   <div className="reply-button mt-4" onClick={() => handleShowAddReply()}>
    <button className="reply-btn inline text-cyan-500 font-medium mr-2">Reply</button>
    <small className='inline text-cyan-500 font-medium cursor-pointer'>(<HiOutlineChevronDown  className={`inline ml-0 ${showAddReply ? "rotate-180": ""}`}/>2)</small>
   </div>
  </div>
   
   {replies ? (
    <>
    {showAddReply && <AddReply/>}
    <main className={`ml-5 border-l ${showAddReply && replies ? "" : "hidden"} border-l-neutral-300 mt-[-40px] mb-2 pt-10 pb-2 pl-4`}>
   <aside><Reply replies={1} /></aside>
   <aside><Reply /></aside>
   </main>
   </>
   ) : (showAddReply && <AddReply/>)}
  </>
  )
}

export default Comment