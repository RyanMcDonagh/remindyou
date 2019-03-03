/**
 * The App class represents the top-level component of RemindYou. It handles
 *  requests to the RESTful API service and passes the relevant data to other
 *  components as needed.
 */

import React, { Component } from 'react';
import List from './List';
import CreateList from './CreateList';

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
        this.getNewLists();
    }

    getNewLists() {
        fetch('http://localhost:5000/lists/1')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    lists: json
                }, function() {
                    console.log('App state', this.state)
                })
            });
    }

    newList(list) {
        /**
         * This method is a handler that is passed to the CreateNewList component
         *  to allow a new list to be added to the App's list of lists in state.
         */

        this.setState({
            lists: [...this.state.lists, list]
        });
    }

    removeList(list) {
        this.setState({
            lists: this.state.lists.filter(item => item !== list)
        });
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