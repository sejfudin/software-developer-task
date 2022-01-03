import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMovies, clearSearchedMovies, getMovies, getSearchedMovies } from '../redux/actions/moviesActions';
import MessageModal from './MessageModal';

import Movie from './Movie';
import ShowMoreButton from './ShowMoreButton';

const Home = () => {

    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.movies.searchTerm);
    const movies = useSelector(state => state.movies.movies);
    const searched = useSelector(state => state.movies.searchedMovies);
    const isMoviesShowed = useSelector(state => state.movies.isMoviesShowed);
    const loadMore = useSelector(state => state.movies.loadMore);

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        if (isOpen) {
            const data = {
                term: searchTerm,
                skip: 0,
                limit: loadMore.limit,
                isMovie: isMoviesShowed
            }

            //Clear all movies/shows from redux
            dispatch(clearMovies());

            //Get first 10 movies/shows
            dispatch(getMovies(data));

            //If user try to rate a movie during searching repeat search
            if (searchTerm) {
                dispatch(clearSearchedMovies())
                dispatch(getSearchedMovies(data));
            }
        }
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const data = {
            skip: loadMore.skip,
            limit: loadMore.limit,
            isMovie: isMoviesShowed
        }
        dispatch(getMovies(data));
        // eslint-disable-next-line
    }, [dispatch])

    return (
        <div className='container'>
            <MessageModal isOpen={isOpen} toggleModal={toggleModal} />
            <div className='row'>
                {
                    searchTerm.length < 3 ? movies.map(movie => {
                        return (
                            <div
                                className='col-sm-6 col-md-4 col-lg-3'
                                key={movie._id}>
                                <Movie movie={movie} toggleModal={toggleModal} />
                            </div>
                        )
                    })
                        :
                        searched.length ? searched.map(movie => {
                            return (
                                <div
                                    className='col-sm-6 col-md-4 col-lg-3'
                                    key={movie._id}>
                                    <Movie movie={movie} toggleModal={toggleModal} />
                                </div>
                            )
                        }) : <div>No results found!!!</div>
                }
                {movies.length > 9 && movies.length < 30 && <ShowMoreButton />}
            </div>
        </div>
    )
}
export default Home;