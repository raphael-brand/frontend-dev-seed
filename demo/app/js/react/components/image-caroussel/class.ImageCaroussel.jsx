import React from 'react';
import { render } from 'react-dom';

class ImageCaroussel extends React.Component {


    render() {

        fetch('js/data.json')
            .then(response => response.json())
            .then(result => {
                console.log(result.title)
            });
        //console.log(this.props.children);
        return <div class="image-caroussel">
            {this.props.children}
        </div>
    }
}


export { ImageCaroussel };

