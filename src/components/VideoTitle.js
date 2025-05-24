import React, { useState } from 'react';
import MovieModal from './MovieModal';
import { API_OPTIONS } from '../utils/constants';

const VideoTitle = ({movie}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  
    const handleOpenModal = async () => {
      const data = await fetchMovieDetailsWithCredits(movie.id);
      setShowModal(true);
      setSelectedMovie(data);
    };
  
    const fetchMovieDetailsWithCredits = async (movieId) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits`,
        API_OPTIONS
      );
      return await res.json();
    };

  return (
    <div className='absolute text-white px-10 py-60 w-screen ml-8'>
      <h1 className='font-bold text-5xl'>{ movie.title }</h1>
      <p className='w-3/12 mt-5 text-justify'>{ movie.overview }</p>
      <div className='mt-10'>
        <button className='text-black bg-white font-bold py-2 px-5 rounded-md hover:bg-opacity-80'>▶️ Play</button>
        <button className='text-white bg-gray-400 bg-opacity-80 ml-2 py-2 px-6 rounded-md' onClick={handleOpenModal} >ℹ️ More Info</button>
      </div>
      {showModal && <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default VideoTitle