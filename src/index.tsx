import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import DiaryPage from './DiaryPage';

const Page404 = () => (
  <div>
    <h1>Page not found</h1>
    <p>The page you're visiting does not exist. Please double-check the URL.</p>
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <h1>Diary Demo</h1>
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/diary">
          <DiaryPage />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
