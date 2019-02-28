import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
            <li>{this.props.text}</li>
            <button 
                className="btn btn-danger"
                style={{
                    display: "inline-block"
                }}
            >
                Delete
            </button>
            </div>
        )
    }
}

export default Item;