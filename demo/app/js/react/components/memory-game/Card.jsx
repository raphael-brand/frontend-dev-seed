import React from 'react';
import {render} from 'react-dom';

class Card extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {"cardFlipped": 'card', "backgroundImage":this.props.image}
  }

  flipCard() {
    var css = (this.state.cardFlipped == 'card' ? 'card flipped' : 'card' )
    this.setState({"cardFlipped":css});
  }

  render() {
    return (
      <div
        className={this.state.cardFlipped}
        onClick={this.flipCard.bind(this)}
        style={{backgroundImage:'url('+this.props.image+')'}}
      >{this.props.name}</div>
    );
  }
}

export {Card};