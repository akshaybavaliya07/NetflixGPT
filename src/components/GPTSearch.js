import React, { useEffect } from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMoviesSuggestions from './GPTMoviesSuggestions'
import { LOGIN_BG } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { emptyMovieResults } from '../utils/gptSlice'

const GPTSearch = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyMovieResults());
  }, [])

  return (
    <>
      <div className='absolute -z-20'>
        <img className='h-screen object-cover md:h-auto'
          src={LOGIN_BG} alt="bg-img" />
      </div>
      <div className=''>
        <GPTSearchBar />
        <GPTMoviesSuggestions />
      </div>
    </>
  )
}

export default GPTSearch