import React from 'react';
import { connect } from 'react-redux';
import { fetchImages, selectImage, imgMissing, captionMissing, resetImgState } from '../actions/imagesActions';
import { browserHistory } from 'react-router';

//import { connect } from 'react-redux';

const imgsrc = 'https://dl.dropbox.com/s/kl7jvhvdwt427jg/default.jpg';
var keypressTimer = null;

//The @connect decorator passes the props specified to the React Component
//  NB. because this project has originally injected the props into the component (see ./components/Single2.js)
//      this @connect feature is sort of redundant... however, it is here so we know it is possible to be explicit
//      with the props we want to pass to the React component (in a clean way).
@connect((store) => {
	return {
		fetching: store.images.fetching,
		fetched: store.images.fetched,
		imgCollection: store.images.imgCollection,
		imgSelected: store.images.imgSelected,
		msg: store.images.msg,
		captionMissing: store.images.captionMissing,
		imgMissing: store.images.imgMissing
	}
})

class PhotoSearch extends React.Component {

	constructor() {
    super();
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageCheck = this.handleImageCheck.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.editRecipe = this.editRecipe.bind(this);

    var display_src = null;
  }

  validateInput(imgUrl="") {
  	var values = {
  		caption: null,
  		imgSelected: null,
  		error: {
  			captionMissing: false,
  			imgMissing: false
  		}
  	};
  	try {
	  	values.caption = this.refs.caption.value;
			values.imgSelected = (this.props.imgSelected === null) ? imgUrl : this.props.imgSelected;

	  	if (!values.caption && values.caption.trim() == "") {
	  		captionMissing(true);
	  		values.error.captionMissing = true;
	  	} else {
	  		captionMissing(false);
	  	}
	  	if (!values.imgSelected) {
	  		imgMissing(true);
	  		values.error.imgMissing = true;
	  	} else {
	  		imgMissing(false);
	  	}			
		} catch(err) {
			captionMissing(true);
			values.error.captionMissing = true;
		}
		return values.error;
  }	

  editRecipe() {
  	const path = `/view/${this.props.params.postId}`;
  	browserHistory.push(path);
  }

	handleKeyUp(e) {
		switch(e.keyCode) {
        case 13: /* enter */
          e.preventDefault();
          if (this.validateInput().captionMissing===true) return;
          fetchImages(this.refs.caption.value);
          break;
    }
	}

	handleKeyDown(e) {		
		const that = this;
	  clearTimeout(keypressTimer);
	  keypressTimer = setTimeout(function() {	
	  	if (that.validateInput().captionMissing===true) return;
	  	try {
	  		if (that.refs.caption.value.trim() !== "") {
	  			fetchImages(that.refs.caption.value)	  			
	  		}
	  	} catch(e) {
	  		return;	  		
	  	}
	  }, 2000);
	}

	handleImageCheck(e) {
		const { hits } = this.props.imgCollection.data;
		var ref_id = null;		

		//Find out the checkbox clicked:
		for (var i in this.refs) {
			if (this.refs[i].checked === true) {
				ref_id = this.refs[i].id;
			}
		}
		
		//get the image from list		
		var imgUrl = hits.findIndex((hit)=>(hit.id==ref_id));
	
		//Take imageUrl or generic img if not found
		imgUrl = (imgUrl !== -1) ? hits[imgUrl].webformatURL : imgsrc;

		//update the store
		selectImage(imgUrl);
		return this.validateInput(imgUrl);
	}

	handleSubmit(e) {		
		e.preventDefault();

		const { captionMissing, imgMissing, imgSelected } = this.props;
		const { postId } = this.props.params;
		const caption = this.refs.caption.value;		

		if (this.validateInput().captionMissing===true) return;

		this.display_src = this.props.imgSelected;
		
		//This fires up if validation is ok		
		if (captionMissing===false && imgMissing===false && imgSelected!==null) {
			this.props.addPost(postId, caption, this.display_src);
			this.refs.captionForm.reset();
			resetImgState();
			this.editRecipe();		
		}
	}

	render() {
		const { imgCollection, fetching, fetched, imgMissing, captionMissing } = this.props;
		const imgStyle = {
	    width: '150px',	    
	    left: 0
		}
		var pictureSelect = null;
		var errorMsg = {
			caption: null,
			imgSelected: null
		};
		var imglist = null;

		if (fetched && typeof imgCollection === 'object') {

			const { hits } = imgCollection.data;

			imglist = hits.map((hit,idx) => 
				(<li key={idx} >
						<label>
							<img src={hit.previewURL}/>
							<div className="custom-checkbox">
								<input ref={idx} type="radio" name="radio" id={hit.id} onClick={this.handleImageCheck} />
								<div className="check"></div>
							</div>
						</label>
					</li>));
		}
		if (fetching) {
			<div><strong>Searching for pictures, please wait...</strong></div>
		}
		if (imglist) {
			if (imglist.length>0) {
				pictureSelect = <div><strong>...click on a picture:)</strong><br/><br/></div>;
			} else {
				pictureSelect =
					<div> 
						<p><strong>No pictures available, please click on the picture below and press [ENTER]:</strong></p>
					</div>;
				imglist.push(
					<li key="0">
						<label>
							<img src={imgsrc} style={imgStyle}/>
							<div className="custom-checkbox">
								<input ref="0" type="radio" name="radio" id="0" onClick={this.handleImageCheck} />
								<div className="check"></div>
							</div>
						</label>
					</li>
				);
			}
		}

		if (captionMissing==true) {
			errorMsg.caption = "The recipe name is required."
		} else { errorMsg.caption = ""; }
		if (imgMissing==true) {
			errorMsg.imgSelected = "You must select an image for your recipe."
		} else { errorMsg.imgSelected = ""; }

		return (
			<div>
			  <figure className="grid-figure">
			    <div className="grid-photo-wrap">			      
						<figcaption> 
							<form ref="captionForm" className="comment-form" onSubmit={this.handleSubmit}>
								<input type="text" 
									ref="caption" placeholder="Type in the name of your recipe here" autoFocus 
									onKeyUp={this.handleKeyUp} 
									onKeyDown={this.handleKeyDown}
									/>

								<span className='errorMsg'>{errorMsg.caption}</span>
								<span className='errorMsg'>{errorMsg.imgSelected}</span>						

								{pictureSelect}
								<ul className='small-grid'>{imglist}</ul>

								<button type="submit">Create</button>
								<div  className="imgstyle">
									<strong>Search engine powered by&nbsp;&nbsp;&nbsp;</strong>
									<a href="https://pixabay.com/" target="_blank">
										<img src="https://dl.dropbox.com/s/jset1h9kal4z2de/logo.png"/>
									</a>
								</div>
							</form>
						</figcaption> 
			    </div>
		  	</figure>
			</div>
		)
	}
};

export default PhotoSearch;
