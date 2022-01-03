import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearMovies, clearSearchedMovies, getMovies, getSearchedMovies, setSearchingTerm } from '../redux/actions/moviesActions';

const Search = () => {

    const dispatch = useDispatch();

    //Limit and skip from redux
    const loadMore = useSelector(state => state.movies.loadMore);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);

    const [filter, setFilter] = useState('');
    const [isNotFirstLoad, setIsNotFirstLoad] = useState(0);

    useEffect(() => {

        /* This will be indicator is it first load or not
        Want to make difference between 
        empty input field on first load and 
        empty imput field after serach term is deleted */
        setIsNotFirstLoad(1);
        const data = {
            isMovie: isMoviesShowed,
            term: filter,
            skip: loadMore.skip,
            limit: loadMore.limit
        }
        if (filter.length > 2) {
            dispatch(clearMovies());
            dispatch(clearSearchedMovies());
            dispatch(getSearchedMovies(data));
        }

        //If input field is cleared clear searchedMovies state and set skip and limit
        if (!filter && isNotFirstLoad) {
            dispatch(clearSearchedMovies());
            dispatch(clearMovies());
            dispatch(getMovies(data));
        }
        dispatch(setSearchingTerm(filter));
        // eslint-disable-next-line
    }, [dispatch, filter])

    return (
        <div>
            <div className=" float-end my-3" >
                <input
                    type="search"
                    id="form1"
                    className="form-control float-end"
                    placeholder='Search'
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </div>
    )
}
export default Search;