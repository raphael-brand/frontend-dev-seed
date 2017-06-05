// https://goo.gl/Uvopzx
import React from 'react';
import { render } from 'react-dom';
import { Gallery } from '../gallery';
import { ImageCaroussel } from './class.ImageCaroussel'

class App extends React.Component {
  render () {
    return <div>
     <Gallery topic="Hello React"/>
     <Gallery topic="GoodBye Angular"/>
     <ImageCaroussel>
      <mark>Test</mark>
     </ImageCaroussel>
    </div>
  }
}

render(<App />, document.getElementById('root'));