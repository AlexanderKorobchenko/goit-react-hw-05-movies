import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import defaultImage from '../../images/no-image-available.jpg';
import s from './Cast.module.css';

function makeCastURL(id) {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=47af3f3eb3cebf089eb55cbdac9542a5&language=en-US`;
}

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(makeCastURL(movieId))
      .then(response => response.json())
      .then(result => setCast(result.cast))
      .catch(err => console.warn(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => console.log(cast), [cast]);

  return (
    <ul className={s.list}>
      {cast.map(actor => {
        return (
          <li key={actor.id} className={s.item}>
            <img
              src={
                actor.profile_path
                  ? `https://www.themoviedb.org/t/p/w500/${actor.profile_path}`
                  : defaultImage
              }
              alt={actor.name}
              className={s.image}
            />
            <h4>{actor.name}</h4>
            <p>Character: {actor.character}</p>
          </li>
        );
      })}
    </ul>
  );
}

Cast.protoType = {
  movieId: PropTypes.string,
};

export default Cast;
