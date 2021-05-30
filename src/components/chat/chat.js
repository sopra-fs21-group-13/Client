import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import Messages from './messages.js'
import './chat.css';

export default function Chat({gameId}){

    const [message, setMessage] = useState("");

    let handleSubmit = event => {
        const requestBody = JSON.stringify({
            senderId: localStorage.getItem("userId"),
            message: message     
        });
        api.put('/games/' + gameId + '/histories', requestBody).then(result => {console.log(result);}
        ).catch(e=>{
          alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
        });
        event.preventDefault();
    };

    let handleChange = event => {
        setMessage(event.target.value);
    };
        return (
            <div className = "ChatContainer">
                <div className = "messageContainer">
            <Messages gameId = {gameId}/>
                </div>
                <form className="formulare" onSubmit={handleSubmit}>
                    <input className = 'writing'
                        placeholder="Enter your message..."
                        type="text"
                        value={message}
                        onChange={handleChange}
                    />
                    <button className="button" type="submit" disabled={handleSubmit}>Send Message</button>
                </form>
            </div>
        );
    
}