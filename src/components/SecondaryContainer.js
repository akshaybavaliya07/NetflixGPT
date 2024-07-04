import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies);

  return ( movies?.nowPlayingMovies && movies?.trendingMovies && movies?.popularMovies && movies?.tvSeries &&
    <div className='bg-black'>
      <div className='md:-mt-52 pl-8 relative z-20'>
        <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
        <MovieList title="Trending" movies={movies?.trendingMovies} />
        <MovieList title="Popular" movies={movies?.popularMovies} />
        <MovieList title="TV Series" movies={movies?.tvSeries} />
      </div>
    </div>
  )
}

export default SecondaryContainer