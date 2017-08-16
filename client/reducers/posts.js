//NB Very important: there needs to be a reducer for each piece of state
//    as defined in the store.js  file  cf. const defaulState

// A reducer is in charge of:
//1. Geting the action (info about what happened)
//2. Getting a copy of current state
//3. With the action and state it modifies the store
//4. Returns the updated store
//
//NB from there React updates the virtual DOM, UI, etc.

function posts(state = [], action) {	
	switch(action.type)	 {
		case 'INCREMENT_LIKES' :
			const i = action.index;
			return [
				...state.slice(0,i), //get 1st part of state array
				{...state[i], likes: state[i].likes+1}, //spread to get a NEW single object
				...state.slice(i+1) //get the last part of array
			]			
		break;
		case 'ADD_NEW':
			return [
				...state,
				{
					caption: action.caption,
					code: action.postId,
					display_src: action.display_src,
					id: undefined,
					likes: 0					
				}
			]
		case "REMOVE_POST":
				return [
					...state.filter((item, idx) => idx !== action.i)
	  		]
				
		default:
			return state;
	}  
}

export default posts;
