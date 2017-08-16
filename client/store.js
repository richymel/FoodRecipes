/* Here Redux saves all components' states and data */

import { applyMiddleware, createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//Tools for debugging redux
import logger from 'redux-logger';

//Async tools
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

//import root reducer
import rootReducer from './reducers/index';

//default data
import my_comments from './data/comments';
import my_posts  from './data/posts';

const images = {		
		fetching: false,
		fetched: false,
		imgCollection: [],
		imgSelected: null,
		msg: null,
		imgMissing: null,
		captionMissing: null		
};

var posts = Object.assign([], my_posts);
var comments = Object.assign({}, my_comments);

//Provide the Redux store with the localStorage data (if it is available)
// the initial data source comes from the JSON repository in ./data/
// subsequent Redux store updates are persisted in the localStorage (see ./components/Main.js)

//Posts
if (localStorage.getItem('posts')) { 
	posts = JSON.parse(localStorage.posts)
} else {
	localStorage.setItem('posts', JSON.stringify(posts));
}
//Comments
if (localStorage.getItem('comments')) { 
	comments = JSON.parse(localStorage.comments)
} else {
	localStorage.setItem('comments', JSON.stringify(comments));
}

//all middleware:
const middleware = applyMiddleware(promise(), thunk, logger());

//create an obj for the default data
const defaulState = {
  posts,
  comments,
  images
};

//enable store for redux devtools Chrome extension
//NB. https://github.com/zalmoxisus/redux-devtools-extension/issues/192
//    to resolve the runtime error: "Actions must be plain objects. Use custom middleware for async actions"
//    the enhancers obj must contain the middleware, do not append middleware at the end of createStore parm list.
const enhancers = compose(
	middleware,
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

//to complete the redux devtools setup, pass enhancers to store below:

const store = createStore(rootReducer, defaulState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

//hot reloading reducers 
if (module.hot) {
	module.hot.accept('./reducers/', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer);
	})
}

export default store;