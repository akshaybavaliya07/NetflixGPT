import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GPTMoviesSuggestions = () => {
  const { movieNames, movieResults} = useSelector(store => store.gpt);
  if(!movieNames || !movieNames) return null;

  return (
    <div className='mt-10 mr-0 p-5 bg-black'>
      {movieNames.map((movieName, index) => (
        <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
      ))}
    </div>
  )
}

export default GPTMoviesSuggestions