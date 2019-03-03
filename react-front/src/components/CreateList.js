import React, { Component } from 'react';

class CreateList extends Component {

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.props.newList(document.getElementById("create-list-text").value)
        document.getElementById("create-list-text").value = null;
    }

    render() {
        return (
            <div>
                <h2>Create New List</h2>
                <input 
                    type="text"
                    id="create-list-text"
                />
                <button
                    type="button"
                    onClick={this.submit}
                >
                Add
                </button>
            </div>
        )
    }
}

export default CreateList;