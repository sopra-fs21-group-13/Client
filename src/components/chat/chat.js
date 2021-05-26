import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import Messages from './messages.js'
import './chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: ''};
    }

     handleSubmit = event => {
        const requestBody = JSON.stringify({
            message: this.state,
            gameID: localStorage.getItem("userId"),
        });
        api.put('/games/' + localStorage.getItem('userId') + '/histories').then(result => {console.log(result);}
        ).catch(e=>{
          alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
        });
        event.preventDefault();
    };

    handleChange = event => {
        this.setState({message: event.target.value});
    };


    render() {
        return (
            <div>
            <Messages> </Messages>
                <form className="formulare" onSubmit={this.handleSubmit}>
                    <input className = 'writing'
                        placeholder="Enter your message/solution..."
                        type="text"
                        value={this.state.message}
                        onChange={this.handleChange}
                    />
                    <button className="button" type="submit" disabled={this.handleSubmit}>Send Message</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Chat);