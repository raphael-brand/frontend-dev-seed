import React from 'react';
import {render} from 'react-dom';
import {Card} from './Card';


class Sets extends React.Component {
  that:any;
  constructor() {
    super();
    this.state = {
      imageList:[]
    }
  }
  
  componentWillMount() {
    var list = [];
    fetch('js/data.json')
        .then(response => response.json())
        .then(result => {
          for(let image of result) {
            console.log(image.id);
            list[list.length] = image.id + '_1';
            list[list.length] = image.id + '_2';
          }

          list = this.shuffle(list);
          this.setState({"imageList":list})
        });
  }
  
  // Thanks to Mike Bostock for this great article about the
  // Fisher-Yates shuffle! https://bost.ocks.org/mike/shuffle/
  shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  detectPair(event) {
    let revealed = document.getElementsByClassName('flipped');
    console.group(':')
    for(let card1 of revealed) {
      let base1 = card1.getAttribute('id').replace(/\_1$/gi, '');
      for(let card2 of revealed) {
        if(base1 + '_2' == card2.getAttribute('id')) {
          console.log(card2.getAttribute('id').replace(/\_\d$/gi, ''))
          console.log('key: ' + card2.getAttribute('id').replace(/\_\d$/gi, ''));
        }
      }
    }
    console.groupEnd();
    return false;
  }

  render() {
    var rows = new Array();
    for(var i=0; i < this.state.imageList.length; i++) {
      rows.push(<Card name={this.state.imageList[i]} image={this.state.imageList[i]} key={this.state.imageList[i]} />);
    }
    return <div onMouseUp={this.detectPair.bind(this)}> {rows} </div>
  }
}

export {Sets};