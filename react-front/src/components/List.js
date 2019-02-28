import React, {Component} from 'react';
import Item from './Item';
import AddItem from './AddItem';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.list.item,
            title: this.props.list.title,
            items: this.props.list.items
        }

        this.deleteList = this.deleteList.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    componentDidMount() {
        console.log('List state', this.state);
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
                            text={item.text} 
                        />
                    ))
                }
            </ul>

            <AddItem 
               list={this.props.list}
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