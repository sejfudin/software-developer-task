import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getSearchedMovies } from '../redux/actions/moviesActions';

const Search = () => {

    const dispatch = useDispatch();
    const [filter, setFilter] = useState('');

    useEffect(() => {
        if (filter.length > 2) {
            dispatch(getSearchedMovies(filter));
        }
    }, [dispatch, filter])
    return (
        <div className='float-right w-25 me-4'>
            <div className="input-group float-end my-3" >
                <input
                    type="search"
                    id="form1"
                    className="form-control float-end"
                    placeholder='Search'
                    onChange={(e) => setFilter(e.target.value)} />
            </div>
        </div>
    )
}
export default Search;