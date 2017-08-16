import React from 'react';
import { Link } from 'react-router';

const Main = React.createClass({
  componentWillUpdate: function(nextProps, nextState){
    localStorage.setItem('posts', JSON.stringify(nextProps.posts));
    localStorage.setItem('comments',  JSON.stringify(nextProps.comments));
  },

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  },  
  guid() {
    return (this.s4()+this.s4()+this.s4()).substring(0,11);
  },
  render() {
    const link = `/add/${this.guid()}`;
    return (
      <div>
        <h1>
          <Link  to="/">Recipes for Fun</Link>          
        </h1>
        <span className="btnWrapper">
          <Link className="button addBtn" to={link}>
            NEW
          </Link>        
        </span>

        {React.cloneElement( this.props.children, this.props )}
     
        <span className="btnWrapper">
          <Link className="button addBtn" to={link}>
            NEW
          </Link> 
        </span>

      </div>
    )
  }
});

export default Main;
