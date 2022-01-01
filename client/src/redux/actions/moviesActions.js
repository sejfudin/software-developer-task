import axios from 'axios';
import { GET_MOVIES, IS_MOVIES_SHOWED, RATE_MOVIE } from "./types";

//Get movies
export const getMovies = () => async dispatch => {
    const res = await axios.get('http://localhost:5000/api/movies');
    const movies = res.data.movies
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

//Movies/Shows toggle
export const isMoviesShowed = (isShowed) => {
    
    return{
        type: IS_MOVIES_SHOWED,
        payload: isShowed
    }
}

//Rate 
export const rateMovie = (movieId, rate) => async dispatch => {
    console.log(movieId, rate)
   await axios.put(`http://localhost:5000/api/rate/${movieId}`, rate);
    dispatch({
        type: RATE_MOVIE
    })
}





