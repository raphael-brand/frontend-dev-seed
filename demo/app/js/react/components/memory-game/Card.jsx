import React from 'react';
import {render} from 'react-dom';

class Card extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {"cardFlipped": 'card', "backgroundImage": 'none'}
  }

  flipCard() {
    var css = (this.state.cardFlipped == 'card' ? 'card flipped' : 'card' )
    this.setState({"cardFlipped":css});
    if(css == 'card flipped')
      this.setState({"backgroundImage":'url(/img/'+this.props.image.replace(/\_\d$/gi, '')+'.jpeg)'});
    else
      this.setState({"backgroundImage":'none'});
  }

  render() {
    return (
      <div className="cardWrapper">
      <div
        className={this.state.cardFlipped}
        onClick={this.flipCard.bind(this)}
        style={{backgroundImage:this.state.backgroundImage}}
        id={this.props.name}
      >{this.props.name}</div></div>
    );
  }
}

export {Card};