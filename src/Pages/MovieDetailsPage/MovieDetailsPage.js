import { useState, useEffect } from 'react';
import {
  useRouteMatch,
  useParams,
  useHistory,
  NavLink,
  Route,
} from 'react-router-dom';
import s from './MovieDetailsPage.module.css';
import defaultImage from '../../images/no-image-available.jpg';
import Cast from '../../Components/Cast';
import Reviews from '../../Components/Reviews';
import Button from '../../Components/Button/Button';

function makeIdURL(id) {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=47af3f3eb3cebf089eb55cbdac9542a5&language=en-US`;
}

const defaultObject = {
  title: 'No name',
  poster_path: '',
  release_date: '',
  vote_average: 0,
  overview: '',
  genres: [],
};

function MovieDetailsPage() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(defaultObject);

  useEffect(() => {
    fetch(makeIdURL(movieId))
      .then(response => response.json())
      .then(result => setMovie(result))
      .catch(err => console.warn(err));
  }, [movieId]);

  //   useEffect(() => {
  //     console.log('movie: ', movie);
  //   }, [movie]);

  function goBack() {
    const valueURL = history.location.pathname;

    if (valueURL.includes('cast') || valueURL.includes('reviews')) {
      history.go(-1);
    }

    history.goBack();
  }

  return (
    <>
      <Button onClick={goBack}>&#10094; go back</Button>
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
            movie.vote_average * 10,
          )}%`}</p>
          <h4 className={s.subtitle}>Overview</h4>
          <p className={s.description}>{movie.overview}</p>
          <h4 className={s.subtitle}>Genres:</h4>
          <p>{movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <div className={s.additional}>
        <h4 className={s.subtitle}>Additional information</h4>
        <ul>
          <li>
            <NavLink to={`${url}/cast`} className={s.link}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/reviews`} className={s.link}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Route path={`${url}/cast`}>
        <Cast movieId={movieId} />
      </Route>

      <Route path={`${url}/reviews`}>
        <Reviews movieId={movieId} />
      </Route>
    </>
  );
}

export default MovieDetailsPage;
