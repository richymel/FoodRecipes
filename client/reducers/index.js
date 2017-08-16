// Redux needs to have all reducers combined into a single root reducer:
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import posts from './posts';
import comments from './comments';
import images from './images';

//we pass all reducers and changes to URLs (routerReducer)
// NB we use ES6 notation for obj props and values posts and comments (since they have the same name)
//    the reducer combination allows the posts reducer to handle state change for the posts object
//    and the comments reducer to handle state change for the comments object
const rootReducer = combineReducers({posts, comments, images, routing: routerReducer});

export default rootReducer;
