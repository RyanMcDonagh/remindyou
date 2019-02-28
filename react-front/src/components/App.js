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
            lists: [
                {
                    list_id: 1,
                    title: 'Home',
                    items: [
                        {
                            id: 342515,
                            text: "Do washing"
                        }, 
                        {
                            id: 1235245134,
                            text: "Clean car"
                        }
                    ]
                },
                {
                    list_id: 2,
                    title: 'Work',
                    items: [
                        {
                            id: 475982374592845,
                            text: "Meet Barbara"
                        },
                        {
                            id: 3985793457289457,
                            text: "Write forecasts"
                        }
                    ]
                }
            ]
        }
        this.newList = this.newList.bind(this);
        this.removeList = this.removeList.bind(this);
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
            <div>
                {
                    this.state.lists.map(list => (
                        <List
                            key={list.title}
                            list={list}
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