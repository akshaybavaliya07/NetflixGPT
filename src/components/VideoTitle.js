import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='absolute text-white px-10 py-60 w-screen ml-8'>
      <h1 className='font-bold text-5xl'>{ title }</h1>
      <p className='w-3/12 mt-5 text-justify'>{ overview }</p>
      <div className='mt-10'>
        <button className='text-black bg-white font-bold py-2 px-5 rounded-md hover:bg-opacity-80'>▶️ Play</button>
        <button className='text-white bg-gray-400 bg-opacity-80 ml-2 py-2 px-6 rounded-md'>ℹ️ More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle