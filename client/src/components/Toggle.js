import React from 'react';

import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { isMoviesShowed } from '../redux/actions/moviesActions';
import { useDispatch } from 'react-redux';

const Toggle = () => {

    const dispatch = useDispatch();

    //Toggle button functionality
    const toggleHandler = (checked) => {
        dispatch(isMoviesShowed(checked));
    }
    return (
        <div className='container d-flex justify-content-center my-3'>
            <div className='row border w-25 '>
                <BootstrapSwitchButton
                    size="lg"
                    checked={true}
                    onlabel='MOVIES'
                    offlabel='SHOWS'
                    onChange={(checked) => { toggleHandler(checked) }} />
            </div>
        </div>
    )
}
export default Toggle;