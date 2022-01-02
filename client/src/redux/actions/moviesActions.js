import axios from 'axios';
import { GET_MOVIES, GET_SHOWS, IS_MOVIES_SHOWED, RATE_MOVIE, SEARCH_MOVIES, SET_LOAD_MORE } from "./types";

//Get movies
export const getMovies = (data) => async dispatch => {
    
    const res = await axios.post('http://localhost:5000/api/movies', data);
    const movies = res.data.movies;
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

//Get shows
export const getShows = (data) => async dispatch => {
    const res = await axios.post('http://localhost:5000/api/shows', data);
    const shows = res.data.shows
    dispatch({
        type: GET_SHOWS,
        payload: shows
    })
}

//Movies/Shows toggle
export const isMoviesShowed = (isShowed) => {
    
    return{
        type: IS_MOVIES_SHOWED,
        payload: isShowed
    }
}

//Set skip i limit
export const setLoadMore = (data) => {
    
    return{
        type: SET_LOAD_MORE,
        payload: data
    }
}

//Get searched movies
export const getSearchedMovies = (filter) => async dispatch => {
    const res = await axios.get(`http://localhost:5000/api/movies/find/${filter}`);
    const movies = res.data.movies
    console.log(movies)
    dispatch({
        type: SEARCH_MOVIES,
        payload: movies.filter(movie=>movie.isMovie===true)
    })
}

//Rate 
export const rateMovie = (movieId, rate) => async dispatch => {
   await axios.put(`http://localhost:5000/api/rate/${movieId}`, rate);
    dispatch({
        type: RATE_MOVIE
    })
}





