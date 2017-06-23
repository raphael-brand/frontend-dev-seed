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

  

  render() {
    var rows = new Array();
    for(var i=0; i < this.state.imageList.length; i++) {
      rows.push(<Card name={this.state.imageList[i]} image={this.state.imageList[i]} key={this.state.imageList[i]} />);
    }
    return <div> {rows} </div>
  }
}

export {Sets};