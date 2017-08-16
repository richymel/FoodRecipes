import React from 'react';

const Comments = React.createClass({

  getInitialState: function() {
      return { 
        ingredientOK : true
      }
  },

	validateInput() {
  	try {
  		if (this.refs.comment.value.trim() == "") {
  			this.setState({ingredientOK: false});
  			return false;
  		}	else {
  			this.setState({ingredientOK: true});
  			return true;
  		}
  	} catch(err) {
  		this.setState({ingredientOK: true});
			return true;
		}
  },

	renderComment(comment, idx) {
		return (
			<div className="comment" key={idx}>
				<p>
					<strong>{comment.user}</strong>
					{comment.text}			
					<button className="remove-comment" 
							onClick={this.props.removeComment.bind(null,this.props.params.postId, idx)}>
							<span className='delete'>&#xF1F8;</span>
							</button>
				</p>
			</div>
		)
	},

	handleSubmit(e) {
		e.preventDefault();
		if (this.validateInput()) { //if validation ok
			const { postId } = this.props.params;
			const comment = this.refs.comment.value;
			//We need the comments reducer to update the state via an action from the actionCreators module
			this.props.addComment(postId,comment);
			this.refs.commentForm.reset();		
		}
	},
	render() {
		return (
			<div className="comments">
				{this.props.postComments.map(this.renderComment)}
				<form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
					<input type="text" ref="comment" placeholder="Add ingredient, then press [ENTER]" autoFocus />
					<span className='errorMsg'>{this.state.ingredientOK===true ? "" : "Please enter an ingredient!"}</span>
					<button type="submit">Add</button>
				</form>
			</div>
		
		)
	}
});

export default Comments;
