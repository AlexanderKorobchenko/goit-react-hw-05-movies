import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container';
import Header from './Components/Header';
import Loader from 'react-loader-spinner';
// import Home from './Pages/Home';
// import Movies from './Pages/Movies';
// import MovieDetailsPage from './Pages/MovieDetailsPage';

const Home = lazy(() =>
  import('./Pages/Home' /* webpackChunkName: "home-page" */),
);
const Movies = lazy(() =>
  import('./Pages/Movies' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './Pages/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);

function App() {
  return (
    <Container>
      <Header />

      <Suspense
        fallback={
          <Loader
            type="Oval"
            color="#ff6b08"
            height={18}
            width={18}
            timeout={3000}
          />
        }
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/movies" exact>
            <Movies />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
