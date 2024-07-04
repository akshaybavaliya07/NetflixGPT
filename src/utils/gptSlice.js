import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice ({
    name: 'gpt',
    initialState: {
        showGPTSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGPTSearchView: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        addGptMovieResults: (state, action) => {
            const { movieNames, movieResults}  = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
        emptyMovieResults: (state) => {
            state.movieNames = null;
            state.movieResults = null;
        }
    }
})

export const { toggleGPTSearchView, addGptMovieResults, emptyMovieResults } = gptSlice.actions;

export default gptSlice.reducer;