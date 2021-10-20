import './App.css';
import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home';

import AddGame from './components/AddGame';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path= '/' component={LandingPage}/>
      <Route path='/videogames' component={Home}/>
      <Route path= '/videogame' component={AddGame}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
