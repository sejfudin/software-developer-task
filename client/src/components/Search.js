import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedMovies, setSearchingTerm } from '../redux/actions/moviesActions';

const Search = () => {

    const dispatch = useDispatch();

    //Limit and skip from redux
    const loadMore = useSelector(state => state.movies.loadMore); 
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);

    const [filter, setFilter] = useState('');

    useEffect(() => {
        const data={
            isMovie: isMoviesShowed,
            term:filter,
            skip:loadMore.skip,
            limit: loadMore.limit
        }
        if (filter.length > 2) {
            dispatch(getSearchedMovies(data));
        }
        dispatch(setSearchingTerm(filter));
    }, [dispatch, filter])
    return (
        <div>
            <div className=" float-end my-3" >
                <input
                    type="search"
                    id="form1"
                    className="form-control float-end"
                    placeholder='Search'
                    onChange={(e) => setFilter(e.target.value)}/>
            </div>
        </div>
    )
}
export default Search;