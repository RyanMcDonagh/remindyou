/**
 * The App class represents the top-level component of RemindYou. It handles
 *  requests to the RESTful API service and passes the relevant data to other
 *  components as needed.
 */

import React, { Component } from 'react';
import List from './List';
import CreateList from './CreateList';
import axios from 'axios';

class App extends Component {

    constructor() {
        super();
        this.state = {
            lists: []
        }
        this.newList = this.newList.bind(this);
        this.removeList = this.removeList.bind(this);
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        axios.get('http://localhost:5000/v1.0/lists/1')
            .then(response => {
                this.setState({
                    lists: response.data
                }, function() {
                    console.log('App state', this.state)
                })
            });
    }

    newList(title) {
        /**
         * This method is a handler that is passed to the CreateNewList component
         *  to create a new list in the database. 
         */
        axios.post('http://localhost:5000/v1.0/lists/new', {
            "user_id": 1,
            "title": title
        })
            .then(response => {
                if (response.status === 200) {
                    this.getLists();
                }
            })

    }

    removeList(id) {
        axios.delete('http://localhost:5000/v1.0/lists/delete/' + id)
            .then(response => {
                if (response.status === 200) {
                    this.getLists();
                } else if (response.stats === 404) {
                    alert('List not found!')
                }
            })
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.lists.map(list => (
                        <List
                            key={list.title}
                            id={list.list_id}
                            title={list.title}
                            removeList={this.removeList}
                        />
                    ))
                }

                <hr/>
                <CreateList 
                    lists={this.state.lists}
                    newList={this.newList}
                />
            </div>
        )
    }
}

export default App;