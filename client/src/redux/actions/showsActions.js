import axios from 'axios';
import { GET_SHOWS } from "./types";

//Get shows
export const getShows = () => async dispatch => {
    const res = await axios.get('http://localhost:5000/api/shows');
    const shows = res.data.shows
    dispatch({
        type: GET_SHOWS,
        payload: shows
    })
}