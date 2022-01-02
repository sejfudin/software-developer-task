import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/moviesActions';
import { getShows } from '../redux/actions/showsActions';

import Movie from './Movie';
import ShowMoreButton from './ShowMoreButton';

const Home = () => {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const shows = useSelector(state => state.shows.shows);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);

    const [toShow, setToShow] = useState(movies);

    useEffect(() => {
        const data = {
            limit: 10,
            skip:0
        }
        dispatch(getMovies(data));
        dispatch(getShows(data));

    }, [dispatch])

    useEffect(() => {
        isMoviesShowed ? setToShow(movies) : setToShow(shows);
       
    }, [isMoviesShowed, movies, shows])

    return (
        <div className='container'>
            <div className="row">

                {toShow?.map(movie => {
                    return <div className="col-sm-6 col-md-4 col-lg-3" key={movie._id}><Movie movie={movie} /></div>
                })}
                <ShowMoreButton toShow={toShow} setToShow={setToShow}/>
            </div>
        </div>
    )
}
export default Home;