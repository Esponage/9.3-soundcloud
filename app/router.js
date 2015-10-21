import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import Search from './components/search';
import ShowTrack from './components/show-track';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="search" component={Search}>
        <Route path="/tracks/:id" component={ShowTrack} />
      </Route>
    </Route>
  </Router>
), document.getElementById('application'));
