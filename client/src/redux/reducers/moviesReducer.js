import { GET_MOVIES, IS_MOVIES_SHOWED } from '../actions/types';

const initialState = {
    movies: [], 
    isMoviesShowed: true
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload
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