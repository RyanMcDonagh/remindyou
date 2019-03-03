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
    }

    componentDidMount() {
        this.getListItems();
    }

    getListItems() {
        axios.get('http://localhost:5000/tasks/' + this.state.id)
            .then(response => {
                this.setState({
                    items: response.data
                }, function() {
                    console.log('List state', this.state)
                    console.log('getListItems data', response.data)
                })
            });
    }

    addItem(item) {
        this.setState({
            items: [...this.state.items, item]
        })
        console.log('this.state.items', this.state.items);
    }

    deleteList() {
        this.props.removeList(this.props.list);
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
                            title={item.title}
                            description={item.description} 
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
            </div>
        )
    }
}

export default List;