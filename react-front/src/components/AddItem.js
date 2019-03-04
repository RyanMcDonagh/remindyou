import React, { Component } from 'react';

class AddItem extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit() {

        // console.log('value', document.getElementById("add-item-text" + this.props.id).value)
        // this.props.addItem({
        //     id: 1 + Math.random(),
        //     text: document.getElementById("add-item-text" + this.props.id).value
        // })
        // document.getElementById("add-item-text" + this.props.id).value = null;

        this.props.addItem(
            document.getElementById("add-item-title" + this.props.id).value,
            document.getElementById("add-item-description" + this.props.id).value
        )
        document.getElementById("add-item-title" + this.props.id).value = null;
        document.getElementById("add-item-description" + this.props.id).value = null;
    }

    render() {
        return (
            <div>
                <label>Title</label>
                <input
                    type="text"
                    id={"add-item-title" + this.props.id}
                />
                <label>Description</label>
                <input
                    type="text"
                    id={"add-item-description" + this.props.id}
                />
                <button
                    type="button"
                    onClick={this.submit}
                >
                Add Item
                </button>
            </div>
        )
    }
}

export default AddItem;