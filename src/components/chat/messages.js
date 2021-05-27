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
            users: [
            {
              senderID:123,
              timeStamp: "13:00:01 12.05.21",
              message: "Lol u suck ass!"
            },
            {
              senderID:23,
              timeStamp: "13:00:03 12.05.21",
              message: "No problem I will restart the application thank you very much i lie a lot and so do u"
            },
            {
               senderID:123,
               timeStamp: "13:00:12 12.05.21",
               message: "lon denner denses den lorem ipsum sim dender kan nimar denb bunde rellad!."
            },
            {
              senderID:123,
              timeStamp: "13:00:01 12.05.21",
              message: "Lol u suck ass!"
            },
            {
              senderID:23,
              timeStamp: "13:00:03 12.05.21",
              message: "xD"
            },
            {
               senderID:123,
               timeStamp: "13:00:12 12.05.21",
               message: "lorem ipsum sim dender kan nimar denb bunde rellad."
            },
            {
              senderID:123,
              timeStamp: "13:00:01 12.05.21",
              message: "lon denner denses den lorem ipsum sim dender kan nimar denb bunde rellad!"
            },
            {
              senderID:23,
              timeStamp: "13:00:03 12.05.21",
              message: "lorem ipsum sim dender kan nimar denb bunde rellad nado kann dem dener:)"
            },
            {
               senderID:123,
               timeStamp: "13:00:12 12.05.21",
               message: "Jesus chirst chill tf out man."
            },
            {
              senderID:123,
              timeStamp: "13:00:01 12.05.21",
              message: "Lol!"
            },
            {
              senderID:23,
              timeStamp: "13:00:03 12.05.21",
              message: "okay :)"
            },
            {
               senderID:123,
               timeStamp: "13:00:12 12.05.21",
               message: "Jesus chirst chill tf out man."
            }]
        };
    }

    async loadMessages() {
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

    startInterval() {
        setInterval(this.loadMessages(),1000);
       // setTimeout(this.loadMessages(), 1000);
    };

    mapMessages() {

    };

    render() {
      this.startInterval();
        return (
            <div className="textContainer" ref={this.chatContainer}>
                {this.state.users.map((item, index)=>
                    <div>
                    <div className="id">{item.senderID} &nbsp;</div>
                    <div className="message">{item.message} &nbsp;</div>
                    <div className="timestamp"> {item.timeStamp}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default Messages;