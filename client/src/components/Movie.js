import React from 'react';

const Movie=({movie})=>{
    return (
        <div className="card mb-3">
  <img src={movie.image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{movie.title}</h5>
    <p className="card-text">{movie.crew}</p>
    <p className="card-text"><small className="text-muted">{movie.year}</small></p>
  </div>
</div>
    )
}
export default Movie;