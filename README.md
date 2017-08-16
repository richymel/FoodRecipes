### Food Recipes  (aka. `Recipe Box`)
#### FreeCodeCamp ![FreeCodeCamp](https://cdnjs.cloudflare.com/ajax/libs/simple-icons/3.0.1/freecodecamp.svg) 303 Challenge 
###### by  : RichyMel / 2017.08.14
***    
This `FoodRecipes` github project has these core dependencies:

| npm Module        | Description           | Documentation  |
| ------------- |:-------------:|:-----|
| React  | All view components are built on React.js | <https://facebook.github.io/react/> |
| Redux  | Powerful state container for JS apps, features live code editing plus a time travel debugger/state visualizer | <http://redux.js.org/> |
| Redux Form | Specialized Form state manager  | <http://redux-form.com> |
| React Router & React Router Redux | A collection of navigational components to build a single page web app | <https://reacttraining.com/react-router/> <https://github.com/reactjs/react-router-redux>|
| Redux Thunk | Middleware to handle delayed dispatch actions (i.e. async calls to APIs) | <https://github.com/gaearon/redux-thunk> |

***
##### Description:
```
This single-page-web-app is based on the React Redux *Reduxstagram* sample built by >[WesBos](http://wesbos.com/). It has been extended to perform CRUD operations on the posts themselves which correspond to a Recipe and all its individual ingredients.

Some additional features include the ability to grab an image for a recipe using the pixabay API <https://pixabay.com/> This is an interesting idea because the app needs to be able to use redux with asynchronous responses from the API. The added complexity made the project more challenging and fun. Also, there is some basic input validation involved.

Finally, take a look at the sample Sentry issue tracking/reporting feature (commented out) in ./client/recipes4fun.js (a great tool for production environments).
```
***
##### Sources for *deeper understanding* and further *research*:

The following people have useful tutorials and training available on-line. Thank you for putting this tutorials together!:

| Author        | Subject           | Repository  |
| ------------- |:-------------:|:-----|
| Wesbos  | React & Redux | https://github.com/wesbos/Learn-Redux |
| LearnCode Academy  | Redux Tutorial | https://www.youtube.com/watch?v=1w-oQ-i1XB8 |
| Erick Rasmussen | Redux Form  | https://www.youtube.com/watch?v=eDTi7lYR1VU&t=2112s|
