import React from 'react';
import {render} from 'react-dom';
import {Sets} from './Sets';

class MemoryGame extends React.Component {
  render() {
    return (
      <div className="memory-game">Memory Game<Sets /></div>
      
    );
  }
}
export {MemoryGame}