import React from 'react';
import RateStars from 'react-rating-stars-component';
import { rateMovie } from '../redux/actions/moviesActions';
import { useDispatch } from 'react-redux';

const Movie = ({ movie }) => {

    const dispatch = useDispatch();

    const id = movie._id;

    const setRating = (rate) => {
        const newRate = {
            rate: rate
        }
        dispatch(rateMovie(id, newRate));                                       //reteMovie action will send movie id and rate to the backend
    }

    return (
        <div className='card mb-3 '>
            <div className='d-flex justify-content-center'>
                <RateStars
                    size={30}
                    isHalf={true}
                    // value={recipe.ratingValue}
                    edit={true}
                    onChange={setRating} />
            </div>

            <img src={movie.image} className='card-img-top' alt='...' />
            <div className='card-body'>
                <h5 className='card-title'>{movie.title}</h5>
                <p className='card-text'>{movie.crew}</p>
                <p className='card-text'><small className='text-muted'>{movie.year}</small></p>
            </div>
        </div>
    )
}
export default Movie;