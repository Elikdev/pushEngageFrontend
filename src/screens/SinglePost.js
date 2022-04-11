import React from 'react'
import Comment from '../components/Comment'

function SinglePost() {
  return (
    <div className="post-container w-[90%] sm:w-[60%] mx-auto  mt-[40px]">
      <div className="post">
        <h1 className="title font-semibold text-[#686868] text-xl mb-7">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, suscipit.</h1>
        <p className="content text-sm text-[#333}">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In illum nemo quam ratione sit, dolore quasi nisi autem porro veniam incidunt libero laborum accusamus minima pariatur iste officiis quibusdam ea.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil deleniti deserunt repellendus enim dolores veritatis eos molestiae, maiores aliquid fugit nam sint praesentium perspiciatis tempore voluptatem quis laborum quae cumque dolor possimus. Repellat, quidem autem unde dicta excepturi corporis. Aut, nobis. Officia dignissimos temporibus, tenetur, consectetur explicabo quasi sapiente odio cumque fugiat sit aspernatur praesentium, sint architecto recusandae. Natus nesciunt, porro incidunt eveniet ea, itaque illum maiores minus doloremque libero rerum? Maxime debitis fuga dicta eum. Saepe voluptatum fugiat vel dicta veniam, quas at ipsam. Cupiditate ex aut dolore.
        </p>
      </div>
      <div className="add-comment border border-zinc-400 mt-10 px-2 py-4 drop-shadow-sm rounded-sm mb-[40px]">
        <h1 className='text-lg text-cyan-900 font-semibold'>Add a comment</h1>
        <div className="input-group mt-4">
          <input type="text" placeholder='Name' className='border border-cyan-600 w-full inline-block px-2 py-2 rounded-md' />
        </div>

        <div className="input-group mt-4">
          <textarea name="" id="" cols="25" rows="5" placeholder='comment' className='border border-cyan-600 px-2 py-2 w-full rounded-md inline-block'></textarea>
        </div>

        <div className="input-btn mt-3">
          <button className='bg-cyan-700 text-white px-6 py-3 rounded-md font-semibold drop-shadow-md'>Submit</button>
        </div>
      </div>

      {/* Comments and replies */}
      <div>
        <aside><Comment replies={2}/></aside>
        <aside><Comment/></aside>
      </div>
    </div>

    
  )
}

export default SinglePost