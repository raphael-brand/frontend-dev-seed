import React from 'react';
import {render} from 'react-dom';
import {Card} from './Card';

class Sets extends React.Component {
  render() {
    var rows = new Array();
    for(var i=0; i <= 5; i++) {
      rows.push(<Card name={i} key={i} />);
    }

    return <div> {rows} </div>
  }
}

export {Sets};