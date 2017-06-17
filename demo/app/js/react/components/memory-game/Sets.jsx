import React from 'react';
import {render} from 'react-dom';
import {Card} from './Card';

class Sets extends React.Component {
  that:any;
  constructor() {
    super();
    this.state = {
      backgroundImage:''
    }
  }
  componentWillMount() {
    fetch('js/data.json')
        .then(response => response.json())
        .then(result => {
          console.log(result.url)
          this.setState({"backgroundImage":result.url})
        });
  }
  render() {
    var rows = new Array();
    for(var i=0; i <= 5; i++) {
      rows.push(<Card name={i} image={this.state.backgroundImage} key={i} />);
    }
    return <div> {rows} </div>
  }
}

export {Sets};