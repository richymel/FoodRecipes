import axios from 'axios';
import store from '../store';

//sync actions

export function selectImage(imgUrl) {
	store.dispatch({   	
   	type: 'IMAGE_SELECTED',
    payload: imgUrl
  })	
}

export function imgMissing(bool) {
	store.dispatch({
		type: 'IMAGE_MISSING_ERROR',
		payload: bool
	})
}

export function captionMissing(bool) {
  store.dispatch({
    type: 'CAPTION_MISSING_ERROR',
    payload: bool
  })
}

export function resetImgState() {
	store.dispatch({
		type: 'RESET_IMAGE_STATE',
		payload: 'defaults'
	})
}

//async actions

export function fetchImages(input) {
	const ApiData = {
    endPoint : "https://pixabay.com/api/?",
    parms:{
      key : "6061366-6852efc0062b28938a5cdd044",          
      q: 'meat balls',
      lang: 'en',
      image_type: 'photo',
      orientation: 'horizontal',
      category: 'food',
      min_width: '350',
      safesearch: 'true',
      order: 'popular',
      per_page: 20
    },

    immediateSearch: false,

    toString() {
      const  that  = this;
      return (    
        Object.keys(this.parms).map( (prop,idx) => 
          `${prop}=${encodeURIComponent(that.parms[prop])}` ).toString().replace(/,/g,'&')
      );
    }
  };
  
	ApiData.parms.q = input;
	
	store.dispatch({   	
   	type: 'FETCH_IMAGES',
    payload: axios.get(ApiData.endPoint + ApiData.toString())
  })
};