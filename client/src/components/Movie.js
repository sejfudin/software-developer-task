import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { rateMovie } from '../redux/actions/moviesActions';
import { useDispatch, useSelector } from 'react-redux';

const Movie = ({ movie, toggleModal }) => {

    const dispatch = useDispatch();
    const id = movie._id;

    const isAuth = useSelector(state => state.users.isAuthenticated);
    const userId = useSelector(state => state.users.user._id);

    //Rating single movie/show
    const setRating = (rate) => {
        const newRate = {
            rate: rate,
            userId: userId
        }

        //reteMovie action will send movie id, user id and rate to the backend
        dispatch(rateMovie(id, newRate));

        toggleModal();
    }

    return (
        <div className='card mb-3'>
            <div className='d-flex justify-content-center'>
                <ReactStars
                    size={30}
                    value={movie.ratingValue}
                    edit={isAuth}
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