//NB Very important: there needs to be a reducer for each piece of state
//    as defined in the store.js  file  cf. const defaulState

// A reducer is in charge of:
//1. Geting the action (info about what happened)
//2. Getting a copy of current state
//3. With the action and state it modifies the store
//4. Returns the updated store
//
//NB from there React updates the virtual DOM, UI, etc.

function images(state = [], action) {	
	switch(action.type)	 {
		case 'FETCH_IMAGES_PENDING' :
			return {
				...state,
				fetching: true,
				fetched: false,
				imgCollection: [],
				imgSelected: null,
				msg: null
			}

		case 'FETCH_IMAGES_FULFILLED' :			
			return {
				...state,
				fetching: false,
				fetched: true,
				imgCollection: action.payload,
				imgSelected: null,
				msg: 'success!'
			}			

		case 'FETCH_IMAGES_REJECTED' :
			return {
				...state,
				fetching: false,
				fetched: false,
				imgCollection: [],
				imgSelected: null,
				msg: action.payload
			}

		case 'IMAGE_SELECTED' :
			return {
				...state,
				imgSelected: action.payload				
			}

		case 'IMAGE_MISSING_ERROR' :
			return {
				...state,
				imgMissing: action.payload				
			}			
		case 'CAPTION_MISSING_ERROR' :
			return {
				...state,								
				captionMissing: action.payload				
			}
		case 'RESET_IMAGE_STATE' :
			return {
				...state,
				fetching: false,
				fetched: false,
				imgCollection: [],
				imgSelected: null,
				msg: null,
				imgMissing: null,
				captionMissing: null
			}
		default:
			return state;
	}  
}
export default images;
