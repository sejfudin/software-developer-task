import { GET_INITAIL_MOVIES, GET_INITIAL_MOVIES, GET_INITIAL_SHOWS, GET_MOVIES, GET_SHOWS, IS_MOVIES_SHOWED, SEARCH_MOVIES, SET_LOAD_MORE } from '../actions/types';

const initialState = {
    movies: [],
    searchedMovies: [],
    isMoviesShowed: true,
    loadMore: {
        skip: 0,
        limit: 10
    }
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload]
            };

        case GET_INITIAL_MOVIES:
            return {
                ...state,
                movies: action.payload
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
        case SET_LOAD_MORE:
            return {
                ...state,
                loadMore: action.payload
            };

        default:
            return state;
    }
}
export default moviesReducer;