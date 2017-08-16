//NB Very important: there needs to be a reducer for each piece of state
//    as defined in the store.js  file  cf. const defaulState

//It is the reducer that performs the state change, see more about what reducers do at posts.js

//NB all reducers are fired by an action dispatch, we must
//  therefore check the actions to be handled (pertinent to the reducer) here
//  and just return state if no action is handled

// Reducer composition: handle the update of only one comment (sub piece of state) 
// 		cf. function postComment here

// Function filterMe is a helper function to remove entire comments for a given posts.code
function filterMe(code, comments) {
	var output={};
	for (var i in comments) {
			(i !== code) ? 
  		output[i] = comments[i] : '' 
	}
 	return output;
}

function postComment(state=[], action) {	
	switch(action.type) {
		case 'ADD_COMMENT':
			//return the existing state with the new comment
			return [...state, {
				text: action.comment
			}];
	
		default:
			return state;
	}
	return state;
}
  
function comments(state = [], action) {
switch(action.type) {			
	case "ADD_COMMENT":
		if (typeof action.postId !== undefined) {
			return {
				//take the current state
				...state,
				//overwrite this post with a new one
				[action.postId]: postComment(state[action.postId], action)
			}
		}
		
	case "REMOVE_COMMENT": 
			//remove deleted comment from state and return state
			return {
				...state, 
				[action.postId]: state[action.postId].filter((item, idx) => idx !== action.i)
  		}

  	case "REMOVE_ALL_COMMENTS":
			//remove all comments associated with a given post
			return filterMe(action.code, state)			
	}

  return state;
}

export default comments;
