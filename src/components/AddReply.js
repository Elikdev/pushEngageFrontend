import React from "react"

function AddReply() {
  return (
    <div className="add-reply-container">
      <div className="add-reply border border-zinc-400 mt-10 px-2 py-4 drop-shadow-sm rounded-sm mb-[40px]">
        <h1 className="text-lg text-cyan-900 font-semibold">Add a reply</h1>
        <div className="input-group mt-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-cyan-600 w-full inline-block px-1 py-2 rounded-md"
          />
        </div>

        <div className="input-group mt-4">
          <textarea
            name=""
            id=""
            cols="25"
            rows="4"
            placeholder="comment"
            className="border border-cyan-600 px-2 py-1 w-full rounded-md inline-block"
          ></textarea>
        </div>

        <div className="input-btn mt-3">
          <button className="bg-cyan-700 text-white px-5 py-2 rounded-md font-semibold drop-shadow-md">
            Reply
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddReply
