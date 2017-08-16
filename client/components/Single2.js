import React from 'react';
import PhotoSearch from './PhotoSearch';

const Single2 = React.createClass({
  render() {  	
    return (
      <div className="photo'grid">      	
      	<PhotoSearch  {...this.props} />
      </div>
    )
  }
});

export default Single2;
