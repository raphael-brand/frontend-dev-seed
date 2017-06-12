// https://goo.gl/Uvopzx
import React from 'react';
import { render } from 'react-dom';
import {MemoryGame} from './components/memory-game'

class App extends React.Component {
  render () {
    return <div>
      Hello ReactJS
      <MemoryGame />
    </div>
  }
}

render(<App />, document.getElementById('root'));