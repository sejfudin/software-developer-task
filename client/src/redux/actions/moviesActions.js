import axios from 'axios';
import { getShows } from './showsActions';
import { GET_MOVIES, IS_MOVIES_SHOWED, RATE_MOVIE } from "./types";

//Get movies
export const getMovies = (data) => async dispatch => {
    
    const res = await axios.post('http://localhost:5000/api/movies', data);
    const movies = res.data.movies;
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
   await axios.put(`http://localhost:5000/api/rate/${movieId}`, rate);
    dispatch({
        type: RATE_MOVIE
    })
    dispatch(getMovies());
    dispatch(getShows());

}





