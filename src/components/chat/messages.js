import React, { Component } from 'react';
import {Button} from '../../views/design/Button.js';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import './messages.css'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: null,
        };
    }

    async update() {
    // the local storage bit needs to be changed to gameId (passed down by the game component
        const response = await api.get("/games/" + localStorage.getItem("userId"));
        const data = await response.json();
        this.setState({messages: data.histories});
        console.log(data);
        this.scrollToRef();
    };

    scrollToRef() {
        const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    };

   componentDidMount() {
      setInterval(this.update(),1000);
   };

   componentWillUnmount(){
       clearInterval();
   };

    mapMessages() {
        // map messages to array so they can be displayed
        if (this.state.messages != null){
            return (
                <div>
                    {this.state.messages.map((item, index)=>
                      <div className="textContainer" ref={this.chatContainer}>
                        {this.state.users.map((item, index)=>
                          <div>
                            <div className="id">{item.senderID} &nbsp;</div>
                            <div className="message">{item.message} &nbsp;</div>
                            <div className="timestamp"> {item.timeStamp}</div>
                          </div>
                        )}
                    )}
                </div>
            );
        }
        else {
            return(
                <div className="text">You don't have any invitations! </div>
            );
        }
    };

    render() {
        return (
            this.mapMessages();
        );
    }
}

export default Messages;