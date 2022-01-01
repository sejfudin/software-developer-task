import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/moviesActions';

const ShowMoreButton = ({toShow, setToShow}) => {

    const dispatch = useDispatch();

    const [limit, setLimit] = useState(10);
    const [skip, setSkip] = useState(10);


    const onShowMore = (e)=> {
        e.preventDefault();

        let newSkip = skip + limit;
       
        const data= {
            limit: limit,
            skip: skip
        }
        dispatch(getMovies(data))
        setSkip(newSkip)
    }

    return (
        <div className="d-grid gap-2 d-flex justify-content-center mb-5">
            <button className='btn btn-primary w-25' onClick={onShowMore}>Show More</button>
        </div>
    )
}
export default ShowMoreButton;