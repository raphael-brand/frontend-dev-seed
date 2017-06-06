import React from 'react';
import {render} from 'react-dom';

class Card extends React.Component {
  render() {
    return (
      <div className="card">{this.props.name}</div>
    );
  }
}

class Sets extends React.Component {
  render() {
    var rows = new Array();
    for(var i=0; i <= 5; i++) {
      rows.push(<Card name={i} key={i} />);
    }

    return <div> {rows} </div>
  }
}

class MemoryGame extends React.Component {
  render() {
    return (
      <div className="memory-game">Memory Game<Sets /></div>
      
    );
  }
}
export {MemoryGame}