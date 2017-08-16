import React from 'react';
import { render } from 'react-dom';

//import css
import css from './styles/style.styl'

//import components
import App from './components/App'
import Single from './components/Single'
import PhotoGrid from './components/PhotoGrid'
import Single2 from './components/Single2'

//import react router dependencies
import { Router, Route, IndexRoute } from 'react-router'
//This makes react and redux work together
import { Provider } from 'react-redux'
import store, { history } from './store'//NB store is the default, no need for {}, but history is not, is a named export

// SENTRY ERROR TRACKING FEATURE
//   Usage sample (acts in conjunction with the issue management system @ https://sentry.io)
//   NB. The ./data/config/sets up raven-js (the issue tracking) for the project, you need to subscribe, 
//   get a sentry key and app id @ https://sentry.io
//   
//   Uncomment below segment to enable demo
/*
import Raven from 'raven-js';
import { sentry_url, logException } from './data/config';

Raven.config(sentry_url,{
	tags: {
		git_commit: 'my new tag',
		userLevel: 'editor'
	}
}).install();

logException(new Error('download failed!'), {
	backtrack: 'new section for downloading goodies.',
	implementor: 'richymel@xyz.com'
});

Raven.showReportDialog();
*/
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={PhotoGrid}></IndexRoute>
        <Route path="/view/:postId" component={Single}></Route>
        <Route path="/add/:postId" component={Single2}></Route>
      </Route>
    </Router>
  </Provider>
)

render(router, document.getElementById('root'))
