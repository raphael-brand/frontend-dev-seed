import React from 'react';
import {render} from 'react-dom';

class Card extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
          "cardFlipped": 'card',
          "backgroundImage": 'none',
          "match": false
    }
  }

  flipCard(event) {
    if(this.state.match == true) return;
    var css = (this.state.cardFlipped == 'card' ? 'card flipped' : 'card' )
    this.setState({"cardFlipped":css});
    if(css == 'card flipped')
      this.setState({"backgroundImage":'url(/img/'+this.props.image.replace(/\_\d$/gi, '')+'.jpeg)'});
    else
      this.setState({"backgroundImage":'none'});
    
    this.detectPair(event);
    return true
  }

  detectPair(event) {
    var target = event.target;
    var id = target.getAttribute('id');
    console.log('id:',id);
    var base = id.replace(/_\d$/,'');
    target.classList.add('flipped');
    console.log('base:',base)
    var revealed = Array.from(document.querySelectorAll('.flipped'));
    var baseCount = 0;
    for(let card of revealed) {
      if(new RegExp(base).test(card.getAttribute('id'))) {
        baseCount++;
        if(baseCount == 2) {
          this.setState({'match': true})
        }
      }
    }

    if(baseCount == 2)
      console.info('match');

    return true;
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