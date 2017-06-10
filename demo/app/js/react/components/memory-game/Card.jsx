import React from 'react';
import {render} from 'react-dom';

class Card extends React.Component {
  
  flipped: boolean;
  constructor(props) {
    super(props);
    this.flipped = false;
    this.flipCard = this.flipCard.bind(this);
  }


  flipCard(event) {
    this.flipped = !this.flipped;
    if(!this.flipped)
      event.target.classList.add('flipped');
    else
      event.target.classList.remove('flipped');
  }
  
  render() {
    return (
      <div
        className="card"
        onClick={this.flipCard}
      >{this.props.name}</div>
    );
  }
}

export {Card};