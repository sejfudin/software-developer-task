import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/moviesActions';
import { getShows } from '../redux/actions/showsActions';

const ShowMoreButton = () => {

    const dispatch = useDispatch();

    const [limit] = useState(10);
    const [skip, setSkip] = useState(10);


    const onShowMore = (e)=> {

        let newSkip = skip + limit;
       
        const data= {
            limit: limit,
            skip: skip
        }
        dispatch(getMovies(data));
        dispatch(getShows(data));
        setSkip(newSkip)
    }

    return (
        <div className="d-grid gap-2 d-flex justify-content-center mb-5">
            <button className='btn btn-primary w-25' onClick={onShowMore}>Show More</button>
        </div>
    )
}
export default ShowMoreButton;