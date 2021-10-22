import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container';
import Header from './Components/Header';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieDetailsPage from './Pages/MovieDetailsPage';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Container>
      <Header />

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

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
