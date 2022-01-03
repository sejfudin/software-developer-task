import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { getInitialMovies, rateMovie} from '../redux/actions/moviesActions';
import { useDispatch, useSelector } from 'react-redux';

const Movie = ({ movie, toggleModal }) => {

    const dispatch = useDispatch();
    const id = movie._id;

    //Limit and skip from redux
    const loadMore = useSelector(state => state.movies.loadMore);
    const isAuth = useSelector(state => state.users.isAuthenticated);
    const userId = useSelector(state => state.users.user._id);

    

    //Rating single movie/show
    const setRating = (rate) => {
        const newRate = {
            rate: rate,
            userId: userId
        }
        dispatch(rateMovie(id, newRate));              //reteMovie action will send movie id and rate to the backend

        //Refreshing results after rating
        dispatch(getInitialMovies(loadMore));
        toggleModal();
    }

    return (
        <div className='card mb-3 '>
            <div className='d-flex justify-content-center'>
                <ReactStars
                    size={30}
                    isHalf={true}
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