import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Input from '../../Components/Searchbar';
import s from './Movies.module.css';

function makeNamesURL(query) {
  return `https://api.themoviedb.org/3/search/movie?api_key=47af3f3eb3cebf089eb55cbdac9542a5&l&query=${query}&include_adult=false`;
}

function Movies() {
  const { url } = useRouteMatch();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);

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
  // }, [movies]);

  const changeSearchValue = value => {
    setQuery(value);
  };

  return (
    <section>
      <Input onSubmit={changeSearchValue} />
      {movies && (
        <ul>
          {movies.map(movie => {
            return (
              <li key={movie.id} className={s.item}>
                <Link to={`${url}/${movie.id}`} className={s.link}>
                  {movie.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default Movies;
