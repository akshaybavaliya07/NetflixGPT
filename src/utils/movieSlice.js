import { createSlice } from "@reduxjs/toolkit"

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        trendingMovies: null,
        popularMovies: null,
        tvSeries: null,
        trailerVideo: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addTrendingMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTVSeries: (state, action) => {
            state.tvSeries = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        }
    }
});

export const { addNowPlayingMovies, addTrendingMovies, addPopularMovies, addTVSeries, addTrailerVideo } = movieSlice.actions;

export default movieSlice.reducer;