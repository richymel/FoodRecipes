import React from 'react';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { browserHistory } from 'react-router';

//NB Note the syntax used to call the removePost method in the onClick property of the button element
//   this format is not applicable to this.props methods, however binding is necessary... 
//   compare this to the ./components/PhotoSearch that uses a different technique to instantiate the
//   React component class. I prefer this latter - more straight forward - way of calling methods of 
//   the react class and also the way the props are injected is more precise (see @connect) 
//   I prefer the @connect way to access the store, although I have also injected to the PhotoSearch 
//   component the entire this.props. See ./components/Single2.js (using @connect one has more control over 
//   the objects kept in the giant Redux store).
//   The hybrid approach of handling props and the React object was done purposedly to learn the 
//   possibilities that each methodology has to offer.  RichyMel 2017.08.12

const Photo = React.createClass({
    
  getInitialState: function() {
      return { 
        allowRemove : (this.props.params.postId) ? true : false
      }
  },

  removePost: function(e,i){
    e.preventDefault();
  //To do: research a way to rollback if both oprations are not completed successfully:
    this.props.removePost(i);
    this.props.removeAllComments(this.props.posts[i].code);
    browserHistory.push('/');
  },

  render() {
    /**
     *  Create variables this.props.post, this.props.i, etc.
     *  this props are passed to the component by the parent
     *  with the ...this.props spread operator
     */
    const { posts, i, comments } = this.props;
    const postLink = `/view/${posts[i].code}`;    

    return (
      <figure className="grid-figure">
        <div className="grid-photo-wrap">
        <Link to={postLink}>
          <img src={posts[i].display_src} alt={posts[i].caption} className="grid-photo" />
        </Link>


        <figcaption>           
          <div className="comment" key={i}>
          <p>
            <strong>{posts[i].caption}</strong>
          { this.state.allowRemove===false ?  null :
            <button className="remove-comment"              
              onClick={(e) => {this.removePost(e,i)}}>
              <span className='delete'>&#xF1F8;</span>
            </button>
          }
          </p>
          </div>
          <div className="control-buttons">
            <button onClick={this.props.increment.bind(null, i)}>
              <span className='edit'>&#xf08a;&nbsp;</span>
              {posts[i].likes}
            </button>
            
            <CSSTransitionGroup transitionName="like"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              <span key={posts[i].likes} className="likes-heart">{posts[i].likes}</span>
            </CSSTransitionGroup>

            <Link className="button" to={postLink}>
              <span className="comment-count">
                <span className="edit">&#xf044;</span>&nbsp;
                {comments[posts[i].code] ? comments[posts[i].code].length : 0 }
              </span>
            </Link>
          </div>
        </figcaption>
 
        </div>
      </figure>
    )
  }
});

export default Photo;
