import React from 'react';
import { render } from 'react-dom';

class Gallery extends React.Component {
  render() {
    return <h3>Gallery : {this.props.topic}</h3>
  }
}

export { Gallery };