import React, { Component } from 'react';
import LISTS from '../../data/lists';

class Lists extends Component {

    render() {
        console.log('LISTS', LISTS);
        return (
            <div>
                <h2>Lists</h2>
                <div>
                    {
                        LISTS.map(list => {
                            return (
                                <div key={list.id}>
                                    <h3>{list.title}</h3>
                                    {
                                        list.tasks.map(task => {
                                            return (
                                                <ul key={task.id}>{task.text}</ul>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        )
    }
}

export default Lists;