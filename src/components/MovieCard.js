import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return posterPath && (
    <div className='w-36 md:w-52 pr-5'>
        <img src={ IMG_CDN_URL + posterPath } alt="movie_card" />
    </div>
  )
}

export default MovieCard