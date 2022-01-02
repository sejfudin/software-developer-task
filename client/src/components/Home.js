import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getShows, setLoadMore} from '../redux/actions/moviesActions';

import Movie from './Movie';
import ShowMoreButton from './ShowMoreButton';

const Home = () => {

    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies);
    const searchedMovies = useSelector(state => state.movies.searchedMovies);
    const shows = useSelector(state => state.movies.shows);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);
    const loadMore = useSelector(state => state.movies.loadMore);

    const [toShow, setToShow] = useState(movies);

    useEffect(() => {
        const data= {
            skip:0,
            limit:10
        }
        dispatch(getMovies(loadMore));
        dispatch(getShows(loadMore));
    }, [dispatch])

    // useEffect(() => {
    //     isMoviesShowed ? setToShow(movies) : setToShow(shows);

    // }, [isMoviesShowed, movies, shows])

    // useEffect(() => {
    //     setToShow(searchedMovies);

    // }, [searchedMovies])

    return (
        <div className='container'>
            <div className="row">

                {isMoviesShowed && movies?.map((movie, index) => {
                    return <div className="col-sm-6 col-md-4 col-lg-3" key={index}><Movie movie={movie} /></div>
                })}
                {!isMoviesShowed && shows?.map((movie, index) => {
                    return <div className="col-sm-6 col-md-4 col-lg-3" key={index}><Movie movie={movie} /></div>
                })}
                <ShowMoreButton toShow={toShow} setToShow={setToShow} />
            </div>
        </div>
    )
}
export default Home;