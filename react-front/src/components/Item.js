import React, {Component} from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }

        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem() {
        console.log(this);
        this.props.deleteItem(this.state.id);
    }

    render() {
        return (
            <div>
            <li>{this.props.title} - <em>{this.props.description}</em></li>
            <button 
                className="btn btn-danger"
                onClick={this.deleteItem}
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