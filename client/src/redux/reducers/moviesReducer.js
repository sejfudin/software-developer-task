import {
    GET_INITIAL_MOVIES,
    GET_MOVIES,
    INITIAL_SEARCH_MOVIES,
    IS_MOVIES_SHOWED,
    RATE_MOVIE,
    SEARCH_MOVIES,
    SET_LOAD_MORE,
    SET_SEARCH
} from '../actions/types';

const initialState = {
    searchTerm: '',
    message: '',
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

        case RATE_MOVIE:
            return {
                ...state,
                message: action.payload
            };

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

        case SET_SEARCH:
            return {
                ...state,
                searchTerm: action.payload
            };

        case SEARCH_MOVIES:
            return {
                ...state,
                searchedMovies: [...state.searchedMovies, ...action.payload]
            };

        case INITIAL_SEARCH_MOVIES:
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