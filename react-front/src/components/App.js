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
            loaded: false,
            authenticated: {
                authenticated: false,
                id: null,
                token: null
            },
            lists: []
        }
        this.newList = this.newList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(response => {
                console.log('api prodded');
                this.setState({
                    loaded: true
                })
            })
    }

    getLists() {
        axios.get('http://localhost:5000/v1.0/lists/' + this.state.authenticated.id)
            .then(response => {
                this.setState({
                    lists: response.data
                })
            })
            .catch(error => {
                if (error.response.status === 404) {
                    // User has no lists
                    this.setState({
                        lists: []
                    })
                }
            });
    }

    newList(title) {
        /**
         * This method is a handler that is passed to the CreateNewList component
         *  to create a new list in the database. 
         */
        axios.post('http://localhost:5000/v1.0/lists/new', {
            "user_id": this.state.authenticated.id,
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
                console.log('remove list response', response);
                if (response.status === 200) {
                    this.getLists();
                } else if (response.stats === 404) {
                    alert('List not found!')
                }
            })
    }

    authenticate() {
        const login = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        }
        
        document.getElementById('login-email').value = null;
        document.getElementById('login-password').value = null;

        console.log('login creds', login);

        axios.post('http://localhost:5000/login', login)
            .then(response => {
                console.log('response status', response.status)
                if (response.status === 200) {
                    this.setState({
                        authenticated: {
                            authenticated: true,
                            id: response.data.response.user.id,
                            token: response.data.response.user.authentication_token
                        }
                    }, () => {
                        alert('Login successful!')
                        this.getLists();
                        console.log('post auth state', this.state);
                    })
                }
            })
            .catch(error => {
                if (error.response.status === 400) {
                    alert('Invalid username and password!');
                }

            });

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
        if (!this.state.loaded) {
            return <div>Initialising...</div>
        }
        if (!this.state.authenticated.authenticated) {
            return (
                <div>
                    <h2>Please login:</h2>
                    <label>Email:</label>
                    <input 
                        type="text"
                        id="login-email"    
                    ></input>
                    <label>Password:</label>
                    <input 
                        type="password"
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