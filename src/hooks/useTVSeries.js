import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
import { addTVSeries } from '../utils/movieSlice'
import { useDispatch, useSelector } from 'react-redux'

const useTVSeries = () => {
    const dispatch = useDispatch();
    const tvSeries = useSelector(store => store.movies.tvSeries);

    const getTVSeries = async () => {
        const data = await fetch('https://api.themoviedb.org/3/tv/popular?page=1', API_OPTIONS);
        const json = await data.json();
        dispatch(addTVSeries(json.results));
    };
    
    useEffect(() => {
        !tvSeries && getTVSeries();
    }, [])
}

export default useTVSeries;