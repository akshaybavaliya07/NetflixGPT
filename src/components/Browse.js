import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTrendingMovies from '../hooks/useTrendingMovies'
import usePopularMovies from '../hooks/usePopularMovies'
import useTVSeries from '../hooks/useTVSeries'
import GPTSearch from './GPTSearch'
import { useSelector } from 'react-redux';


const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  

  useNowPlayingMovies();
  useTrendingMovies();
  usePopularMovies();
  useTVSeries();

  return (
    <div>
      <Header />
      { showGPTSearch ? (
        <GPTSearch/>
        ) : (
        <>
        <MainContainer />
        <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
