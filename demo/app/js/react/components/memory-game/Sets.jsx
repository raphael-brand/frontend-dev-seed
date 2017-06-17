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
            list.push(image.id+'.jpeg');
          }
          this.setState({"imageList":list})
        });
  }
  render() {
    var rows = new Array();
    for(var i=0; i <= this.state.imageList.length; i++) {
      rows.push(<Card name={i} image={this.state.imageList[i]} key={i} />);
    }
    return <div> {rows} </div>
  }
}

export {Sets};