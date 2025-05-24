import React, { useState } from 'react'
import { API_OPTIONS, IMG_CDN_URL } from '../utils/constants'
import MovieModal from './MovieModal';

const MovieCard = ({ movieId ,posterPath, onClose }) => {

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = async () => {
    const data = await fetchMovieDetailsWithCredits(movieId);
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


  return posterPath && (
    <>
      <div onClick={handleOpenModal} className='w-36 md:w-52 pr-5 cursor-pointer' >
        <img src={IMG_CDN_URL + posterPath} alt="movie_card" />
      </div>
      {showModal && <MovieModal movie={selectedMovie} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default MovieCard