import axios from 'axios';
import { GET_MOVIES, IS_MOVIES_SHOWED } from "./types";

//Get movies
export const getMovies = () => async dispatch => {
    const res = await axios.get('http://localhost:5000/api/movies');
    const movies = res.data.movies
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

//Get movies
export const isMoviesShowed = (isShowed) => {
    
    return{
        type: IS_MOVIES_SHOWED,
        payload: isShowed
    }
}





