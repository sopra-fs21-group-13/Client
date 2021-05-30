import React, { Component } from 'react';
import {Button} from '../../views/design/Button.js';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import './messages.css'

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

    async update() {
    // the local storage bit needs to be changed to gameId (passed down by the game component
        const response = await api.get("/games/" + localStorage.getItem("gameId"));
        const data = response.data;
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
        // map messages so they can be displayed
        if (this.state.messages == []){
            return (
                <div>
                    <h1> Welcome to the game!</h1>
                </div>
            )
        }
        else {
            return(
                <div>
                    {this.state.messages.map((item, index)=>
                        <div className="textContainer" ref={this.chatContainer}>
                           <div className="id">{item.senderId} &nbsp;</div>
                           <div className="message">{item.message} &nbsp;</div>
                           <div className="timestamp"> {item.timeStamp}</div>
                        </div>
                    )}
                </div>
            );
        }
};
    render() {
        return (
            this.mapMessages()
        );
    }
}

export default Messages;