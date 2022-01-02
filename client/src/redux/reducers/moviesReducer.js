import { GET_MOVIES, IS_MOVIES_SHOWED, SEARCH_MOVIES } from '../actions/types';

const initialState = {
    movies: [], 
    searchedMovies: [],
    isMoviesShowed: true
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload]
            };

            case SEARCH_MOVIES:
            return {
                ...state,
                searchedMovies: action.payload
            };
            case IS_MOVIES_SHOWED:
            return {
                ...state,
                isMoviesShowed: action.payload
            };

        default:
            return state;
    }
}
export default moviesReducer;