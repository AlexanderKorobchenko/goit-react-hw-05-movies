import { Switch, Route } from 'react-router-dom';
import Container from './Components/Container';
import Header from './Components/Header';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Container>
      <Header />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
