import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getShows, setLoadMore } from '../redux/actions/moviesActions';

const ShowMoreButton = () => {

    const dispatch = useDispatch();

    //Limit and skip from redux
    const loadMore = useSelector(state => state.movies.loadMore);

    //Show More function
    const onShowMore = () => {

        //Increase skip on every cick
        let newSkip = loadMore.skip + loadMore.limit;

        //New Skip, Limit is always the same
        let newData = {
            skip: newSkip,
            limit: loadMore.limit
        }

        dispatch(setLoadMore(newData));
        dispatch(getMovies(newData));
        dispatch(getShows(newData));
    }

    return (
        <div className="d-grid gap-2 d-flex justify-content-center mb-5">
            <button
                className='btn btn-primary w-25'
                onClick={onShowMore}>
                Show More
            </button>
        </div>
    )
}
export default ShowMoreButton;