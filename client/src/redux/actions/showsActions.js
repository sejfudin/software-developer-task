import axios from 'axios';
import { GET_SHOWS } from "./types";

//Get shows
export const getShows = (data) => async dispatch => {
    const res = await axios.post('http://localhost:5000/api/shows', data);
    const shows = res.data.shows
    dispatch({
        type: GET_SHOWS,
        payload: shows
    })
}