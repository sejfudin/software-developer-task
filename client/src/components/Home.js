import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/actions/moviesActions';

import Movie from './Movie';
import ShowMoreButton from './ShowMoreButton';

const Home = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.movies.searchTerm);
    const movies = useSelector(state => state.movies.movies);
    const searched = useSelector(state => state.movies.searchedMovies);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);
    const loadMore = useSelector(state => state.movies.loadMore);

    const [toShow, setToShow] = useState(movies);

    useEffect(() => {
        const data = {
            skip: loadMore.skip,
            limit: loadMore.limit,
            isMovie: isMoviesShowed
        }
        dispatch(getMovies(data));
    }, [dispatch])

    return (
        <div className='container'>
            <div className="row">
                {
                    searchTerm.length < 3 ? movies.map(movie => {
                        return (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3"
                                key={movie._id}>
                                <Movie movie={movie} />
                            </div>
                        )
                    })
                    :
                    searched.map(movie => {
                        return (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3"
                                key={movie._id}>
                                <Movie movie={movie} />
                            </div>
                        )
                    })
                }
                {movies.length < 30 && <ShowMoreButton toShow={toShow} setToShow={setToShow} />}
            </div>
        </div>
    )
}
export default Home;