// https://goo.gl/Uvopzx
import React from 'react';
import { render } from 'react-dom';
import { Gallery } from './gallery';

class App extends React.Component {
  render () {
    return <Gallery />;
  }
}

render(<App/>, document.getElementById('root'));