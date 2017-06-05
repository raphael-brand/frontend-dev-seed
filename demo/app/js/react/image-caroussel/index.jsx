// https://goo.gl/Uvopzx
import React from 'react';
import { render } from 'react-dom';
import { Gallery } from '../gallery';

class App extends React.Component {
  render () {
    return <div>
     <Gallery topic="Hello React"/>
     <Gallery topic="GoodBye Angular"/>
    </div>
  }
}

render(<App />, document.getElementById('root'));