import React from 'react';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { getInitialMovies, isMoviesShowed, setLoadMore } from '../redux/actions/moviesActions';
import { useDispatch, useSelector } from 'react-redux';

const Toggle = () => {

    const dispatch = useDispatch();
    
    const isMovies = useSelector(state => state.movies.isMoviesShowed);
    
    //Toggle button functionality
    const toggleHandler = (checked) => {
        const data = {
            skip: 0,
            limit: 10,
            isMovie: checked
        }

        dispatch(isMoviesShowed(checked));
        dispatch(getInitialMovies(data));
        dispatch(setLoadMore(data));
    }
    return (
        <div className='container d-flex justify-content-center my-3'>
            <div className='row border w-25 '>
                <BootstrapSwitchButton
                    size="lg"
                    checked={isMovies}
                    onlabel='MOVIES'
                    offlabel='SHOWS'
                    onChange={(checked) => { toggleHandler(checked) }} />
            </div>
        </div>
    )
}
export default Toggle;