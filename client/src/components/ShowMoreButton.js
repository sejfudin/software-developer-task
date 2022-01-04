import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getSearchedMovies, setLoadMore } from '../redux/actions/moviesActions';

const ShowMoreButton = () => {

    const dispatch = useDispatch();

    //Limit and skip from redux
    const loadMore = useSelector(state => state.movies.loadMore);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);
    const searchTerm = useSelector(state => state.movies.searchTerm);

    //Show More function
    const onShowMore = (e) => {

        //Increase skip on every cick
        let newSkip = loadMore.skip + loadMore.limit;

        //New Skip, Limit is always the same
        let newData = {
            term: searchTerm,
            skip: newSkip,
            limit: loadMore.limit,
            isMovie: isMoviesShowed
        }

        dispatch(setLoadMore(newData));
        searchTerm.length < 3 ? dispatch(getMovies(newData)) : dispatch(getSearchedMovies(newData))
    }

    return (
        <div className="d-grid gap-2 d-flex justify-content-center mb-5">
            <button className='btn btn-primary w-25' onClick={onShowMore}>Show More</button>
        </div>
    )
}
export default ShowMoreButton;