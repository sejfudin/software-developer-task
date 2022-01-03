import axios from 'axios';
import {
    CLEAR_MOVIES,
    CLEAR_SEARCHED_MOVIES,
    GET_INITIAL_MOVIES,
    GET_MOVIES,
    INITIAL_SEARCH_MOVIES,
    IS_MOVIES_SHOWED,
    RATE_MOVIE,
    SEARCH_MOVIES,
    SET_LOAD_MORE,
    SET_SEARCH
} from "./types";

//Movies/Shows toggle
export const setSearchingTerm = (word) => {
    return {
        type: SET_SEARCH,
        payload: word
    }
}

//Clear Movies/Shows
export const clearMovies = () => {
    return {
        type: CLEAR_MOVIES,
        payload: []
    }
}

//Clear searched Movies/Shows
export const clearSearchedMovies = () => {
    return {
        type: CLEAR_SEARCHED_MOVIES,
        payload: []
    }
}

//Get movies/shows
export const getMovies = (data) => async dispatch => {
    const res = await axios.post('http://localhost:5000/api/movies', data);
    const movies = res.data.movies;
    dispatch({
        type: GET_MOVIES,
        payload: movies
    })
}

//Get initial movies/shows
export const getInitialMovies = (data) => async dispatch => {

    const res = await axios.post('http://localhost:5000/api/movies', data);
    const movies = res.data.movies;
    dispatch({
        type: GET_INITIAL_MOVIES,
        payload: movies
    })
}

//Movies/Shows toggle
export const isMoviesShowed = (isShowed) => {
    return {
        type: IS_MOVIES_SHOWED,
        payload: isShowed
    }
}

//Set skip i limit
export const setLoadMore = (data) => {
    return {
        type: SET_LOAD_MORE,
        payload: data
    }
}

//Get Initial search movies
export const getInitialSearchedMovies = (data) => async dispatch => {
    const res = await axios.post(`http://localhost:5000/api/movies/find`, data);
    const movies = res.data.movies;
    dispatch({
        type: INITIAL_SEARCH_MOVIES,
        payload: movies
    })
}

//Get searched movies
export const getSearchedMovies = (data) => async dispatch => {
    const res = await axios.post(`http://localhost:5000/api/movies/find`, data);
    const movies = res.data.movies;
    dispatch({
        type: SEARCH_MOVIES,
        payload: movies
    })
}

//Rate 
export const rateMovie = (movieId, rate) => async dispatch => {
    let res = await axios.put(`http://localhost:5000/api/rate/${movieId}`, rate);
    let message = res.data.message;
    dispatch({
        type: RATE_MOVIE,
        payload: message
    })
}