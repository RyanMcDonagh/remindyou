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
            authenticated: {
                authenticated: false,
                id: null
            },
            lists: []
        }
        this.newList = this.newList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.authenticate = this.authenticate.bind(this);
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

    authenticate() {
        const login = {
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
        }

        console.log('login creds', login);

        this.setState({
            authenticated: {
                authenticated: true,
                id: 1
            }
        }, () => console.log(this.state))

    }

    logout = () => {
        this.setState({
            authenticated: {
                authenticated: false,
                id: null
            }
        }, () => console.log(this.state))
    }

    render() {
        if (!this.state.authenticated.authenticated) {
            return (
                <div>
                    <h2>Please login:</h2>
                    <label>Username:</label>
                    <input 
                        type="text"
                        id="login-username"    
                    ></input>
                    <label>Password:</label>
                    <input 
                        type="text"
                        id="login-password"                        
                        ></input>
                    <button 
                        className="btn btn-primary"
                        onClick={this.authenticate}
                    >Login</button>
                </div>
            )
        }
        return (
            <div className="App">
                <button
                    className="btn btn-danger"
                    onClick={this.logout}
                >Logout</button>
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