import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import defaultImage from '../../images/no-image-available.jpg';

function findIdURL(id) {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=47af3f3eb3cebf089eb55cbdac9542a5&language=en-US`;
}

const defaultObject = {
  title: 'No name',
  poster_path: '',
  release_date: '',
  popularity: 0,
  overview: '',
  genres: [],
};

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(defaultObject);

  useEffect(() => {
    fetch(findIdURL(movieId))
      .then(response => response.json())
      .then(result => setMovie(result))
      .catch(err => console.warn(err));
  }, [movieId]);

  useEffect(() => {
    console.log('movie: ', movie);
  }, [movie]);

  return (
    <div className={s.card}>
      <div className={s.imageContainer}>
        <img
          src={
            movie.poster_path
              ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}`
              : defaultImage
          }
          alt={movie.title}
          className={s.image}
        />
      </div>
      <div className={s.contentContainer}>
        <h3 className={s.title}>{`${movie.title} (${movie.release_date.slice(
          0,
          4,
        )})`}</h3>
        <p className={s.description}>{`User score: ${Math.trunc(
          movie.popularity,
        )}%`}</p>
        <h4 className={s.subtitle}>Overview</h4>
        <p className={s.description}>{movie.overview}</p>
        <h4 className={s.subtitle}>Genres:</h4>
        {movie.genres.map(g => {
          return (
            <p className={s.genres} key={g.id}>
              {g.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
