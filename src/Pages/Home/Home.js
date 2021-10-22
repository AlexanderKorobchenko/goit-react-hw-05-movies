import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './Home.module.css';

const trendingURL = `https://api.themoviedb.org/3/trending/movie/day?api_key=47af3f3eb3cebf089eb55cbdac9542a5`;

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(trendingURL)
      .then(response => response.json())
      .then(response => setMovies(response.results))
      .catch(err => console.warn(err));
  }, []);

  return (
    <section>
      <h2 className={s.title}>Trending today</h2>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id} className={s.item}>
              <NavLink to="/movies" className={s.link}>
                {movie.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Home;
