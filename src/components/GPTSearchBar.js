import React, { useRef } from 'react'
import { LANGUAGE_TEXT } from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import openAI from '../utils/openAI'
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResults } from '../utils/gptSlice';

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const language = useSelector(store => store.config.lang);
  const searchText = useRef(null);

  const searchTMDBmovie = async (movie) => {
    const data = await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS)
    const json = await data.json();
    return json.results;
  }
  const handleGPTSearchClick = async () => {
    const gptQuery = 'Act as a Movies Recommendation System and suggest some movies for Query: '+ searchText.current.value + '. Only give me name of 5 movies comma separeted like the Example result given ahead. Exaple result: Koi Mil Gaya, Leo, Don, Shanak, Hera Pheri'

    const gptResults = await openAI.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    // gptResults?.choices?.[0].message?.content;  //will returns = Koi Mil Gaya, Leo, Don, Shanak, Hera Pheri
    const gptMovies = gptResults?.choices?.[0].message?.content.split(',');
    // ['Koi Mil Gaya', 'Leo', 'Don', 'Shanak', 'Hera Pheri']
    // Now for all movies search in TMDB API

    const promiseArray = gptMovies.map(movie => searchTMDBmovie(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);

    dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
  }

  return (
    <div className='pt-[45%] md:pt-[10%]  flex justify-center'>
      <form className='w-full md:w-1/2 bg-black grid grid-cols-12' onSubmit={e => e.preventDefault()}>
        <input type="text" 
          ref={searchText}
          className='p-2 m-3 col-span-9 rounded-md' 
          placeholder={LANGUAGE_TEXT[language].gptSearchPlaceholder} 
          onClick={handleGPTSearchClick}
        />
        <button 
          className='py-2 px-4 m-3 col-span-3 bg-red-700 text-white rounded-md'>
          {LANGUAGE_TEXT[language].Search}
        </button>
      </form>
    </div>
  )
}

export default GPTSearchBar