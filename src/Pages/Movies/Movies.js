import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import Input from '../../Components/Searchbar';
import NotFound from '../../Components/NotFound';
import s from './Movies.module.css';

function makeNamesURL(query) {
  return `https://api.themoviedb.org/3/search/movie?api_key=47af3f3eb3cebf089eb55cbdac9542a5&l&query=${query}&include_adult=false`;
}

function Movies() {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const queryValue = new URLSearchParams(location.search).get('query');

    if (queryValue === null) {
      return;
    }

    setQuery(queryValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (query === '') {
      return;
    }

    fetch(makeNamesURL(query))
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.warn(err));
  }, [query]);

  // useEffect(() => {
  //   console.log('movies: ', movies);
  //   console.log(history);
  // }, [movies]);

  const changeSearchValue = value => {
    history.push({ ...location, search: `query=${value}` });

    setQuery(value);
  };

  return (
    <section>
      <Input onSubmit={changeSearchValue} />
      {movies && (
        <ul>
          {movies.length ? (
            movies.map(movie => {
              return (
                <li key={movie.id} className={s.item}>
                  <Link to={`${url}/${movie.id}`} className={s.link}>
                    {movie.title}
                  </Link>
                </li>
              );
            })
          ) : (
            <NotFound value={query} />
          )}
        </ul>
      )}
    </section>
  );
}

export default Movies;
