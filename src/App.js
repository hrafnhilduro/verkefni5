import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './routes/home/Home';
import Lecture from './routes/lecture/Lecture';
import NotFound from './routes/notFound/NotFound';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet defaultTitle="Fyrirlestur" titleTemplate="%s - Fyrirlestur"></Helmet>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:slug" component={Lecture} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
