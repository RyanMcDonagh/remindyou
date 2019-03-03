import React, {Component} from 'react';
import Item from './Item';
import AddItem from './AddItem';
import axios from 'axios';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            items: []
        }

        this.deleteList = this.deleteList.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this)
    }

    componentDidMount() {
        this.getListItems();
    }

    getListItems() {
        axios.get('http://localhost:5000/v1.0/tasks/' + this.props.id)
            .then(response => {
                this.setState({
                    items: response.data
                })
            });
    }

    addItem(title, description) {
        axios.post('http://localhost:5000/v1.0/tasks/new', {
            "list_id": this.state.id,
            "title": title,
            "description": description
        })
            .then(response => {
                if (response.status === 200) {
                    this.getListItems();
                }
            })
    }

    deleteItem(id) {
        axios.delete('http://localhost:5000/v1.0/tasks/d/' + id)
            .then(response => {
                if (response.status === 200) {
                    console.log(this);
                    this.getListItems();
                } 
            })
    }

    deleteList() {
        this.props.removeList(this.state.id);
    }

    render() {
        return (
            <div>
            <h3>{this.state.title}</h3>
                
            <ul>
                {
                    this.state.items.map(item => (
                        // <li>{item.text}</li>
                        <Item 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description} 
                            deleteItem={this.deleteItem}
                        />
                    ))
                }
            </ul>

            <AddItem 
               id={this.state.id}
               addItem={this.addItem}
            />

            <button
                onClick={this.deleteList}
            >
            Delete
            </button>
            <hr />
            </div>
        )
    }
}

export default List;